import axios from 'axios'
import { getAuthHeader, setCookieName } from '@/static/js/authHeader'

const appMode = process.env.NODE_ENV
setCookieName(appMode)

if (appMode === 'production') {
  axios.defaults.withCredentials = true
}

axios.defaults.headers.common.Authorization = getAuthHeader()
