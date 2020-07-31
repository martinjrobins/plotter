export const state = () => ({})

export const getters = {
  vegaEncoding(state) {
    const aesMap = state.dataset.aestheticsMap
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
  },
  vegaLayers(state, getters) {
    const geometries = state.geometries.geometries
    return geometries.map((geom) => {
      return {
        mark: geom.type,
        encoding: getters.vegaEncoding,
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
