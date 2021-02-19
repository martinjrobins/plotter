import { downloadState, setupSyncStore, uploadState } from '~/api/NIVS'
import { columnProperties } from '~/constants/aesthetics'

export const state = () => ({
  syncError: null,
  presignedUrlForUpload: null,
  vegaView: null,
})

function vegaMark(geometry) {
  const nonNullOptions = Object.fromEntries(
    Object.entries(geometry.options).filter(([_, v]) => v != null)
  )
  return {
    type: geometry.type,
    ...nonNullOptions,
  }
}

function vegaEncoding(geometry, mode) {
  const aesMap = geometry.aesthetics
  let fieldNamePrepend = ''
  if (mode === 'topojson' || mode === 'geojson') {
    fieldNamePrepend = 'properties.'
  }
  return Object.keys(aesMap)
    .filter((key) => {
      return aesMap[key].length > 0
    })
    .reduce((map, key) => {
      map[key] = {
        field: fieldNamePrepend.concat(aesMap[key][0].name),
        type: aesMap[key][0].type,
      }
      map = columnProperties.reduce((map, prop) => {
        const value = aesMap[key][0][prop.name]
        if (value) {
          if (prop.transform) {
            // do nothing
          } else {
            let baseObject = map[key]
            const numberOfKeys = prop.vegaKey.length
            // make sure that all the parent keys are defined
            for (let i = 0; i < numberOfKeys - 1; i++) {
              if (
                !(prop.vegaKey[i] in baseObject) ||
                typeof baseObject[prop.vegaKey[i]] !== 'object'
              ) {
                baseObject[prop.vegaKey[i]] = {}
              }
              baseObject = baseObject[prop.vegaKey[i]]
            }
            baseObject[prop.vegaKey[numberOfKeys - 1]] = value
          }
        }
        return map
      }, map)
      return map
    }, {})
}

export const mutations = {
  setVegaView(state, value) {
    state.vegaView = value
  },
  setSyncError(state, value) {
    state.syncError = value
  },
  setPresignedUrlForUpload(state, value) {
    state.presignedUrlForUpload = value
  },
}

export const actions = {
  loadStore(context) {
    setupSyncStore()
      .then((presignedUrls) => {
        context.commit('setPresignedUrlForUpload', presignedUrls[1])
        const presignedUrlForDownload = presignedUrls[0]
        return downloadState(presignedUrlForDownload)
      })
      .then((newState) => {
        context.dispatch('geometries/loadStore', newState.geometries)
        context.dispatch('dataset/loadStore', newState.dataset)
        context.dispatch('dataset/loadData')
      })
      .then(() => {
        console.log('successfully synced state from NIVS backend')
      })
      .catch((e) => {
        context.commit(
          'setSyncError',
          'Error syncing state with NIVS backend. ' + e
        )
        // whatever happens we need to load the datafiles
        context.dispatch('dataset/loadData')
      })
  },
  uploadState(context) {
    const presignedUrlForUpload = context.state.presignedUrlForUpload
    if (presignedUrlForUpload) {
      uploadState(presignedUrlForUpload, context.state)
        .then(() => {
          context.commit('setSyncError', null)
        })
        .catch((error) => {
          context.commit(
            'setSyncError',
            `Error syncing with DAFNI backend. Response status is "${error}"`
          )
        })
    }
  },
  setOption({ commit }, [type, name, args, value]) {
    if (type === 'column') {
      commit('dataset/setColumn', [args.index, name, value])
    } else if (type === 'aesthetic') {
      const aesthetic = args.aesthetic
      commit('geometries/setAestheticColumnProperty', [
        aesthetic,
        0,
        name,
        value,
      ])
    } else if (type === 'geometry') {
      commit('geometries/setGeometryProperty', [args.index, name, value])
    } else {
      throw new Error(`unknown option type ${type}`)
    }
  },
  removeColumn({ commit }, [type, index, aesthetic]) {
    if (type === 'column') {
      commit('dataset/removeColumn', [index])
    } else if (type === 'aesthetic') {
      commit('geometries/removeAestheticColumn', [aesthetic, 0])
    }
  },
}

function vegaDataTopoJson(URL, geoFeature) {
  return {
    url: URL,
    format: {
      type: 'topojson',
      feature: geoFeature,
    },
  }
}

function vegaDataGeoJson(URL) {
  return {
    url: URL,
    format: {
      property: 'features',
    },
  }
}

