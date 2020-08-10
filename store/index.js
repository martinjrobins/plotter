import { columnProperties } from '~/constants/aesthetics'

export const state = () => ({})

function vegaEncoding(geometry) {
  const aesMap = geometry.aesthetics
  return Object.keys(aesMap)
    .filter((key) => {
      return aesMap[key].length > 0
    })
    .reduce((map, key) => {
      map[key] = {
        field: aesMap[key][0].name,
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
        mark: geom.type,
        encoding: vegaEncoding(geom),
      }
    })
  },
  vegaData(state) {
    return {
      url: state.dataset.url,
      name: 'table',
      format: {
        type: 'csv',
      },
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
    return spec
  },
}
