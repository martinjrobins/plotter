const appMode = process.env.NODE_ENV
export const localJWT =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb2dpbi1hcHAtand0IiwiZXhwIjoxNjA2ODM5NzU0LCJzdWIiOiJjNWU0ODIzYS00ZGI0LTQ4YzEtOWI1ZC1mNmFjN2FhZDdmZjEifQ.SXYNZGqyTePGgosPsCn0i5Vp4RXfa_WF3RdZgKZNVSs'

if (appMode !== 'production') {
  document.cookie = `dafnijwt=${localJWT}; path=/`
}
