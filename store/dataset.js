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
    map[v.name] = v.type
    return map
  }, {})
  const noDuplicatesArray = Object.keys(noDuplicates).map((key) => {
    return {
      name: key,
      type: noDuplicates[key],
    }
  })
  return noDuplicatesArray
}

export const mutations = {
  setArray(state, value) {
    state.array = value
  },
  setAestheticMap(state, [name, value]) {
    state.aestheticsMap[name] = removeDuplicateColumns(value)
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
