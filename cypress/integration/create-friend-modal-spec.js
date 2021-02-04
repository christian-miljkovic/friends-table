import { createFriend } from '../generators/friends'
import { ENDPOINTS } from '../../src/api/endpoints'
import { HTTP } from '../../src/api/http'
import { convertToCamelCase } from '../../src/util/transformers'

const token = Cypress.env('REACT_APP_API_TOKEN')

describe('Create Friend Modal', () => {
  beforeEach(() => {
    cy.server()
    const friendData = convertToCamelCase(createFriend({}, { number: 2 }))
    const { clientId } = friendData.data[0]
    const postPath = ENDPOINTS.FRIEND.CREATE.replace(':clientId', clientId)
    cy.route(`${ENDPOINTS.FRIEND.ALL.replace(':id', clientId)}?token=${token}`, friendData).as('friends')
    cy.route(HTTP.POST, `${postPath}?token=${token}`, friendData).as('createFriend')
    cy.visit(`/table/${clientId}`)
  })

  it('should be able to input data and successfully create a friend', () => {
    const friendData = convertToCamelCase(createFriend())
    const { firstName, lastName, phoneNumber } = friendData.data
    cy.findByRole('button', { name: /add another friend/i })
      .should('be.visible')
      .click()
    cy.findByLabelText(/first name/i)
      .should('be.visible')
      .type(firstName)
    cy.findByLabelText(/last name/i)
      .should('be.visible')
      .type(lastName)
    cy.findByLabelText(/phone number/i)
      .should('be.visible')
      .type(phoneNumber)
    cy.findByRole('button', { name: /add friend!/i })
      .should('be.visible')
      .click()
    cy.findByText(/successfully added friend!/i).should('be.visible')
  })
})
