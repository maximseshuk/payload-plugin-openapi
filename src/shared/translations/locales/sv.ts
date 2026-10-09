import type { PluginDefaultTranslationsObject } from '@/shared/translations/types.js'

export const sv: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Hur många nivåer av relaterade dokument som ska populeras.',
    paramSort: 'Fält att sortera efter; inled med `-` för fallande ordning, t.ex. `-createdAt`.',
    paramSortShort: 'Fält att sortera efter; inled med `-` för fallande ordning.',
    paramDraft: 'Returnera utkastversioner.',
    paramTrash: 'Inkludera papperskorgsdokument.',
    paramAutosave:
      'Spara som autosparning: uppdaterar den senaste autosparade versionen i stället för att lägga till en ny.',
    paramPublishAllLocales: 'Publicera alla språk, inte bara förfrågans språk.',
    paramUnpublishAllLocales: 'Avpublicera alla språk och gör dokumentet till ett utkast igen.',
    paramOverrideLock: 'Ignorera ett lås från en annan användare. Standard false.',
    paramSelectedLocales: 'Kopiera bara dessa språk till dubbletten. Standard: alla språk.',
    paramFlattenLocales:
      'Med `locale=all`, sätt false för att behålla lokaliserade fält som objekt per språk. Standard är true.',
    paramLocale: 'Språk att returnera, eller `all` för alla språk. Se avsnittet Lokalisering i API-beskrivningen.',
    paramFallbackLocale:
      'Språk att falla tillbaka på för saknade lokaliserade värden, eller `none` för att inaktivera.',
    paramValidateLocale:
      'Språk som ska valideras, eller `all` för alla språk. Upprepa parametern för fler än ett språk.',
    paramComputeHierarchyPaths:
      'Ange true för att beräkna sökvägarna `{{slugPath}}` och `{{titlePath}}`. Att välja något av fälten beräknar dem också.',

    schemaSelect: 'Välj fält att returnera, t.ex. `select[title]=true`. Utelämna för att returnera alla.',
    schemaPopulate: 'Populera relaterade dokument per samling, t.ex. `populate[posts][title]=true`.',
    schemaJoins: 'Kontroller per join (limit/page/sort/where/count), t.ex. `joins[posts][limit]=10`.',
    schemaWhere:
      'Payload `where`-filter. Nästla ett fält och sedan en operator: `where[field][equals]=value`. Kombinera villkor med arrayerna `and` / `or`, t.ex. `where[or][0][field][equals]=value`. Varje fält listar endast de operatorer som är giltiga för dess typ.',
    schemaSupportedTimezones: 'Tidszoner som stöds, i IANA-format.',
    schemaPerLocale: 'Värden per språk, returneras när `locale=all`.',
    schemaHierarchySlugPath:
      'Sökväg av slugs, t.ex. `parent/child`. Beräknas vid läsning med `computeHierarchyPaths=true` eller när fältet väljs. Kan inte användas i `where`.',
    schemaHierarchyTitlePath:
      'Sökväg av titlar, t.ex. `Parent/Child`. Beräknas vid läsning med `computeHierarchyPaths=true` eller när fältet väljs. Kan inte användas i `where`.',

    collectionList: 'Paginerad lista över dokument',
    collectionDoc: 'Ett enskilt dokument',
    collectionCreated: 'Skapat dokument',
    collectionUpdated: 'Uppdaterat dokument',
    collectionDeleted: 'Borttaget dokument',
    collectionBulkUpdate: 'Resultat av massuppdatering',
    collectionBulkDelete: 'Resultat av massborttagning',
    collectionCount: 'Antal dokument',
    collectionDuplicated: 'Det duplicerade dokumentet',
    validateResult:
      'Valideringsresultat. Inget sparas. Ogiltiga fältvärden returnerar `valid: false` med felen, inte en felstatus.',
    validateBody:
      'Dokumentdata som ska valideras. På ett sparat dokument eller en global slås datan samman över det senaste utkastet, eller det sparade dokumentet om det inte finns något utkast.',

    globalDoc: 'Det globala dokumentet',

    authLogin: 'Inloggningsresultat',
    authLogout: 'Utloggningsresultat',
    authMe: 'Den för närvarande autentiserade användaren',
    authRefreshToken: 'Förnyad token',
    authForgotPassword: 'E-post för lösenordsåterställning skickad',
    authResetPassword: 'Resultat av lösenordsåterställning',
    authFirstRegister: 'Den första användaren, skapad med en autentiseringstoken',
    authInit: 'Huruvida den här autentiseringssamlingen har några användare ännu',
    authAccess: 'Den aktuella användarens behörigheter för alla samlingar och globaler',
    docAccess: 'Den aktuella användarens behörigheter för detta dokument',
    docAccessBody:
      'Dokumentdata som åtkomsten kontrolleras mot. Utan dem använder Payload det sparade dokumentet, om det finns.',
    authUnlock: 'Resultat av upplåsning',
    authVerify: 'Verifieringsresultat',
    apiKeyReveal: 'Den dekrypterade API-nyckeln',

    versionList: 'Paginerad lista över versioner',
    versionSingle: 'En enskild version',
    versionRestored: 'Det återställda dokumentet',
    versionWhere: 'Filtrera över versionsfält, t.ex. `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'Kör köade jobb (och hantera, som standard, scheman)',
    jobsSchedulesSummary: 'Köa jobb som förfaller enligt sitt schema',
    jobsRunResult: 'Körningsresultat',
    jobsSchedulesResult: 'Schemaläggningsresultat',
    jobsRunAllQueues: 'Kör jobb i alla köer.',
    jobsLimit: 'Maximalt antal jobb att köra.',
    jobsDisableScheduling: 'Hoppa över den schemahantering som `run` gör som standard.',
    jobsSilent: 'Undertryck körningsloggning.',
    jobsSchedulesAllQueues: 'Hantera scheman i alla köer.',
    jobsQueue: 'Begränsa operationen till en enda kö. Kända köer: {{queues}}.',

    uploadFile: 'Den binära filen att ladda upp.',
    uploadBody:
      'Skicka `multipart/form-data` för att ladda upp en fil (en binär `file`-del plus en `_payload`-del med de JSON-strängifierade fälten), eller `application/json` med enbart fälten när det inte finns någon fil.',
    uploadPayloadField: 'JSON-strängifierade {{schema}}-fält. Exempel: `{\\"alt\\":\\"A caption\\"}`.',
    fileServe: 'Filen',
    filePartial: 'En del av filen vid en `Range`-begäran',
    paramFileVersion: 'Returnerar filen som sparades med detta versions-ID.',
    uploadInstructionsSummary: 'Hämta instruktioner för att ladda upp en fil innan dokumentet sparas',
    uploadInstructionsResult:
      'Vart filens byte ska skickas och vilket `file`-värde som ska skickas med skapa- eller uppdatera-begäran',
    uploadStagePutSummary: 'Skicka filens byte för en tillfällig uppladdning',
    uploadStageDeleteSummary: 'Ta bort en tillfällig uppladdning',
    uploadStageResult: 'Klart, inget innehåll',

    error400: 'Validerings- eller frågefel (ValidationError, QueryError)',
    error401: 'Inte autentiserad (AuthenticationError)',
    error403: 'Förbjuden av åtkomstkontroll (Forbidden, UnverifiedEmail)',
    error404: 'Dokumentet hittades inte (NotFound)',
    error500: 'Internt serverfel (APIError)',

    securityBearer:
      'Klistra in den `token` som returneras av inloggningsslutpunkten. Skickas som `Authorization: Bearer <token>`. Payload accepterar även schemat `JWT <token>` och en `{{cookiePrefix}}-token`-cookie.',
    securityInteractive:
      'Interaktiv inloggning: ange användarnamn (eller e-post) och lösenord; lämna Client ID/Secret tomma.',

    tagCollections: 'Samlingar',
    tagCollectionsDesc: 'Slutpunkter för dokumentsamlingar (CRUD, antal, duplicering).',
    tagGlobals: 'Globaler',
    tagGlobalsDesc: 'Slutpunkter för globala dokument.',
    tagSystem: 'System',
    tagSystemDesc: 'Payloads systemslutpunkter.',
    tagAuth: 'Autentisering',
    tagVersions: 'Versioner',
    tagJobs: 'Jobb',
    tagUploads: 'Uppladdningar',
    tagAccess: 'Åtkomst',
    tagPlugins: 'Plugins',
    tagPluginsDesc: 'Slutpunkter som läggs till av officiella Payload-plugins.',
    pluginError400: 'Ogiltig begäran',
    pluginError401: 'Inte autentiserad',
    pluginError403: 'Förbjudet',
    pluginError404: 'Hittades inte',
    pluginError500: 'Internt serverfel',
    ecommerceAddItem: 'Lägg en vara i varukorgen',
    ecommerceRemoveItem: 'Ta bort en vara från varukorgen',
    ecommerceUpdateItem: 'Ändra antalet för en vara i varukorgen',
    ecommerceClearCart: 'Ta bort alla varor från varukorgen',
    ecommerceMergeCart: 'Slå ihop en gästvarukorg med den här varukorgen',
    ecommerceCartAccess: 'Tillåtet för varukorgens ägare, eller för en gästvarukorg med dess `secret` i body.',
    ecommerceCartResult: 'Den uppdaterade varukorgen',
    ecommerceError404: 'Varukorgen hittades inte eller är inte åtkomlig',
    ecommerceQuantity: 'Nytt antal, eller `{ "$inc": n }` för att ändra det med n.',
    ecommerceInitiatePayment: 'Starta en betalning med `{{method}}`',
    ecommerceConfirmOrder: 'Bekräfta betalningen med `{{method}}` och skapa ordern',
    ecommercePaymentBody:
      'Använder `cartID` (med `secret` för en gästvarukorg) eller användarens varukorg. Utan användare krävs `customerEmail`. Betalningsadaptern kan behöva fler fält.',
    ecommerceInitiateResult: 'Betalningen har startats. Adaptern lägger till egna fält, t.ex. en client secret.',
    ecommerceConfirmResult: 'Ordern skapades',
    stripeWebhook: 'Ta emot Stripe-webhookhändelser',
    stripeWebhookBody:
      'Den råa Stripe-händelsen, signerad i headern `Stripe-Signature`. Anropas av Stripe, inte av API-klienter.',
    stripeWebhookResult: 'Händelsen mottogs',
    stripeWebhookError400: 'Signaturkontrollen misslyckades',
    stripeRest: 'Anropa en tillåten Stripe API-metod',
    stripeRestResult: 'Resultatet från Stripe API',
    stripeRestError404: 'Stripe API returnerade ett fel',
    mcp: 'Skicka ett MCP JSON-RPC-meddelande',
    mcpDesc:
      'Model Context Protocol över Streamable HTTP med JSON-svar. Anonyma begäranden fungerar; vilka verktyg som listas beror på användarens behörighet. Klienter med en protokollversion från 2025 måste skicka `Accept: application/json, text/event-stream`.',
    mcpResult: 'JSON-RPC-svar',
    mcpOverrideAccess: 'Hoppa över behörighetskontroller. Endast för utveckling.',
    mcpGet: 'Stöds inte: servern öppnar ingen händelseström',
    mcpGetError405: 'Metoden är inte tillåten, använd POST',
    mcpProtocolVersion: 'Förhandlad MCP-protokollversion, t.ex. `2025-06-18`.',
    mcpResult202: 'Accepterad: body innehöll bara notifieringar eller svar',
    mcpError404: 'Okänd MCP-metod',
    mcpError406: 'Headern `Accept` saknar `application/json` eller `text/event-stream`',
    mcpError413: 'Begärans body är för stor',
    mcpError415: '`Content-Type` måste vara `application/json`',
    seoTitle: 'Generera metatiteln',
    seoDescription: 'Generera metabeskrivningen',
    seoUrl: 'Generera förhandsgransknings-URL:en',
    seoImage: 'Generera metabilden',
    seoBody:
      'Dokumentet som redigeras: `collectionSlug` eller `globalSlug`, dess `id` och aktuella `doc`-data. Skickas vidare till din generate-funktion.',
    seoResult: 'Det genererade värdet. En tom sträng när ingen generate-funktion är angiven.',
    searchReindex: 'Bygg om sökindexet för vissa samlingar',
    searchReindexResult: 'Sammanfattning av omindexering',
    tenantOptions: 'Lista de tenants som användaren kan välja',
    tenantOptionsResult: 'Tenant-alternativ',
    exportDownload: 'Exportera dokument till en fil',
    exportDownloadResult: 'Exportfilen',
    exportPreview: 'Förhandsgranska en export',
    importPreview: 'Förhandsgranska en importfil',
    previewResult: 'En sida med förhandsgranskningsdokument',
    importFileData: 'Filinnehåll, base64-kodat.',
    r2Upload: 'Ladda upp en fil till R2 i delar',
    r2UploadDesc:
      'Tre steg på en route. Start: skicka `collection`, `fileName` och `fileType`. Varje del: lägg till `multipartId`, `multipartKey`, `multipartNumber` och `signedReceipt` och skicka byten. Slutför: samma sak utan `multipartNumber`, med JSON-listan över delar.',
    r2UploadResult: 'Uppladdningen startad, del uppladdad eller uppladdningen klar (objektnyckeln som text)',
    r2Error412: 'Det finns redan en fil med den här nyckeln',

    localizationHeading: 'Lokalisering',
    localizationNote:
      'Tillgängliga språk: {{locales}}. Skicka `?locale=<code>` till en läsningsslutpunkt för att välja ett. Skicka `?locale=all` för att ta emot alla språk på en gång — varje lokaliserat fält returneras då som ett objekt med språkkod som nyckel (t.ex. `{ \\"en\\": \\"Hello\\", \\"de\\": \\"Hallo\\" }`) i stället för ett enda värde. Sätt `?flattenLocales=false` tillsammans med `locale=all` för att behålla den formen med objekt per språk. Fältscheman visar formen för enstaka språk.',
    docLanguagesNote:
      'Den här dokumentationen finns på: {{languages}}. Lägg till `?lang=<code>` i denna spec-URL för att byta.',
  },
}
