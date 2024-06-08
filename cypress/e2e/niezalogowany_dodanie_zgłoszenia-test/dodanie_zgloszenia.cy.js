// cypress/integration/report_event_spec.js

describe('Dodanie zdarzenia', () => {
  it('powinno dodać nowe zdarzenie jako użytkownik niezalogowany', () => {
    cy.visit('/');

    cy.contains('button', 'Zgłoś zagrożenie').click();

    cy.url().should('include', '/report/data');

    cy.get('input[name="title"]').type('Przykładowy tytuł');
    cy.get('textarea[name="description"]').type('Przykładowy tytuł');
    cy.get('input[name="phone"]').type('+48111222333');
    cy.get('input[name="eventDate"]').type('2024-06-01T08:30');

    cy.contains('button', 'Dalej').click();

    cy.url().should('include', '/report/location');

    cy.wait(1000);

    cy.contains('button', 'Dalej').click();

    cy.url().should('include', '/report/files');

    cy.fixture('pozar.jpg', 'base64').then((fileContent) => {
      cy.get('div[role="presentation"]').within(() => {
        cy.get('input[type="file"]').attachFile({
          fileContent: fileContent.toString(),
          fileName: 'pozar.jpg',
          mimeType: 'image/jpeg',
        });
      });
    });

    cy.get('input[type="checkbox"]').check();
    cy.contains('button', 'Wyślij').click();

    cy.url().should('eq', 'http://localhost:5173/');

    cy.contains('Dziękujemy za zgłoszenie').should('be.visible');
  });
});
