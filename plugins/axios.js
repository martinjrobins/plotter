import axios from 'axios'

const appMode = process.env.NODE_ENV

if (appMode === 'production') {
  axios.defaults.withCredentials = true
}
