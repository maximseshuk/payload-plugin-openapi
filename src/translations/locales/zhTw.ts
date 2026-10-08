import type { PluginDefaultTranslationsObject } from '../types.js'

export const zhTw: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: '要填充的關聯文件層級數。',
    paramSort: '用於排序的欄位；加上 `-` 前綴表示降序，例如 `-createdAt`。',
    paramSortShort: '用於排序的欄位；加上 `-` 前綴表示降序。',
    paramDraft: '回傳草稿版本。',
    paramTrash: '包含已刪除（垃圾桶）的文件。',
    paramAutosave: '以自動儲存方式儲存：更新最新的自動儲存版本，而不是新增版本。',
    paramPublishAllLocales: '發布所有語言，而不只是請求的語言。',
    paramUnpublishAllLocales: '取消發布所有語言，並將文件改回草稿。',
    paramOverrideLock: '忽略其他使用者持有的鎖定。預設 false。',
    paramSelectedLocales: '只將這些語言複製到副本。預設：所有語言。',
    paramFlattenLocales: '搭配 `locale=all` 使用時，設為 false 可將本地化欄位保留為各語系物件。預設為 true。',
    paramLocale: '要回傳的語系，或使用 `all` 取得所有語系。請參閱 API 說明中的「本地化」一節。',
    paramFallbackLocale: '當本地化值缺失時用以回退的語系，或使用 `none` 停用。',

    schemaSelect: '選擇要回傳的欄位，例如 `select[title]=true`。省略則回傳全部。',
    schemaPopulate: '依集合填充關聯文件，例如 `populate[posts][title]=true`。',
    schemaJoins: '各 join 的控制項（limit/page/sort/where/count），例如 `joins[posts][limit]=10`。',
    schemaWhere:
      'Payload 的 `where` 篩選器。先巢狀欄位再接運算子：`where[field][equals]=value`。使用 `and` / `or` 陣列組合子句，例如 `where[or][0][field][equals]=value`。每個欄位僅列出其型別適用的運算子。',
    schemaSupportedTimezones: '採用 IANA 格式的支援時區。',
    schemaPerLocale: '各語系的值，於 `locale=all` 時回傳。',

    collectionList: '分頁的文件清單',
    collectionDoc: '單一文件',
    collectionCreated: '已建立的文件',
    collectionUpdated: '已更新的文件',
    collectionDeleted: '已刪除的文件',
    collectionBulkUpdate: '批次更新結果',
    collectionBulkDelete: '批次刪除結果',
    collectionCount: '文件數量',
    collectionDuplicated: '已複製的文件',

    globalDoc: '全域文件',

    authLogin: '登入結果',
    authLogout: '登出結果',
    authMe: '目前已驗證的使用者',
    authRefreshToken: '已重新整理的權杖',
    authForgotPassword: '已寄出密碼重設郵件',
    authResetPassword: '密碼重設結果',
    authFirstRegister: '第一位使用者，建立時附帶驗證權杖',
    authInit: '此驗證集合是否已有任何使用者',
    authAccess: '目前使用者對此集合的存取（權限）',
    authUnlock: '解鎖結果',
    authVerify: '驗證結果',

    versionList: '分頁的版本清單',
    versionSingle: '單一版本',
    versionRestored: '已還原的文件',
    versionWhere: '針對版本欄位進行篩選，例如 `where[parent][equals]=<docId>`。',

    jobsRunSummary: '執行排入佇列的工作（並依預設處理排程）',
    jobsSchedulesSummary: '將依排程到期的工作排入佇列',
    jobsRunResult: '執行結果',
    jobsSchedulesResult: '排程結果',
    jobsRunAllQueues: '執行所有佇列的工作。',
    jobsLimit: '可執行的工作數上限。',
    jobsDisableScheduling: '略過 `run` 預設執行的排程處理。',
    jobsSilent: '抑制執行記錄。',
    jobsSchedulesAllQueues: '處理所有佇列的排程。',
    jobsQueue: '將操作限制於單一佇列。已知佇列：{{queues}}。',

    uploadFile: '要上傳的二進位檔案。',
    uploadBody:
      '傳送 `multipart/form-data` 以上傳檔案（一個二進位的 `file` 部分，加上一個含 JSON 字串化欄位的 `_payload` 部分），或在沒有檔案時僅以 `application/json` 傳送欄位。',
    uploadPayloadField: 'JSON 字串化的 {{schema}} 欄位。範例：`{"alt":"A caption"}`。',

    error400: '驗證或查詢錯誤 (ValidationError, QueryError)',
    error401: '未驗證 (AuthenticationError)',
    error403: '遭存取控制拒絕 (Forbidden, UnverifiedEmail)',
    error404: '找不到文件 (NotFound)',
    error500: '伺服器內部錯誤 (APIError)',

    securityBearer:
      '貼上登入端點回傳的 `token`。以 `Authorization: Bearer <token>` 傳送。Payload 也接受 `JWT <token>` 方案及 `{{cookiePrefix}}-token` cookie。',
    securityInteractive: '互動式登入：輸入使用者名稱（或電子郵件）與密碼；Client ID/Secret 留空。',

    tagCollections: '集合',
    tagCollectionsDesc: '文件集合端點（CRUD、count、duplicate）。',
    tagGlobals: '全域',
    tagGlobalsDesc: '全域文件端點。',
    tagSystem: '系統',
    tagSystemDesc: 'Payload 系統端點。',
    tagAuth: '驗證',
    tagVersions: '版本',
    tagJobs: '工作',

    localizationHeading: '本地化',
    localizationNote:
      '可用的語系：{{locales}}。對讀取端點傳入 `?locale=<code>` 以選取單一語系。傳入 `?locale=all` 可一次接收所有語系——此時每個本地化欄位會以語系代碼作為鍵的物件回傳（例如 `{ "en": "Hello", "de": "Hallo" }`），而非單一值。搭配 `locale=all` 設定 `?flattenLocales=false` 可保留該各語系物件形式。欄位結構描述顯示的是單一語系的形態。',
    docLanguagesNote: '本文件提供以下語言版本：{{languages}}。在此規格 URL 後附加 `?lang=<code>` 即可切換語言。',
  },
}
