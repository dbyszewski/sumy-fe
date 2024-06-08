// cypress/e2e/register_user_spec.ts

import { faker } from '@faker-js/faker';

describe('User Registration Flow', () => {
  it('should register a new user and display a success notification', () => {
    const userName = faker.internet.userName();
    const email = faker.internet.email();
    const phone = `+48${faker.phone.number('#########')}`;
    const password = faker.internet.password(12);

    // Przejście do strony startowej
    cy.visit('/');

    // Kliknięcie w przycisk "Zarejestruj się"
    cy.contains('button', 'Zarejestruj się').click();

    // Sprawdzenie, czy zostaliśmy przeniesieni na stronę rejestracji
    cy.url().should('include', '/register');

    // Wypełnienie formularza rejestracji
    cy.get('input[name="userName"]').type(userName);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="phone"]').type(phone);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="confirmPassword"]').type(password);

    // Kliknięcie przycisku "Zarejestruj się"
    cy.contains('button', 'Zarejestruj się').click();

    // Sprawdzenie, czy zostaliśmy przeniesieni na stronę główną
    cy.url().should('eq', 'http://localhost:5173/auth/login');

    // Sprawdzenie, czy wyświetlono notyfikację o pomyślnej rejestracji
    cy.contains('Zarejestrowano pomyślnie').should('be.visible');

    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);

    cy.contains('button', 'Zaloguj się').click();

    cy.url().should('eq', 'http://localhost:5173/');

    cy.contains('Zalogowano pomyślnie').should('be.visible');

    cy.contains('button', 'Zgłoś zagrożenie').click();

    // Sprawdzenie, czy zostaliśmy przeniesieni na stronę /report/data
    cy.url().should('include', '/report/data');

    // Wypełnienie formularza zgłoszenia zagrożenia
    cy.get('input[name="title"]').type('Przykładowy tytuł');
    cy.get('textarea[name="description"]').type('Przykładowy tytuł');
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
    cy.fixture('pozar.jpg', 'base64').then((fileContent) => {
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
