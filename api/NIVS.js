import axios from 'axios'
import { getAuthHeader } from '@/static/js/authHeader'
import { getInstanceId } from '@/static/js/instanceId'

const NIVSapiUrl = 'https://dafni-nivs-api.secure.dafni.rl.ac.uk'
const stateFileName = 'state.json'

const instanceId = getInstanceId()
const authHeader = getAuthHeader()
const builderId = 'a734e3e7-ca10-41f2-9638-a19710d6430d'

function setupSyncStore() {
  return Promise.all([getPresignedURLforGET(), getPresignedURLforPUT()])
}

function getPresignedURLforGET() {
  return axios
    .get(NIVSapiUrl + '/instances/' + instanceId + '/state-sync', {
      headers: {
        Authorization: authHeader,
      },
    })
    .then((response) => {
      const listOfFiles = response.data
      const correctFile = listOfFiles.find((e) => e.file_name === stateFileName)
      if (correctFile) {
        return correctFile.presigned_url
      }
    })
}

function getPresignedURLforPUT() {
  return axios
    .post(
      NIVSapiUrl + '/instances/' + instanceId + '/state-sync',
      {
        files: [stateFileName],
      },
      {
        headers: {
          Authorization: authHeader,
        },
      }
    )
    .then((response) => {
      return response.data[0].presigned_url
    })
}

function uploadState(presignedUrl, state) {
  return fetch(presignedUrl, {
    method: 'PUT',
    body: JSON.stringify(state),
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (!response.ok) {
      throw response.statusText
    }
  })
}

function downloadState(presignedUrl) {
  return fetch(presignedUrl, {
    method: 'GET',
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (!response.ok) {
      throw response.statusText
    }
    return response.json()
  })
}

function downloadPlot(plotId) {
  return axios
    .get(NIVSapiUrl + '/plots/' + plotId, {
      headers: {
        Authorization: authHeader,
      },
    })
    .then((response) => {
      const presignedUrl = response.data.presigned_urls[0].presigned_url
      return fetch(presignedUrl, {
        method: 'GET',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'image/png',
        },
      })
    })
    .then((response) => {
      return response.data
    })
}

function uploadPlot(plotTitle, plotDescription, filename, file) {
  let plotId = null
  console.log('authHeader', authHeader)
  return axios
    .post(
      NIVSapiUrl + '/plots/',
      {
        title: plotTitle,
        description: plotDescription,
        files: [filename],
        visualisation_instance: instanceId,
      },
      {
        headers: {
          Authorization: authHeader,
        },
      }
    )
    .then((postResponse) => {
      console.log('postResponse', postResponse)
      const presignedUrl = postResponse.data.presigned_urls[0].presigned_url
      plotId = postResponse.data.id
      return fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          Authorization: authHeader,
          'Content-Type': 'image/png',
        },
      })
    })
    .then((putResponse) => {
      if (!putResponse.ok) {
        throw putResponse.statusText
      }
      return axios.patch(
        NIVSapiUrl + '/plots/' + plotId,
        {
          data_committed: true,
        },
        {
          headers: {
            Authorization: authHeader,
          },
        }
      )
    })
    .then(() => {
      return plotId
    })
}

function downloadTemplate(templateId) {
  return axios
    .get(NIVSapiUrl + '/templates/' + templateId, {
      headers: {
        Authorization: authHeader,
      },
    })
    .then((response) => {
      const presignedUrl = response.data.presigned_urls[0].presigned_url
      return fetch(presignedUrl, {
        method: 'GET',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json',
        },
      })
    })
    .then((response) => {
      return response.json()
    })
}

function uploadTemplate(
  templateTitle,
  templateDescription,
  filename,
  template
) {
  let templateId = null
  return axios
    .post(
      NIVSapiUrl + '/templates/',
      {
        title: templateTitle,
        description: templateDescription,
        files: [filename],
        visualisation_builder: builderId,
      },
      {
        headers: {
          Authorization: authHeader,
        },
      }
    )
    .then((postResponse) => {
      const presignedUrl = postResponse.data.presigned_urls[0].presigned_url
      templateId = postResponse.data.id
      return fetch(presignedUrl, {
        method: 'PUT',
        body: JSON.stringify(template),
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json',
        },
      })
    })
    .then((putResponse) => {
      if (!putResponse.ok) {
        throw putResponse.statusText
      }
      return axios.patch(
        NIVSapiUrl + '/templates/' + templateId,
        {
          data_committed: true,
        },
        {
          headers: {
            Authorization: authHeader,
          },
        }
      )
    })
    .then(() => {
      return templateId
    })
}

export {
  setupSyncStore,
  uploadState,
  downloadState,
  uploadPlot,
  downloadPlot,
  uploadTemplate,
  downloadTemplate,
}
