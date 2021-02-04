import isUndefined from 'lodash/isUndefined'
import merge from 'lodash/fp/merge'
import { build, fake } from '@jackfranklin/test-data-bot'

const friendBuilder = build('Friend', {
  fields: {
    id: fake((f) => f.random.uuid()),
    client_id: fake((f) => f.random.uuid()),
    first_name: fake((f) => f.name.firstName()),
    last_name: fake((f) => f.name.lastName()),
    birthday: null,
    phone_number: fake((f) => `+${f.phone.phoneNumberFormat(2).replace(/-/gi, '')}`),
    created_at: fake((f) => f.date.past(1).toISOString()),
    updated_at: fake((f) => f.date.past(1).toISOString()),
  },
})

export function createFriend(overrides = {}, options = {}) {
  const number = isUndefined(options.number) ? 1 : options.number

  const friend = isUndefined(options.number)
    ? { data: friendBuilder() }
    : {
        data: Array(number)
          .fill()
          .map(() => friendBuilder()),
      }

  return merge(friend, overrides)
}
