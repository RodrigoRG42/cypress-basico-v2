// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (firstName, lastName, email) => {
    cy.get('input[id="firstName"]').should('be.visible').type('Rodrigo').should('have.value', firstName)
    cy.get('input[id="lastName"]').should('be.visible').type('Sobrenome').should('have.value', lastName)
    cy.get('input[id="email"]').should('be.visible').type('rodrigo@teste.com').should('have.value', email)
    cy.get('textarea[id="open-text-area"]').should('be.visible')
    .type('Texto longo relacionado ao problema, descrevendo a situação ocorrida com o cliente, a fim de documentar o cenário para os analistas que irão analisar esta solicitação', {delay : 0})

    //cy.get('button[type="submit"]').click()
    cy.contains('button','Enviar').click()
})
