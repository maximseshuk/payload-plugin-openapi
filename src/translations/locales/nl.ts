import type { PluginDefaultTranslationsObject } from '../types.js'

export const nl: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Hoeveel niveaus van gerelateerde documenten moeten worden gepopuleerd.',
    paramSort: 'Veld om op te sorteren; voorvoeg met `-` voor aflopend, bijv. `-createdAt`.',
    paramSortShort: 'Veld om op te sorteren; voorvoeg met `-` voor aflopend.',
    paramDraft: 'Conceptversies retourneren.',
    paramTrash: 'Verwijderde documenten meenemen.',
    paramFlattenLocales:
      'Met `locale=all`, stel in op false om gelokaliseerde velden als objecten per locale te behouden. Standaard true.',
    paramLocale:
      'De locale die wordt geretourneerd, of `all` voor elke locale. Zie het gedeelte Lokalisatie in de API-beschrijving.',
    paramFallbackLocale:
      'De locale waarop wordt teruggevallen voor ontbrekende gelokaliseerde waarden, of `none` om uit te schakelen.',

    schemaSelect:
      'Kies welke velden worden geretourneerd, bijv. `select[title]=true`. Laat weg om alle velden te retourneren.',
    schemaPopulate: 'Populeer gerelateerde documenten per collectie, bijv. `populate[posts][title]=true`.',
    schemaJoins: 'Besturing per join (limit/page/sort/where/count), bijv. `joins[posts][limit]=10`.',
    schemaWhere:
      'Payload `where`-filter. Nest eerst een veld en daarna een operator: `where[field][equals]=value`. Combineer clausules met de arrays `and` / `or`, bijv. `where[or][0][field][equals]=value`. Elk veld toont alleen de operators die geldig zijn voor het bijbehorende type.',
    schemaSupportedTimezones: 'Ondersteunde tijdzones in IANA-formaat.',
    schemaPerLocale: 'Waarden per locale, geretourneerd wanneer `locale=all`.',

    collectionList: 'Gepagineerde lijst met documenten',
    collectionDoc: 'Eén enkel document',
    collectionCreated: 'Aangemaakt document',
    collectionUpdated: 'Bijgewerkt document',
    collectionDeleted: 'Verwijderd document',
    collectionBulkUpdate: 'Resultaat van bulkbewerking',
    collectionBulkDelete: 'Resultaat van bulkverwijdering',
    collectionCount: 'Aantal documenten',
    collectionDuplicated: 'Het gedupliceerde document',

    globalDoc: 'Het globale document',

    authLogin: 'Inlogresultaat',
    authLogout: 'Uitlogresultaat',
    authMe: 'De momenteel geverifieerde gebruiker',
    authRefreshToken: 'Vernieuwd token',
    authForgotPassword: 'E-mail voor wachtwoordherstel verzonden',
    authResetPassword: 'Resultaat van wachtwoordherstel',
    authFirstRegister: 'De eerste gebruiker, aangemaakt met een auth-token',
    authInit: 'Of deze auth-collectie al gebruikers heeft',
    authAccess: 'De toegang (rechten) van de huidige gebruiker voor deze collectie',
    authUnlock: 'Resultaat van ontgrendeling',
    authVerify: 'Verificatieresultaat',

    versionList: 'Gepagineerde lijst met versies',
    versionSingle: 'Eén enkele versie',
    versionRestored: 'Het herstelde document',
    versionWhere: 'Filter over versievelden, bijv. `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'Taken in de wachtrij uitvoeren (en standaard ook planningen afhandelen)',
    jobsSchedulesSummary: 'Taken in de wachtrij plaatsen die volgens hun planning aan de beurt zijn',
    jobsRunResult: 'Uitvoeringsresultaat',
    jobsSchedulesResult: 'Planningsresultaat',
    jobsRunAllQueues: 'Taken uitvoeren over alle wachtrijen.',
    jobsLimit: 'Maximaal aantal uit te voeren taken.',
    jobsDisableScheduling: 'De planningsafhandeling overslaan die `run` standaard uitvoert.',
    jobsSilent: 'Uitvoeringslogboek onderdrukken.',
    jobsSchedulesAllQueues: 'Planningen afhandelen over alle wachtrijen.',
    jobsQueue: 'Beperk de bewerking tot één enkele wachtrij. Bekende wachtrijen: {{queues}}.',

    uploadFile: 'Het binaire bestand dat moet worden geüpload.',
    uploadBody:
      'Verzend `multipart/form-data` om een bestand te uploaden (een binair `file`-deel plus een `_payload`-deel met de velden als JSON-string), of `application/json` met alleen de velden wanneer er geen bestand is.',
    uploadPayloadField: '{{schema}}-velden als JSON-string. Voorbeeld: `{"alt":"A caption"}`.',

    error400: 'Validatie- of queryfout (ValidationError, QueryError)',
    error401: 'Niet geverifieerd (AuthenticationError)',
    error403: 'Verboden door toegangsbeheer (Forbidden, UnverifiedEmail)',
    error404: 'Document niet gevonden (NotFound)',
    error500: 'Interne serverfout (APIError)',

    securityBearer:
      'Plak het `token` dat door het login-endpoint wordt geretourneerd. Verzonden als `Authorization: Bearer <token>`. Payload accepteert ook het schema `JWT <token>` en een `{{cookiePrefix}}-token`-cookie.',
    securityInteractive:
      'Interactief inloggen: voer gebruikersnaam (of e-mail) en wachtwoord in; laat Client ID/Secret leeg.',

    tagCollections: 'Collecties',
    tagCollectionsDesc: 'Endpoints voor documentcollecties (CRUD, count, dupliceren).',
    tagGlobals: 'Globals',
    tagGlobalsDesc: 'Endpoints voor globale documenten.',
    tagSystem: 'Systeem',
    tagSystemDesc: 'Payload-systeemendpoints.',
    tagAuth: 'Auth',
    tagVersions: 'Versies',
    tagJobs: 'Taken',

    localizationHeading: 'Lokalisatie',
    localizationNote:
      'Beschikbare locales: {{locales}}. Geef `?locale=<code>` mee aan een lees-endpoint om er één te selecteren. Geef `?locale=all` mee om alle locales tegelijk te ontvangen — elk gelokaliseerd veld wordt dan geretourneerd als een object met de locale-code als sleutel (bijv. `{ "en": "Hello", "de": "Hallo" }`) in plaats van een enkele waarde. Stel `?flattenLocales=false` in met `locale=all` om die objectvorm per locale te behouden. Veldschema\'s tonen de vorm voor één enkele locale.',
    docLanguagesNote:
      'Deze documentatie is beschikbaar in: {{languages}}. Voeg `?lang=<code>` toe aan deze spec-URL om te wisselen.',
  },
}
