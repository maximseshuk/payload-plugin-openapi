import type { PluginDefaultTranslationsObject } from '../types.js'

export const zh: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: '关联文档的填充层级数量。',
    paramSort: '用于排序的字段；前缀加 `-` 表示降序，例如 `-createdAt`。',
    paramSortShort: '用于排序的字段；前缀加 `-` 表示降序。',
    paramDraft: '返回草稿版本。',
    paramTrash: '包含已删除的文档。',
    paramFlattenLocales: '在使用 `locale=all` 时，设为 false 可将本地化字段保留为按语言区域划分的对象。默认值为 true。',
    paramLocale: '要返回的语言区域，或使用 `all` 返回所有语言区域。参见 API 说明中的本地化（Localization）部分。',
    paramFallbackLocale: '缺少本地化值时回退到的语言区域，或使用 `none` 禁用回退。',

    schemaSelect: '选择要返回的字段，例如 `select[title]=true`。省略则返回所有字段。',
    schemaPopulate: '按集合填充关联文档，例如 `populate[posts][title]=true`。',
    schemaJoins: '逐个连接的控制项（limit/page/sort/where/count），例如 `joins[posts][limit]=10`。',
    schemaWhere:
      'Payload 的 `where` 过滤器。先嵌套字段，再嵌套运算符：`where[field][equals]=value`。使用 `and` / `or` 数组组合多个条件，例如 `where[or][0][field][equals]=value`。每个字段仅列出对其类型有效的运算符。',
    schemaSupportedTimezones: 'IANA 格式的受支持时区。',
    schemaPerLocale: '按语言区域划分的值，在使用 `locale=all` 时返回。',

    collectionList: '文档的分页列表',
    collectionDoc: '单个文档',
    collectionCreated: '已创建的文档',
    collectionUpdated: '已更新的文档',
    collectionDeleted: '已删除的文档',
    collectionBulkUpdate: '批量更新结果',
    collectionBulkDelete: '批量删除结果',
    collectionCount: '文档数量',
    collectionDuplicated: '复制出的文档',

    globalDoc: '该全局文档',

    authLogin: '登录结果',
    authLogout: '注销结果',
    authMe: '当前已认证的用户',
    authRefreshToken: '刷新后的令牌',
    authForgotPassword: '密码重置邮件已发送',
    authResetPassword: '密码重置结果',
    authFirstRegister: '第一个用户，已创建并附带认证令牌',
    authInit: '该认证集合中是否已存在任何用户',
    authAccess: '当前用户对该集合的访问权限（permissions）',
    authUnlock: '解锁结果',
    authVerify: '验证结果',

    versionList: '版本的分页列表',
    versionSingle: '单个版本',
    versionRestored: '已恢复的文档',
    versionWhere: '对版本字段进行过滤，例如 `where[parent][equals]=<docId>`。',

    jobsRunSummary: '运行队列中的作业（并在默认情况下处理调度计划）',
    jobsSchedulesSummary: '将按调度计划到期的作业加入队列',
    jobsRunResult: '运行结果',
    jobsSchedulesResult: '调度结果',
    jobsRunAllQueues: '运行所有队列中的作业。',
    jobsLimit: '要运行的最大作业数。',
    jobsDisableScheduling: '跳过 `run` 默认执行的调度计划处理。',
    jobsSilent: '禁止运行日志输出。',
    jobsSchedulesAllQueues: '处理所有队列的调度计划。',
    jobsQueue: '将操作限制在单个队列。已知队列：{{queues}}。',

    uploadFile: '要上传的二进制文件。',
    uploadBody:
      '发送 `multipart/form-data` 以上传文件（一个二进制 `file` 部分，加上一个包含 JSON 字符串化字段的 `_payload` 部分），或在没有文件时仅发送字段并使用 `application/json`。',
    uploadPayloadField: 'JSON 字符串化的 {{schema}} 字段。示例：`{"alt":"A caption"}`。',

    error400: '验证或查询错误（ValidationError、QueryError）',
    error401: '未认证（AuthenticationError）',
    error403: '被访问控制拒绝（Forbidden、UnverifiedEmail）',
    error404: '未找到文档（NotFound）',
    error500: '服务器内部错误（APIError）',

    securityBearer:
      '粘贴登录端点返回的 `token`。以 `Authorization: Bearer <token>` 形式发送。Payload 也接受 `JWT <token>` 方案以及 `{{cookiePrefix}}-token` Cookie。',
    securityInteractive: '交互式登录：输入用户名（或邮箱）和密码；Client ID/Secret 留空。',

    tagCollections: '集合',
    tagCollectionsDesc: '文档集合端点（CRUD、计数、复制）。',
    tagGlobals: '全局',
    tagGlobalsDesc: '全局文档端点。',
    tagSystem: '系统',
    tagSystemDesc: 'Payload 系统端点。',
    tagAuth: '认证',
    tagVersions: '版本',
    tagJobs: '作业',

    localizationHeading: '本地化',
    localizationNote:
      '可用语言区域：{{locales}}。向读取端点传入 `?locale=<code>` 以选择单个语言区域。传入 `?locale=all` 可一次性接收所有语言区域——此时每个本地化字段都会以按语言区域代码为键的对象形式返回（例如 `{ "en": "Hello", "de": "Hallo" }`），而非单个值。在使用 `locale=all` 时设置 `?flattenLocales=false` 可保留这种按语言区域划分的对象形式。字段模式展示的是单一语言区域的结构。',
    docLanguagesNote: '本文档提供以下语言版本：{{languages}}。在此规范 URL 后追加 `?lang=<code>` 即可切换语言。',
  },
}
