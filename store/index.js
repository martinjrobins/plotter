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
      const isBin = aesMap[key][0].bin
      if (isBin) {
        map[key].bin = isBin
      }
      const aggregateOp = aesMap[key][0].aggregate
      if (aggregateOp) {
        map[key].aggregate = aggregateOp
      }
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
  vegaSpec(state, getters) {
    return Object.assign(
      {},
      { data: getters.vegaData },
      { layer: getters.vegaLayers }
    )
  },
}
