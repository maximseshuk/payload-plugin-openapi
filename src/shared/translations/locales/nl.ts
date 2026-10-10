import type { PluginDefaultTranslationsObject } from '@/shared/translations/types.js'

export const nl: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Hoeveel niveaus van gerelateerde documenten moeten worden gepopuleerd.',
    paramSort: 'Veld om op te sorteren; voorvoeg met `-` voor aflopend, bijv. `-createdAt`.',
    paramSortShort: 'Veld om op te sorteren; voorvoeg met `-` voor aflopend.',
    paramDraft: 'Conceptversies retourneren.',
    paramTrash: 'Verwijderde documenten meenemen.',
    paramAutosave: 'Opslaan als autosave: werkt de laatste autosave-versie bij in plaats van een nieuwe toe te voegen.',
    paramPublishAllLocales: 'Alle talen publiceren, niet alleen de taal van het verzoek.',
    paramUnpublishAllLocales: 'De publicatie van alle talen intrekken en het document terugzetten naar concept.',
    paramOverrideLock: 'Een vergrendeling van een andere gebruiker negeren. Standaard false.',
    paramSelectedLocales: 'Alleen deze talen naar het duplicaat kopiëren. Standaard: alle talen.',
    paramFlattenLocales:
      'Met `locale=all`, stel in op false om gelokaliseerde velden als objecten per locale te behouden. Standaard true.',
    paramLocale:
      'De locale die wordt geretourneerd, of `all` voor elke locale. Zie het gedeelte Lokalisatie in de API-beschrijving.',
    paramFallbackLocale:
      'De locale waarop wordt teruggevallen voor ontbrekende gelokaliseerde waarden, of `none` om uit te schakelen.',
    paramValidateLocale:
      'Te valideren locales, of `all` voor elke locale. Herhaal de parameter voor meer dan één locale.',
    paramComputeHierarchyPaths:
      'Zet op true om de paden `{{slugPath}}` en `{{titlePath}}` te berekenen. Een van beide velden selecteren berekent ze ook.',

    schemaSelect:
      'Kies welke velden worden geretourneerd, bijv. `select[title]=true`. Laat weg om alle velden te retourneren.',
    schemaPopulate: 'Populeer gerelateerde documenten per collectie, bijv. `populate[posts][title]=true`.',
    schemaJoins: 'Besturing per join (limit/page/sort/where/count), bijv. `joins[posts][limit]=10`.',
    schemaWhere:
      'Payload `where`-filter. Nest eerst een veld en daarna een operator: `where[field][equals]=value`. Combineer clausules met de arrays `and` / `or`, bijv. `where[or][0][field][equals]=value`. Elk veld toont alleen de operators die geldig zijn voor het bijbehorende type.',
    schemaSupportedTimezones: 'Ondersteunde tijdzones in IANA-formaat.',
    schemaPerLocale: 'Waarden per locale, geretourneerd wanneer `locale=all`.',
    schemaHierarchySlugPath:
      'Slug-pad, bijv. `parent/child`. Berekend bij lezen met `computeHierarchyPaths=true` of wanneer geselecteerd. Niet bruikbaar in `where`.',
    schemaHierarchyTitlePath:
      'Titelpad, bijv. `Parent/Child`. Berekend bij lezen met `computeHierarchyPaths=true` of wanneer geselecteerd. Niet bruikbaar in `where`.',

    collectionList: 'Gepagineerde lijst met documenten',
    collectionDoc: 'Eén enkel document',
    collectionCreated: 'Aangemaakt document',
    collectionUpdated: 'Bijgewerkt document',
    collectionDeleted: 'Verwijderd document',
    collectionBulkUpdate: 'Resultaat van bulkbewerking',
    collectionBulkDelete: 'Resultaat van bulkverwijdering',
    collectionCount: 'Aantal documenten',
    collectionDuplicated: 'Het gedupliceerde document',
    validateResult:
      'Validatieresultaat. Er wordt niets opgeslagen. Ongeldige veldwaarden geven `valid: false` met de fouten terug, geen foutstatus.',
    validateBody:
      'Te valideren documentgegevens. Bij een opgeslagen document of een global worden de gegevens samengevoegd over het laatste concept, of over het opgeslagen document als er geen concept is.',

    globalDoc: 'Het globale document',

    authLogin: 'Inlogresultaat',
    authLogout: 'Uitlogresultaat',
    authMe: 'De momenteel geverifieerde gebruiker',
    authRefreshToken: 'Vernieuwd token',
    authForgotPassword: 'E-mail voor wachtwoordherstel verzonden',
    authResetPassword: 'Resultaat van wachtwoordherstel',
    authFirstRegister: 'De eerste gebruiker, aangemaakt met een auth-token',
    authInit: 'Of deze auth-collectie al gebruikers heeft',
    authAccess: 'De rechten van de huidige gebruiker voor alle collecties en globals',
    docAccess: 'De rechten van de huidige gebruiker voor dit document',
    docAccessBody:
      'Documentgegevens waartegen toegang wordt gecontroleerd. Zonder gegevens gebruikt Payload het opgeslagen document, als dat er is.',
    authUnlock: 'Resultaat van ontgrendeling',
    authVerify: 'Verificatieresultaat',
    apiKeyReveal: 'De ontsleutelde API-sleutel',

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
    fileServe: 'Het bestand',
    filePartial: 'Een deel van het bestand, voor een `Range`-verzoek',
    paramFileVersion: 'Geeft het bestand terug dat met deze versie-ID is opgeslagen.',
    uploadInstructionsSummary: 'Instructies ophalen om een bestand te uploaden voordat het document wordt opgeslagen',
    uploadInstructionsResult:
      'Waar de bytes van het bestand naartoe moeten, en de `file`-waarde die met het aanmaak- of bijwerkverzoek mee moet',
    uploadStagePutSummary: 'De bytes van het bestand verzenden voor een tijdelijke upload',
    uploadStageDeleteSummary: 'Een tijdelijke upload verwijderen',
    uploadStageResult: 'Klaar, geen inhoud',

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
    tagUploads: 'Uploads',
    tagAccess: 'Toegang',
    tagPlugins: 'Plugins',
    tagPluginsDesc: 'Endpoints die officiële Payload-plugins toevoegen.',
    errorPlugin400: 'Ongeldig verzoek',
    errorPlugin401: 'Niet geauthenticeerd',
    errorPlugin403: 'Verboden',
    errorPlugin404: 'Niet gevonden',
    errorPlugin500: 'Interne serverfout',
    ecommerceAddItem: 'Een artikel aan de winkelwagen toevoegen',
    ecommerceRemoveItem: 'Een artikel uit de winkelwagen verwijderen',
    ecommerceUpdateItem: 'De hoeveelheid van een winkelwagenartikel wijzigen',
    ecommerceClearCart: 'Alle artikelen uit de winkelwagen verwijderen',
    ecommerceMergeCart: 'Een gastwinkelwagen samenvoegen met deze winkelwagen',
    ecommerceCartAccess:
      'Toegestaan voor de eigenaar van de winkelwagen, of voor een gastwinkelwagen met zijn `secret` in de body.',
    ecommerceCartResult: 'De bijgewerkte winkelwagen',
    errorPluginEcommerce404: 'Winkelwagen niet gevonden of niet toegankelijk',
    ecommerceQuantity: 'Nieuwe hoeveelheid, of `{ "$inc": n }` om die met n te wijzigen.',
    ecommerceInitiatePayment: 'Een betaling starten met `{{method}}`',
    ecommerceConfirmOrder: 'De betaling met `{{method}}` bevestigen en de bestelling aanmaken',
    ecommercePaymentBody:
      'Gebruikt `cartID` (met `secret` voor een gastwinkelwagen) of de winkelwagen van de gebruiker. Zonder gebruiker is `customerEmail` verplicht. De betaaladapter kan meer velden nodig hebben.',
    ecommerceInitiateResult: 'Betaling gestart. De adapter voegt eigen velden toe, bijv. een client secret.',
    ecommerceConfirmResult: 'De bestelling is aangemaakt',
    stripeWebhook: 'Stripe-webhookevents ontvangen',
    stripeWebhookBody:
      'Het ruwe Stripe-event, ondertekend in de header `Stripe-Signature`. Wordt door Stripe aangeroepen, niet door API-clients.',
    stripeWebhookResult: 'Event ontvangen',
    errorPluginStripeWebhook400: 'De handtekeningcontrole is mislukt',
    stripeRest: 'Een toegestane Stripe API-methode aanroepen',
    stripeRestResult: 'Het resultaat van de Stripe API',
    errorPluginStripeRest404: 'De Stripe API gaf een fout terug',
    mcp: 'Een MCP JSON-RPC-bericht versturen',
    mcpDesc:
      'Model Context Protocol via Streamable HTTP, met JSON-antwoorden. Anonieme verzoeken werken; welke tools worden getoond, hangt af van de rechten van de gebruiker. Clients met een protocolversie uit 2025 moeten `Accept: application/json, text/event-stream` meesturen.',
    mcpResult: 'JSON-RPC-antwoord',
    mcpOverrideAccess: 'Toegangscontroles overslaan. Alleen voor ontwikkeling.',
    mcpGet: 'Niet ondersteund: de server opent geen eventstream',
    errorPluginMcpGet405: 'Methode niet toegestaan, gebruik POST',
    mcpProtocolVersion: 'Overeengekomen MCP-protocolversie, bijv. `2025-06-18`.',
    mcpResult202: 'Geaccepteerd: de body bevatte alleen notificaties of antwoorden',
    errorPluginMcp404: 'Onbekende MCP-methode',
    errorPluginMcp406: 'In de header `Accept` ontbreekt `application/json` of `text/event-stream`',
    errorPluginMcp413: 'De body van het verzoek is te groot',
    errorPluginMcp415: '`Content-Type` moet `application/json` zijn',
    seoTitle: 'De metatitel genereren',
    seoDescription: 'De metabeschrijving genereren',
    seoUrl: 'De preview-URL genereren',
    seoImage: 'De meta-afbeelding genereren',
    seoBody:
      'Het document dat wordt bewerkt: `collectionSlug` of `globalSlug`, zijn `id` en de huidige `doc`-gegevens. Wordt doorgegeven aan je generate-functie.',
    seoResult: 'De gegenereerde waarde. Een lege string als er geen generate-functie is ingesteld.',
    searchReindex: 'De zoekindex voor enkele collecties opnieuw opbouwen',
    searchReindexResult: 'Samenvatting van de herindexering',
    tenantOptions: 'De tenants tonen die de gebruiker kan kiezen',
    tenantOptionsResult: 'Tenantopties',
    exportDownload: 'Documenten naar een bestand exporteren',
    exportDownloadResult: 'Het exportbestand',
    exportPreview: 'Voorbeeld van een export',
    importPreview: 'Voorbeeld van een importbestand',
    previewResult: 'Een pagina met voorbeelddocumenten',
    importFileData: 'Bestandsinhoud, base64-gecodeerd.',
    r2Upload: 'Een bestand in delen naar R2 uploaden',
    r2UploadDesc:
      'Drie stappen op één route. Start: stuur `collection`, `fileName` en `fileType`. Elk deel: voeg `multipartId`, `multipartKey`, `multipartNumber` en `signedReceipt` toe en stuur de bytes. Afronden: hetzelfde zonder `multipartNumber`, met de JSON-lijst van delen.',
    r2UploadResult: 'Upload gestart, deel geüpload of upload voltooid (de objectsleutel als tekst)',
    errorStorageR2412: 'Er bestaat al een bestand met deze sleutel',

    localizationHeading: 'Lokalisatie',
    localizationNote:
      'Beschikbare locales: {{locales}}. Geef `?locale=<code>` mee aan een lees-endpoint om er één te selecteren. Geef `?locale=all` mee om alle locales tegelijk te ontvangen — elk gelokaliseerd veld wordt dan geretourneerd als een object met de locale-code als sleutel (bijv. `{ "en": "Hello", "de": "Hallo" }`) in plaats van een enkele waarde. Stel `?flattenLocales=false` in met `locale=all` om die objectvorm per locale te behouden. Veldschema\'s tonen de vorm voor één enkele locale.',
    docLanguagesNote:
      'Deze documentatie is beschikbaar in: {{languages}}. Voeg `?lang=<code>` toe aan deze spec-URL om te wisselen.',
  },
}
