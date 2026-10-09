import type { PluginDefaultTranslationsObject } from '@/shared/translations/types.js'

export const ca: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: "Quants nivells de documents relacionats s'han d'omplir.",
    paramSort: 'Camp pel qual ordenar; afegiu el prefix `-` per a ordre descendent, p. ex. `-createdAt`.',
    paramSortShort: 'Camp pel qual ordenar; afegiu el prefix `-` per a ordre descendent.',
    paramDraft: "Retorna les versions d'esborrany.",
    paramTrash: 'Inclou els documents enviats a la paperera.',
    paramAutosave:
      "Desa com a desat automàtic: actualitza l'última versió desada automàticament en lloc d'afegir-ne una de nova.",
    paramPublishAllLocales: 'Publica tots els idiomes, no només el de la petició.',
    paramUnpublishAllLocales: 'Despublica tots els idiomes i torna el document a esborrany.',
    paramOverrideLock: "Ignora un bloqueig d'un altre usuari. Per defecte false.",
    paramSelectedLocales: 'Copia només aquests idiomes al duplicat. Per defecte: tots els idiomes.',
    paramFlattenLocales:
      'Amb `locale=all`, establiu-ho a false per mantenir els camps localitzats com a objectes per localització. Per defecte és true.',
    paramLocale:
      "Localització a retornar, o `all` per a totes les localitzacions. Vegeu la secció Localització a la descripció de l'API.",
    paramFallbackLocale: 'Localització de reserva per als valors localitzats que manquin, o `none` per desactivar-la.',
    paramValidateLocale:
      "Localitzacions a validar, o `all` per a totes les localitzacions. Repeteix el paràmetre per a més d'una localització.",
    paramComputeHierarchyPaths:
      'Posa true per calcular els camins `{{slugPath}}` i `{{titlePath}}`. Seleccionar qualsevol dels dos camps també els calcula.',

    schemaSelect: 'Trieu els camps a retornar, p. ex. `select[title]=true`. Ometeu-ho per retornar-los tots.',
    schemaPopulate: 'Ompliu els documents relacionats per col·lecció, p. ex. `populate[posts][title]=true`.',
    schemaJoins: 'Controls per unió (limit/page/sort/where/count), p. ex. `joins[posts][limit]=10`.',
    schemaWhere:
      'Filtre `where` de Payload. Imbriqueu un camp i després un operador: `where[field][equals]=value`. Combineu clàusules amb els arrays `and` / `or`, p. ex. `where[or][0][field][equals]=value`. Cada camp només llista els operadors vàlids per al seu tipus.',
    schemaSupportedTimezones: 'Zones horàries admeses en format IANA.',
    schemaPerLocale: 'Valors per localització, retornats quan `locale=all`.',
    schemaHierarchySlugPath:
      'Camí de slugs, p. ex. `parent/child`. Es calcula en llegir amb `computeHierarchyPaths=true` o quan se selecciona. No es pot fer servir a `where`.',
    schemaHierarchyTitlePath:
      'Camí de títols, p. ex. `Parent/Child`. Es calcula en llegir amb `computeHierarchyPaths=true` o quan se selecciona. No es pot fer servir a `where`.',

    collectionList: 'Llista paginada de documents',
    collectionDoc: 'Un únic document',
    collectionCreated: 'Document creat',
    collectionUpdated: 'Document actualitzat',
    collectionDeleted: 'Document eliminat',
    collectionBulkUpdate: "Resultat de l'actualització massiva",
    collectionBulkDelete: "Resultat de l'eliminació massiva",
    collectionCount: 'Recompte de documents',
    collectionDuplicated: 'El document duplicat',
    validateResult:
      "Resultat de la validació. No es desa res. Els valors de camp no vàlids retornen `valid: false` amb els errors, no un estat d'error.",
    validateBody:
      "Dades del document a validar. En un document desat o un global, les dades es fusionen sobre l'últim esborrany, o sobre el document desat si no hi ha esborrany.",

    globalDoc: 'El document global',

    authLogin: "Resultat de l'inici de sessió",
    authLogout: 'Resultat del tancament de sessió',
    authMe: "L'usuari autenticat actualment",
    authRefreshToken: 'Token renovat',
    authForgotPassword: 'Correu de restabliment de contrasenya enviat',
    authResetPassword: 'Resultat del restabliment de contrasenya',
    authFirstRegister: "El primer usuari, creat amb un token d'autenticació",
    authInit: "Si aquesta col·lecció d'autenticació ja té usuaris",
    authAccess: "Els permisos de l'usuari actual per a totes les col·leccions i globals",
    docAccess: "Els permisos de l'usuari actual per a aquest document",
    docAccessBody:
      "Dades del document amb què es comprova l'accés. Sense elles, Payload fa servir el document desat, si n'hi ha.",
    authUnlock: 'Resultat del desbloqueig',
    authVerify: 'Resultat de la verificació',
    apiKeyReveal: "La clau d'API desxifrada",

    versionList: 'Llista paginada de versions',
    versionSingle: 'Una única versió',
    versionRestored: 'El document restaurat',
    versionWhere: 'Filtra sobre els camps de versió, p. ex. `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'Executa les tasques en cua (i, per defecte, gestiona les programacions)',
    jobsSchedulesSummary: 'Posa en cua les tasques que toquen segons la seva programació',
    jobsRunResult: "Resultat de l'execució",
    jobsSchedulesResult: 'Resultat de la programació',
    jobsRunAllQueues: 'Executa les tasques de totes les cues.',
    jobsLimit: 'Nombre màxim de tasques a executar.',
    jobsDisableScheduling: 'Omet la gestió de programacions que `run` fa per defecte.',
    jobsSilent: "Suprimeix el registre de l'execució.",
    jobsSchedulesAllQueues: 'Gestiona les programacions de totes les cues.',
    jobsQueue: "Restringeix l'operació a una única cua. Cues conegudes: {{queues}}.",

    uploadFile: 'El fitxer binari a pujar.',
    uploadBody:
      'Envieu `multipart/form-data` per pujar un fitxer (una part binària `file` més una part `_payload` amb els camps en format JSON), o `application/json` només amb els camps quan no hi ha cap fitxer.',
    uploadPayloadField: 'Camps {{schema}} en format JSON. Exemple: `{"alt":"A caption"}`.',
    fileServe: 'El fitxer',
    filePartial: 'Una part del fitxer, per a una petició `Range`',
    paramFileVersion: 'Retorna el fitxer desat amb aquest ID de versió.',
    uploadInstructionsSummary: 'Obté instruccions per pujar un fitxer abans de desar el document',
    uploadInstructionsResult:
      "On enviar els bytes del fitxer i el valor `file` que cal enviar amb la petició de creació o d'actualització",
    uploadStagePutSummary: 'Envia els bytes del fitxer per a una pujada temporal',
    uploadStageDeleteSummary: 'Elimina una pujada temporal',
    uploadStageResult: 'Fet, sense contingut',

    error400: 'Error de validació o de consulta (ValidationError, QueryError)',
    error401: 'No autenticat (AuthenticationError)',
    error403: "Prohibit pel control d'accés (Forbidden, UnverifiedEmail)",
    error404: 'Document no trobat (NotFound)',
    error500: 'Error intern del servidor (APIError)',

    securityBearer:
      "Enganxeu el `token` retornat per l'endpoint d'inici de sessió. S'envia com a `Authorization: Bearer <token>`. Payload també accepta l'esquema `JWT <token>` i una galeta `{{cookiePrefix}}-token`.",
    securityInteractive:
      "Inici de sessió interactiu: introduïu el nom d'usuari (o el correu electrònic) i la contrasenya; deixeu en blanc el Client ID/Secret.",

    tagCollections: 'Col·leccions',
    tagCollectionsDesc: 'Endpoints de col·leccions de documents (CRUD, recompte, duplicació).',
    tagGlobals: 'Globals',
    tagGlobalsDesc: 'Endpoints de documents globals.',
    tagSystem: 'Sistema',
    tagSystemDesc: 'Endpoints del sistema de Payload.',
    tagAuth: 'Autenticació',
    tagVersions: 'Versions',
    tagJobs: 'Tasques',
    tagUploads: 'Pujades',
    tagAccess: 'Accés',
    tagPlugins: 'Plugins',
    tagPluginsDesc: 'Endpoints afegits pels plugins oficials de Payload.',
    error400Plugin: 'Sol·licitud no vàlida',
    error401Plugin: 'No autenticat',
    error403Plugin: 'Prohibit',
    error404Plugin: 'No trobat',
    error500Plugin: 'Error intern del servidor',
    ecommerceAddItem: 'Afegeix un article a la cistella',
    ecommerceRemoveItem: 'Treu un article de la cistella',
    ecommerceUpdateItem: 'Canvia la quantitat d’un article de la cistella',
    ecommerceClearCart: 'Treu tots els articles de la cistella',
    ecommerceMergeCart: 'Fusiona una cistella de convidat amb aquesta cistella',
    ecommerceCartAccess:
      'Permès per al propietari de la cistella, o per a una cistella de convidat amb el seu `secret` al cos.',
    ecommerceCartResult: 'La cistella actualitzada',
    error404Ecommerce: 'Cistella no trobada o no accessible',
    ecommerceQuantity: 'Nova quantitat, o `{ "$inc": n }` per canviar-la en n.',
    ecommerceInitiatePayment: 'Inicia un pagament amb `{{method}}`',
    ecommerceConfirmOrder: 'Confirma el pagament amb `{{method}}` i crea la comanda',
    ecommercePaymentBody:
      'Fa servir `cartID` (amb `secret` per a una cistella de convidat) o la cistella de l’usuari. Sense usuari, `customerEmail` és obligatori. L’adaptador de pagament pot necessitar més camps.',
    ecommerceInitiateResult: 'Pagament iniciat. L’adaptador afegeix els seus propis camps, p. ex. un secret de client.',
    ecommerceConfirmResult: 'S’ha creat la comanda',
    stripeWebhook: 'Rep esdeveniments de webhook de Stripe',
    stripeWebhookBody:
      'L’esdeveniment de Stripe en brut, signat a la capçalera `Stripe-Signature`. El crida Stripe, no els clients de l’API.',
    stripeWebhookResult: 'Esdeveniment rebut',
    error400StripeWebhook: 'La comprovació de la signatura ha fallat',
    stripeRest: 'Crida un mètode permès de l’API de Stripe',
    stripeRestResult: 'El resultat de l’API de Stripe',
    error404StripeRest: 'L’API de Stripe ha retornat un error',
    mcp: 'Envia un missatge MCP JSON-RPC',
    mcpDesc:
      'Model Context Protocol sobre Streamable HTTP, amb respostes JSON. Les sol·licituds anònimes funcionen; les eines llistades depenen dels permisos de l’usuari. Els clients amb una versió del protocol de 2025 han d’enviar `Accept: application/json, text/event-stream`.',
    mcpResult: 'Resposta JSON-RPC',
    mcpOverrideAccess: 'Omet les comprovacions d’accés. Només per a desenvolupament.',
    mcpGet: 'No compatible: el servidor no obre cap flux d’esdeveniments',
    error405McpGet: 'Mètode no permès, fes servir POST',
    mcpProtocolVersion: 'Versió negociada del protocol MCP, p. ex. `2025-06-18`.',
    mcpResult202: 'Acceptat: el cos només contenia notificacions o respostes',
    error404Mcp: 'Mètode MCP desconegut',
    error406Mcp: 'La capçalera `Accept` no inclou `application/json` o `text/event-stream`',
    error413Mcp: 'El cos de la sol·licitud és massa gran',
    error415Mcp: '`Content-Type` ha de ser `application/json`',
    seoTitle: 'Genera el metatítol',
    seoDescription: 'Genera la metadescripció',
    seoUrl: 'Genera l’URL de previsualització',
    seoImage: 'Genera la metaimatge',
    seoBody:
      'El document en edició: `collectionSlug` o `globalSlug`, el seu `id` i les dades actuals de `doc`. Es passa a la teva funció de generació.',
    seoResult: 'El valor generat. Una cadena buida si no hi ha cap funció de generació.',
    searchReindex: 'Reconstrueix l’índex de cerca d’algunes col·leccions',
    searchReindexResult: 'Resum de la reindexació',
    tenantOptions: 'Llista els inquilins que l’usuari pot triar',
    tenantOptionsResult: 'Opcions d’inquilí',
    exportDownload: 'Exporta documents a un fitxer',
    exportDownloadResult: 'El fitxer exportat',
    exportPreview: 'Previsualitza una exportació',
    importPreview: 'Previsualitza un fitxer d’importació',
    previewResult: 'Una pàgina de documents de previsualització',
    importFileData: 'Contingut del fitxer, codificat en base64.',
    r2Upload: 'Puja un fitxer a R2 per parts',
    r2UploadDesc:
      'Tres passos en una sola ruta. Inici: envia `collection`, `fileName` i `fileType`. Cada part: afegeix `multipartId`, `multipartKey`, `multipartNumber` i `signedReceipt`, i envia els bytes. Final: el mateix sense `multipartNumber`, amb la llista JSON de parts.',
    r2UploadResult: 'Pujada iniciada, part pujada o pujada completada (la clau de l’objecte com a text)',
    error412R2: 'Ja existeix un fitxer amb aquesta clau',

    localizationHeading: 'Localització',
    localizationNote:
      'Localitzacions disponibles: {{locales}}. Passeu `?locale=<code>` a un endpoint de lectura per seleccionar-ne una. Passeu `?locale=all` per rebre totes les localitzacions alhora: cada camp localitzat es retorna llavors com un objecte indexat pel codi de localització (p. ex. `{ "en": "Hello", "de": "Hallo" }`) en lloc d\'un únic valor. Establiu `?flattenLocales=false` amb `locale=all` per mantenir aquesta forma d\'objecte per localització. Els esquemes de camp mostren la forma d\'una sola localització.',
    docLanguagesNote:
      "Aquesta documentació està disponible en: {{languages}}. Afegiu `?lang=<code>` a aquesta URL d'especificació per canviar d'idioma.",
  },
}
