import type { PluginDefaultTranslationsObject } from '@/shared/translations/types.js'

export const rsLatin: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Koliko nivoa povezanih dokumenata treba popuniti.',
    paramSort: 'Polje po kojem se sortira; dodajte prefiks `-` za opadajući redosled, npr. `-createdAt`.',
    paramSortShort: 'Polje po kojem se sortira; dodajte prefiks `-` za opadajući redosled.',
    paramDraft: 'Vrati verzije nacrta.',
    paramTrash: 'Uključi obrisane dokumente.',
    paramAutosave:
      'Sačuvaj kao automatsko čuvanje: ažurira poslednju automatski sačuvanu verziju umesto dodavanja nove.',
    paramPublishAllLocales: 'Objavi sve jezike, ne samo jezik zahteva.',
    paramUnpublishAllLocales: 'Poništi objavu svih jezika i vrati dokument u nacrt.',
    paramOverrideLock: 'Zanemari zaključavanje drugog korisnika. Podrazumevano false.',
    paramSelectedLocales: 'Kopiraj samo ove jezike u duplikat. Podrazumevano: svi jezici.',
    paramFlattenLocales:
      'Uz `locale=all`, postavite na false da biste lokalizovana polja zadržali kao objekte po lokalitetu. Podrazumevano true.',
    paramLocale:
      'Lokalitet koji se vraća, ili `all` za sve lokalitete. Pogledajte odeljak Lokalizacija u opisu API-ja.',
    paramFallbackLocale:
      'Lokalitet na koji se vraća za nedostajuće lokalizovane vrednosti, ili `none` za onemogućavanje.',
    paramValidateLocale:
      'Lokaliteti za proveru, ili `all` za sve lokalitete. Ponovite parametar za više od jednog lokaliteta.',
    paramComputeHierarchyPaths:
      'Postavite true da biste izračunali putanje `{{slugPath}}` i `{{titlePath}}`. Izbor bilo kog od tih polja ih takođe izračunava.',

    schemaSelect: 'Izaberite polja koja se vraćaju, npr. `select[title]=true`. Izostavite da biste vratili sva.',
    schemaPopulate: 'Popunite povezane dokumente po kolekciji, npr. `populate[posts][title]=true`.',
    schemaJoins: 'Kontrole po spajanju (limit/page/sort/where/count), npr. `joins[posts][limit]=10`.',
    schemaWhere:
      'Payload `where` filter. Ugnezdite polje pa operator: `where[field][equals]=value`. Kombinujte uslove pomoću nizova `and` / `or`, npr. `where[or][0][field][equals]=value`. Svako polje navodi samo operatore koji važe za njegov tip.',
    schemaSupportedTimezones: 'Podržane vremenske zone u IANA formatu.',
    schemaPerLocale: 'Vrednosti po lokalitetu, vraćaju se kada je `locale=all`.',
    schemaHierarchySlugPath:
      'Putanja slug vrednosti, npr. `parent/child`. Izračunava se pri čitanju sa `computeHierarchyPaths=true` ili kada je izabrana. Ne može se koristiti u `where`.',
    schemaHierarchyTitlePath:
      'Putanja naslova, npr. `Parent/Child`. Izračunava se pri čitanju sa `computeHierarchyPaths=true` ili kada je izabrana. Ne može se koristiti u `where`.',

    collectionList: 'Stranicama podeljena lista dokumenata',
    collectionDoc: 'Jedan dokument',
    collectionCreated: 'Kreiran dokument',
    collectionUpdated: 'Ažuriran dokument',
    collectionDeleted: 'Obrisan dokument',
    collectionBulkUpdate: 'Rezultat grupnog ažuriranja',
    collectionBulkDelete: 'Rezultat grupnog brisanja',
    collectionCount: 'Broj dokumenata',
    collectionDuplicated: 'Duplirani dokument',
    validateResult:
      'Rezultat provere. Ništa se ne čuva. Nevažeće vrednosti polja vraćaju `valid: false` sa greškama, a ne status greške.',
    validateBody:
      'Podaci dokumenta za proveru. Na sačuvanom dokumentu ili globalnom dokumentu podaci se spajaju preko najnovijeg nacrta, ili sačuvanog dokumenta ako nacrta nema.',

    globalDoc: 'Globalni dokument',

    authLogin: 'Rezultat prijave',
    authLogout: 'Rezultat odjave',
    authMe: 'Trenutno prijavljeni korisnik',
    authRefreshToken: 'Osvežen token',
    authForgotPassword: 'Imejl za resetovanje lozinke je poslat',
    authResetPassword: 'Rezultat resetovanja lozinke',
    authFirstRegister: 'Prvi korisnik, kreiran sa tokenom za autentifikaciju',
    authInit: 'Da li ova kolekcija za autentifikaciju već ima korisnike',
    authAccess: 'Dozvole trenutnog korisnika za sve kolekcije i globale',
    docAccess: 'Dozvole trenutnog korisnika za ovaj dokument',
    docAccessBody:
      'Podaci dokumenta prema kojima se proverava pristup. Bez njih Payload koristi sačuvani dokument, ako postoji.',
    authUnlock: 'Rezultat otključavanja',
    authVerify: 'Rezultat verifikacije',
    apiKeyReveal: 'Dešifrovani API ključ',

    versionList: 'Stranicama podeljena lista verzija',
    versionSingle: 'Jedna verzija',
    versionRestored: 'Vraćeni dokument',
    versionWhere: 'Filter po poljima verzije, npr. `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'Pokreni poslove iz reda (i, podrazumevano, obradi rasporede)',
    jobsSchedulesSummary: 'Stavi u red poslove koji su na redu prema svom rasporedu',
    jobsRunResult: 'Rezultat pokretanja',
    jobsSchedulesResult: 'Rezultat raspoređivanja',
    jobsRunAllQueues: 'Pokreni poslove u svim redovima.',
    jobsLimit: 'Maksimalan broj poslova za pokretanje.',
    jobsDisableScheduling: 'Preskoči obradu rasporeda koju `run` podrazumevano radi.',
    jobsSilent: 'Potisni beleženje pokretanja.',
    jobsSchedulesAllQueues: 'Obradi rasporede u svim redovima.',
    jobsQueue: 'Ograniči operaciju na jedan red. Poznati redovi: {{queues}}.',

    uploadFile: 'Binarna datoteka za otpremanje.',
    uploadBody:
      'Pošaljite `multipart/form-data` za otpremanje datoteke (binarni `file` deo plus `_payload` deo sa poljima pretvorenim u JSON string), ili `application/json` samo sa poljima kada nema datoteke.',
    uploadPayloadField: '{{schema}} polja pretvorena u JSON string. Primer: `{"alt":"A caption"}`.',
    fileServe: 'Datoteka',
    filePartial: 'Deo datoteke za `Range` zahtev',
    uploadInstructionsSummary: 'Preuzimanje uputstava za otpremanje datoteke pre čuvanja dokumenta',
    uploadInstructionsResult:
      'Gde poslati bajtove datoteke i vrednost `file` koja se šalje uz zahtev za kreiranje ili ažuriranje',
    uploadStagePutSummary: 'Slanje bajtova datoteke za privremeno otpremanje',
    uploadStageDeleteSummary: 'Brisanje privremenog otpremanja',
    uploadStageResult: 'Gotovo, bez sadržaja',

    error400: 'Greška u validaciji ili upitu (ValidationError, QueryError)',
    error401: 'Niste autentifikovani (AuthenticationError)',
    error403: 'Zabranjeno kontrolom pristupa (Forbidden, UnverifiedEmail)',
    error404: 'Dokument nije pronađen (NotFound)',
    error500: 'Interna greška servera (APIError)',

    securityBearer:
      'Nalepite `token` koji vraća endpoint za prijavu. Šalje se kao `Authorization: Bearer <token>`. Payload takođe prihvata `JWT <token>` šemu i `{{cookiePrefix}}-token` kolačić.',
    securityInteractive:
      'Interaktivna prijava: unesite korisničko ime (ili imejl) i lozinku; ostavite Client ID/Secret prazne.',

    tagCollections: 'Kolekcije',
    tagCollectionsDesc: 'Endpointi kolekcija dokumenata (CRUD, broj, dupliranje).',
    tagGlobals: 'Globali',
    tagGlobalsDesc: 'Endpointi globalnih dokumenata.',
    tagSystem: 'Sistem',
    tagSystemDesc: 'Payload sistemski endpointi.',
    tagAuth: 'Autentifikacija',
    tagVersions: 'Verzije',
    tagJobs: 'Poslovi',
    tagUploads: 'Otpremanja',
    tagAccess: 'Pristup',

    localizationHeading: 'Lokalizacija',
    localizationNote:
      'Dostupni lokaliteti: {{locales}}. Prosledite `?locale=<code>` endpointu za čitanje da biste izabrali jedan. Prosledite `?locale=all` da biste odjednom dobili sve lokalitete — svako lokalizovano polje se tada vraća kao objekat sa ključevima po kodu lokaliteta (npr. `{ "en": "Hello", "de": "Hallo" }`) umesto kao pojedinačna vrednost. Postavite `?flattenLocales=false` uz `locale=all` da biste zadržali taj oblik objekta po lokalitetu. Šeme polja prikazuju oblik za jedan lokalitet.',
    docLanguagesNote:
      'Ova dokumentacija je dostupna na sledećim jezicima: {{languages}}. Dodajte `?lang=<code>` na ovaj URL specifikacije da biste promenili jezik.',
  },
}
