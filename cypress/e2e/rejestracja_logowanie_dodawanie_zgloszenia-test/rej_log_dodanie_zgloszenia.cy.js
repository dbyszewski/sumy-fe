// cypress/e2e/register_login_user_report_event_spec.ts

import { faker } from '@faker-js/faker';

describe('Rejestracja, logowanie, dodanie zdarzenia', () => {
  it('powinno zarejestrować nowego użytkownika, zalogować się na niego oraz dodać nowe zdarzenie', () => {
    const userName = faker.random.alphaNumeric(10);
    const email = faker.internet.email();
    const phone = `+48${faker.phone.number('#########')}`;
    const password = faker.internet.password(12);

    cy.visit('/');

    cy.contains('button', 'Zarejestruj się').click();

    cy.url().should('include', '/register');

    cy.get('input[name="userName"]').type(userName);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="phone"]').type(phone);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="confirmPassword"]').type(password);

    cy.contains('button', 'Zarejestruj się').click();

    cy.url().should('eq', 'http://localhost:5173/auth/login');

    cy.contains('Zarejestrowano pomyślnie').should('be.visible');

    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);

    cy.contains('button', 'Zaloguj się').click();

    cy.url().should('eq', 'http://localhost:5173/');

    cy.contains('Zalogowano pomyślnie').should('be.visible');

    cy.contains('button', 'Zgłoś zagrożenie').click();

    cy.url().should('include', '/report/data');

    cy.get('input[name="title"]').type('Przykładowy tytuł');
    cy.get('textarea[name="description"]').type('Przykładowy tytuł');
    cy.get('input[name="eventDate"]').type('2024-06-01T08:30');

    cy.contains('button', 'Dalej').should('be.visible').and('not.be.disabled').click();

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
