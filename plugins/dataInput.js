import axios from 'axios'
import { csvFiles, topojsonFiles, geojsonFiles } from '~/constants/data'
import { getDataset } from '~/api/NIVS.js'

const appMode = process.env.NODE_ENV

let inputCsvFiles = csvFiles
let inputTopojsonFiles = topojsonFiles
let inputGeojsonFiles = geojsonFiles

export function getCsvFiles() {
  return inputCsvFiles
}

export function getTopojsonFiles() {
  return inputTopojsonFiles
}

export function getGeojsonFiles() {
  return inputGeojsonFiles
}

function getDatasetsPromise(dataIds) {
  return Promise.all(dataIds.map(getDataset))
}

export async function getDatasets() {
  if (appMode === 'production') {
    try {
      const response = await axios.get('/backends/backends.json')
      const dataIds = JSON.parse(response.data.dataIds)
      const dataFiles = await getDatasetsPromise(dataIds)
      inputCsvFiles = []
      inputTopojsonFiles = []
      inputGeojsonFiles = []
      for (let i = 0; i < dataFiles.length; i++) {
        const file = dataFiles[i]
        if (file.type === 'csv') {
          inputCsvFiles.push(file)
        } else if (file.type === 'topojson') {
          inputTopojsonFiles.push(file)
        } else if (file.type === 'geojson') {
          inputGeojsonFiles.push(file)
        }
      }
    } catch (error) {
      console.log('Error while loading in datafiles' + error)
    }
  }
}
