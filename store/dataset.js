import axios from 'axios'
import * as CSV from 'csv-string'
import { columnProperties } from '~/constants/aesthetics'
import { csvFiles, topojsonFiles } from '~/constants/data'

export const state = () => ({
  csvUrl: csvFiles[0].url,
  loadCsvProgress: 0,
  topojsonUrl: topojsonFiles[0].url,
  loadTopojsonProgress: 0,
  topojsonProperties: [],
  topojsonProperty: '',
  topojsonObject: '',
  csvProperty: '',
  columns: [],
  columnsInDataFile: [],
  filter: null,
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
  setLoadCsvProgress(state, value) {
    state.loadCsvProgress = value
  },
  setLoadTopojsonProgress(state, value) {
    state.loadTopojsonProgress = value
  },
  setCsvUrl(state, value) {
    state.csvUrl = value
  },
  setTopjsonUrl(state, value) {
    state.topojsonUrl = value
  },
  setTopjsonProperties(state, value) {
    state.topojsonProperties = value
  },
  setTopjsonProperty(state, value) {
    state.topojsonProperty = value
  },
  setTopjsonObject(state, value) {
    state.topojsonObject = value
  },
  setCsvProperty(state, value) {
    console.log('setCsvProperty', value)
    state.csvProperty = value
  },
  setFilter(state, value) {
    state.filter = value
  },
  setColumns(state, value) {
    state.columns = removeDuplicateColumns(value)
  },
  setColumnsInDatafile(state, value) {
    state.columnsInDataFile = removeDuplicateColumns(value)
  },
  addColumn(state, name) {
    const newColumn = state.columnsInDataFile.filter((c) => {
      return c.name === name
    })[0]
    state.columns.push(newColumn)
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
  removeColumn(state, index) {
    state.columns.splice(index, 1)
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
  loadCsvData(context) {
    return axios({
      methods: 'get',
      url: context.state.csvUrl,
      onDownloadProgress(progressEvent) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        context.commit('setLoadCsvProgress', percentCompleted)
      },
    })
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
        context.commit('setColumns', columns.slice(0, 5))
        context.commit('setColumnsInDatafile', columns)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  loadTopjsonData(context) {
    return axios({
      methods: 'get',
      url: context.state.topojsonUrl,
      onDownloadProgress(progressEvent) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        context.commit('setLoadTopojsonProgress', percentCompleted)
      },
    })
      .then(function (response) {
        const object = Object.keys(response.data.objects)[0]
        const properties = Object.keys(
          response.data.objects[object].geometries[0].properties
        )
        context.commit('setTopjsonObject', object)
        context.commit('setTopjsonProperties', properties)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
}
