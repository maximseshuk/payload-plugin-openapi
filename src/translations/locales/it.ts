import type { PluginDefaultTranslationsObject } from '../types.js'

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

    schemaSelect: 'Scegliere i campi da restituire, ad es. `select[title]=true`. Omettere per restituirli tutti.',
    schemaPopulate: 'Popola i documenti correlati per ciascuna collezione, ad es. `populate[posts][title]=true`.',
    schemaJoins: 'Controlli per singolo join (limit/page/sort/where/count), ad es. `joins[posts][limit]=10`.',
    schemaWhere:
      'Filtro `where` di Payload. Annidare un campo e poi un operatore: `where[field][equals]=value`. Combinare le clausole con gli array `and` / `or`, ad es. `where[or][0][field][equals]=value`. Ogni campo elenca solo gli operatori validi per il suo tipo.',
    schemaSupportedTimezones: 'Fusi orari supportati in formato IANA.',
    schemaPerLocale: 'Valori per singola lingua, restituiti quando `locale=all`.',

    collectionList: 'Elenco paginato di documenti',
    collectionDoc: 'Un singolo documento',
    collectionCreated: 'Documento creato',
    collectionUpdated: 'Documento aggiornato',
    collectionDeleted: 'Documento eliminato',
    collectionBulkUpdate: "Risultato dell'aggiornamento di massa",
    collectionBulkDelete: "Risultato dell'eliminazione di massa",
    collectionCount: 'Conteggio dei documenti',
    collectionDuplicated: 'Il documento duplicato',

    globalDoc: 'Il documento globale',

    authLogin: "Risultato dell'accesso",
    authLogout: 'Risultato della disconnessione',
    authMe: "L'utente attualmente autenticato",
    authRefreshToken: 'Token rinnovato',
    authForgotPassword: 'Email di reimpostazione della password inviata',
    authResetPassword: 'Risultato della reimpostazione della password',
    authFirstRegister: 'Il primo utente, creato con un token di autenticazione',
    authInit: 'Indica se questa collezione di autenticazione ha già degli utenti',
    authAccess: "L'accesso (i permessi) dell'utente corrente per questa collezione",
    authUnlock: 'Risultato dello sblocco',
    authVerify: 'Risultato della verifica',

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

    localizationHeading: 'Localizzazione',
    localizationNote:
      'Lingue disponibili: {{locales}}. Passare `?locale=<code>` a un endpoint di lettura per selezionarne una. Passare `?locale=all` per ricevere tutte le lingue contemporaneamente: ogni campo localizzato viene quindi restituito come un oggetto con chiavi corrispondenti ai codici di lingua (ad es. `{ "en": "Hello", "de": "Hallo" }`) anziché come un singolo valore. Impostare `?flattenLocales=false` con `locale=all` per mantenere questa forma a oggetto per singola lingua. Gli schemi dei campi mostrano la struttura a singola lingua.',
    docLanguagesNote:
      'Questa documentazione è disponibile in: {{languages}}. Aggiungi `?lang=<code>` a questo URL della specifica per cambiare lingua.',
  },
}
