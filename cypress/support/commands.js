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


Cypress.Commands.add('login', (usuario, senha) => {
  cy.get('#username').type(usuario)
  cy.get('#password').type(senha, { log: false })
  cy.get('.woocommerce-form > .button').click()
});

Cypress.Commands.add('browseItems', (firstAttribute, secondAttribute) => {
  cy.get(`${firstAttribute} > .value > .variable-items-wrapper`).children().eq(0).click();
  cy.get(`${secondAttribute} > .value > .variable-items-wrapper`).children().eq(0).click();
  cy.get(`${firstAttribute} > .value > .variable-items-wrapper`).children().each(($firstOption, index) => {
    cy.get('.stock').then(($stock) => {
      if ($stock.text().includes('Fora de estoque')) {
        cy.wrap($firstOption).click();
      }
    });

    cy.get(`${secondAttribute} > .value > .variable-items-wrapper`).children().each(($secondOption, index) => {
      cy.get('.stock').then(($stock) => {
        if ($stock.text().includes('Fora de estoque')) {
          cy.wrap($secondOption).click();
        }
      });
    });
  });
});

Cypress.Commands.add('finalizarPedidofinishOrder', () => {
  cy.get('#cart > .dropdown-toggle').click()
  cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()

  cy.get('#billing_address_1').clear().type('Rua das Flores, 123')
  cy.get('#billing_city').clear().type('São Paulo')
  cy.get('#billing_postcode').clear().type('12345-678')
  cy.get('#billing_phone').clear().type('(11) 91234-5678')
  cy.get('#order_comments').clear().type('Por favor, entregar até as 18h')

  cy.get('#payment_method_cod').click()
  cy.get('#terms').click()
  cy.get('#place_order').click()

  cy.get('.woocommerce-notice').should('contain.text', 'Obrigado. Seu pedido foi recebido.')
});




