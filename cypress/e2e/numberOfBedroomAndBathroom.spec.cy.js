describe('As a user I have the ability to use filter of number of bedrooms and bathrooms.', () => {
    beforeEach('Open application and filters view', () => {
        cy.visit('https://www.rezfusionhubdemo.com/hub-test-vacation-rentals')
        cy.get('.sqs-cookie-banner-v2-acceptWrapper').click();
        cy.get(FILTERS_BUTTON).click({force: true});
    })

  const FILTERS_BUTTON = '.bt-modal-toggle--filters';
  const INCREASE_NUMBER_OF_BEDROOMS_BUTTON = '[aria-label="0 Minimum Bedrooms, increase"]';
  const INCREASE_NUMBER_OF_BATHROOMS_BUTTON = '[aria-label="0 Minimum Bathrooms, increase"]';
  const DECREASE_NUMBER_OF_BEDROOMS_BUTTON = '[aria-label="0 Minimum Bedrooms, decrease"]';
  const DECREASE_NUMBER_OF_BATHROOMS_BUTTON = '[aria-label="0 Minimum Bathrooms, decrease"]';
  const CLEAR_FILTERS_BUTTON = '.bt-clear-filters';
  const VIEW_RESULTS_BUTTON = '.bt-button--cta';
  const NUMBER_OF_SEARCHED_RESULTS ='.bt-result-count';
  const FILTERS_MODAL_SUB_HEADER ='.bt-modal-sub-header';

it('User can change number of bedrooms',() => {
cy.get(INCREASE_NUMBER_OF_BEDROOMS_BUTTON).click();
cy.contains('Minimum Bedrooms').siblings().next().should('have.text','1');
})

it('User can change number of bathrooms',() => {
    cy.get(INCREASE_NUMBER_OF_BATHROOMS_BUTTON).click();
    cy.contains('Minimum Bathrooms').siblings().next().should('have.text','1');
})

it('User can clear all changes by "Clear Filters" button', () => {
    cy.get(INCREASE_NUMBER_OF_BEDROOMS_BUTTON).click();
    cy.get(INCREASE_NUMBER_OF_BATHROOMS_BUTTON).click();
    cy.get(CLEAR_FILTERS_BUTTON).click();
    cy.contains('Minimum Bedrooms').siblings().next().should('have.text','0')
    cy.contains('Minimum Bathrooms').siblings().next().should('have.text','0');
})

it('Should not allow a values less then 0', () => {
    cy.get(DECREASE_NUMBER_OF_BEDROOMS_BUTTON).click();
    cy.get(DECREASE_NUMBER_OF_BATHROOMS_BUTTON).click();
    cy.contains('Minimum Bedrooms').siblings().next().should('have.text','0').and('not.equal','0')
    cy.contains('Minimum Bathrooms').siblings().next().should('have.text','0');
})

it('Should show properties matching filters', () => {
    cy.get(INCREASE_NUMBER_OF_BATHROOMS_BUTTON).click();
    cy.get(FILTERS_MODAL_SUB_HEADER).find(NUMBER_OF_SEARCHED_RESULTS).children().invoke('text').then((numberOfResultsInFilters) => {
        cy.get(VIEW_RESULTS_BUTTON).click()
        cy.get(NUMBER_OF_SEARCHED_RESULTS).children().invoke('text').should((numberOfResultsInListOfProperties) => {
            expect(numberOfResultsInFilters).to.eq(numberOfResultsInListOfProperties)
        })
    })
})
})