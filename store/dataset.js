import axios from 'axios'
import * as CSV from 'csv-string'
import { columnProperties } from '~/constants/aesthetics'
import { csvFiles, geoFiles } from '~/constants/data'

export const state = () => ({
  mode: 'csv',
  csvUrl: csvFiles[0].url,
  loadCsvProgress: 0,
  geoUrl: geoFiles[0].url,
  loadGeoProgress: 0,
  geoProperties: [],
  geoType: 'topojson',
  geoId: '',
  topojsonObject: '',
  preLookupAgregate: '',
  csvProperty: '',
  columns: [],
  columnsInDataFile: [],
  filter: null,
})

export function defaultColumn() {
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
  setMode(state, value) {
    state.mode = value
  },
  setLoadCsvProgress(state, value) {
    state.loadCsvProgress = value
  },
  setLoadGeoProgress(state, value) {
    state.loadGeoProgress = value
  },
  setCsvUrl(state, value) {
    state.csvUrl = value
  },
  addGeoField(state) {
    const geoField = defaultColumn()
    geoField.name = 'geo'
    geoField.type = 'geojson'
    state.columns.unshift(geoField)
  },
  setGeoUrl(state, value) {
    state.geoUrl = value
  },
  setGeoProperties(state, value) {
    state.geoProperties = value
  },
  setGeoId(state, value) {
    state.geoId = value
  },
  setTopjsonObject(state, value) {
    state.topojsonObject = value
  },
  setPrelookupAgregate(state, value) {
    state.preLookupAgregate = value
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
  loadTopojsonData({ commit, state }) {
    return axios({
      methods: 'get',
      url: state.topojsonUrl,
      onDownloadProgress(progressEvent) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        commit('setLoadTopojsonProgress', percentCompleted)
      },
    })
      .then(function (response) {
        const object = Object.keys(response.data.objects)[0]
        const properties =
          response.data.objects[object].geometries[0].properties
        const propertyNames = Object.keys(properties)
        commit('setTopjsonObject', object)
        commit('setTopjsonProperties', propertyNames)
        if (state.mode === 'topojson') {
          const columns = propertyNames.map((columnName) => {
            const defaultProps = defaultColumn()
            defaultProps.type = guessColumnType(properties[columnName])
            return {
              name: columnName,
              ...defaultProps,
            }
          })
          commit('setColumns', columns.slice(0, 5))
          commit('setColumnsInDatafile', columns)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  loadGeoJsonData({ commit, state }) {
    return axios({
      methods: 'get',
      url: state.topojsonUrl,
      onDownloadProgress(progressEvent) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        commit('setLoadTopojsonProgress', percentCompleted)
      },
    })
      .then(function (response) {
        const object = Object.keys(response.data.objects)[0]
        const properties =
          response.data.objects[object].geometries[0].properties
        const propertyNames = Object.keys(properties)
        commit('setTopjsonObject', object)
        commit('setTopjsonProperties', propertyNames)
        if (state.mode === 'topojson') {
          const columns = propertyNames.map((columnName) => {
            const defaultProps = defaultColumn()
            defaultProps.type = guessColumnType(properties[columnName])
            return {
              name: columnName,
              ...defaultProps,
            }
          })
          commit('setColumns', columns.slice(0, 5))
          commit('setColumnsInDatafile', columns)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
}
