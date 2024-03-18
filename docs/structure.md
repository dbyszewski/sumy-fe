# Struktura
Najważniejsze pliki i katalogi w projekcie znajdują się w katologu `src`.

```
src
├── assets
├── components
│   ├── Elements
│   ├── Layout
│   └── ...
├── config
├── features
├── hooks
├── lib
├── pages
├── providers
├── routes
├── types
└── utils
```
* ### assets
W katalogu `assets` znajdują się pliki statyczne, które są wykorzystywane w aplikacji, np. obrazki, ikony, czcionki, itp.

---

* ### components
W katalogu `components` znajdują się wszystkie komponenty aplikacji. Komponenty są podzielone na kategorie,
np. `Elements`, `Layout`, itp.

**Elements**

W katalogu `Elements` znajdują się komponenty, które są najniższego rzędu, np. `Button`, `Input`, `Icon`, itp.

**Layout**

W katalogu `Layout` znajdują się komponenty, które są wyższego rzędu, np. `Header`, `Footer`, `Sidebar`, itp.
oraz komponenty, które są odpowiedzialne za układ strony, np. `MainLayout`, `OperatorLayout`, itp.

---
* ### config
W katalogu `config` znajduje się plik konfiguracyjny ze zmiennymi środowiskowymi.
W przyszłości może się tam pojawić więcej plików konfiguracyjnych.

___
* ### features
W katalogu `features` znajdują się pliki związane z funkcjonalnościami aplikacji.
Każda funkcjonalność powinna mieć swój katalog,w którym znajdują się pliki oraz katalogi związane z tą funkcjonalnością,
np. `components`, `api`, `types`, itp.
Funkcjonalności są częścią strony, które są odpowiedzialne za wyświetlanie i zarządzanie danymi.

---
* ### hooks
W katalogu `hooks` znajdują się pliki z hookami, które są wykorzystywane w aplikacji.
Na razie katalog jest pusty, ale w przysdzłości może się to przydać do notyfikacji, autoryzacji, itp.

---
* ### lib
W katalogu `lib` znajdują się pliki z funkcjami, które są wykorzystywane w aplikacji.
Głównie są to funkcje pomocnicze zewnętrznych bibliotek np. initializert `axios`, `react-query`, itp.

---
* ### pages
W katalogu `pages` znajdują się pliki związane z poszczególnymi stronami aplikacji.
Każdy route powinien mieć swój odpowiedni komponent w tym katalogu.

---
* ### providers
W katalogu `providers` znajduje się plik, który jest odpowiedzialny za dostarczanie kontekstu do aplikacji.

---
* ### routes
W katalogu `routes` znajdują się pliki związane z routingiem aplikacji.
Routesy podzielone są na pliki, np. `anon`, `user`, `operator`.
Każdy plik zawiera routesy związane z daną rolą użytkownika
(anon - niezalogowany, user - zalogowany, operator - admin/operator).

---
* ### types
W katalogu `types` znajdują się pliki z typami, które są globalnie wykorzystywane w aplikacji i
nie są związane z konkretną funkcjonalnością.

---
* ### utils
Aktualnie puste.


