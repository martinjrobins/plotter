const appMode = process.env.NODE_ENV
export const localJWT =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb2dpbi1hcHAtand0IiwiZXhwIjoxNjA1NzIwODkyLCJzdWIiOiJjNWU0ODIzYS00ZGI0LTQ4YzEtOWI1ZC1mNmFjN2FhZDdmZjEifQ.gwhgM_JDqdWkCABsTpXsvsAG83wBXkDBO5gGFTWezvc'

if (appMode !== 'production') {
  console.log('WEre not in production!!!!!!!')
  document.cookie = `dafnijwt=${localJWT}; path=/`
}
