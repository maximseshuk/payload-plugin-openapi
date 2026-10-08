import type { PluginDefaultTranslationsObject } from '@/shared/translations/types.js'

export const pl: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Ile poziomów powiązanych dokumentów ma zostać wypełnionych.',
    paramSort:
      'Pole, według którego następuje sortowanie; poprzedź znakiem `-`, aby sortować malejąco, np. `-createdAt`.',
    paramSortShort: 'Pole, według którego następuje sortowanie; poprzedź znakiem `-`, aby sortować malejąco.',
    paramDraft: 'Zwróć wersje robocze.',
    paramTrash: 'Uwzględnij dokumenty w koszu.',
    paramAutosave: 'Zapisz jako autozapis: aktualizuje ostatnią wersję autozapisu zamiast dodawać nową.',
    paramPublishAllLocales: 'Opublikuj wszystkie języki, nie tylko język żądania.',
    paramUnpublishAllLocales: 'Cofnij publikację wszystkich języków i przywróć dokument do wersji roboczej.',
    paramOverrideLock: 'Zignoruj blokadę innego użytkownika. Domyślnie false.',
    paramSelectedLocales: 'Skopiuj do duplikatu tylko te języki. Domyślnie: wszystkie języki.',
    paramFlattenLocales:
      'Przy `locale=all` ustaw false, aby zachować pola zlokalizowane jako obiekty z podziałem na języki. Domyślnie true.',
    paramLocale: 'Język do zwrócenia lub `all`, aby zwrócić wszystkie języki. Zobacz sekcję Lokalizacja w opisie API.',
    paramFallbackLocale: 'Język zastępczy dla brakujących wartości zlokalizowanych lub `none`, aby wyłączyć.',
    paramValidateLocale:
      'Języki do sprawdzenia lub `all` dla wszystkich języków. Dla więcej niż jednego języka powtórz parametr.',
    paramComputeHierarchyPaths:
      'Ustaw true, aby obliczyć ścieżki `{{slugPath}}` i `{{titlePath}}`. Wybranie któregokolwiek z tych pól również je oblicza.',

    schemaSelect: 'Wybierz pola do zwrócenia, np. `select[title]=true`. Pomiń, aby zwrócić wszystkie.',
    schemaPopulate: 'Wypełnij powiązane dokumenty dla każdej kolekcji, np. `populate[posts][title]=true`.',
    schemaJoins: 'Sterowanie poszczególnymi złączeniami (limit/page/sort/where/count), np. `joins[posts][limit]=10`.',
    schemaWhere:
      'Filtr `where` Payload. Zagnieźdź pole, a następnie operator: `where[field][equals]=value`. Łącz warunki za pomocą tablic `and` / `or`, np. `where[or][0][field][equals]=value`. Każde pole wymienia tylko operatory właściwe dla jego typu.',
    schemaSupportedTimezones: 'Obsługiwane strefy czasowe w formacie IANA.',
    schemaPerLocale: 'Wartości dla poszczególnych języków, zwracane przy `locale=all`.',
    schemaHierarchySlugPath:
      'Ścieżka slugów, np. `parent/child`. Obliczana przy odczycie z `computeHierarchyPaths=true` lub po wybraniu. Nie można jej użyć w `where`.',
    schemaHierarchyTitlePath:
      'Ścieżka tytułów, np. `Parent/Child`. Obliczana przy odczycie z `computeHierarchyPaths=true` lub po wybraniu. Nie można jej użyć w `where`.',

    collectionList: 'Stronicowana lista dokumentów',
    collectionDoc: 'Pojedynczy dokument',
    collectionCreated: 'Utworzony dokument',
    collectionUpdated: 'Zaktualizowany dokument',
    collectionDeleted: 'Usunięty dokument',
    collectionBulkUpdate: 'Wynik aktualizacji zbiorczej',
    collectionBulkDelete: 'Wynik usuwania zbiorczego',
    collectionCount: 'Liczba dokumentów',
    collectionDuplicated: 'Zduplikowany dokument',
    validateResult:
      'Wynik walidacji. Nic nie jest zapisywane. Nieprawidłowe wartości pól zwracają `valid: false` wraz z błędami, a nie status błędu.',
    validateBody:
      'Dane dokumentu do walidacji. W zapisanym dokumencie lub dokumencie globalnym dane są scalane z najnowszą wersją roboczą, a gdy jej nie ma, z zapisanym dokumentem.',

    globalDoc: 'Dokument globalny',

    authLogin: 'Wynik logowania',
    authLogout: 'Wynik wylogowania',
    authMe: 'Obecnie uwierzytelniony użytkownik',
    authRefreshToken: 'Odświeżony token',
    authForgotPassword: 'Wysłano e-mail resetowania hasła',
    authResetPassword: 'Wynik resetowania hasła',
    authFirstRegister: 'Pierwszy użytkownik utworzony wraz z tokenem uwierzytelniającym',
    authInit: 'Czy ta kolekcja uwierzytelniania ma już jakichkolwiek użytkowników',
    authAccess: 'Uprawnienia bieżącego użytkownika do wszystkich kolekcji i globalnych',
    docAccess: 'Uprawnienia bieżącego użytkownika do tego dokumentu',
    docAccessBody:
      'Dane dokumentu, względem których sprawdzany jest dostęp. Bez nich Payload używa zapisanego dokumentu, jeśli istnieje.',
    authUnlock: 'Wynik odblokowania',
    authVerify: 'Wynik weryfikacji',
    apiKeyReveal: 'Odszyfrowany klucz API',

    versionList: 'Stronicowana lista wersji',
    versionSingle: 'Pojedyncza wersja',
    versionRestored: 'Przywrócony dokument',
    versionWhere: 'Filtruj według pól wersji, np. `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'Uruchom zadania z kolejki (i domyślnie obsłuż harmonogramy)',
    jobsSchedulesSummary: 'Dodaj do kolejki zadania, których termin wykonania nadszedł zgodnie z harmonogramem',
    jobsRunResult: 'Wynik uruchomienia',
    jobsSchedulesResult: 'Wynik planowania',
    jobsRunAllQueues: 'Uruchom zadania we wszystkich kolejkach.',
    jobsLimit: 'Maksymalna liczba zadań do uruchomienia.',
    jobsDisableScheduling: 'Pomiń obsługę harmonogramów, którą `run` wykonuje domyślnie.',
    jobsSilent: 'Wyłącz rejestrowanie uruchomień.',
    jobsSchedulesAllQueues: 'Obsłuż harmonogramy we wszystkich kolejkach.',
    jobsQueue: 'Ogranicz operację do jednej kolejki. Znane kolejki: {{queues}}.',

    uploadFile: 'Plik binarny do przesłania.',
    uploadBody:
      'Wyślij `multipart/form-data`, aby przesłać plik (część binarna `file` oraz część `_payload` z polami w postaci ciągu JSON), albo `application/json` z samymi polami, gdy nie ma pliku.',
    uploadPayloadField: 'Pola {{schema}} w postaci ciągu JSON. Przykład: `{\\"alt\\":\\"A caption\\"}`.',
    fileServe: 'Plik',
    filePartial: 'Część pliku dla żądania `Range`',
    uploadInstructionsSummary: 'Pobierz instrukcje przesłania pliku przed zapisaniem dokumentu',
    uploadInstructionsResult:
      'Dokąd wysłać bajty pliku i jaką wartość `file` wysłać z żądaniem utworzenia lub aktualizacji',
    uploadStagePutSummary: 'Wyślij bajty pliku do tymczasowego przesyłania',
    uploadStageDeleteSummary: 'Usuń tymczasowe przesyłanie',
    uploadStageResult: 'Gotowe, bez treści',

    error400: 'Błąd walidacji lub zapytania (ValidationError, QueryError)',
    error401: 'Brak uwierzytelnienia (AuthenticationError)',
    error403: 'Zabronione przez kontrolę dostępu (Forbidden, UnverifiedEmail)',
    error404: 'Nie znaleziono dokumentu (NotFound)',
    error500: 'Wewnętrzny błąd serwera (APIError)',

    securityBearer:
      'Wklej `token` zwrócony przez endpoint logowania. Wysyłany jako `Authorization: Bearer <token>`. Payload akceptuje również schemat `JWT <token>` oraz cookie `{{cookiePrefix}}-token`.',
    securityInteractive:
      'Logowanie interaktywne: wpisz nazwę użytkownika (lub e-mail) i hasło; pozostaw Client ID/Secret puste.',

    tagCollections: 'Kolekcje',
    tagCollectionsDesc: 'Endpointy kolekcji dokumentów (CRUD, liczenie, duplikowanie).',
    tagGlobals: 'Globalne',
    tagGlobalsDesc: 'Endpointy dokumentów globalnych.',
    tagSystem: 'System',
    tagSystemDesc: 'Endpointy systemowe Payload.',
    tagAuth: 'Uwierzytelnianie',
    tagVersions: 'Wersje',
    tagJobs: 'Zadania',
    tagUploads: 'Przesyłanie plików',
    tagAccess: 'Dostęp',

    localizationHeading: 'Lokalizacja',
    localizationNote:
      'Dostępne języki: {{locales}}. Przekaż `?locale=<code>` do endpointu odczytu, aby wybrać jeden. Przekaż `?locale=all`, aby otrzymać wszystkie języki naraz — każde pole zlokalizowane jest wtedy zwracane jako obiekt z kluczami w postaci kodów języków (np. `{ \\"en\\": \\"Hello\\", \\"de\\": \\"Hallo\\" }`) zamiast pojedynczej wartości. Ustaw `?flattenLocales=false` wraz z `locale=all`, aby zachować tę postać obiektu z podziałem na języki. Schematy pól pokazują postać jednojęzyczną.',
    docLanguagesNote:
      'Ta dokumentacja jest dostępna w językach: {{languages}}. Dodaj `?lang=<code>` do adresu URL tej specyfikacji, aby zmienić język.',
  },
}
