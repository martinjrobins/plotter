const appMode = process.env.NODE_ENV
export const localJWT =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb2dpbi1hcHAtand0IiwiZXhwIjoxNjA3MDEwODUzLCJzdWIiOiJjNWU0ODIzYS00ZGI0LTQ4YzEtOWI1ZC1mNmFjN2FhZDdmZjEifQ.O7RLyrsLZ2fe3wRcSKf5wL-agveFZZ4GefC7Yb-Crlw'

if (appMode !== 'production') {
  document.cookie = `dafnijwt=${localJWT}; path=/`
}
