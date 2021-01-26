import { rest } from 'msw'
import { baseConfig } from '../util/config'
const { apiUrl, token } = baseConfig

export const handlers = [
  rest.get(`${apiUrl}/alfred/v1/friend/123?token=${token}`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: [
          {
            id: '123',
            first_name: 'Christian',
            last_name: 'Miljkovic',
            birthday: '1995-01-24',
            phone_number: '+12035724630',
          },
          {
            id: '123',
            first_name: 'Erick',
            last_name: 'Miljkovic',
            birthday: '2001-03-11',
            phone_number: '+12034004630',
          },
        ],
      }),
    )
  }),
  rest.get(`${apiUrl}/alfred/v1/friend/321/client/123?token=${token}`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          id: '123',
          client_id: '321',
          first_name: 'Christian',
          last_name: 'Miljkovic',
          birthday: null,
          phone_number: '+12035724630',
        },
      }),
    )
  }),
  rest.post(`${apiUrl}/alfred/v1/friend/123/create?token=${token}`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: [
          {
            birthday: '1995-01-24',
            client_id: '7f51bc99-6b6e-4ba7-9cd7-1d2c3b89305d',
            created_at: '2020-12-23',
            first_name: 'Christian',
            id: 'a1995968-246c-41aa-91ae-238c78e326a9',
            last_name: 'Miljkovic',
            phone_number: '+12035724630',
            updated_at: '2020-12-23',
          },
        ],
      }),
    )
  }),
]
