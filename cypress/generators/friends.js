import merge from 'lodash/fp/merge'
import { build, fake } from '@jackfranklin/test-data-bot'

const friendBuilder = build('Friend', {
  fields: {
    data: {
      id: fake((f) => f.random.uuid()),
      client_id: fake((f) => f.random.uuid()),
      first_name: fake((f) => f.name.firstName()),
      last_name: fake((f) => f.name.lastName()),
      birthday: null,
      phone_number: fake((f) => `+${f.phone.phoneNumberFormat(2).replace(/-/gi, '')}`),
      created_at: fake((f) => f.date.past(1).toISOString()),
      updated_at: fake((f) => f.date.past(1).toISOString()),
    },
  },
})

export function createFriend(overrides = {}) {
  const client = friendBuilder()
  console.debug({ client })
  return merge(client, overrides)
}
