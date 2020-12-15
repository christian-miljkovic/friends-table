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
            birthday: '01/24/1995',
            phone_number: '12035724630',
          },
        ],
      }),
    )
  }),
]
