/// <reference types="cypress" />

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    before(() => {
        cy.fixture('perfil').then(perfil => {
            dadosLogin = perfil
        })
    });
    beforeEach(() => {
        cy.visit('')
        
    });

    it.only('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        
    });


})
