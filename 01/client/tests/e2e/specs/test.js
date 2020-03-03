// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.server()           // enable response stubbing
    cy.route({
      method: 'GET',      // Route all GET requests
      url: '/api/values',    // that have a URL that matches '/users/*'
      response: ['foo', 'bar']        // and force the response to be: []
    })
    cy.visit('/')
    cy.get('.server-values').contains('foo')
  })
})
