/// <reference types="Cypress" />

// npx cypress open - Para abrir o cypress

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach (() => {
        cy.visit('./src/index.html')
    })
    
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Texto longo relacionado ao problema, descrevendo a situação ocorrida com o cliente, a fim de documentar o cenário para os analistas que irão analisar esta solicitação'
        
        cy.get('input[id="firstName"]').should('be.visible').type('Rodrigo').should('have.value', 'Rodrigo')
        cy.get('input[id="lastName"]').should('be.visible').type('Sobrenome').should('have.value', 'Sobrenome')
        cy.get('input[id="email"]').should('be.visible').type('rodrigo@teste.com').should('have.value', 'rodrigo@teste.com')
        cy.get('textarea[id="open-text-area"]').should('be.visible')
        .type(longText, {delay : 0})

        //cy.get('button[type="submit"]').click()
        cy.contains('button','Enviar').click()
        cy.get('button').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('input[id="firstName"]').should('be.visible').type('Rodrigo').should('have.value', 'Rodrigo')
        cy.get('input[id="lastName"]').should('be.visible').type('Sobrenome').should('have.value', 'Sobrenome')
        cy.get('input[id="email"]').should('be.visible').type('rodrigo@teste').should('have.value', 'rodrigo@teste')
        cy.get('textarea[id="open-text-area"]').should('be.visible')
        .type('Texto longo relacionado ao problema', {delay : 0})

        //cy.get('button[type="submit"]').click()
        cy.contains('button','Enviar').click()

        cy.get('span[class="error"]').should('be.visible')
        // .error no css busca o elemento com a classe error, # busca o id
        //cy.get('.error').should('be.visible')

    })

    it('valida preenchimento do campo telefone somente com números',function() {
        cy.get('input[id="phone"]').should('be.visible').type('teste').should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('input[id="firstName"]').should('be.visible').type('Rodrigo').should('have.value', 'Rodrigo')
        cy.get('input[id="lastName"]').should('be.visible').type('Sobrenome').should('have.value', 'Sobrenome')
        cy.get('input[id="email"]').should('be.visible').type('rodrigo@teste.com').should('have.value', 'rodrigo@teste.com')
        cy.get('textarea[id="open-text-area"]').should('be.visible')
        .type('Texto longo relacionado ao problema', {delay : 0})
        
        // funciona também com .click no checkbox
        cy.get('input[id="phone-checkbox"]').check()

        //cy.get('button[type="submit"]').click()
        cy.contains('button','Enviar').click()
        cy.get('span[class="error"]').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('input[id="firstName"]').should('be.visible').type('Rodrigo').should('have.value', 'Rodrigo')
        cy.get('input[id="lastName"]').should('be.visible').type('Sobrenome').should('have.value', 'Sobrenome')
        cy.get('input[id="email"]').should('be.visible').type('rodrigo@teste.com').should('have.value', 'rodrigo@teste.com')
        cy.get('input[id="phone"]').should('be.visible').type('1199998888').should('have.value', '1199998888')

        cy.get('input[id="firstName"]').clear().should('have.value', '')
        cy.get('input[id="lastName"]').clear().should('have.value', '')
        cy.get('input[id="email"]').clear().should('have.value', '')
        cy.get('input[id="phone"]').clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        //cy.get('button[type="submit"]').click()
        cy.contains('button','Enviar').click()
        cy.get('span[class="error"]').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit('Rodrigo', 'Sobrenome', 'rodrigo@teste.com')
        cy.get('span[class="success"]').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
        //Outras opções para o mesmo resultado
        //cy.get('#product').select('youtube').should('have.value', 'youtube')
        //cy.get('#product').select(4).should('have.value', 'youtube')
    });

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    });

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product').select(1).should('have.value', 'blog')
    });

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('have.value', 'feedback')
    });

    it('marca cada tipo de atendimento', () => {
        cy.get('input[name="atendimento-tat"]')
          .should('have.length', 3)
          .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
          })
    });

    it('marca ambos checkboxes, depois desmarca o último', () => {
        //cy.get pega todos os checkboxes, então não tem a necessidade de usar o each()
        //cy.get('input[type="checkbox"]')
        //  .should('have.length', 2)
        //  .each(function($checkbox) {
        //      cy.wrap($checkbox).check()
        //      cy.wrap($checkbox).should('be.checked')
        //  })
        //  .last().uncheck()
        //  .should('not.be.checked')
        cy.get('input[type="checkbox"]')
        .should('have.length', 2)
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')

    });

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    });

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('#file-upload')
          .should('not.have.value')
          .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
          .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
          })
    });
    
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
          .should('not.have.value')
          //Quando temos um alias, nos referimos a ele com @ antes
          .selectFile('@sampleFile', {action: 'drag-drop'})
          .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
          })
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        // Da pra usar também get(#privace a), pegando a div id privace e o link 'a' dentro dela
        cy.get('a[href="privacy.html"]')
          .should('have.attr', 'target', '_blank')
    });

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
        cy.get('a[href="privacy.html"]')
          .invoke('removeAttr', 'target')
          .click()

          cy.contains('#title', 'CAC TAT - Política de privacidade').should('be.visible')
    });
})