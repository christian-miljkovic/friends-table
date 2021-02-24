export const ENDPOINTS = Object.freeze({
  FRIEND: {
    ALL: '/alfred/v1/friend/:clientId',
    SINGLE: '/alfred/v1/friend/:friendId/client/:clientId',
    CREATE: '/alfred/v1/friend/:clientId/create',
    UPDATE: '/alfred/v1/friend/:clientId/update/:friendId',
    DELETE: '/alfred/v1/friend/:friendId',
  },
})
