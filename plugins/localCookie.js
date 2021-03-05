const appMode = process.env.NODE_ENV
export const localJWT =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb2dpbi1hcHAtand0IiwiZXhwIjoxNjE0OTQyNzc3LCJzdWIiOiJjNWU0ODIzYS00ZGI0LTQ4YzEtOWI1ZC1mNmFjN2FhZDdmZjEifQ.espFCGx0sYisvxIzUtMiXLAlrhFm88rJ-7WjZ5EGbuk'

if (appMode !== 'production') {
  document.cookie = `dafnijwt=${localJWT}; path=/`
}
