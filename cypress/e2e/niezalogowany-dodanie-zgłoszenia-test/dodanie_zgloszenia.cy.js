// cypress/integration/report_threat_spec.js

describe('Report Threat Flow for Unauthenticated User', () => {
  it('should navigate through the threat reporting process', () => {

    // Przejście do strony startowej
    cy.visit('/');

    // Kliknięcie w przycisk "Zgłoś zagrożenie"
    cy.contains('button', 'Zgłoś zagrożenie').click();

    // Sprawdzenie, czy zostaliśmy przeniesieni na stronę /report/data
    cy.url().should('include', '/report/data');

    // Wypełnienie formularza zgłoszenia zagrożenia
    cy.get('input[name="title"]').type('Przykładowy tytuł');
    cy.get('textarea[name="description"]').type('Przykładowy tytuł');
    cy.get('input[name="phone"]').type('+48111222333');
    cy.get('input[name="eventDate"]').type('2024-06-01T08:30'); // Wybór przykładowej daty

    // Kliknięcie przycisku "Dalej"
    cy.contains('button', 'Dalej').click();

    // Sprawdzenie, czy zostaliśmy przeniesieni na stronę /report/location
    cy.url().should('include', '/report/location');

    cy.wait(4000);


    // Kliknięcie przycisku "Dalej"
    cy.contains('button', 'Dalej').click();

    // Sprawdzenie, czy zostaliśmy przeniesieni na stronę /report/files
    cy.url().should('include', '/report/files');

    // Przesłanie pliku JPG
    cy.fixture('pozar.jpg', 'base64').then(fileContent => {
      cy.get('div[role="presentation"]').within(() => {
        cy.get('input[type="file"]').attachFile({
          fileContent: fileContent.toString(),
          fileName: 'pozar.jpg',
          mimeType: 'image/jpeg',
        });
      });
    });

    // Kliknięcie checkboxa i wysłanie formularza
    cy.get('input[type="checkbox"]').check();
    cy.contains('button', 'Wyślij').click();

    cy.url().should('eq', 'http://localhost:5173/');

    // Sprawdzenie, czy zgłoszenie zostało przesłane (możesz dodać odpowiednią asercję w zależności od zachowania strony)
    cy.contains('Dziękujemy za zgłoszenie').should('be.visible');
  });
});
