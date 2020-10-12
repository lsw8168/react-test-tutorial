describe('List items', () => {
  beforeEach(() => {
    cy.seedAndVisit()
  })

  it('properly displays completed items', () => {
    cy.get('.todo-list > div')
      .filter('.completed')
      .should('have.length', 1)
      .and('contain', 'Eggs')
      .find('.toggle')
      .should('be.checked')
  })

  it('Shows remaining todos in the footer', () => {
    cy.get('.todo-count')
      .should('contain', 3)
  })

  it.only('Remove a todo', () => {
    cy.route({
      url: '/api/todos/0',
      method: 'DELETE',
      status: 200,
      response: {}
    })

    cy.get('.todo-list > div')
      .as('list')

    cy.get('@list')
      .first()
      .find('.destroy')
      .invoke('show')
      .click()

    cy.get('@list')
      .should('have.length', 3)
      .and('not.contain', 'Milk')
  })
})