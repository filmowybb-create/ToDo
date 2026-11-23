# Zadania – instrukcja

Aplikacja do zadań i notatek z kalendarzem. Działa na Windows i Androidzie jako PWA, czyli strona, którą instalujesz jak zwykłą aplikację. Nie potrzebujesz własnego serwera: dane są na urządzeniu, a synchronizacja i kalendarz idą przez Twoje konto Google.

## Co potrafi

- **Zadania** z terminem, godziną, czasem trwania, przypomnieniem, powtarzaniem, gwiazdką i notatką.
- **Notatki** jako osobny typ. Każdy element jest zadaniem albo notatką i można go przełączyć jednym kliknięciem.
- **Widoki:** Dziś (z sumą zaplanowanego czasu), Nadchodzące, Kalendarz (tydzień / miesiąc, na telefonie 3 dni), Tablica (kanban), Ważne, Wszystkie, Notatki, Ukończone, własne listy, tagi, wyszukiwarka.
- **Tagi** dla zadań i notatek: `#tag` przy dodawaniu albo pole „Tagi” w szczegółach. Kliknięcie tagu pokazuje wszystko z tym tagiem, a w wyszukiwarce `#pra` znajduje tagi zaczynające się od „pra”, `#praca #pilne` – z oboma.
- **Tablica kanban:** kolumny Do zrobienia / W toku / Zrobione (albo kolumny = listy). Karty przeciągasz myszą, na telefonie przesuwasz strzałkami. Można filtrować po liście i tagu.
- **Kalendarz Google:**
  - widzisz swoje wydarzenia obok zadań;
  - zadania z terminem trafiają do osobnego kalendarza **„Zadania”** z przypomnieniem, więc telefon powiadomi Cię przez aplikację Kalendarz Google, nawet gdy ta apka jest zamknięta.
- **Synchronizacja** między komputerem a telefonem przez ukryty folder aplikacji na Twoim Dysku Google (nie widać go wśród Twoich plików).
- **Udostępnianie na Androidzie:** w dowolnej aplikacji wybierz „Udostępnij” → **Zadania**, a strona lub tekst zostanie nowym zadaniem (link trafia do notatki). Działa w zainstalowanej aplikacji.
- **Offline:** wszystko działa bez internetu i synchronizuje się po powrocie sieci.
- **Przeciąganie** zadań w kalendarzu (na komputerze), a kliknięcie w pustą godzinę tworzy zadanie na tę godzinę.

### Szybkie dodawanie – składnia

| Wpisujesz | Wynik |
|---|---|
| `jutro 15:00 1h Spotkanie z Anią` | jutro, 15:00, 1 godz. |
| `pt o 9 45m dentysta` | najbliższy piątek, 9:00, 45 min |
| `24.12 kupić karpia co rok` | 24 grudnia, co roku |
| `raport 2h co tydzień pon` | poniedziałek, 2 godz., co tydzień |
| `za 3 dni oddać książkę` | za 3 dni |
| `ważna rzecz !` | z gwiazdką |
| `#praca telefon do klienta` | do listy „Praca”, a jeśli takiej listy nie ma – tag #praca |
| `n: pomysł na prezent` | notatka |

Skróty klawiszowe na komputerze: `N` przenosi do pola dodawania, `/` do wyszukiwarki, `Esc` zamyka panel.

---

## Krok 1. Umieść aplikację w internecie (za darmo, ok. 5 min)

PWA i logowanie Google wymagają adresu `https://`. Najprościej użyć **GitHub Pages**:

1. Załóż konto na github.com i utwórz nowe repozytorium, np. `zadania`. Może być prywatne, jeśli masz płatny plan; na darmowym planie musi być publiczne (to tylko kod, Twoje dane tam nie trafiają).
2. Wgraj całą zawartość tego folderu (`index.html`, `sw.js`, `manifest.webmanifest`, foldery `css`, `js`, `icons`) przyciskiem **Add file → Upload files**.
3. Wejdź w **Settings → Pages** i jako **Source** wybierz „Deploy from a branch”, a następnie gałąź `main` i folder `/ (root)`.
4. Po minucie aplikacja będzie pod adresem `https://TWOJA-NAZWA.github.io/zadania/`.

