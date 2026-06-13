import type { PluginDefaultTranslationsObject } from '../types.js'

export const nb: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Hvor mange nivåer av relaterte dokumenter som skal populeres.',
    paramSort: 'Felt å sortere etter; sett `-` foran for synkende rekkefølge, f.eks. `-createdAt`.',
    paramSortShort: 'Felt å sortere etter; sett `-` foran for synkende rekkefølge.',
    paramDraft: 'Returner utkastversjoner.',
    paramTrash: 'Inkluder dokumenter i papirkurven.',
    paramFlattenLocales:
      'Med `locale=all`, sett til false for å beholde lokaliserte felt som objekter per locale. Standard er true.',
    paramLocale:
      'Locale som skal returneres, eller `all` for alle locales. Se Lokalisering-seksjonen i API-beskrivelsen.',
    paramFallbackLocale: 'Locale å falle tilbake til for manglende lokaliserte verdier, eller `none` for å deaktivere.',

    schemaSelect: 'Velg felt som skal returneres, f.eks. `select[title]=true`. Utelat for å returnere alle.',
    schemaPopulate: 'Populer relaterte dokumenter per samling, f.eks. `populate[posts][title]=true`.',
    schemaJoins: 'Kontroller per join (limit/page/sort/where/count), f.eks. `joins[posts][limit]=10`.',
    schemaWhere:
      'Payload `where`-filter. Nest et felt og deretter en operator: `where[field][equals]=value`. Kombiner betingelser med `and`- / `or`-arrayene, f.eks. `where[or][0][field][equals]=value`. Hvert felt lister bare operatorene som er gyldige for typen sin.',
    schemaSupportedTimezones: 'Støttede tidssoner i IANA-format.',
    schemaPerLocale: 'Verdier per locale, returnert når `locale=all`.',

    collectionList: 'Paginert liste over dokumenter',
    collectionDoc: 'Et enkelt dokument',
    collectionCreated: 'Opprettet dokument',
    collectionUpdated: 'Oppdatert dokument',
    collectionDeleted: 'Slettet dokument',
    collectionBulkUpdate: 'Resultat av masseoppdatering',
    collectionBulkDelete: 'Resultat av massesletting',
    collectionCount: 'Antall dokumenter',
    collectionDuplicated: 'Det dupliserte dokumentet',

    globalDoc: 'Det globale dokumentet',

    authLogin: 'Innloggingsresultat',
    authLogout: 'Utloggingsresultat',
    authMe: 'Den nåværende autentiserte brukeren',
    authRefreshToken: 'Fornyet token',
    authForgotPassword: 'E-post for tilbakestilling av passord er sendt',
    authResetPassword: 'Resultat av passordtilbakestilling',
    authFirstRegister: 'Den første brukeren, opprettet med et auth-token',
    authInit: 'Om denne auth-samlingen har noen brukere ennå',
    authAccess: 'Den nåværende brukerens tilgang (tillatelser) for denne samlingen',
    authUnlock: 'Resultat av opplåsing',
    authVerify: 'Verifiseringsresultat',

    versionList: 'Paginert liste over versjoner',
    versionSingle: 'En enkelt versjon',
    versionRestored: 'Det gjenopprettede dokumentet',
    versionWhere: 'Filtrer på versjonsfelt, f.eks. `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'Kjør jobber i kø (og håndter som standard tidsplaner)',
    jobsSchedulesSummary: 'Legg jobber som forfaller i henhold til tidsplanen sin i kø',
    jobsRunResult: 'Kjøreresultat',
    jobsSchedulesResult: 'Resultat av tidsplanlegging',
    jobsRunAllQueues: 'Kjør jobber på tvers av alle køer.',
    jobsLimit: 'Maks antall jobber som skal kjøres.',
    jobsDisableScheduling: 'Hopp over tidsplanhåndteringen som `run` gjør som standard.',
    jobsSilent: 'Undertrykk kjøringslogging.',
    jobsSchedulesAllQueues: 'Håndter tidsplaner på tvers av alle køer.',
    jobsQueue: 'Begrens operasjonen til én enkelt kø. Kjente køer: {{queues}}.',

    uploadFile: 'Binærfilen som skal lastes opp.',
    uploadBody:
      'Send `multipart/form-data` for å laste opp en fil (en binær `file`-del pluss en `_payload`-del med de JSON-strengkodede feltene), eller `application/json` med bare feltene når det ikke finnes noen fil.',
    uploadPayloadField: 'JSON-strengkodede {{schema}}-felt. Eksempel: `{"alt":"A caption"}`.',

    error400: 'Validerings- eller spørringsfeil (ValidationError, QueryError)',
    error401: 'Ikke autentisert (AuthenticationError)',
    error403: 'Forbudt av tilgangskontroll (Forbidden, UnverifiedEmail)',
    error404: 'Dokument ikke funnet (NotFound)',
    error500: 'Intern serverfeil (APIError)',

    securityBearer:
      'Lim inn `token` som returneres av innloggingsendepunktet. Sendes som `Authorization: Bearer <token>`. Payload godtar også `JWT <token>`-skjemaet og en `{{cookiePrefix}}-token`-informasjonskapsel.',
    securityInteractive:
      'Interaktiv innlogging: skriv inn brukernavn (eller e-post) og passord; la Client ID/Secret stå tomt.',

    tagCollections: 'Samlinger',
    tagCollectionsDesc: 'Endepunkter for dokumentsamlinger (CRUD, antall, dupliser).',
    tagGlobals: 'Globaler',
    tagGlobalsDesc: 'Endepunkter for globale dokumenter.',
    tagSystem: 'System',
    tagSystemDesc: 'Payload-systemendepunkter.',
    tagAuth: 'Autentisering',
    tagVersions: 'Versjoner',
    tagJobs: 'Jobber',

    localizationHeading: 'Lokalisering',
    localizationNote:
      'Tilgjengelige locales: {{locales}}. Send `?locale=<code>` til et lese-endepunkt for å velge én. Send `?locale=all` for å motta alle locales samtidig — hvert lokalisert felt returneres da som et objekt med locale-koden som nøkkel (f.eks. `{ "en": "Hello", "de": "Hallo" }`) i stedet for en enkelt verdi. Sett `?flattenLocales=false` sammen med `locale=all` for å beholde denne objektformen per locale. Feltskjemaene viser formen for én enkelt locale.',
    docLanguagesNote:
      'Denne dokumentasjonen er tilgjengelig på: {{languages}}. Legg til `?lang=<code>` i denne spesifikasjons-URL-en for å bytte språk.',
  },
}
