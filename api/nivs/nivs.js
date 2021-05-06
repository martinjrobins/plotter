import axios from 'axios'
import { getAuthHeader } from '@/plugins/authHeader'
import { getInstanceId } from '@/plugins/instanceId'
import { backendsPromise, visualisationApiUrl, discoveryApiUrl } from '~/api/backends/'

// const visualisationApiUrl = 'https://dafni-nivs-api.secure.dafni.rl.ac.uk'
// const searchURL = 'https://dafni-search-and-discovery-api.secure.dafni.rl.ac.uk'
const stateFileName = 'state.json'

const instanceId = getInstanceId()
const authHeader = getAuthHeader()
const builderId = 'a734e3e7-ca10-41f2-9638-a19710d6430d'

async function getDatasetUrlAndType(ids) {
  // console.log({ Authorization: authHeader })
  await backendsPromise
  return axios
    .post(
      discoveryApiUrl + '/version/metadata/',
      {
        version_uuids: ids,
      },
      {
        headers: {
          Authorization: authHeader,
        },
      }
    )
    .then((response) => {
      const urlsAndTypes = ids.map((id) => {
        return {
          filename: response.data[id]['dcat:distribution'][0]['spdx:fileName'],
          url: response.data[id]['dcat:distribution'][0]['dcat:downloadURL'],
          type: response.data[id]['dcat:distribution'][0]['dcat:mediaType'],
        }
      })
      return urlsAndTypes
    })
}

async function setupSyncStore() {
  await Promise.all([getPresignedURLforGET(), getPresignedURLforPUT()])
}

async function getPresignedURLforGET() {
  await backendsPromise
  return axios
    .get(visualisationApiUrl + '/instances/' + instanceId + '/state-sync', {
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

async function getPresignedURLforPUT() {
  await backendsPromise
  return axios
    .post(
      visualisationApiUrl + '/instances/' + instanceId + '/state-sync',
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

async function uploadState(presignedUrl, state) {
  await backendsPromise
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

async function downloadState(presignedUrl) {
  await backendsPromise
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

async function downloadPlot(plotId) {
  await backendsPromise
  return axios
    .get(visualisationApiUrl + '/plots/' + plotId, {
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

async function uploadPlot(plotTitle, plotDescription, filename, file) {
  await backendsPromise
  let plotId = null
  return axios
    .post(
      visualisationApiUrl + '/plots/',
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
        visualisationApiUrl + '/plots/' + plotId,
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

async function downloadTemplate(templateId) {
  await backendsPromise
  return axios
    .get(visualisationApiUrl + '/templates/' + templateId, {
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

async function uploadTemplate(
  templateTitle,
  templateDescription,
  filename,
  template
) {
  await backendsPromise
  let templateId = null
  return axios
    .post(
      visualisationApiUrl + '/templates/',
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
        visualisationApiUrl + '/templates/' + templateId,
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
  getDatasetUrlAndType,
}
