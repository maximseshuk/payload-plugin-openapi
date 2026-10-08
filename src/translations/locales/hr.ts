import type { PluginDefaultTranslationsObject } from '../types.js'

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

    schemaSelect: 'Odaberite polja koja se vraćaju, npr. `select[title]=true`. Izostavite za vraćanje svih.',
    schemaPopulate: 'Popunite povezane dokumente po kolekciji, npr. `populate[posts][title]=true`.',
    schemaJoins: 'Kontrole po spajanju (limit/page/sort/where/count), npr. `joins[posts][limit]=10`.',
    schemaWhere:
      'Payload `where` filtar. Ugnijezdite polje pa operator: `where[field][equals]=value`. Kombinirajte uvjete pomoću nizova `and` / `or`, npr. `where[or][0][field][equals]=value`. Svako polje navodi samo operatore valjane za svoj tip.',
    schemaSupportedTimezones: 'Podržane vremenske zone u IANA formatu.',
    schemaPerLocale: 'Vrijednosti po lokalizaciji, vraćaju se uz `locale=all`.',

    collectionList: 'Paginirani popis dokumenata',
    collectionDoc: 'Jedan dokument',
    collectionCreated: 'Stvoreni dokument',
    collectionUpdated: 'Ažurirani dokument',
    collectionDeleted: 'Obrisani dokument',
    collectionBulkUpdate: 'Rezultat skupnog ažuriranja',
    collectionBulkDelete: 'Rezultat skupnog brisanja',
    collectionCount: 'Broj dokumenata',
    collectionDuplicated: 'Duplicirani dokument',

    globalDoc: 'Globalni dokument',

    authLogin: 'Rezultat prijave',
    authLogout: 'Rezultat odjave',
    authMe: 'Trenutno autenticirani korisnik',
    authRefreshToken: 'Osvježeni token',
    authForgotPassword: 'E-pošta za poništavanje lozinke poslana',
    authResetPassword: 'Rezultat poništavanja lozinke',
    authFirstRegister: 'Prvi korisnik, stvoren s tokenom za autentikaciju',
    authInit: 'Ima li ova autentikacijska kolekcija već korisnike',
    authAccess: 'Pristup (dozvole) trenutnog korisnika za ovu kolekciju',
    authUnlock: 'Rezultat otključavanja',
    authVerify: 'Rezultat verifikacije',

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

    localizationHeading: 'Lokalizacija',
    localizationNote:
      'Dostupne lokalizacije: {{locales}}. Proslijedite `?locale=<code>` krajnjoj točki za čitanje kako biste odabrali jednu. Proslijedite `?locale=all` za primanje svih lokalizacija odjednom — svako lokalizirano polje tada se vraća kao objekt s ključem prema kodu lokalizacije (npr. `{ \\"en\\": \\"Hello\\", \\"de\\": \\"Hallo\\" }`) umjesto kao jedna vrijednost. Postavite `?flattenLocales=false` uz `locale=all` kako bi taj oblik objekta po lokalizaciji ostao sačuvan. Sheme polja prikazuju oblik za jednu lokalizaciju.',
    docLanguagesNote:
      'Ova dokumentacija dostupna je na sljedećim jezicima: {{languages}}. Dodajte `?lang=<code>` ovom URL-u specifikacije za promjenu jezika.',
  },
}
