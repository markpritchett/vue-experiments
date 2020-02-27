// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.get('#Username').type('alice')
    cy.get('#Password').type('alice')
    cy.get('#login').click()
    cy.get('#giveAppAccess').then(el => el.click())
    // cy.contains('h1', 'Welcome to Your Vue.js App')
    cy.get('nav').contains('Alice Smith')
  })
})
