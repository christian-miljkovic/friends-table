import { baseRequest as request } from '../util/request'
import { baseConfig } from '../util/config'
import { ENDPOINTS } from './endpoints'
import { HTTP } from './http'
const { token } = baseConfig

export function getFriends(_key, clientId) {
    return request(`${ENDPOINTS.FRIENDS.ALL.replace(':id', clientId)}?token=${token}`, {
        method: HTTP.GET,
    })
}

export function createFriends(_key, clientId, body) {
    return request(`${ENDPOINTS.FRIENDS.CREATE.replace(':id', clientId)}?token=${token}`, {
        method: HTTP.POST,
        body,
    })
}