Działają też inne darmowe hostingi, np. Cloudflare Pages albo Netlify (folder przeciągasz w przeglądarce).

> Do testów na komputerze możesz też uruchomić w tym folderze `python -m http.server 8000` i otworzyć `http://localhost:8000`.

## Krok 2. Połącz z Google (ok. 10 min, jednorazowo)

1. Wejdź na **console.cloud.google.com** i utwórz nowy projekt, np. „Zadania”.
2. W **APIs & Services → Library** włącz dwa interfejsy:
   - **Google Calendar API**,
   - **Google Drive API**.
3. W **APIs & Services → OAuth consent screen** (w nowym wyglądzie: *Google Auth Platform*):
   - typ użytkownika: **External**;
   - nazwa aplikacji: „Zadania”, a jako e-mail podaj swój;
   - w **Audience / Test users** dodaj **swój adres Gmail**.

   Aplikacja może zostać w trybie testowym („Testing”), bo korzystasz z niej tylko Ty.
4. W **APIs & Services → Credentials → Create credentials → OAuth client ID**:
   - typ: **Web application**;
   - **Authorized JavaScript origins**: wpisz adres hostingu bez ścieżki, np. `https://twoja-nazwa.github.io` (oraz `http://localhost:8000`, jeśli testujesz lokalnie);
   - kliknij **Create** i skopiuj **Client ID** (kończy się na `.apps.googleusercontent.com`).
5. W aplikacji wejdź w **Ustawienia → wklej Client ID → Połącz z Google**. Google pokaże ostrzeżenie „aplikacja niezweryfikowana”: kliknij **Kontynuuj**, bo to Twoja własna aplikacja.

Po połączeniu w Twoim Kalendarzu Google pojawi się kalendarz **„Zadania”**. W Ustawieniach zaznaczasz też, z których kalendarzy pokazywać wydarzenia.

## Krok 3. Zainstaluj na urządzeniach

- **Windows:** otwórz adres w Edge lub Chrome i kliknij ikonę instalacji na pasku adresu (albo menu **⋯ → Aplikacje → Zainstaluj**). Aplikacja pojawi się w menu Start i możesz ją przypiąć do paska zadań.
- **Android:** otwórz adres w Chrome i wybierz menu **⋮ → Zainstaluj aplikację** (lub „Dodaj do ekranu głównego”).

Na każdym urządzeniu połącz się z Google (ten sam Client ID). Dane same się połączą.

---

## Dobrze wiedzieć

- **Przypomnienia.** Najpewniejsze są te z Kalendarza Google, bo przychodzą zawsze. Powiadomienia samej aplikacji (Ustawienia → Powiadomienia) działają, gdy jest otwarta. Jeśli włączysz oba rodzaje, możesz dostać dwa powiadomienia o tym samym zadaniu.
- **Sesja Google trwa godzinę,** ale aplikacja odnawia ją sama: po wygaśnięciu (lub 5 minut przed) pierwsze dotknięcie ekranu otwiera na moment okno Google, które samo się zamyka – nic nie trzeba klikać. Gdyby to się nie udało, pojawi się pasek „Połącz”.
- **Zadania cykliczne:** po odhaczeniu tworzy się kolejne wystąpienie z następnym terminem.
- **Przypomnienie „w dniu terminu o 9:00”** dla zadań bez godziny działa tylko w aplikacji, bo Kalendarz Google nie obsługuje tego dla wydarzeń całodniowych. Dla przypomnień w Kalendarzu wybierz „dzień wcześniej”.
- **Kopia zapasowa:** Ustawienia → Eksportuj zapisuje cały stan do pliku JSON.
- **Aktualizacja aplikacji:** podmień pliki na hostingu. Po ponownym otwarciu aplikacja pobierze nową wersję.

## Struktura plików

```
index.html            – szkielet strony
css/app.css           – wygląd (jasny/ciemny, układ na telefon)
js/util.js            – daty, parser szybkiego dodawania
js/store.js           – dane lokalne (IndexedDB) i łączenie zmian
js/google.js          – logowanie Google, Kalendarz, synchronizacja przez Dysk
js/app.js             – interfejs
sw.js                 – praca offline, kliknięcia w powiadomienia
manifest.webmanifest  – instalacja jako aplikacja
icons/                – ikony
```
