
describe('Política de Privacidade', function() {
    beforeEach(() => {
        cy.visit('./src/privacy.html')
    }) 
    it('testa a página da política de privacidade de forma independente', () => {
        cy.contains('#title', 'CAC TAT - Política de privacidade').should('be.visible')
    });
})