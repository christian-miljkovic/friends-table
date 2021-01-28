export const ENDPOINTS = Object.freeze({
  FRIEND: {
    ALL: '/alfred/v1/friend/:id',
    SINGLE: '/alfred/v1/friend/:friendId/client/:clientId',
    CREATE: '/alfred/v1/friend/:id/create',
    UPDATE: '/alfred/v1/friend/:clientId/update/:friendId',
  },
})
