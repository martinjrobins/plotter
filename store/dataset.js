import axios from 'axios'
import * as CSV from 'csv-string'
import { columnProperties } from '~/constants/aesthetics'

export const state = () => ({
  url: 'https://vega.github.io/vega-lite/data/seattle-weather.csv',
  columns: [],
})

function defaultColumn() {
  return Object.keys(columnProperties).reduce((map, propName) => {
    const prop = columnProperties[propName]
    if ('default' in prop) {
      map[propName] = prop.default
      return map
    } else {
      return Object.keys(prop).reduce((innerMap, innerPropName) => {
        const prop = columnProperties[propName][innerPropName]
        const fullPropName = `${propName}_${innerPropName}`
        innerMap[fullPropName] = prop.default
        return innerMap
      }, map)
    }
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
