# Flow

W skrócie, jak dodajemy funkcjonalności:
1. Tworzysz nowego brancha o nazwie `feature/NAZWA_FEATURE`.
Najlepiej jeśli będzie utworzony automatycznie na GitHubie z issue.
2. Przechodzisz na nowo utworzony branch.
3. Implementujesz feature.
4. Commitujesz i pushujesz zmiany.
5. Tworzysz Pull Request do brancha `develop`.
6. Oczekujesz na review.
7. Po zatwierdzeniu Pull Requesta, zmerguj go do brancha `develop` (lub ktoś zrobi to za Ciebie).
8. Usuwasz brancha `feature/NAZWA_FEATURE` (lub ktoś zrobi to za Ciebie).

Wszystko to robimy, żeby zachować porządek w kodzie i uniknąć konfliktów.

___
#### Dependabot

Dependabot to bot, który monitoruje zależności w projekcie i automatycznie tworzy Pull Requesty z aktualizacjami zależności.
Raz w tygodniu sprawdzaj, czy nie ma nowych Pull Requestów od Dependabota i zatwierdzaj je, jeśli wszystko działa.
Po zatwierdzeniu jednego Pull Requesta, Dependabot automatycznie robi rebase pozostraych Pull Requestów,
więc trzeba chwilę poczekać, aż wszystko się zaktualizuje, zanim zaakceptujemy kolejne Pull Requesty.

**Uwaga!** Zawsze sprawdzaj, czy aktualizacje nie tworzą błędów i nie wprowadzają konfliktów w kodzie.
Warto sprawdzić co kilka mergów, czy wszystko działa poprawnie.