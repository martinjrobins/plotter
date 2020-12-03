import axios from 'axios'

const appMode = process.env.NODE_ENV

let instanceID = null

if (appMode === 'production') {
  instanceID = process.env.INSTANCE_ID
} else {
  instanceID = 'ea76a4ce-aac2-4d73-bc39-b8dc026c8ed4'
}

export function getInstanceId() {
  return instanceID
}

export async function setDefaultInstanceId() {
  if (appMode === 'production') {
    try {
      const response = await axios.get('/backends/backends.json')
      console.log('got', response.data)
      instanceID = response.data.instanceId
    } catch (error) {
      console.log('Error while loading settings from server' + error)
    }
  }
}

export function setInstanceId(value) {
  instanceID = value
}
