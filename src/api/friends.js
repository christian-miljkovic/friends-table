import { ENDPOINTS } from 'api/endpoints'
import { baseRequest as request } from 'util/request'
import { baseConfig } from 'util/config'
const { token } = baseConfig

export function getFriends(_key, clientId) {
    return request(`${ENDPOINTS.COMPANY.GET_COMPANY}/${clientId}?token=${token}`)
}