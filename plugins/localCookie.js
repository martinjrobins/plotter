const appMode = process.env.NODE_ENV
export const localJWT =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb2dpbi1hcHAtand0IiwiZXhwIjoxNjE0ODkxMjA0LCJzdWIiOiJjNWU0ODIzYS00ZGI0LTQ4YzEtOWI1ZC1mNmFjN2FhZDdmZjEifQ.NTXJpWNejCsOvGV3qhle82Z5IkfJHVf8HPnRZHwT1WM'

if (appMode !== 'production') {
  document.cookie = `dafnijwt=${localJWT}; path=/`
}
