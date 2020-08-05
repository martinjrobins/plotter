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
          if (prop.parent) {
            if (map[key][prop.parent]) {
              map[key][prop.parent] = {}
              map[key][prop.parent][prop.name] = value
            }
          } else if (prop.transform) {
            // do nothing
          } else {
            map[key][prop.name] = value
          }
        }
        return map
      }, map)
      return map
    }, {})
}

export const getters = {
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
    if (allCalculateExpressions) {
      return Array.from(allCalculateExpressions).map((expr) => {
        return {
          calculate: expr,
          as: expr,
        }
      })
    }
  },
  vegaSpec(state, getters) {
    let spec = {
      data: getters.vegaData,
    }
    const layers = getters.vegaLayers
    if (layers.length === 1) {
      spec = {
        ...spec,
        ...layers[0],
      }
    } else {
      spec = {
        ...spec,
        layers: layers[0],
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
