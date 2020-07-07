import axios from 'axios'
import * as CSV from 'csv-string'
import { aestheticsNames } from '~/constants/aesthetics'

export const state = () => ({
  url: 'https://vega.github.io/vega-lite/data/seattle-weather.csv',
  array: null,
  unassignedColumns: [],
  aestheticsMap: aestheticsNames.reduce((map, aes) => {
    map[aes] = ['test', 'test2']
    return map
  }, {}),
})

export const mutations = {
  setArray(state, value) {
    state.array = value
  },
  setAestheticMap(state, { name, value }) {
    state.aestheticsMap[name] = value
  },
  setUnassignedColumns(state, value) {
    state.unassignedColumnNamescolumnNames = value
  },
}

export const actions = {
  loadData(context) {
    console.log(context.state.url)
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
