describe('Test pages for accessibility issues', function() {
    it('Lexicon homepage', () => {
        cy.visit('http://localhost:9000/app/app.php/lexicon')
        cy.injectAxe()
        cy.checkA11y()
    })

    it('Forms page', () => {
        cy.visit('http://localhost:9000/app/app.php/lexicon/forms.html.twig')
        cy.injectAxe()
        cy.checkA11y()
    })
})