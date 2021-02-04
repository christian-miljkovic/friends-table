import { ENDPOINTS } from '../../src/api/endpoints'
import { convertToCamelCase } from '../../src/util/transformers'
import { v4 as uuidv4 } from 'uuid'

const clientUUID = uuidv4()
const token = Cypress.env('REACT_APP_API_TOKEN')

const hasFriendsPresent = (friends = []) => {
  friends.map((friend, index) => {
    cy.findByText(friend.firstName)
    cy.findByLabelText(`row-${index}`).within(() => {
      cy.findByLabelText(/lastname-cell/i).contains(friend.lastName)
      cy.findByLabelText(/birthday-cell/i).contains(friend.birthday)
      cy.findByLabelText(/phonenumber-cell/i).contains(friend.phoneNumber)
    })
  })
}

describe('Friends Table', () => {
  it('should be able to get all friends for a client', () => {
    cy.server()
    cy.fixture('friendsData').as('friendsJson')
    cy.route(`${ENDPOINTS.FRIEND.ALL.replace(':id', clientUUID)}?token=${token}`, '@friendsJson').as('friends')
    cy.visit(`/table/${clientUUID}`)

    cy.wait('@friends').then(({ response }) => {
      const friends = response?.body?.data
      hasFriendsPresent(convertToCamelCase(friends))
    })
  })
})
