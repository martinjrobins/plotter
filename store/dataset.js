import axios from 'axios'
import * as CSV from 'csv-string'
import { aestheticsNames } from '~/constants/aesthetics'

export const state = () => ({
  url: 'https://vega.github.io/vega-lite/data/seattle-weather.csv',
  array: null,
  columns: [],
  aestheticsMap: aestheticsNames.reduce((map, aes) => {
    map[aes] = []
    return map
  }, {}),
})

function removeDuplicateColumns(columns) {
  const noDuplicates = columns.reduce((map, v) => {
    map[v.name] = {
      ...v,
    }
    return map
  }, {})
  const noDuplicatesArray = Object.keys(noDuplicates).map((key) => {
    return {
      ...noDuplicates[key],
    }
  })
  return noDuplicatesArray
}

export const mutations = {
  setUrl(state, value) {
    state.url = value
  },
  setArray(state, value) {
    state.array = value
  },
  setAestheticMap(state, [name, value]) {
    const oldValue = state.aestheticsMap[name]
    const diff = value.filter((x) => !oldValue.includes(x))
    state.aestheticsMap[name] = diff
  },
  setColumns(state, value) {
    state.columns = removeDuplicateColumns(value)
  },
  setColumnType(state, [index, value]) {
    state.columns[index].type = value
  },
  setAestheticColumnType(state, [aesthetic, index, value]) {
    state.aestheticsMap[aesthetic][index].type = value
  },
  setColumnAggregate(state, [index, value]) {
    state.columns[index].aggregate = value
  },
  setAestheticColumnAggregate(state, [aesthetic, index, value]) {
    state.aestheticsMap[aesthetic][index].aggregate = value
  },
  setColumnBin(state, [index, value]) {
    state.columns[index].bin = value
  },
  setAestheticColumnBin(state, [aesthetic, index, value]) {
    state.aestheticsMap[aesthetic][index].bin = value
  },
}

function guessColumnType(data) {
  if (!isNaN(data)) {
    return 'quantitative'
  } else if (!isNaN(Date.parse(data))) {
    return 'temporal'
  } else {
    return 'nominal'
  }
}

export const actions = {
  loadData(context) {
    return axios
      .get(context.state.url)
      .then(function (response) {
        const data = CSV.parse(response.data)
        const columnNames = data[0]
        const columns = columnNames.map((columnName, i) => {
          return {
            name: columnName,
            type: guessColumnType(data[1][i]),
            bin: false,
            aggregate: null,
          }
        })
        context.commit('setColumns', columns)
        context.commit('setArray', data.slice(1))
      })
      .catch(function (error) {
        console.log(error)
      })
  },
}
