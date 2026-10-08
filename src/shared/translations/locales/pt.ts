import type { PluginDefaultTranslationsObject } from '@/shared/translations/types.js'

export const pt: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Quantos níveis de documentos relacionados popular.',
    paramSort: 'Campo pelo qual ordenar; use o prefixo `-` para ordem decrescente, por exemplo `-createdAt`.',
    paramSortShort: 'Campo pelo qual ordenar; use o prefixo `-` para ordem decrescente.',
    paramDraft: 'Retornar versões de rascunho.',
    paramTrash: 'Incluir documentos na lixeira.',
    paramAutosave:
      'Salvar como salvamento automático: atualiza a última versão salva automaticamente em vez de adicionar uma nova.',
    paramPublishAllLocales: 'Publicar todos os idiomas, não só o da requisição.',
    paramUnpublishAllLocales: 'Despublicar todos os idiomas e voltar o documento para rascunho.',
    paramOverrideLock: 'Ignorar um bloqueio de outro usuário. Padrão false.',
    paramSelectedLocales: 'Copiar só estes idiomas para a duplicata. Padrão: todos os idiomas.',
    paramFlattenLocales:
      'Com `locale=all`, defina como false para manter os campos localizados como objetos por locale. Padrão true.',
    paramLocale:
      'Locale a retornar, ou `all` para todos os locales. Consulte a seção de Localização na descrição da API.',
    paramFallbackLocale: 'Locale alternativo para valores localizados ausentes, ou `none` para desativar.',
    paramValidateLocale:
      'Locales a validar, ou `all` para todos os locales. Repita o parâmetro para mais de um locale.',
    paramComputeHierarchyPaths:
      'Defina como true para calcular os caminhos `{{slugPath}}` e `{{titlePath}}`. Selecionar qualquer um dos campos também os calcula.',

    schemaSelect: 'Escolha os campos a retornar, por exemplo `select[title]=true`. Omita para retornar todos.',
    schemaPopulate: 'Popule documentos relacionados por coleção, por exemplo `populate[posts][title]=true`.',
    schemaJoins: 'Controles por join (limit/page/sort/where/count), por exemplo `joins[posts][limit]=10`.',
    schemaWhere:
      'Filtro `where` do Payload. Aninhe um campo e depois um operador: `where[field][equals]=value`. Combine cláusulas com os arrays `and` / `or`, por exemplo `where[or][0][field][equals]=value`. Cada campo lista apenas os operadores válidos para seu tipo.',
    schemaSupportedTimezones: 'Fusos horários suportados no formato IANA.',
    schemaPerLocale: 'Valores por locale, retornados quando `locale=all`.',
    schemaHierarchySlugPath:
      'Caminho de slugs, ex. `parent/child`. Calculado na leitura com `computeHierarchyPaths=true` ou quando selecionado. Não pode ser usado em `where`.',
    schemaHierarchyTitlePath:
      'Caminho de títulos, ex. `Parent/Child`. Calculado na leitura com `computeHierarchyPaths=true` ou quando selecionado. Não pode ser usado em `where`.',

    collectionList: 'Lista paginada de documentos',
    collectionDoc: 'Um único documento',
    collectionCreated: 'Documento criado',
    collectionUpdated: 'Documento atualizado',
    collectionDeleted: 'Documento excluído',
    collectionBulkUpdate: 'Resultado da atualização em massa',
    collectionBulkDelete: 'Resultado da exclusão em massa',
    collectionCount: 'Contagem de documentos',
    collectionDuplicated: 'O documento duplicado',
    validateResult:
      'Resultado da validação. Nada é salvo. Valores de campo inválidos retornam `valid: false` com os erros, não um status de erro.',
    validateBody:
      'Dados do documento a validar. Em um documento salvo ou em um global, os dados são mesclados sobre o rascunho mais recente, ou sobre o documento salvo se não houver rascunho.',

    globalDoc: 'O documento global',

    authLogin: 'Resultado do login',
    authLogout: 'Resultado do logout',
    authMe: 'O usuário atualmente autenticado',
    authRefreshToken: 'Token renovado',
    authForgotPassword: 'E-mail de redefinição de senha enviado',
    authResetPassword: 'Resultado da redefinição de senha',
    authFirstRegister: 'O primeiro usuário, criado com um token de autenticação',
    authInit: 'Se esta coleção de autenticação já possui algum usuário',
    authAccess: 'As permissões do usuário atual para todas as coleções e globais',
    docAccess: 'As permissões do usuário atual para este documento',
    docAccessBody:
      'Dados do documento usados para verificar o acesso. Sem eles, o Payload usa o documento salvo, se existir.',
    authUnlock: 'Resultado do desbloqueio',
    authVerify: 'Resultado da verificação',
    apiKeyReveal: 'A chave de API descriptografada',

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
    fileServe: 'O arquivo',
    filePartial: 'Uma parte do arquivo, para uma requisição `Range`',
    uploadInstructionsSummary: 'Obter instruções para enviar um arquivo antes de salvar o documento',
    uploadInstructionsResult:
      'Para onde enviar os bytes do arquivo e o valor `file` a enviar com a requisição de criação ou atualização',
    uploadStagePutSummary: 'Enviar os bytes do arquivo para um upload temporário',
    uploadStageDeleteSummary: 'Excluir um upload temporário',
    uploadStageResult: 'Concluído, sem conteúdo',

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
    tagUploads: 'Uploads',
    tagAccess: 'Acesso',

    localizationHeading: 'Localização',
    localizationNote:
      'Locales disponíveis: {{locales}}. Passe `?locale=<code>` para um endpoint de leitura para selecionar um. Passe `?locale=all` para receber todos os locales de uma vez — cada campo localizado é então retornado como um objeto indexado pelo código do locale (por exemplo `{ "en": "Hello", "de": "Hallo" }`) em vez de um único valor. Defina `?flattenLocales=false` com `locale=all` para manter esse formato de objeto por locale. Os schemas de campo mostram o formato de locale único.',
    docLanguagesNote:
      'Esta documentação está disponível em: {{languages}}. Adicione `?lang=<code>` ao URL desta especificação para alternar.',
  },
}
