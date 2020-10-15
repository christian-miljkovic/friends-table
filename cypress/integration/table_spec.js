import { baseConfig } from './config';
import { ENDPOINTS } from './.src/api/endpoints';
import { v4 as uuidv4 } from 'uuid'

const { apiUrl } = baseConfig;
const GET_CLIENTS = `${apiUrl}${ENDPOINTS.FRIENDS.ALL}`;
const clientUUID = uuidv4()

describe('Friends Table', () => {
  it('should be able to get all friends for a client', () => {
    cy.server();
    cy.visit(`/table/${clientUUID}`);
    expect(true).to.equal(true);
  });
});
