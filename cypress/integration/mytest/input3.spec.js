describe('Input form', () => {
  beforeEach(() => {
    cy.seedAndVisit([])
  })
  
  it('focus input on load', () => {
    cy.focused()
      .should('have.class', 'input')
  })

  it('accepts input', () => {
    const typedText = 'Buy Milk'

    cy.get('.input')
      .type(typedText)
      .should('have.value', typedText)
  })

  context('Form submission', () => {
    beforeEach(() => {
      cy.server()
    })

    it('Adds a new todo on submit', () => {
      const itemText = 'Buy eggs';

      cy.route('POST', '/api/todos', {
        text: itemText,
        isComplete: false
      })

      cy.get('.input')
        .type(itemText)
        .type('{enter}')
        .should('have.value', '')
        
      cy.get('.todo-list')
        .should('have.length', 1)
        .and('contain', itemText)
    })

    it('Shows an error message on a failed submission', () => {
      cy.route({
        url: '/api/todos',
        method: 'POST',
        status: 500,
        response: {}
      })

      cy.get('.input')
        .type('test{enter}')

      cy.get('.todo-list > div')
        .should('not.exist')

      cy.get('.error')
        .should('be.visible')
    })
  })
})