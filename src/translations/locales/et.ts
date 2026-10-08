import type { PluginDefaultTranslationsObject } from '../types.js'

export const et: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Mitut seotud dokumentide taset täita.',
    paramSort: 'Väli, mille järgi sorteerida; kahanevaks järjestamiseks lisa ette `-`, nt `-createdAt`.',
    paramSortShort: 'Väli, mille järgi sorteerida; kahanevaks järjestamiseks lisa ette `-`.',
    paramDraft: 'Tagasta mustandversioonid.',
    paramTrash: 'Kaasa prügikasti liigutatud dokumendid.',
    paramAutosave:
      'Salvesta automaatsalvestusena: uuendab viimast automaatselt salvestatud versiooni uue lisamise asemel.',
    paramPublishAllLocales: 'Avalda kõik keeled, mitte ainult päringu keel.',
    paramUnpublishAllLocales: 'Tühista kõigi keelte avaldamine ja muuda dokument tagasi mustandiks.',
    paramOverrideLock: 'Eira teise kasutaja lukku. Vaikimisi false.',
    paramSelectedLocales: 'Kopeeri duplikaati ainult need keeled. Vaikimisi: kõik keeled.',
    paramFlattenLocales:
      'Väärtusega `locale=all` määra false, et hoida lokaliseeritud välju lokaadipõhiste objektidena. Vaikimisi true.',
    paramLocale: 'Tagastatav lokaat või `all` kõigi lokaatide jaoks. Vaata API kirjelduses jaotist Lokaliseerimine.',
    paramFallbackLocale:
      'Lokaat, millele puuduvate lokaliseeritud väärtuste korral tagasi pöörduda, või `none` selle keelamiseks.',

    schemaSelect: 'Vali tagastatavad väljad, nt `select[title]=true`. Kõigi tagastamiseks jäta tühjaks.',
    schemaPopulate: 'Täida seotud dokumendid kollektsiooni kaupa, nt `populate[posts][title]=true`.',
    schemaJoins: 'Ühenduse-põhised juhtnupud (limit/page/sort/where/count), nt `joins[posts][limit]=10`.',
    schemaWhere:
      'Payloadi `where` filter. Pesasta väli ja seejärel operaator: `where[field][equals]=value`. Kombineeri klausleid massiividega `and` / `or`, nt `where[or][0][field][equals]=value`. Iga väli loetleb ainult tema tüübi jaoks sobivad operaatorid.',
    schemaSupportedTimezones: 'Toetatud ajavööndid IANA vormingus.',
    schemaPerLocale: 'Lokaadipõhised väärtused, tagastatakse väärtusega `locale=all`.',

    collectionList: 'Lehekülgedeks jaotatud dokumentide loend',
    collectionDoc: 'Üksik dokument',
    collectionCreated: 'Loodud dokument',
    collectionUpdated: 'Uuendatud dokument',
    collectionDeleted: 'Kustutatud dokument',
    collectionBulkUpdate: 'Hulgiuuenduse tulemus',
    collectionBulkDelete: 'Hulgikustutuse tulemus',
    collectionCount: 'Dokumentide arv',
    collectionDuplicated: 'Dubleeritud dokument',

    globalDoc: 'Globaalne dokument',

    authLogin: 'Sisselogimise tulemus',
    authLogout: 'Väljalogimise tulemus',
    authMe: 'Praegu autenditud kasutaja',
    authRefreshToken: 'Värskendatud token',
    authForgotPassword: 'Parooli lähtestamise e-kiri saadetud',
    authResetPassword: 'Parooli lähtestamise tulemus',
    authFirstRegister: 'Esimene kasutaja, loodud koos autentimistokeniga',
    authInit: 'Kas sellel autentimiskollektsioonil on juba kasutajaid',
    authAccess: 'Praeguse kasutaja juurdepääs (õigused) selle kollektsiooni jaoks',
    authUnlock: 'Avamise tulemus',
    authVerify: 'Kinnitamise tulemus',

    versionList: 'Lehekülgedeks jaotatud versioonide loend',
    versionSingle: 'Üksik versioon',
    versionRestored: 'Taastatud dokument',
    versionWhere: 'Filtreeri versiooniväljade järgi, nt `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'Käivita järjekorras olevad tööd (ja vaikimisi käsitle ajakavu)',
    jobsSchedulesSummary: 'Lisa järjekorda tööd, mille tähtaeg on ajakava järgi saabunud',
    jobsRunResult: 'Käivitamise tulemus',
    jobsSchedulesResult: 'Ajakava käsitlemise tulemus',
    jobsRunAllQueues: 'Käivita tööd kõigis järjekordades.',
    jobsLimit: 'Maksimaalne käivitatavate tööde arv.',
    jobsDisableScheduling: 'Jäta vahele ajakava käsitlemine, mida `run` vaikimisi teeb.',
    jobsSilent: 'Summuta käivitamise logimine.',
    jobsSchedulesAllQueues: 'Käsitle ajakavu kõigis järjekordades.',
    jobsQueue: 'Piira toiming ühe järjekorraga. Teadaolevad järjekorrad: {{queues}}.',

    uploadFile: 'Üleslaaditav binaarfail.',
    uploadBody:
      'Faili üleslaadimiseks saada `multipart/form-data` (binaarne `file` osa pluss `_payload` osa JSON-stringitud väljadega) või `application/json` ainult väljadega, kui faili pole.',
    uploadPayloadField: 'JSON-stringitud {{schema}} väljad. Näide: `{\\"alt\\":\\"A caption\\"}`.',

    error400: 'Valideerimis- või päringuviga (ValidationError, QueryError)',
    error401: 'Autentimata (AuthenticationError)',
    error403: 'Juurdepääsukontrolli tõttu keelatud (Forbidden, UnverifiedEmail)',
    error404: 'Dokumenti ei leitud (NotFound)',
    error500: 'Serveri sisemine viga (APIError)',

    securityBearer:
      'Kleebi sisselogimise lõpp-punkti tagastatud `token`. Saadetakse kujul `Authorization: Bearer <token>`. Payload aktsepteerib ka skeemi `JWT <token>` ja küpsist `{{cookiePrefix}}-token`.',
    securityInteractive:
      'Interaktiivne sisselogimine: sisesta kasutajanimi (või e-post) ja parool; jäta Client ID/Secret tühjaks.',

    tagCollections: 'Kollektsioonid',
    tagCollectionsDesc: 'Dokumendikollektsioonide lõpp-punktid (CRUD, loendamine, dubleerimine).',
    tagGlobals: 'Globaalid',
    tagGlobalsDesc: 'Globaalsete dokumentide lõpp-punktid.',
    tagSystem: 'Süsteem',
    tagSystemDesc: 'Payloadi süsteemilõpp-punktid.',
    tagAuth: 'Autentimine',
    tagVersions: 'Versioonid',
    tagJobs: 'Tööd',

    localizationHeading: 'Lokaliseerimine',
    localizationNote:
      'Saadaolevad lokaadid: {{locales}}. Ühe valimiseks edasta lugemise lõpp-punktile `?locale=<code>`. Kõigi lokaatide korraga saamiseks edasta `?locale=all` — iga lokaliseeritud väli tagastatakse siis objektina, mille võtmeteks on lokaadikoodid (nt `{ \\"en\\": \\"Hello\\", \\"de\\": \\"Hallo\\" }`) ühe väärtuse asemel. Selle lokaadipõhise objektivormi säilitamiseks määra `?flattenLocales=false` koos `locale=all`. Väljaskeemid kuvavad ühe lokaadi kuju.',
    docLanguagesNote:
      'See dokumentatsioon on saadaval keeltes: {{languages}}. Keele vahetamiseks lisa selle spetsifikatsiooni URL-ile `?lang=<code>`.',
  },
}
