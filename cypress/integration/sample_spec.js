beforeEach(() => {
    cy.visit('http://localhost:3001/app/app.php/lexicon')
    cy.injectAxe()
  })

describe('Lexicon homepage', function() {
    it('Has no detectable a11y violations on load', () => {
        cy.checkA11y()
    })
})