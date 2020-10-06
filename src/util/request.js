import { baseConfig } from 'util/config'
import { HTTP } from 'constants/http'

const { apiUrl } = baseConfig

export async function baseRequest(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  const method = options.method || HTTP.GET
  const body = options.body && JSON.stringify(options.body)

  const response = await fetch(`${apiUrl}${path}`, { ...options, headers, method, body })
  if (response.ok) return response.json()

  throw Error
}

const parseResponse = (resp) =>
  resp
    .then((resp) => checkStatus(resp))
    .then((resp) => resp.text())
    .then((text) => (text ? JSON.parse(text) : {}))
    .then((json) => json)
    .catch((error) => {
      throw error
    })


const checkStatus = (resp) => {
  if (resp.status >= 200 && resp.status < 300) return resp
  return resp.text().then((text) => {
    let json = {}
    try {
      json = JSON.parse(text)
    } catch (e) {
      json = {}
    }
    const error = { ...json, status: resp.status, statusText: resp.statusText }
    return Promise.reject(error)
  })
}