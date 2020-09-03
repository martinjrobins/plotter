import { columnProperties } from '~/constants/aesthetics'

export const state = () => ({})

function vegaMark(geometry) {
  return {
    type: geometry.type,
    ...geometry.options,
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

export const actions = {
  syncToBackend(context) {
    const presignedUrl =
      'https://play.min.io/presigned-test-106a2138-0655-423a-8811-21d88f62476e/state?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=Q3AM3UQ867SPQQA43P2F%2F20200903%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200903T123846Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=74311ae382360011e1b41620657009dd196359b32d74d6a660ee3f3fcba18287'
    console.log(presignedUrl)
    return fetch(presignedUrl, {
      method: 'PUT',
      body: JSON.stringify(context.state),
      headers: { 'Content-Type': 'application/json' },
    }).catch((error) => console.error(error))
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
    name: 'map',
    format: {
      type: 'topojson',
      feature: geoFeature,
    },
  }
}

function vegaDataGeoJson(URL) {
  return {
    url: URL,
    name: 'map',
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
        state.dataset.geoUrl,
        state.dataset.topojsonObject
      )
    } else if (state.dataset.mode === 'geojson') {
      return vegaDataGeoJson(state.dataset.geoUrl)
    } else {
      return {
        url: state.dataset.csvUrl,
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
    if (state.dataset.mode === 'csv + topojson') {
      transformArray.push({
        lookup: state.dataset.csvId,
        from: {
          data: vegaDataTopoJson(
            state.dataset.geoUrl,
            state.dataset.topojsonObject
          ),
          key: 'properties.'.concat(state.dataset.geoId),
        },
        as: 'geo',
      })
    } else if (state.dataset.mode === 'csv + geojson') {
      transformArray.push({
        lookup: state.dataset.csvId,
        from: {
          data: vegaDataGeoJson(state.dataset.geoUrl),
          key: 'properties.'.concat(state.dataset.geoId),
        },
        as: 'geo',
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
