import { createFriend } from '../generators/friends'
import { ENDPOINTS } from '../../src/api/endpoints'
import { HTTP } from '../../src/api/http'
import { convertToCamelCase } from '../../src/util/transformers'

const token = Cypress.env('REACT_APP_API_TOKEN')

describe('Friends Form', () => {
  beforeEach(() => {
    cy.server()
    const friendData = convertToCamelCase(createFriend())
    const { clientId, id: friendId } = friendData.data
    const getPath = ENDPOINTS.FRIEND.SINGLE.replace(':clientId', clientId).replace(':friendId', friendId)
    const putPath = ENDPOINTS.FRIEND.UPDATE.replace(':clientId', clientId).replace(':friendId', friendId)
    cy.route(HTTP.GET, `${getPath}?token=${token}`, friendData).as('friend')
    cy.route(HTTP.PUT, `${putPath}?token=${token}`, friendData).as('updateFriend')
    cy.visit(`/${clientId}/friend/form/${friendId}`)
  })

  it('should be able to see all friend data', () => {
    cy.wait('@friend').then(({ response }) => {
      const friend = response?.body?.data
      cy.findByLabelText(/header/i, `Hey ${friend.firstName} please update your info below!`).should('be.visible')
      cy.findByLabelText(/first name/i, friend.firstName).should('be.visible')
      cy.findByLabelText(/last name/i, friend.lastName).should('be.visible')
      cy.findByLabelText(/phone number/i, friend.phoneNumber).should('be.visible')
      cy.findByRole('button', { name: /save your info/i }).should('be.visible')
    })
  })

  it('should be able to enter birthday and get a success message', () => {
    cy.wait('@friend').then(({ response }) => {
      cy.findByLabelText(/birthday/i).type('1995-01-24')
      cy.findByRole('button', { name: /save your info/i }).click()
      cy.findByText(/successfully updated your info!/i).should('be.visible')
    })
  })
})
