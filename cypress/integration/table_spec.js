import { ENDPOINTS } from '../../src/api/endpoints';
import { v4 as uuidv4 } from 'uuid'

const clientUUID = uuidv4()
const token = Cypress.env("REACT_APP_API_TOKEN")

const hasFriendsPresent = (friends = []) => {
  friends.map((friend, index) => {
    cy.findByLabelText(`row-${index}`).within(() => {
      cy.findByLabelText('firstName-cell').contains(friend.first_name)
      cy.findByLabelText('lastName-cell').contains(friend.last_name)
      cy.findByLabelText('birthday-cell').contains(friend.birthday)
      cy.findByLabelText('phoneNumber-cell').contains(friend.phone_number)
    })
  })
  
}


describe('Friends Table', () => {
  it('should be able to get all friends for a client', () => {
    cy.server()
    cy.fixture('friendsData').as('friendsJson')
    // have to do a custom polyfill to change fetch to XHR see amber
    cy.route(`${ENDPOINTS.FRIENDS.ALL.replace(':id', clientUUID)}?token=${token}`, '@friendsJson').as('friends')
    cy.visit(`/table/${clientUUID}`)

    cy.wait('@friends').then(({ response }) => {
      // go convert the base request you're using to have camelCase next
      const friends = response?.body?.data
      hasFriendsPresent(friends)
    })
    
  });
});
