import { localJWT } from '@/plugins/localCookie'

let cookieName = ''

export function setCookieName(appMode) {
  if (appMode === 'production') {
    cookieName = '__Secure-dafnijwt'
  } else {
    cookieName = 'dafnijwt'
  }
}

export function getAuthHeader() {
  const cookies = document.cookie.split(';')
  const cookie = cookies.find((c) => {
    const trimmed = c.trim()
    return trimmed.startsWith(cookieName)
  })
  const jwt = cookie ? cookie.split('=').pop() : localJWT
  return `JWT ${jwt}`
}
