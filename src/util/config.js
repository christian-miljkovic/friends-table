import runtimeEnv from '@mars/heroku-js-runtime-env'

const env = runtimeEnv()

export const baseConfig = {
  apiUrl: env.REACT_APP_API_URL,
  token: env.REACT_APP_API_TOKEN,
}
