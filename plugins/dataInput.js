import { csvFiles, geojsonFiles, topojsonFiles } from '~/constants/data'
import axios from 'axios'
import { getDatasetUrlAndType } from '~/api/NIVS.js'

const appMode = process.env.NODE_ENV

let inputCsvFiles = csvFiles
let inputTopojsonFiles = topojsonFiles
let inputGeojsonFiles = geojsonFiles
let dataIds = [
  '36f1ff6c-99f6-49f4-a61a-665c3a8972e7',
  '384d5c4f-6294-436f-b38e-23996b49d082',
  '8e30689e-2f39-4a17-900b-373c8074d191',
  '9bd20025-95f0-475b-990b-6b4428122541',
  '495dc0ae-a1fc-49db-8a04-0136b71ca0fb',
  '83f32bfb-937d-4029-b206-d8bbf3a8d004',
]
dataIds = [
  '36f1ff6c-99f6-49f4-a61a-665c3a8972e7',
  '83f32bfb-937d-4029-b206-d8bbf3a8d004',
]

export function getCsvFiles() {
  return inputCsvFiles
}

export function getTopojsonFiles() {
  return inputTopojsonFiles
}

export function getGeojsonFiles() {
  return inputGeojsonFiles
}

export async function getDatasets() {
  if (appMode === 'production') {
    try {
      const response = await axios.get('/backends/backends.json')
      dataIds = response.data.dataIds
      console.log('in production: got dataIds: ', dataIds)
    } catch (error) {
      console.log('Error while loading in data-ids: ' + error)
    }
  }
  try {
    const dataFiles = await getDatasetUrlAndType(dataIds)
    inputCsvFiles = []
    inputTopojsonFiles = []
    inputGeojsonFiles = []
    for (let i = 0; i < dataFiles.length; i++) {
      const file = dataFiles[i]
      const extension = file.filename.split('.').pop()
      if (extension === 'csv') {
        inputCsvFiles.push(file)
      } else if (extension === 'topojson') {
        inputTopojsonFiles.push(file)
      } else if (extension === 'geojson') {
        inputGeojsonFiles.push(file)
      }
    }
  } catch (error) {
    console.log('Error while loading in datafiles' + error)
  }
}