export const getters = {
  option(state, getters) {
    return (type, name, args) => {
      if (type === 'column') {
        const column = state.dataset.columns[args.index]
        return column[name]
      } else if (type === 'aesthetic') {
        const aesthetic = args.aesthetic
        const selectedGeometry = getters['geometries/geometry']
        return selectedGeometry.aesthetics[aesthetic][0][name]
      } else if (type === 'geometry') {
        const geometry = state.geometries.geometries[args.index]
        return geometry.options[name]
      } else {
        throw new Error(`unknown option type ${type}`)
      }
    }
  },
  vegaLayers(state) {
    const geometries = state.geometries.geometries
    return geometries.map((geom) => {
      return {
        mark: vegaMark(geom),
        encoding: vegaEncoding(geom, state.dataset.mode),
      }
    })
  },
  vegaData(state) {
    if (state.dataset.mode === 'topojson') {
      return vegaDataTopoJson(
        state.dataset.topojsonFiles[state.dataset.geoIndex].url,
        state.dataset.topojsonObject
      )
    } else if (state.dataset.mode === 'geojson') {
      return vegaDataGeoJson(
        state.dataset.geojsonFiles[state.dataset.geoIndex].url
      )
    } else {
      return {
        url: state.dataset.csvFiles[state.dataset.csvIndex].url,
        name: 'table',
        format: {
          type: 'csv',
        },
      }
    }
  },
  vegaTransform(state) {
    const geometries = state.geometries.geometries
    const allCalculateExpressions = geometries.reduce((outerSet, geom) => {
      const aesMap = geom.aesthetics
      return Object.keys(aesMap)
        .filter((key) => {
          return aesMap[key].length > 0
        })
        .reduce((innerSet, key) => {
          const calculateExpression = aesMap[key][0].calculate
          if (calculateExpression) {
            innerSet.add(calculateExpression)
          }
          return innerSet
        }, outerSet)
    }, new Set())
    const transformArray = []
    if (allCalculateExpressions) {
      transformArray.concat(
        Array.from(allCalculateExpressions).map((expr) => {
          return {
            calculate: expr,
            as: expr,
          }
        })
      )
    }
    const filterExpression = state.dataset.filter
    if (filterExpression) {
      transformArray.push({
        filter: filterExpression,
      })
    }

    if (
      state.dataset.mode === 'csv + topojson' ||
      state.dataset.mode === 'csv + geojson'
    ) {
      const propertiesWithoutID = state.dataset.geoProperties.filter(
        (prop) => prop !== state.dataset.geoId
      )
      let dataSpec = null
      if (state.dataset.mode === 'csv + topojson') {
        dataSpec = vegaDataTopoJson(
          state.dataset.topojsonFiles[state.dataset.geoIndex].url,
          state.dataset.topojsonObject
        )
      } else {
        dataSpec = vegaDataGeoJson(
          state.dataset.geojsonFiles[state.dataset.geoIndex].url
        )
      }

      // lookup geometry in combined topojson/geojson dataset
      transformArray.push({
        lookup: state.dataset.csvId,
        from: {
          data: dataSpec,
          key: 'properties.'.concat(state.dataset.geoId),
        },
        as: 'geo',
      })

      // lookup remainder of fields in topojson/geojson dataset
      transformArray.push({
        lookup: state.dataset.csvId,
        from: {
          data: dataSpec,
          key: 'properties.'.concat(state.dataset.geoId),
          fields: propertiesWithoutID.map((prop) => `properties.${prop}`),
        },
        as: propertiesWithoutID,
      })
    }
    return transformArray
  },
  vegaSpec(state, getters) {
    let spec = {
      data: getters.vegaData,
    }
    const vegaLayers = getters.vegaLayers
    if (vegaLayers.length === 1) {
      spec = {
        ...spec,
        ...vegaLayers[0],
      }
    } else {
      spec = {
        ...spec,
        layer: vegaLayers,
      }
    }
    const vTransform = getters.vegaTransform
    if (vTransform.length > 0) {
      spec = {
        ...spec,
        transform: vTransform,
      }
    }
    if (
      state.dataset.mode === 'topojson' ||
      state.dataset.mode === 'csv + topojson'
    ) {
      spec = {
        ...spec,
        projection: {
          type: 'mercator',
        },
      }
    }
    return spec
  },
}
