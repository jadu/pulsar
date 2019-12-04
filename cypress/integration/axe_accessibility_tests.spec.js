describe('The following pages should not throw a11y errors in aXe: ', function() {
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