import { createFriend } from '../generators/friends'
import { ENDPOINTS } from '../../src/api/endpoints'
import { HTTP } from '../../src/api/http'
import { convertToCamelCase } from '../../src/util/transformers'
import dayjs from 'dayjs'

const token = Cypress.env('REACT_APP_API_TOKEN')

describe('Friends Table', () => {
  beforeEach(() => {
    cy.server()
    const friendData = convertToCamelCase(
      createFriend({ data: [{ birthday: '1995-01-24' }, { birthday: '200-01-24' }] }, { number: 2 }),
    )
    const { clientId } = friendData.data[0]
    cy.route(HTTP.GET, `${ENDPOINTS.FRIEND.ALL.replace(':id', clientId)}?token=${token}`, friendData).as('friends')
    cy.visit(`/table/${clientId}`)
  })

  it('should be able to get all friends for a client', () => {
    cy.wait('@friends').then(({ response }) => {
      const friends = response.body.data
      cy.findByRole('table', { name: /caption table/i }).within(() => {
        friends.forEach((friend, index) => {
          const { firstName, lastName, birthday, phoneNumber } = friend
          const formattedBirthday = dayjs(birthday).format('MM-DD-YYYY')
          cy.findByLabelText(`row-${index}`).within(() => {
            cy.findByText(firstName).should('be.visible')
            cy.findByText(lastName).should('be.visible')
            cy.findByText(formattedBirthday).should('be.visible')
            cy.findByText(phoneNumber).should('be.visible')
          })
        })
      })
    })
  })
})
