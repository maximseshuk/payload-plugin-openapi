import type { PluginDefaultTranslationsObject } from '@/shared/translations/types.js'

export const it: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Quanti livelli di documenti correlati popolare.',
    paramSort: "Campo per cui ordinare; anteporre `-` per l'ordine decrescente, ad es. `-createdAt`.",
    paramSortShort: "Campo per cui ordinare; anteporre `-` per l'ordine decrescente.",
    paramDraft: 'Restituisce le versioni in bozza.',
    paramTrash: 'Include i documenti nel cestino.',
    paramAutosave:
      "Salva come salvataggio automatico: aggiorna l'ultima versione salvata automaticamente invece di aggiungerne una nuova.",
    paramPublishAllLocales: 'Pubblica tutte le lingue, non solo quella della richiesta.',
    paramUnpublishAllLocales: 'Annulla la pubblicazione di tutte le lingue e riporta il documento in bozza.',
    paramOverrideLock: 'Ignora un blocco di un altro utente. Predefinito false.',
    paramSelectedLocales: 'Copia solo queste lingue nel duplicato. Predefinito: tutte le lingue.',
    paramFlattenLocales:
      'Con `locale=all`, impostare su false per mantenere i campi localizzati come oggetti per singola lingua. Predefinito true.',
    paramLocale:
      "Lingua da restituire, oppure `all` per tutte le lingue. Vedere la sezione Localizzazione nella descrizione dell'API.",
    paramFallbackLocale: 'Lingua di ripiego per i valori localizzati mancanti, oppure `none` per disabilitarla.',
    paramValidateLocale:
      'Lingue da validare, oppure `all` per tutte le lingue. Ripetere il parametro per più di una lingua.',
    paramComputeHierarchyPaths:
      'Imposta true per calcolare i percorsi `{{slugPath}}` e `{{titlePath}}`. Anche selezionare uno dei due campi li calcola.',

    schemaSelect: 'Scegliere i campi da restituire, ad es. `select[title]=true`. Omettere per restituirli tutti.',
    schemaPopulate: 'Popola i documenti correlati per ciascuna collezione, ad es. `populate[posts][title]=true`.',
    schemaJoins: 'Controlli per singolo join (limit/page/sort/where/count), ad es. `joins[posts][limit]=10`.',
    schemaWhere:
      'Filtro `where` di Payload. Annidare un campo e poi un operatore: `where[field][equals]=value`. Combinare le clausole con gli array `and` / `or`, ad es. `where[or][0][field][equals]=value`. Ogni campo elenca solo gli operatori validi per il suo tipo.',
    schemaSupportedTimezones: 'Fusi orari supportati in formato IANA.',
    schemaPerLocale: 'Valori per singola lingua, restituiti quando `locale=all`.',
    schemaHierarchySlugPath:
      'Percorso di slug, es. `parent/child`. Calcolato in lettura con `computeHierarchyPaths=true` o quando selezionato. Non utilizzabile in `where`.',
    schemaHierarchyTitlePath:
      'Percorso di titoli, es. `Parent/Child`. Calcolato in lettura con `computeHierarchyPaths=true` o quando selezionato. Non utilizzabile in `where`.',

    collectionList: 'Elenco paginato di documenti',
    collectionDoc: 'Un singolo documento',
    collectionCreated: 'Documento creato',
    collectionUpdated: 'Documento aggiornato',
    collectionDeleted: 'Documento eliminato',
    collectionBulkUpdate: "Risultato dell'aggiornamento di massa",
    collectionBulkDelete: "Risultato dell'eliminazione di massa",
    collectionCount: 'Conteggio dei documenti',
    collectionDuplicated: 'Il documento duplicato',
    validateResult:
      'Risultato della validazione. Non viene salvato nulla. I valori di campo non validi restituiscono `valid: false` con gli errori, non uno stato di errore.',
    validateBody:
      "Dati del documento da validare. Su un documento salvato o un global, i dati vengono uniti all'ultima bozza, oppure al documento salvato se non c'è una bozza.",

    globalDoc: 'Il documento globale',

    authLogin: "Risultato dell'accesso",
    authLogout: 'Risultato della disconnessione',
    authMe: "L'utente attualmente autenticato",
    authRefreshToken: 'Token rinnovato',
    authForgotPassword: 'Email di reimpostazione della password inviata',
    authResetPassword: 'Risultato della reimpostazione della password',
    authFirstRegister: 'Il primo utente, creato con un token di autenticazione',
    authInit: 'Indica se questa collezione di autenticazione ha già degli utenti',
    authAccess: "I permessi dell'utente corrente per tutte le collezioni e i globali",
    docAccess: "I permessi dell'utente corrente per questo documento",
    docAccessBody:
      "Dati del documento su cui verificare l'accesso. Senza, Payload usa il documento salvato, se esiste.",
    authUnlock: 'Risultato dello sblocco',
    authVerify: 'Risultato della verifica',
    apiKeyReveal: 'La chiave API decifrata',

    versionList: 'Elenco paginato di versioni',
    versionSingle: 'Una singola versione',
    versionRestored: 'Il documento ripristinato',
    versionWhere: 'Filtra sui campi delle versioni, ad es. `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'Esegue i job in coda (e, per impostazione predefinita, gestisce le pianificazioni)',
    jobsSchedulesSummary: 'Accoda i job dovuti secondo la loro pianificazione',
    jobsRunResult: "Risultato dell'esecuzione",
    jobsSchedulesResult: 'Risultato della pianificazione',
    jobsRunAllQueues: 'Esegue i job su tutte le code.',
    jobsLimit: 'Numero massimo di job da eseguire.',
    jobsDisableScheduling: 'Salta la gestione delle pianificazioni che `run` esegue per impostazione predefinita.',
    jobsSilent: "Sopprime il logging dell'esecuzione.",
    jobsSchedulesAllQueues: 'Gestisce le pianificazioni su tutte le code.',
    jobsQueue: "Limita l'operazione a una singola coda. Code note: {{queues}}.",

    uploadFile: 'Il file binario da caricare.',
    uploadBody:
      "Inviare `multipart/form-data` per caricare un file (una parte binaria `file` più una parte `_payload` con i campi in formato JSON), oppure `application/json` con i soli campi quando non c'è alcun file.",
    uploadPayloadField: 'Campi {{schema}} in formato JSON. Esempio: `{"alt":"A caption"}`.',
    fileServe: 'Il file',
    filePartial: 'Una parte del file, per una richiesta `Range`',
    paramFileVersion: 'Restituisce il file salvato con questo ID di versione.',
    uploadInstructionsSummary: 'Ottiene le istruzioni per caricare un file prima di salvare il documento',
    uploadInstructionsResult:
      'Dove inviare i byte del file e il valore `file` da inviare con la richiesta di creazione o aggiornamento',
    uploadStagePutSummary: 'Invia i byte del file per un caricamento temporaneo',
    uploadStageDeleteSummary: 'Elimina un caricamento temporaneo',
    uploadStageResult: 'Fatto, nessun contenuto',

    error400: 'Errore di validazione o di query (ValidationError, QueryError)',
    error401: 'Non autenticato (AuthenticationError)',
    error403: 'Vietato dal controllo degli accessi (Forbidden, UnverifiedEmail)',
    error404: 'Documento non trovato (NotFound)',
    error500: 'Errore interno del server (APIError)',

    securityBearer:
      "Incollare il `token` restituito dall'endpoint di accesso. Inviato come `Authorization: Bearer <token>`. Payload accetta anche lo schema `JWT <token>` e un cookie `{{cookiePrefix}}-token`.",
    securityInteractive:
      'Accesso interattivo: inserire nome utente (o email) e password; lasciare vuoti Client ID/Secret.',

    tagCollections: 'Collezioni',
    tagCollectionsDesc: 'Endpoint per le collezioni di documenti (CRUD, conteggio, duplicazione).',
    tagGlobals: 'Globali',
    tagGlobalsDesc: 'Endpoint per i documenti globali.',
    tagSystem: 'Sistema',
    tagSystemDesc: 'Endpoint di sistema di Payload.',
    tagAuth: 'Autenticazione',
    tagVersions: 'Versioni',
    tagJobs: 'Job',
    tagUploads: 'Caricamenti',
    tagAccess: 'Accesso',
    tagPlugins: 'Plugin',
    tagPluginsDesc: 'Endpoint aggiunti dai plugin ufficiali di Payload.',
    error400Plugin: 'Richiesta non valida',
    error401Plugin: 'Non autenticato',
    error403Plugin: 'Accesso negato',
    error404Plugin: 'Non trovato',
    error500Plugin: 'Errore interno del server',
    ecommerceAddItem: 'Aggiungi un articolo al carrello',
    ecommerceRemoveItem: 'Rimuovi un articolo dal carrello',
    ecommerceUpdateItem: 'Modifica la quantità di un articolo del carrello',
    ecommerceClearCart: 'Rimuovi tutti gli articoli dal carrello',
    ecommerceMergeCart: 'Unisci un carrello ospite a questo carrello',
    ecommerceCartAccess:
      'Consentito al proprietario del carrello, o per un carrello ospite con il suo `secret` nel corpo.',
    ecommerceCartResult: 'Il carrello aggiornato',
    error404Ecommerce: 'Carrello non trovato o non accessibile',
    ecommerceQuantity: 'Nuova quantità, oppure `{ "$inc": n }` per modificarla di n.',
    ecommerceInitiatePayment: 'Avvia un pagamento con `{{method}}`',
    ecommerceConfirmOrder: 'Conferma il pagamento con `{{method}}` e crea l’ordine',
    ecommercePaymentBody:
      'Usa `cartID` (con `secret` per un carrello ospite) o il carrello dell’utente. Senza utente, `customerEmail` è obbligatorio. L’adattatore di pagamento può richiedere altri campi.',
    ecommerceInitiateResult: 'Pagamento avviato. L’adattatore aggiunge i propri campi, ad es. un client secret.',
    ecommerceConfirmResult: 'L’ordine è stato creato',
    stripeWebhook: 'Ricevi gli eventi webhook di Stripe',
    stripeWebhookBody:
      'L’evento Stripe grezzo, firmato nell’header `Stripe-Signature`. Chiamato da Stripe, non dai client dell’API.',
    stripeWebhookResult: 'Evento ricevuto',
    error400StripeWebhook: 'Verifica della firma non riuscita',
    stripeRest: 'Chiama un metodo consentito dell’API Stripe',
    stripeRestResult: 'Il risultato dell’API Stripe',
    error404StripeRest: 'L’API Stripe ha restituito un errore',
    mcp: 'Invia un messaggio MCP JSON-RPC',
    mcpDesc:
      'Model Context Protocol su Streamable HTTP, con risposte JSON. Le richieste anonime funzionano; gli strumenti elencati dipendono dai permessi dell’utente. I client con una versione del protocollo del 2025 devono inviare `Accept: application/json, text/event-stream`.',
    mcpResult: 'Risposta JSON-RPC',
    mcpOverrideAccess: 'Salta i controlli di accesso. Solo per lo sviluppo.',
    mcpGet: 'Non supportato: il server non apre alcun flusso di eventi',
    error405McpGet: 'Metodo non consentito, usa POST',
    mcpProtocolVersion: 'Versione negoziata del protocollo MCP, ad es. `2025-06-18`.',
    mcpResult202: 'Accettato: il corpo conteneva solo notifiche o risposte',
    error404Mcp: 'Metodo MCP sconosciuto',
    error406Mcp: 'Nell’header `Accept` manca `application/json` o `text/event-stream`',
    error413Mcp: 'Il corpo della richiesta è troppo grande',
    error415Mcp: '`Content-Type` deve essere `application/json`',
    seoTitle: 'Genera il meta titolo',
    seoDescription: 'Genera la meta descrizione',
    seoUrl: 'Genera l’URL di anteprima',
    seoImage: 'Genera la meta immagine',
    seoBody:
      'Il documento in modifica: `collectionSlug` o `globalSlug`, il suo `id` e i dati `doc` correnti. Passato alla tua funzione di generazione.',
    seoResult: 'Il valore generato. Una stringa vuota se non è impostata alcuna funzione di generazione.',
    searchReindex: 'Ricostruisci l’indice di ricerca per alcune collezioni',
    searchReindexResult: 'Riepilogo della reindicizzazione',
    tenantOptions: 'Elenca i tenant che l’utente può scegliere',
    tenantOptionsResult: 'Opzioni tenant',
    exportDownload: 'Esporta documenti in un file',
    exportDownloadResult: 'Il file esportato',
    exportPreview: 'Anteprima di un’esportazione',
    importPreview: 'Anteprima di un file di importazione',
    previewResult: 'Una pagina di documenti di anteprima',
    importFileData: 'Contenuto del file, codificato in base64.',
    r2Upload: 'Carica un file su R2 in parti',
    r2UploadDesc:
      'Tre passaggi su una sola route. Avvio: invia `collection`, `fileName` e `fileType`. Ogni parte: aggiungi `multipartId`, `multipartKey`, `multipartNumber` e `signedReceipt`, e invia i byte. Completamento: lo stesso senza `multipartNumber`, con l’elenco JSON delle parti.',
    r2UploadResult: 'Caricamento avviato, parte caricata o caricamento completato (la chiave dell’oggetto come testo)',
    error412R2: 'Esiste già un file con questa chiave',

    localizationHeading: 'Localizzazione',
    localizationNote:
      'Lingue disponibili: {{locales}}. Passare `?locale=<code>` a un endpoint di lettura per selezionarne una. Passare `?locale=all` per ricevere tutte le lingue contemporaneamente: ogni campo localizzato viene quindi restituito come un oggetto con chiavi corrispondenti ai codici di lingua (ad es. `{ "en": "Hello", "de": "Hallo" }`) anziché come un singolo valore. Impostare `?flattenLocales=false` con `locale=all` per mantenere questa forma a oggetto per singola lingua. Gli schemi dei campi mostrano la struttura a singola lingua.',
    docLanguagesNote:
      'Questa documentazione è disponibile in: {{languages}}. Aggiungi `?lang=<code>` a questo URL della specifica per cambiare lingua.',
  },
}
