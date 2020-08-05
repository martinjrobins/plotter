import axios from 'axios'
import * as CSV from 'csv-string'
import { columnProperties } from '~/constants/aesthetics'

export const state = () => ({
  url: 'https://vega.github.io/vega-lite/data/seattle-weather.csv',
  columns: [],
})

function defaultColumn() {
  return columnProperties.reduce((map, prop) => {
    map[prop.name] = prop.default
    return map
  }, {})
}

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
  setColumns(state, value) {
    state.columns = removeDuplicateColumns(value)
  },
  setColumnProperty(state, [index, prop, value]) {
    state.columns[index][prop] = value
  },
  addCalculateField(state, expression) {
    const newField = defaultColumn()
    newField.name = expression
    newField.calculate = expression
    state.columns.push(newField)
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
          const defaultProps = defaultColumn()
          defaultProps.type = guessColumnType(data[1][i])
          return {
            name: columnName,
            ...defaultProps,
          }
        })
        context.commit('setColumns', columns)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
}
