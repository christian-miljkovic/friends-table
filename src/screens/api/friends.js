import { baseRequest as request } from '../../util/request'
import { baseConfig } from '../../util/config'
import { ENDPOINTS } from '../../api/endpoints'
import { HTTP } from '../../api/http'
const { token } = baseConfig

export function getFriend(_key, { clientId, friendId }) {
  const path = ENDPOINTS.FRIEND.SINGLE.replace(':friendId', friendId).replace(':clientId', clientId)
  return request(`${path}?token=${token}`, {
    method: HTTP.GET,
  })
}

export function getAllFriends(_key, clientId) {
  return request(`${ENDPOINTS.FRIEND.ALL.replace(':id', clientId)}?token=${token}`, {
    method: HTTP.GET,
  })
}

export function createFriends({ _key, clientId, body }) {
  return request(`${ENDPOINTS.FRIEND.CREATE.replace(':id', clientId)}?token=${token}`, {
    method: HTTP.POST,
    body: { data: body },
  })
}

export function updateFriend({ _key, friendId, clientId, body }) {
  const path = ENDPOINTS.FRIEND.UPDATE.replace(':friendId', friendId).replace(':clientId', clientId)
  return request(`${path}?token=${token}`, {
    method: HTTP.PUT,
    body: { data: body },
  })
}
