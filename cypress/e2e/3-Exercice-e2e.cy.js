/// <reference types="cypress" />
let dadosLogin

describe('Order Flow', () => {
  before(() => {
    cy.fixture('perfil').then(perfil => {
      dadosLogin = perfil
    })
  });
  beforeEach(() => {
    cy.visit('minha-conta/')
    cy.login(dadosLogin.usuario, dadosLogin.senha)
  });

  it.only('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
    let produtosAdicionados = 0
    function adicionarProduto(index) {
      if (produtosAdicionados >= 4) {
        cy.finalizarPedidofinishOrder()
        return
      }

      cy.get('.products > .row').children().eq(index).then(($produto) => {
        if (!$produto.length) {
          cy.log('Não há mais produtos para tentar')
          return
        }

        cy.wrap($produto).click()

        cy.browseItems(':nth-child(1)', ':nth-child(2)')

        cy.get('.stock').then(($stock) => {
          if (!$stock.text().includes('Fora de estoque')) {
            cy.get('.single_add_to_cart_button').click()

            cy.get('body').then(($body) => {
              if ($body.find('.woocommerce-message').length > 0) {
                cy.get('.woocommerce-message')
                  .should('be.visible')
                  .then(() => {
                    produtosAdicionados++
                    cy.log(`Produto adicionado. Total: ${produtosAdicionados}`)
                  })
              }
            })
          }
        })
        cy.visit('produtos').then(() => {
          adicionarProduto(index + 1)
        })
      })
    }

    adicionarProduto(0)
  })
})
