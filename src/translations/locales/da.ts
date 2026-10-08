import type { PluginDefaultTranslationsObject } from '../types.js'

export const da: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Hvor mange niveauer af relaterede dokumenter der skal populeres.',
    paramSort: 'Felt at sortere efter; sæt `-` foran for faldende rækkefølge, f.eks. `-createdAt`.',
    paramSortShort: 'Felt at sortere efter; sæt `-` foran for faldende rækkefølge.',
    paramDraft: 'Returnér kladdeversioner.',
    paramTrash: 'Inkludér slettede dokumenter.',
    paramAutosave: 'Gem som autogem: opdaterer den seneste autogemte version i stedet for at tilføje en ny.',
    paramPublishAllLocales: 'Udgiv alle sprog, ikke kun forespørgslens sprog.',
    paramUnpublishAllLocales: 'Afpublicér alle sprog og sæt dokumentet tilbage til kladde.',
    paramOverrideLock: 'Ignorér en lås fra en anden bruger. Standard false.',
    paramSelectedLocales: 'Kopiér kun disse sprog til dubletten. Standard: alle sprog.',
    paramFlattenLocales:
      'Med `locale=all` skal du sætte false for at bevare lokaliserede felter som objekter pr. sprog. Standard er true.',
    paramLocale: 'Sprog der skal returneres, eller `all` for alle sprog. Se afsnittet Lokalisering i API-beskrivelsen.',
    paramFallbackLocale:
      'Sprog der skal falde tilbage til for manglende lokaliserede værdier, eller `none` for at deaktivere.',

    schemaSelect: 'Vælg hvilke felter der skal returneres, f.eks. `select[title]=true`. Udelad for at returnere alle.',
    schemaPopulate: 'Populér relaterede dokumenter pr. collection, f.eks. `populate[posts][title]=true`.',
    schemaJoins: 'Styring pr. join (limit/page/sort/where/count), f.eks. `joins[posts][limit]=10`.',
    schemaWhere:
      'Payload `where`-filter. Indlejr et felt og derefter en operator: `where[field][equals]=value`. Kombinér betingelser med `and`- / `or`-arrays, f.eks. `where[or][0][field][equals]=value`. Hvert felt angiver kun de operatorer, der er gyldige for dets type.',
    schemaSupportedTimezones: 'Understøttede tidszoner i IANA-format.',
    schemaPerLocale: 'Værdier pr. sprog, returneres når `locale=all`.',

    collectionList: 'Pagineret liste over dokumenter',
    collectionDoc: 'Et enkelt dokument',
    collectionCreated: 'Oprettet dokument',
    collectionUpdated: 'Opdateret dokument',
    collectionDeleted: 'Slettet dokument',
    collectionBulkUpdate: 'Resultat af masseopdatering',
    collectionBulkDelete: 'Resultat af masseslettelse',
    collectionCount: 'Antal dokumenter',
    collectionDuplicated: 'Det duplikerede dokument',

    globalDoc: 'Det globale dokument',

    authLogin: 'Login-resultat',
    authLogout: 'Logout-resultat',
    authMe: 'Den aktuelt godkendte bruger',
    authRefreshToken: 'Fornyet token',
    authForgotPassword: 'E-mail til nulstilling af adgangskode er sendt',
    authResetPassword: 'Resultat af nulstilling af adgangskode',
    authFirstRegister: 'Den første bruger, oprettet med en auth-token',
    authInit: 'Om denne auth-collection allerede har brugere',
    authAccess: 'Den aktuelle brugers adgang (tilladelser) for denne collection',
    authUnlock: 'Resultat af oplåsning',
    authVerify: 'Resultat af verifikation',

    versionList: 'Pagineret liste over versioner',
    versionSingle: 'En enkelt version',
    versionRestored: 'Det gendannede dokument',
    versionWhere: 'Filtrér over versionsfelter, f.eks. `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'Kør jobs i kø (og håndtér som standard tidsplaner)',
    jobsSchedulesSummary: 'Sæt jobs i kø, som forfalder ifølge deres tidsplan',
    jobsRunResult: 'Kørselsresultat',
    jobsSchedulesResult: 'Resultat af planlægning',
    jobsRunAllQueues: 'Kør jobs på tværs af alle køer.',
    jobsLimit: 'Maksimalt antal jobs at køre.',
    jobsDisableScheduling: 'Spring den tidsplanshåndtering over, som `run` udfører som standard.',
    jobsSilent: 'Undertryk kørselslogning.',
    jobsSchedulesAllQueues: 'Håndtér tidsplaner på tværs af alle køer.',
    jobsQueue: 'Begræns operationen til en enkelt kø. Kendte køer: {{queues}}.',

    uploadFile: 'Den binære fil, der skal uploades.',
    uploadBody:
      'Send `multipart/form-data` for at uploade en fil (en binær `file`-del plus en `_payload`-del med de JSON-strengkodede felter), eller `application/json` med blot felterne, når der ikke er nogen fil.',
    uploadPayloadField: 'JSON-strengkodede {{schema}}-felter. Eksempel: `{"alt":"A caption"}`.',

    error400: 'Validerings- eller forespørgselsfejl (ValidationError, QueryError)',
    error401: 'Ikke godkendt (AuthenticationError)',
    error403: 'Forbudt af adgangskontrol (Forbidden, UnverifiedEmail)',
    error404: 'Dokument ikke fundet (NotFound)',
    error500: 'Intern serverfejl (APIError)',

    securityBearer:
      'Indsæt den `token`, som login-endepunktet returnerer. Sendes som `Authorization: Bearer <token>`. Payload accepterer også `JWT <token>`-skemaet og en `{{cookiePrefix}}-token`-cookie.',
    securityInteractive:
      'Interaktivt login: indtast brugernavn (eller e-mail) og adgangskode; lad Client ID/Secret stå tomme.',

    tagCollections: 'Collections',
    tagCollectionsDesc: 'Endepunkter for dokument-collections (CRUD, antal, duplikering).',
    tagGlobals: 'Globals',
    tagGlobalsDesc: 'Endepunkter for globale dokumenter.',
    tagSystem: 'System',
    tagSystemDesc: 'Payload-systemendepunkter.',
    tagAuth: 'Auth',
    tagVersions: 'Versioner',
    tagJobs: 'Jobs',

    localizationHeading: 'Lokalisering',
    localizationNote:
      'Tilgængelige sprog: {{locales}}. Angiv `?locale=<code>` til et læseendepunkt for at vælge ét. Angiv `?locale=all` for at modtage alle sprog på én gang — hvert lokaliseret felt returneres så som et objekt med sprogkoden som nøgle (f.eks. `{ "en": "Hello", "de": "Hallo" }`) i stedet for en enkelt værdi. Sæt `?flattenLocales=false` sammen med `locale=all` for at bevare denne objektform pr. sprog. Feltskemaer viser formen for ét sprog.',
    docLanguagesNote:
      'Denne dokumentation findes på: {{languages}}. Tilføj `?lang=<code>` til denne spec-URL for at skifte sprog.',
  },
}
