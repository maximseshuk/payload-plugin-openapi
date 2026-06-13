import type { PluginDefaultTranslationsObject } from '../types.js'

export const ca: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: "Quants nivells de documents relacionats s'han d'omplir.",
    paramSort: 'Camp pel qual ordenar; afegiu el prefix `-` per a ordre descendent, p. ex. `-createdAt`.',
    paramSortShort: 'Camp pel qual ordenar; afegiu el prefix `-` per a ordre descendent.',
    paramDraft: "Retorna les versions d'esborrany.",
    paramTrash: 'Inclou els documents enviats a la paperera.',
    paramFlattenLocales:
      'Amb `locale=all`, establiu-ho a false per mantenir els camps localitzats com a objectes per localització. Per defecte és true.',
    paramLocale:
      "Localització a retornar, o `all` per a totes les localitzacions. Vegeu la secció Localització a la descripció de l'API.",
    paramFallbackLocale: 'Localització de reserva per als valors localitzats que manquin, o `none` per desactivar-la.',

    schemaSelect: 'Trieu els camps a retornar, p. ex. `select[title]=true`. Ometeu-ho per retornar-los tots.',
    schemaPopulate: 'Ompliu els documents relacionats per col·lecció, p. ex. `populate[posts][title]=true`.',
    schemaJoins: 'Controls per unió (limit/page/sort/where/count), p. ex. `joins[posts][limit]=10`.',
    schemaWhere:
      'Filtre `where` de Payload. Imbriqueu un camp i després un operador: `where[field][equals]=value`. Combineu clàusules amb els arrays `and` / `or`, p. ex. `where[or][0][field][equals]=value`. Cada camp només llista els operadors vàlids per al seu tipus.',
    schemaSupportedTimezones: 'Zones horàries admeses en format IANA.',
    schemaPerLocale: 'Valors per localització, retornats quan `locale=all`.',

    collectionList: 'Llista paginada de documents',
    collectionDoc: 'Un únic document',
    collectionCreated: 'Document creat',
    collectionUpdated: 'Document actualitzat',
    collectionDeleted: 'Document eliminat',
    collectionBulkUpdate: "Resultat de l'actualització massiva",
    collectionBulkDelete: "Resultat de l'eliminació massiva",
    collectionCount: 'Recompte de documents',
    collectionDuplicated: 'El document duplicat',

    globalDoc: 'El document global',

    authLogin: "Resultat de l'inici de sessió",
    authLogout: 'Resultat del tancament de sessió',
    authMe: "L'usuari autenticat actualment",
    authRefreshToken: 'Token renovat',
    authForgotPassword: 'Correu de restabliment de contrasenya enviat',
    authResetPassword: 'Resultat del restabliment de contrasenya',
    authFirstRegister: "El primer usuari, creat amb un token d'autenticació",
    authInit: "Si aquesta col·lecció d'autenticació ja té usuaris",
    authAccess: "L'accés (permisos) de l'usuari actual per a aquesta col·lecció",
    authUnlock: 'Resultat del desbloqueig',
    authVerify: 'Resultat de la verificació',

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

    localizationHeading: 'Localització',
    localizationNote:
      'Localitzacions disponibles: {{locales}}. Passeu `?locale=<code>` a un endpoint de lectura per seleccionar-ne una. Passeu `?locale=all` per rebre totes les localitzacions alhora: cada camp localitzat es retorna llavors com un objecte indexat pel codi de localització (p. ex. `{ "en": "Hello", "de": "Hallo" }`) en lloc d\'un únic valor. Establiu `?flattenLocales=false` amb `locale=all` per mantenir aquesta forma d\'objecte per localització. Els esquemes de camp mostren la forma d\'una sola localització.',
    docLanguagesNote:
      "Aquesta documentació està disponible en: {{languages}}. Afegiu `?lang=<code>` a aquesta URL d'especificació per canviar d'idioma.",
  },
}
