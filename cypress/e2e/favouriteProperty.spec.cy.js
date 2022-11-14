describe('As a user I have posibility to add a propperty to favourite list', () => { 
    beforeEach('open application', () => {
        cy.visit('https://www.rezfusionhubdemo.com/hub-test-vacation-rentals');
    })

   const PROPERTY_CARD = '.SearchResultList__TeaserWrapper-sc-1elxpj1-1';
   const LIST_OF_PROPERTIES = '.SearchResultList__ResultWrapper-sc-1elxpj1-0';
   const SHOW_FAVOURITIES_ONLY = '[aria-label="Favorites Page toggle"]';
   const NUMBER_OF_SEARCHED_RESULTS ='.bt-result-count';
   const NUMBER_OF_FAVOURITE_PROPERTIES = 'bt-favorites-link__count';

it('Each property should have favourite button', () => {
    cy.get(LIST_OF_PROPERTIES).each(($el) => {
       cy.get(PROPERTY_CARD)
       .find('button')
       .should('have.attr','aria-label','Save as favorite .....Test Property for RevMax');
    })
})

it('Favourite button should change his state',() => {
    cy.get(PROPERTY_CARD)
    .first()
    .find('button').should('have.attr','aria-checked','false')
    .click().should('have.attr','aria-checked','true');
})

it('Counter of favourite properties should change', () => {
    cy.get(PROPERTY_CARD)
        .first()
        .find('button')
        .click();
    cy.get(NUMBER_OF_FAVOURITE_PROPERTIES).should('have.text','(1)')
})

it('Should show only favourite properties',()=>{
    cy.get(PROPERTY_CARD).first().find('button').click();
    cy.get(SHOW_FAVOURITIES_ONLY).click({ force: true });
    cy.get(NUMBER_OF_SEARCHED_RESULTS).should('have.text','1 Results');
})

it('Should allow to remove favourite property from favourite only view ',()=>{
    cy.get(PROPERTY_CARD).first().find('button').click();
    cy.get(SHOW_FAVOURITIES_ONLY).click({ force: true });
    cy.get(PROPERTY_CARD).find('button').click();
    cy.get(NUMBER_OF_SEARCHED_RESULTS).should('have.text','0 Results');    
})
})