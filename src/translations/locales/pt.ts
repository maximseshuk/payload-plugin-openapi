import type { PluginDefaultTranslationsObject } from '../types.js'

export const pt: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Quantos níveis de documentos relacionados popular.',
    paramSort: 'Campo pelo qual ordenar; use o prefixo `-` para ordem decrescente, por exemplo `-createdAt`.',
    paramSortShort: 'Campo pelo qual ordenar; use o prefixo `-` para ordem decrescente.',
    paramDraft: 'Retornar versões de rascunho.',
    paramTrash: 'Incluir documentos na lixeira.',
    paramFlattenLocales:
      'Com `locale=all`, defina como false para manter os campos localizados como objetos por locale. Padrão true.',
    paramLocale:
      'Locale a retornar, ou `all` para todos os locales. Consulte a seção de Localização na descrição da API.',
    paramFallbackLocale: 'Locale alternativo para valores localizados ausentes, ou `none` para desativar.',

    schemaSelect: 'Escolha os campos a retornar, por exemplo `select[title]=true`. Omita para retornar todos.',
    schemaPopulate: 'Popule documentos relacionados por coleção, por exemplo `populate[posts][title]=true`.',
    schemaJoins: 'Controles por join (limit/page/sort/where/count), por exemplo `joins[posts][limit]=10`.',
    schemaWhere:
      'Filtro `where` do Payload. Aninhe um campo e depois um operador: `where[field][equals]=value`. Combine cláusulas com os arrays `and` / `or`, por exemplo `where[or][0][field][equals]=value`. Cada campo lista apenas os operadores válidos para seu tipo.',
    schemaSupportedTimezones: 'Fusos horários suportados no formato IANA.',
    schemaPerLocale: 'Valores por locale, retornados quando `locale=all`.',

    collectionList: 'Lista paginada de documentos',
    collectionDoc: 'Um único documento',
    collectionCreated: 'Documento criado',
    collectionUpdated: 'Documento atualizado',
    collectionDeleted: 'Documento excluído',
    collectionBulkUpdate: 'Resultado da atualização em massa',
    collectionBulkDelete: 'Resultado da exclusão em massa',
    collectionCount: 'Contagem de documentos',
    collectionDuplicated: 'O documento duplicado',

    globalDoc: 'O documento global',

    authLogin: 'Resultado do login',
    authLogout: 'Resultado do logout',
    authMe: 'O usuário atualmente autenticado',
    authRefreshToken: 'Token renovado',
    authForgotPassword: 'E-mail de redefinição de senha enviado',
    authResetPassword: 'Resultado da redefinição de senha',
    authFirstRegister: 'O primeiro usuário, criado com um token de autenticação',
    authInit: 'Se esta coleção de autenticação já possui algum usuário',
    authAccess: 'O acesso (permissões) do usuário atual para esta coleção',
    authUnlock: 'Resultado do desbloqueio',
    authVerify: 'Resultado da verificação',

    versionList: 'Lista paginada de versões',
    versionSingle: 'Uma única versão',
    versionRestored: 'O documento restaurado',
    versionWhere: 'Filtrar pelos campos da versão, por exemplo `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'Executar tarefas enfileiradas (e, por padrão, processar agendamentos)',
    jobsSchedulesSummary: 'Enfileirar tarefas que estão vencidas de acordo com seu agendamento',
    jobsRunResult: 'Resultado da execução',
    jobsSchedulesResult: 'Resultado do agendamento',
    jobsRunAllQueues: 'Executar tarefas em todas as filas.',
    jobsLimit: 'Número máximo de tarefas a executar.',
    jobsDisableScheduling: 'Ignorar o processamento de agendamentos que `run` realiza por padrão.',
    jobsSilent: 'Suprimir o registro de log da execução.',
    jobsSchedulesAllQueues: 'Processar agendamentos em todas as filas.',
    jobsQueue: 'Restringir a operação a uma única fila. Filas conhecidas: {{queues}}.',

    uploadFile: 'O arquivo binário a ser enviado.',
    uploadBody:
      'Envie `multipart/form-data` para fazer upload de um arquivo (uma parte binária `file` mais uma parte `_payload` com os campos em JSON stringificado), ou `application/json` apenas com os campos quando não houver arquivo.',
    uploadPayloadField: 'Campos {{schema}} em JSON stringificado. Exemplo: `{"alt":"A caption"}`.',

    error400: 'Erro de validação ou de consulta (ValidationError, QueryError)',
    error401: 'Não autenticado (AuthenticationError)',
    error403: 'Proibido pelo controle de acesso (Forbidden, UnverifiedEmail)',
    error404: 'Documento não encontrado (NotFound)',
    error500: 'Erro interno do servidor (APIError)',

    securityBearer:
      'Cole o `token` retornado pelo endpoint de login. Enviado como `Authorization: Bearer <token>`. O Payload também aceita o esquema `JWT <token>` e um cookie `{{cookiePrefix}}-token`.',
    securityInteractive:
      'Login interativo: informe o nome de usuário (ou e-mail) e a senha; deixe Client ID/Secret em branco.',

    tagCollections: 'Coleções',
    tagCollectionsDesc: 'Endpoints de coleções de documentos (CRUD, contagem, duplicação).',
    tagGlobals: 'Globais',
    tagGlobalsDesc: 'Endpoints de documentos globais.',
    tagSystem: 'Sistema',
    tagSystemDesc: 'Endpoints de sistema do Payload.',
    tagAuth: 'Autenticação',
    tagVersions: 'Versões',
    tagJobs: 'Tarefas',

    localizationHeading: 'Localização',
    localizationNote:
      'Locales disponíveis: {{locales}}. Passe `?locale=<code>` para um endpoint de leitura para selecionar um. Passe `?locale=all` para receber todos os locales de uma vez — cada campo localizado é então retornado como um objeto indexado pelo código do locale (por exemplo `{ "en": "Hello", "de": "Hallo" }`) em vez de um único valor. Defina `?flattenLocales=false` com `locale=all` para manter esse formato de objeto por locale. Os schemas de campo mostram o formato de locale único.',
    docLanguagesNote:
      'Esta documentação está disponível em: {{languages}}. Adicione `?lang=<code>` ao URL desta especificação para alternar.',
  },
}
