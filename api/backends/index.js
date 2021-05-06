import axios from 'axios'

/* eslint-disable */
export let visualisationApiUrl = process.env.visualisationApiUrl
export let loginUrl = process.env.loginUrl
export let dssauthUrl = process.env.dssauthUrl
export let discoveryApiUrl = process.env.discoveryApiUrl
export let environment = process.env.environment

const appMode = process.env.NODE_ENV
if (appMode !== 'production') {
  visualisationApiUrl = "https://dafni-nivs-nivs-api-review-dev-hkw12f.staging.dafni.rl.ac.uk"
  loginUrl = "https://dafni-dss-login-app-jwt-review-dev-h79t6w.staging.dafni.rl.ac.uk"
  dssauthUrl = "https://dafni-dss-dssauth-review-dev-o2yn5p.staging.dafni.rl.ac.uk"
  discoveryApiUrl = "https://dafni-search-and-discovery-api-review-dev-4jxwt5.staging.dafni.rl.ac.uk"
  environment = "dev"
}

async function backends() {
  try {
    const response = await axios.get('/backends/backends.json')
    visualisationApiUrl = response.data.visualisationApiUrl
    loginUrl = response.data.loginUrl
    dssauthUrl = response.data.dssauthUrl
    discoveryApiUrl = response.data.discoveryApiUrl
    environment = response.data.node_env
  } catch (error) {
    console.log('Error while loading settings from server' + error)
  }
}

export let backendsPromise = backends()
