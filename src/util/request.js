import { baseConfig } from './config'
import { HTTP } from '../api/http'
import { convertToCamelCase } from './transformers'

const { apiUrl } = baseConfig

export async function baseRequest(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  const method = options.method || HTTP.GET
  const body = options.body && JSON.stringify(options.body)

  const response = await fetch(`${apiUrl}${path}`, {
    ...options,
    headers,
    method,
    body,
  })
  if (response.ok) {
    const responseJson = await response.json()
    return convertToCamelCase(responseJson)
  }

  throw Error
}
