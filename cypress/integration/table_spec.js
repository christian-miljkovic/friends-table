import { ENDPOINTS } from '../../src/api/endpoints';
import { HTTP } from '../../src/api/http'
import { convertToCamelCase } from '../../src/util/transformers'
import { v4 as uuidv4 } from 'uuid'

const clientUUID = uuidv4()
const token = Cypress.env("REACT_APP_API_TOKEN")

const hasFriendsPresent = (friends = []) => {
  friends.map((friend, index) => {
    cy.findByText(friend.firstName)
    cy.findByLabelText(`row-${index}`).within(() => {    
      cy.findByLabelText(/lastname\-cell/i).contains(friend.lastName)
      cy.findByLabelText(/birthday\-cell/i).contains(friend.birthday)
      cy.findByLabelText(/phonenumber\-cell/i).contains(friend.phoneNumber)
    })
  })
}

describe('Friends Table', () => {
  it('should be able to get all friends for a client', () => {
    cy.server()
    cy.fixture('friendsData').as('friendsJson')
    cy.route(`${ENDPOINTS.FRIENDS.ALL.replace(':id', clientUUID)}?token=${token}`, '@friendsJson').as('friends')
    cy.visit(`/table/${clientUUID}`)

    cy.wait('@friends').then(({ response }) => {
      const friends = response?.body?.data
      hasFriendsPresent(convertToCamelCase(friends))
    })  
  })
  it('should be able to get create one friend for a client', () => {
    cy.server()
    cy.fixture('createFriendsData').as('createFriendsJson')
    cy.route(`${ENDPOINTS.FRIENDS.ALL.replace(':id', clientUUID)}?token=${token}`, '')
    cy.route(HTTP.POST, `${ENDPOINTS.FRIENDS.CREATE.replace(':id', clientUUID)}?token=${token}`, '@createFriendsJson').as('newFriends')
    cy.visit(`/table/${clientUUID}`)

    cy.findByLabelText('edit-button').should('be.visible').click()
    cy.findByLabelText(/firstname\-cell/i).type('Christian')
    cy.findByLabelText(/lastname\-cell/i).type('Miljkovic')
    cy.findByLabelText(/birthday\-cell/i).type('01-24-1995')
    cy.findByLabelText(/phonenumber\-cell/i).type('+12035724630')
    cy.findByLabelText('done-button').should('be.visible').click()
    cy.findByLabelText('upload-button').should('be.visible').click()

    cy.wait('@newFriends').then(({ response }) => {
      const friends = response?.body?.data
      hasFriendsPresent(convertToCamelCase(friends))
    }) 
  })
})
