import type { PluginDefaultTranslationsObject } from '@/shared/translations/types.js'

export const ro: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Câte niveluri de documente asociate să fie populate.',
    paramSort: 'Câmp după care se sortează; prefixați cu `-` pentru ordine descrescătoare, de ex. `-createdAt`.',
    paramSortShort: 'Câmp după care se sortează; prefixați cu `-` pentru ordine descrescătoare.',
    paramDraft: 'Returnează versiunile ciornă.',
    paramTrash: 'Include documentele aflate la coșul de gunoi.',
    paramAutosave:
      'Salvează ca salvare automată: actualizează ultima versiune salvată automat în loc să adauge una nouă.',
    paramPublishAllLocales: 'Publică toate limbile, nu doar limba cererii.',
    paramUnpublishAllLocales: 'Anulează publicarea tuturor limbilor și readuce documentul la ciornă.',
    paramOverrideLock: 'Ignoră blocarea deținută de alt utilizator. Implicit false.',
    paramSelectedLocales: 'Copiază doar aceste limbi în duplicat. Implicit: toate limbile.',
    paramFlattenLocales:
      'Cu `locale=all`, setați false pentru a păstra câmpurile localizate ca obiecte per-locale. Implicit true.',
    paramLocale:
      'Locale-ul de returnat sau `all` pentru toate locale-urile. Consultați secțiunea Localizare din descrierea API.',
    paramFallbackLocale: 'Locale-ul de rezervă pentru valorile localizate lipsă sau `none` pentru a dezactiva.',
    paramValidateLocale:
      'Locale-uri de validat sau `all` pentru toate locale-urile. Repetați parametrul pentru mai mult de un locale.',
    paramComputeHierarchyPaths:
      'Setați true pentru a calcula căile `{{slugPath}}` și `{{titlePath}}`. Selectarea oricăruia dintre câmpuri le calculează și ea.',

    schemaSelect: 'Alegeți câmpurile de returnat, de ex. `select[title]=true`. Omiteți pentru a le returna pe toate.',
    schemaPopulate: 'Populați documentele asociate per colecție, de ex. `populate[posts][title]=true`.',
    schemaJoins: 'Controale per-join (limit/page/sort/where/count), de ex. `joins[posts][limit]=10`.',
    schemaWhere:
      'Filtru `where` Payload. Imbricați un câmp, apoi un operator: `where[field][equals]=value`. Combinați clauzele cu tablourile `and` / `or`, de ex. `where[or][0][field][equals]=value`. Fiecare câmp listează doar operatorii valizi pentru tipul său.',
    schemaSupportedTimezones: 'Fusuri orare acceptate în format IANA.',
    schemaPerLocale: 'Valori per-locale, returnate când `locale=all`.',
    schemaHierarchySlugPath:
      'Cale din sluguri, de ex. `parent/child`. Calculată la citire cu `computeHierarchyPaths=true` sau când este selectată. Nu poate fi folosită în `where`.',
    schemaHierarchyTitlePath:
      'Cale din titluri, de ex. `Parent/Child`. Calculată la citire cu `computeHierarchyPaths=true` sau când este selectată. Nu poate fi folosită în `where`.',

    collectionList: 'Listă paginată de documente',
    collectionDoc: 'Un singur document',
    collectionCreated: 'Document creat',
    collectionUpdated: 'Document actualizat',
    collectionDeleted: 'Document șters',
    collectionBulkUpdate: 'Rezultatul actualizării în masă',
    collectionBulkDelete: 'Rezultatul ștergerii în masă',
    collectionCount: 'Numărul de documente',
    collectionDuplicated: 'Documentul duplicat',
    validateResult:
      'Rezultatul validării. Nu se salvează nimic. Valorile invalide ale câmpurilor returnează `valid: false` cu erorile, nu un status de eroare.',
    validateBody:
      'Datele documentului de validat. Pe un document salvat sau un global, datele sunt îmbinate peste cea mai recentă ciornă sau peste documentul salvat, dacă nu există ciornă.',

    globalDoc: 'Documentul global',

    authLogin: 'Rezultatul autentificării',
    authLogout: 'Rezultatul deconectării',
    authMe: 'Utilizatorul autentificat în prezent',
    authRefreshToken: 'Token reîmprospătat',
    authForgotPassword: 'E-mail de resetare a parolei trimis',
    authResetPassword: 'Rezultatul resetării parolei',
    authFirstRegister: 'Primul utilizator, creat cu un token de autentificare',
    authInit: 'Dacă această colecție de autentificare are deja utilizatori',
    authAccess: 'Permisiunile utilizatorului curent pentru toate colecțiile și globalele',
    docAccess: 'Permisiunile utilizatorului curent pentru acest document',
    docAccessBody:
      'Datele documentului față de care se verifică accesul. Fără ele, Payload folosește documentul salvat, dacă există.',
    authUnlock: 'Rezultatul deblocării',
    authVerify: 'Rezultatul verificării',
    apiKeyReveal: 'Cheia API decriptată',

    versionList: 'Listă paginată de versiuni',
    versionSingle: 'O singură versiune',
    versionRestored: 'Documentul restaurat',
    versionWhere: 'Filtrează după câmpurile versiunii, de ex. `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'Rulează joburile din coadă (și, implicit, gestionează programările)',
    jobsSchedulesSummary: 'Pune în coadă joburile scadente conform programării lor',
    jobsRunResult: 'Rezultatul rulării',
    jobsSchedulesResult: 'Rezultatul programării',
    jobsRunAllQueues: 'Rulează joburile din toate cozile.',
    jobsLimit: 'Numărul maxim de joburi de rulat.',
    jobsDisableScheduling: 'Sare peste gestionarea programărilor pe care `run` o face implicit.',
    jobsSilent: 'Suprimă jurnalizarea rulării.',
    jobsSchedulesAllQueues: 'Gestionează programările din toate cozile.',
    jobsQueue: 'Restricționează operațiunea la o singură coadă. Cozi cunoscute: {{queues}}.',

    uploadFile: 'Fișierul binar de încărcat.',
    uploadBody:
      'Trimiteți `multipart/form-data` pentru a încărca un fișier (o parte binară `file` plus o parte `_payload` cu câmpurile serializate în JSON) sau `application/json` doar cu câmpurile când nu există fișier.',
    uploadPayloadField: 'Câmpuri {{schema}} serializate în JSON. Exemplu: `{\\"alt\\":\\"A caption\\"}`.',
    fileServe: 'Fișierul',
    filePartial: 'O parte din fișier, pentru o cerere `Range`',
    paramFileVersion: 'Returnează fișierul salvat cu acest ID de versiune.',
    uploadInstructionsSummary: 'Obține instrucțiuni pentru încărcarea unui fișier înainte de salvarea documentului',
    uploadInstructionsResult:
      'Unde se trimit octeții fișierului și valoarea `file` de trimis cu cererea de creare sau actualizare',
    uploadStagePutSummary: 'Trimite octeții fișierului pentru o încărcare temporară',
    uploadStageDeleteSummary: 'Șterge o încărcare temporară',
    uploadStageResult: 'Gata, fără conținut',

    error400: 'Eroare de validare sau de interogare (ValidationError, QueryError)',
    error401: 'Neautentificat (AuthenticationError)',
    error403: 'Interzis de controlul accesului (Forbidden, UnverifiedEmail)',
    error404: 'Document negăsit (NotFound)',
    error500: 'Eroare internă de server (APIError)',

    securityBearer:
      'Lipiți `token`-ul returnat de endpoint-ul de autentificare. Trimis ca `Authorization: Bearer <token>`. Payload acceptă și schema `JWT <token>` și un cookie `{{cookiePrefix}}-token`.',
    securityInteractive:
      'Autentificare interactivă: introduceți numele de utilizator (sau e-mailul) și parola; lăsați Client ID/Secret necompletate.',

    tagCollections: 'Colecții',
    tagCollectionsDesc: 'Endpoint-uri pentru colecții de documente (CRUD, numărare, duplicare).',
    tagGlobals: 'Globale',
    tagGlobalsDesc: 'Endpoint-uri pentru documente globale.',
    tagSystem: 'Sistem',
    tagSystemDesc: 'Endpoint-uri de sistem Payload.',
    tagAuth: 'Autentificare',
    tagVersions: 'Versiuni',
    tagJobs: 'Joburi',
    tagUploads: 'Încărcări',
    tagAccess: 'Acces',
    tagPlugins: 'Pluginuri',
    tagPluginsDesc: 'Endpoint-uri adăugate de pluginurile oficiale Payload.',
    error400Plugin: 'Cerere invalidă',
    error401Plugin: 'Neautentificat',
    error403Plugin: 'Interzis',
    error404Plugin: 'Negăsit',
    error500Plugin: 'Eroare internă de server',
    ecommerceAddItem: 'Adaugă un produs în coș',
    ecommerceRemoveItem: 'Elimină un produs din coș',
    ecommerceUpdateItem: 'Modifică cantitatea unui produs din coș',
    ecommerceClearCart: 'Elimină toate produsele din coș',
    ecommerceMergeCart: 'Unește un coș de vizitator cu acest coș',
    ecommerceCartAccess: 'Permis proprietarului coșului sau pentru un coș de vizitator cu `secret` în corp.',
    ecommerceCartResult: 'Coșul actualizat',
    error404Ecommerce: 'Coș negăsit sau inaccesibil',
    ecommerceQuantity: 'Cantitatea nouă sau `{ "$inc": n }` pentru a o modifica cu n.',
    ecommerceInitiatePayment: 'Inițiază o plată cu `{{method}}`',
    ecommerceConfirmOrder: 'Confirmă plata cu `{{method}}` și creează comanda',
    ecommercePaymentBody:
      'Folosește `cartID` (cu `secret` pentru un coș de vizitator) sau coșul utilizatorului. Fără utilizator, `customerEmail` este obligatoriu. Adaptorul de plată poate cere mai multe câmpuri.',
    ecommerceInitiateResult: 'Plată inițiată. Adaptorul adaugă propriile câmpuri, de ex. un client secret.',
    ecommerceConfirmResult: 'Comanda a fost creată',
    stripeWebhook: 'Primește evenimente webhook Stripe',
    stripeWebhookBody:
      'Evenimentul Stripe brut, semnat în antetul `Stripe-Signature`. Apelat de Stripe, nu de clienții API.',
    stripeWebhookResult: 'Eveniment primit',
    error400StripeWebhook: 'Verificarea semnăturii a eșuat',
    stripeRest: 'Apelează o metodă permisă din API-ul Stripe',
    stripeRestResult: 'Rezultatul API-ului Stripe',
    error404StripeRest: 'API-ul Stripe a returnat o eroare',
    mcp: 'Trimite un mesaj MCP JSON-RPC',
    mcpDesc:
      'Model Context Protocol prin Streamable HTTP, cu răspunsuri JSON. Cererile anonime funcționează; instrumentele listate depind de drepturile utilizatorului. Clienții cu o versiune de protocol din 2025 trebuie să trimită `Accept: application/json, text/event-stream`.',
    mcpResult: 'Răspuns JSON-RPC',
    mcpOverrideAccess: 'Omite verificările de acces. Doar pentru dezvoltare.',
    mcpGet: 'Nesuportat: serverul nu deschide niciun flux de evenimente',
    error405McpGet: 'Metodă nepermisă, folosește POST',
    mcpProtocolVersion: 'Versiunea negociată a protocolului MCP, de ex. `2025-06-18`.',
    mcpResult202: 'Acceptat: corpul conținea doar notificări sau răspunsuri',
    error404Mcp: 'Metodă MCP necunoscută',
    error406Mcp: 'Antetului `Accept` îi lipsește `application/json` sau `text/event-stream`',
    error413Mcp: 'Corpul cererii este prea mare',
    error415Mcp: '`Content-Type` trebuie să fie `application/json`',
    seoTitle: 'Generează meta titlul',
    seoDescription: 'Generează meta descrierea',
    seoUrl: 'Generează URL-ul de previzualizare',
    seoImage: 'Generează meta imaginea',
    seoBody:
      'Documentul editat: `collectionSlug` sau `globalSlug`, `id`-ul său și datele `doc` curente. Transmis funcției tale de generare.',
    seoResult: 'Valoarea generată. Un șir gol când nu este setată nicio funcție de generare.',
    searchReindex: 'Reconstruiește indexul de căutare pentru unele colecții',
    searchReindexResult: 'Rezumatul reindexării',
    tenantOptions: 'Listează tenanții pe care utilizatorul îi poate alege',
    tenantOptionsResult: 'Opțiuni de tenant',
    exportDownload: 'Exportă documente într-un fișier',
    exportDownloadResult: 'Fișierul exportat',
    exportPreview: 'Previzualizează un export',
    importPreview: 'Previzualizează un fișier de import',
    previewResult: 'O pagină de documente de previzualizare',
    importFileData: 'Conținutul fișierului, codificat base64.',
    r2Upload: 'Încarcă un fișier în R2 pe părți',
    r2UploadDesc:
      'Trei pași pe o singură rută. Start: trimite `collection`, `fileName` și `fileType`. Fiecare parte: adaugă `multipartId`, `multipartKey`, `multipartNumber` și `signedReceipt` și trimite octeții. Final: la fel, fără `multipartNumber`, cu lista JSON a părților.',
    r2UploadResult: 'Încărcare pornită, parte încărcată sau încărcare finalizată (cheia obiectului ca text)',
    error412R2: 'Există deja un fișier la această cheie',

    localizationHeading: 'Localizare',
    localizationNote:
      'Locale-uri disponibile: {{locales}}. Transmiteți `?locale=<code>` către un endpoint de citire pentru a selecta unul. Transmiteți `?locale=all` pentru a primi toate locale-urile deodată — fiecare câmp localizat este apoi returnat ca obiect indexat după codul locale-ului (de ex. `{ \\"en\\": \\"Hello\\", \\"de\\": \\"Hallo\\" }`) în loc de o singură valoare. Setați `?flattenLocales=false` împreună cu `locale=all` pentru a păstra acea formă de obiect per-locale. Schemele câmpurilor afișează forma cu un singur locale.',
    docLanguagesNote:
      'Această documentație este disponibilă în: {{languages}}. Adaugă `?lang=<code>` la acest URL de specificație pentru a schimba limba.',
  },
}
