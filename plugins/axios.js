import axios from 'axios'
import { setCookieName } from '@/static/js/authHeader'

const appMode = process.env.NODE_ENV
setCookieName(appMode)

if (appMode === 'production') {
  axios.defaults.withCredentials = true
}
