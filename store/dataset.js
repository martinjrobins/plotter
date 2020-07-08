import axios from 'axios'
import * as CSV from 'csv-string'
import { aestheticsNames } from '~/constants/aesthetics'

export const state = () => ({
  url: 'https://vega.github.io/vega-lite/data/seattle-weather.csv',
  array: null,
  unassignedColumns: [],
  aestheticsMap: aestheticsNames.reduce((map, aes) => {
    map[aes] = []
    return map
  }, {}),
})

export const mutations = {
  setArray(state, value) {
    state.array = value
  },
  setAestheticMap(state, [name, value]) {
    const noDuplicates = new Set(value)
    state.aestheticsMap[name] = [...noDuplicates]
  },
  setUnassignedColumns(state, value) {
    const noDuplicates = new Set(value)
    state.unassignedColumns = [...noDuplicates]
  },
}

export const actions = {
  loadData(context) {
    return axios
      .get(context.state.url)
      .then(function (response) {
        const data = CSV.parse(response.data)
        context.commit('setUnassignedColumns', data[0])
        context.commit('setArray', data.slice(1))
      })
      .catch(function (error) {
        console.log(error)
      })
  },
}
