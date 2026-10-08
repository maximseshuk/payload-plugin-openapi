import type { PluginDefaultTranslationsObject } from '@/shared/translations/types.js'

export const hr: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Koliko razina povezanih dokumenata popuniti.',
    paramSort: 'Polje za sortiranje; dodajte prefiks `-` za silazni redoslijed, npr. `-createdAt`.',
    paramSortShort: 'Polje za sortiranje; dodajte prefiks `-` za silazni redoslijed.',
    paramDraft: 'Vrati skicirane verzije.',
    paramTrash: 'Uključi dokumente u smeću.',
    paramAutosave:
      'Spremi kao automatsko spremanje: ažurira zadnju automatski spremljenu verziju umjesto dodavanja nove.',
    paramPublishAllLocales: 'Objavi sve jezike, ne samo jezik zahtjeva.',
    paramUnpublishAllLocales: 'Poništi objavu svih jezika i vrati dokument u skicu.',
    paramOverrideLock: 'Zanemari zaključavanje drugog korisnika. Zadano false.',
    paramSelectedLocales: 'Kopiraj samo ove jezike u duplikat. Zadano: svi jezici.',
    paramFlattenLocales:
      'Uz `locale=all`, postavite na false kako bi lokalizirana polja ostala kao objekti po lokalizaciji. Zadano je true.',
    paramLocale:
      'Lokalizacija koja se vraća ili `all` za svaku lokalizaciju. Pogledajte odjeljak Lokalizacija u opisu API-ja.',
    paramFallbackLocale: 'Lokalizacija na koju se vraća za vrijednosti koje nedostaju ili `none` za onemogućavanje.',
    paramValidateLocale:
      'Lokalizacije za provjeru ili `all` za svaku lokalizaciju. Ponovite parametar za više od jedne lokalizacije.',
    paramComputeHierarchyPaths:
      'Postavite true za izračun putanja `{{slugPath}}` i `{{titlePath}}`. Odabir bilo kojeg od tih polja također ih izračunava.',

    schemaSelect: 'Odaberite polja koja se vraćaju, npr. `select[title]=true`. Izostavite za vraćanje svih.',
    schemaPopulate: 'Popunite povezane dokumente po kolekciji, npr. `populate[posts][title]=true`.',
    schemaJoins: 'Kontrole po spajanju (limit/page/sort/where/count), npr. `joins[posts][limit]=10`.',
    schemaWhere:
      'Payload `where` filtar. Ugnijezdite polje pa operator: `where[field][equals]=value`. Kombinirajte uvjete pomoću nizova `and` / `or`, npr. `where[or][0][field][equals]=value`. Svako polje navodi samo operatore valjane za svoj tip.',
    schemaSupportedTimezones: 'Podržane vremenske zone u IANA formatu.',
    schemaPerLocale: 'Vrijednosti po lokalizaciji, vraćaju se uz `locale=all`.',
    schemaHierarchySlugPath:
      'Putanja slugova, npr. `parent/child`. Izračunava se pri čitanju s `computeHierarchyPaths=true` ili kad je odabrana. Ne može se koristiti u `where`.',
    schemaHierarchyTitlePath:
      'Putanja naslova, npr. `Parent/Child`. Izračunava se pri čitanju s `computeHierarchyPaths=true` ili kad je odabrana. Ne može se koristiti u `where`.',

    collectionList: 'Paginirani popis dokumenata',
    collectionDoc: 'Jedan dokument',
    collectionCreated: 'Stvoreni dokument',
    collectionUpdated: 'Ažurirani dokument',
    collectionDeleted: 'Obrisani dokument',
    collectionBulkUpdate: 'Rezultat skupnog ažuriranja',
    collectionBulkDelete: 'Rezultat skupnog brisanja',
    collectionCount: 'Broj dokumenata',
    collectionDuplicated: 'Duplicirani dokument',
    validateResult:
      'Rezultat provjere. Ništa se ne sprema. Nevažeće vrijednosti polja vraćaju `valid: false` s pogreškama, a ne status pogreške.',
    validateBody:
      'Podaci dokumenta za provjeru. Na spremljenom dokumentu ili globalnom dokumentu podaci se spajaju preko najnovije skice, ili spremljenog dokumenta ako skice nema.',

    globalDoc: 'Globalni dokument',

    authLogin: 'Rezultat prijave',
    authLogout: 'Rezultat odjave',
    authMe: 'Trenutno autenticirani korisnik',
    authRefreshToken: 'Osvježeni token',
    authForgotPassword: 'E-pošta za poništavanje lozinke poslana',
    authResetPassword: 'Rezultat poništavanja lozinke',
    authFirstRegister: 'Prvi korisnik, stvoren s tokenom za autentikaciju',
    authInit: 'Ima li ova autentikacijska kolekcija već korisnike',
    authAccess: 'Dozvole trenutnog korisnika za sve kolekcije i globale',
    docAccess: 'Dozvole trenutnog korisnika za ovaj dokument',
    docAccessBody:
      'Podaci dokumenta prema kojima se provjerava pristup. Bez njih Payload koristi spremljeni dokument, ako postoji.',
    authUnlock: 'Rezultat otključavanja',
    authVerify: 'Rezultat verifikacije',
    apiKeyReveal: 'Dešifrirani API ključ',

    versionList: 'Paginirani popis verzija',
    versionSingle: 'Jedna verzija',
    versionRestored: 'Vraćeni dokument',
    versionWhere: 'Filtriraj po poljima verzije, npr. `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'Pokreni poslove iz reda (i, prema zadanim postavkama, obradi rasporede)',
    jobsSchedulesSummary: 'Stavi u red poslove koji su dospjeli prema svom rasporedu',
    jobsRunResult: 'Rezultat pokretanja',
    jobsSchedulesResult: 'Rezultat rasporeda',
    jobsRunAllQueues: 'Pokreni poslove u svim redovima.',
    jobsLimit: 'Maksimalan broj poslova za pokretanje.',
    jobsDisableScheduling: 'Preskoči obradu rasporeda koju `run` izvodi prema zadanim postavkama.',
    jobsSilent: 'Potisni zapisivanje pokretanja.',
    jobsSchedulesAllQueues: 'Obradi rasporede u svim redovima.',
    jobsQueue: 'Ograniči operaciju na jedan red. Poznati redovi: {{queues}}.',

    uploadFile: 'Binarna datoteka za prijenos.',
    uploadBody:
      'Pošaljite `multipart/form-data` za prijenos datoteke (binarni dio `file` plus dio `_payload` s poljima pretvorenima u JSON niz) ili `application/json` samo s poljima kada nema datoteke.',
    uploadPayloadField: 'Polja {{schema}} pretvorena u JSON niz. Primjer: `{\\"alt\\":\\"A caption\\"}`.',
    fileServe: 'Datoteka',
    filePartial: 'Dio datoteke za zahtjev `Range`',
    uploadInstructionsSummary: 'Dohvati upute za prijenos datoteke prije spremanja dokumenta',
    uploadInstructionsResult:
      'Kamo poslati bajtove datoteke i vrijednost `file` koja se šalje sa zahtjevom za stvaranje ili ažuriranje',
    uploadStagePutSummary: 'Pošalji bajtove datoteke za privremeni prijenos',
    uploadStageDeleteSummary: 'Izbriši privremeni prijenos',
    uploadStageResult: 'Gotovo, bez sadržaja',

    error400: 'Pogreška valjanosti ili upita (ValidationError, QueryError)',
    error401: 'Nije autenticirano (AuthenticationError)',
    error403: 'Zabranjeno kontrolom pristupa (Forbidden, UnverifiedEmail)',
    error404: 'Dokument nije pronađen (NotFound)',
    error500: 'Interna pogreška poslužitelja (APIError)',

    securityBearer:
      'Zalijepite `token` koji vraća krajnja točka za prijavu. Šalje se kao `Authorization: Bearer <token>`. Payload također prihvaća shemu `JWT <token>` i kolačić `{{cookiePrefix}}-token`.',
    securityInteractive:
      'Interaktivna prijava: unesite korisničko ime (ili e-poštu) i lozinku; ostavite Client ID/Secret prazne.',

    tagCollections: 'Kolekcije',
    tagCollectionsDesc: 'Krajnje točke kolekcija dokumenata (CRUD, brojanje, dupliciranje).',
    tagGlobals: 'Globali',
    tagGlobalsDesc: 'Krajnje točke globalnih dokumenata.',
    tagSystem: 'Sustav',
    tagSystemDesc: 'Krajnje točke sustava Payload.',
    tagAuth: 'Autentikacija',
    tagVersions: 'Verzije',
    tagJobs: 'Poslovi',
    tagUploads: 'Prijenosi',
    tagAccess: 'Pristup',

    localizationHeading: 'Lokalizacija',
    localizationNote:
      'Dostupne lokalizacije: {{locales}}. Proslijedite `?locale=<code>` krajnjoj točki za čitanje kako biste odabrali jednu. Proslijedite `?locale=all` za primanje svih lokalizacija odjednom — svako lokalizirano polje tada se vraća kao objekt s ključem prema kodu lokalizacije (npr. `{ \\"en\\": \\"Hello\\", \\"de\\": \\"Hallo\\" }`) umjesto kao jedna vrijednost. Postavite `?flattenLocales=false` uz `locale=all` kako bi taj oblik objekta po lokalizaciji ostao sačuvan. Sheme polja prikazuju oblik za jednu lokalizaciju.',
    docLanguagesNote:
      'Ova dokumentacija dostupna je na sljedećim jezicima: {{languages}}. Dodajte `?lang=<code>` ovom URL-u specifikacije za promjenu jezika.',
  },
}
