import type { PluginDefaultTranslationsObject } from '../types.js'

export const es: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Cuántos niveles de documentos relacionados se deben poblar.',
    paramSort: 'Campo por el que ordenar; antepón `-` para orden descendente, p. ej. `-createdAt`.',
    paramSortShort: 'Campo por el que ordenar; antepón `-` para orden descendente.',
    paramDraft: 'Devolver versiones en borrador.',
    paramTrash: 'Incluir documentos en la papelera.',
    paramAutosave: 'Guardar como autoguardado: actualiza la última versión autoguardada en lugar de añadir una nueva.',
    paramPublishAllLocales: 'Publicar todos los idiomas, no solo el de la solicitud.',
    paramUnpublishAllLocales: 'Despublicar todos los idiomas y devolver el documento a borrador.',
    paramOverrideLock: 'Ignorar un bloqueo de otro usuario. Por defecto false.',
    paramSelectedLocales: 'Copiar solo estos idiomas al duplicado. Por defecto: todos los idiomas.',
    paramFlattenLocales:
      'Con `locale=all`, establécelo en false para mantener los campos localizados como objetos por idioma. Valor por defecto: true.',
    paramLocale:
      'Idioma a devolver, o `all` para todos los idiomas. Consulta la sección de Localización en la descripción de la API.',
    paramFallbackLocale: 'Idioma de reserva para los valores localizados que falten, o `none` para desactivarlo.',

    schemaSelect: 'Elige los campos a devolver, p. ej. `select[title]=true`. Omítelo para devolver todos.',
    schemaPopulate: 'Pobla documentos relacionados por colección, p. ej. `populate[posts][title]=true`.',
    schemaJoins: 'Controles por join (limit/page/sort/where/count), p. ej. `joins[posts][limit]=10`.',
    schemaWhere:
      'Filtro `where` de Payload. Anida un campo y luego un operador: `where[field][equals]=value`. Combina cláusulas con los arrays `and` / `or`, p. ej. `where[or][0][field][equals]=value`. Cada campo lista únicamente los operadores válidos para su tipo.',
    schemaSupportedTimezones: 'Zonas horarias admitidas en formato IANA.',
    schemaPerLocale: 'Valores por idioma, devueltos cuando `locale=all`.',

    collectionList: 'Lista paginada de documentos',
    collectionDoc: 'Un único documento',
    collectionCreated: 'Documento creado',
    collectionUpdated: 'Documento actualizado',
    collectionDeleted: 'Documento eliminado',
    collectionBulkUpdate: 'Resultado de la actualización masiva',
    collectionBulkDelete: 'Resultado de la eliminación masiva',
    collectionCount: 'Recuento de documentos',
    collectionDuplicated: 'El documento duplicado',

    globalDoc: 'El documento global',

    authLogin: 'Resultado del inicio de sesión',
    authLogout: 'Resultado del cierre de sesión',
    authMe: 'El usuario actualmente autenticado',
    authRefreshToken: 'Token renovado',
    authForgotPassword: 'Correo de restablecimiento de contraseña enviado',
    authResetPassword: 'Resultado del restablecimiento de contraseña',
    authFirstRegister: 'El primer usuario, creado con un token de autenticación',
    authInit: 'Si esta colección de autenticación ya tiene algún usuario',
    authAccess: 'El acceso (permisos) del usuario actual para esta colección',
    authUnlock: 'Resultado del desbloqueo',
    authVerify: 'Resultado de la verificación',

    versionList: 'Lista paginada de versiones',
    versionSingle: 'Una única versión',
    versionRestored: 'El documento restaurado',
    versionWhere: 'Filtra sobre los campos de versión, p. ej. `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'Ejecutar los trabajos en cola (y, por defecto, gestionar las programaciones)',
    jobsSchedulesSummary: 'Encolar los trabajos que correspondan según su programación',
    jobsRunResult: 'Resultado de la ejecución',
    jobsSchedulesResult: 'Resultado de la programación',
    jobsRunAllQueues: 'Ejecutar trabajos en todas las colas.',
    jobsLimit: 'Número máximo de trabajos a ejecutar.',
    jobsDisableScheduling: 'Omitir la gestión de programaciones que `run` realiza por defecto.',
    jobsSilent: 'Suprimir el registro de la ejecución.',
    jobsSchedulesAllQueues: 'Gestionar las programaciones en todas las colas.',
    jobsQueue: 'Restringir la operación a una única cola. Colas conocidas: {{queues}}.',

    uploadFile: 'El archivo binario a subir.',
    uploadBody:
      'Envía `multipart/form-data` para subir un archivo (una parte binaria `file` más una parte `_payload` con los campos serializados como JSON), o `application/json` con solo los campos cuando no hay archivo.',
    uploadPayloadField: 'Campos {{schema}} serializados como JSON. Ejemplo: `{"alt":"A caption"}`.',

    error400: 'Error de validación o de consulta (ValidationError, QueryError)',
    error401: 'No autenticado (AuthenticationError)',
    error403: 'Prohibido por el control de acceso (Forbidden, UnverifiedEmail)',
    error404: 'Documento no encontrado (NotFound)',
    error500: 'Error interno del servidor (APIError)',

    securityBearer:
      'Pega el `token` devuelto por el endpoint de inicio de sesión. Se envía como `Authorization: Bearer <token>`. Payload también acepta el esquema `JWT <token>` y una cookie `{{cookiePrefix}}-token`.',
    securityInteractive:
      'Inicio de sesión interactivo: introduce el nombre de usuario (o correo electrónico) y la contraseña; deja Client ID/Secret en blanco.',

    tagCollections: 'Colecciones',
    tagCollectionsDesc: 'Endpoints de colecciones de documentos (CRUD, recuento, duplicado).',
    tagGlobals: 'Globales',
    tagGlobalsDesc: 'Endpoints de documentos globales.',
    tagSystem: 'Sistema',
    tagSystemDesc: 'Endpoints del sistema de Payload.',
    tagAuth: 'Autenticación',
    tagVersions: 'Versiones',
    tagJobs: 'Trabajos',

    localizationHeading: 'Localización',
    localizationNote:
      'Idiomas disponibles: {{locales}}. Pasa `?locale=<code>` a un endpoint de lectura para seleccionar uno. Pasa `?locale=all` para recibir todos los idiomas a la vez; cada campo localizado se devuelve entonces como un objeto indexado por el código de idioma (p. ej. `{ "en": "Hello", "de": "Hallo" }`) en lugar de un único valor. Establece `?flattenLocales=false` junto con `locale=all` para mantener esa forma de objeto por idioma. Los esquemas de campo muestran la forma de un solo idioma.',
    docLanguagesNote:
      'Esta documentación está disponible en: {{languages}}. Añade `?lang=<code>` a la URL de esta especificación para cambiar de idioma.',
  },
}
