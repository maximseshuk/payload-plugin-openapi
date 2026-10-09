import type { PluginDefaultTranslationsObject } from '@/shared/translations/types.js'

export const ja: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: '関連ドキュメントを何階層まで展開するか。',
    paramSort: '並べ替えの基準となるフィールド。降順にするには `-` を前置します。例: `-createdAt`。',
    paramSortShort: '並べ替えの基準となるフィールド。降順にするには `-` を前置します。',
    paramDraft: '下書きバージョンを返します。',
    paramTrash: 'ゴミ箱内のドキュメントを含めます。',
    paramAutosave: '自動保存として保存します。新しいバージョンを追加せず、最新の自動保存バージョンを更新します。',
    paramPublishAllLocales: 'リクエストのロケールだけでなく、すべてのロケールを公開します。',
    paramUnpublishAllLocales: 'すべてのロケールを非公開にし、ドキュメントを下書きに戻します。',
    paramOverrideLock: '他のユーザーのロックを無視します。デフォルトは false。',
    paramSelectedLocales: 'これらのロケールだけを複製にコピーします。デフォルト: すべてのロケール。',
    paramFlattenLocales:
      '`locale=all` のとき、false を設定するとローカライズフィールドをロケールごとのオブジェクトとして保持します。デフォルトは true。',
    paramLocale:
      '返すロケール。すべてのロケールを取得するには `all` を指定します。API 説明のローカライズのセクションを参照してください。',
    paramFallbackLocale:
      'ローカライズされた値が欠落している場合にフォールバックするロケール。無効にするには `none` を指定します。',
    paramValidateLocale:
      '検証するロケール。すべてのロケールを対象にするには `all` を指定します。複数のロケールを指定するにはパラメーターを繰り返します。',
    paramComputeHierarchyPaths:
      'true にすると `{{slugPath}}` と `{{titlePath}}` のパスを計算します。どちらかのフィールドを選択した場合も計算されます。',

    schemaSelect: '返すフィールドを選択します。例: `select[title]=true`。省略するとすべて返します。',
    schemaPopulate: 'コレクションごとに関連ドキュメントを展開します。例: `populate[posts][title]=true`。',
    schemaJoins: '結合ごとの制御 (limit/page/sort/where/count)。例: `joins[posts][limit]=10`。',
    schemaWhere:
      'Payload の `where` フィルター。フィールドの次に演算子をネストします: `where[field][equals]=value`。`and` / `or` 配列で条件を組み合わせます。例: `where[or][0][field][equals]=value`。各フィールドにはその型で有効な演算子のみが列挙されます。',
    schemaSupportedTimezones: 'IANA 形式でサポートされているタイムゾーン。',
    schemaPerLocale: '`locale=all` のときに返される、ロケールごとの値。',
    schemaHierarchySlugPath:
      'スラッグのパス（例: `parent/child`）。`computeHierarchyPaths=true` を付けて読み取るか、選択したときに計算されます。`where` では使えません。',
    schemaHierarchyTitlePath:
      'タイトルのパス（例: `Parent/Child`）。`computeHierarchyPaths=true` を付けて読み取るか、選択したときに計算されます。`where` では使えません。',

    collectionList: 'ドキュメントのページネーション付き一覧',
    collectionDoc: '単一のドキュメント',
    collectionCreated: '作成されたドキュメント',
    collectionUpdated: '更新されたドキュメント',
    collectionDeleted: '削除されたドキュメント',
    collectionBulkUpdate: '一括更新の結果',
    collectionBulkDelete: '一括削除の結果',
    collectionCount: 'ドキュメント数',
    collectionDuplicated: '複製されたドキュメント',
    validateResult:
      '検証結果。何も保存されません。無効なフィールド値は、エラーステータスではなく、エラー内容を含む `valid: false` を返します。',
    validateBody:
      '検証するドキュメントデータ。保存済みのドキュメントまたはグローバルでは、データは最新の下書きに、下書きがなければ保存済みのドキュメントにマージされます。',

    globalDoc: 'グローバルドキュメント',

    authLogin: 'ログイン結果',
    authLogout: 'ログアウト結果',
    authMe: '現在認証されているユーザー',
    authRefreshToken: '更新されたトークン',
    authForgotPassword: 'パスワードリセットメールを送信しました',
    authResetPassword: 'パスワードリセットの結果',
    authFirstRegister: '認証トークン付きで作成された最初のユーザー',
    authInit: 'この認証コレクションにすでにユーザーが存在するかどうか',
    authAccess: 'すべてのコレクションとグローバルに対する現在のユーザーのパーミッション',
    docAccess: 'このドキュメントに対する現在のユーザーのパーミッション',
    docAccessBody:
      'アクセスを確認するドキュメントデータ。省略すると、Payload は保存済みのドキュメントがあればそれを使います。',
    authUnlock: 'ロック解除の結果',
    authVerify: '検証結果',
    apiKeyReveal: '復号された API キー',

    versionList: 'バージョンのページネーション付き一覧',
    versionSingle: '単一のバージョン',
    versionRestored: '復元されたドキュメント',
    versionWhere: 'バージョンフィールドに対するフィルター。例: `where[parent][equals]=<docId>`。',

    jobsRunSummary: 'キューに入ったジョブを実行します (デフォルトではスケジュールも処理します)',
    jobsSchedulesSummary: 'スケジュールに従って実行予定のジョブをキューに入れます',
    jobsRunResult: '実行結果',
    jobsSchedulesResult: 'スケジューリング結果',
    jobsRunAllQueues: 'すべてのキューにわたってジョブを実行します。',
    jobsLimit: '実行するジョブの最大数。',
    jobsDisableScheduling: '`run` がデフォルトで行うスケジュール処理をスキップします。',
    jobsSilent: '実行ログを抑制します。',
    jobsSchedulesAllQueues: 'すべてのキューにわたってスケジュールを処理します。',
    jobsQueue: '操作を単一のキューに限定します。既知のキュー: {{queues}}。',

    uploadFile: 'アップロードするバイナリファイル。',
    uploadBody:
      'ファイルをアップロードするには `multipart/form-data` を送信します (バイナリの `file` パートと、JSON 文字列化したフィールドを含む `_payload` パート)。ファイルがない場合は、フィールドのみを含む `application/json` を送信します。',
    uploadPayloadField: 'JSON 文字列化した {{schema}} フィールド。例: `{"alt":"A caption"}`。',
    fileServe: 'ファイル',
    filePartial: '`Range` リクエストに対するファイルの一部',
    paramFileVersion: 'このバージョン ID で保存されたファイルを返します。',
    uploadInstructionsSummary: 'ドキュメントを保存する前にファイルをアップロードする手順を取得します',
    uploadInstructionsResult: 'ファイルのバイトの送信先と、作成または更新リクエストで送信する `file` の値',
    uploadStagePutSummary: '一時アップロードにファイルのバイトを送信します',
    uploadStageDeleteSummary: '一時アップロードを削除します',
    uploadStageResult: '完了 (コンテンツなし)',

    error400: '検証エラーまたはクエリエラー (ValidationError, QueryError)',
    error401: '認証されていません (AuthenticationError)',
    error403: 'アクセス制御により禁止されています (Forbidden, UnverifiedEmail)',
    error404: 'ドキュメントが見つかりません (NotFound)',
    error500: '内部サーバーエラー (APIError)',

    securityBearer:
      'ログインエンドポイントが返した `token` を貼り付けます。`Authorization: Bearer <token>` として送信されます。Payload は `JWT <token>` スキームおよび `{{cookiePrefix}}-token` クッキーも受け付けます。',
    securityInteractive:
      'インタラクティブログイン: ユーザー名 (またはメールアドレス) とパスワードを入力します。Client ID/Secret は空のままにしてください。',

    tagCollections: 'コレクション',
    tagCollectionsDesc: 'ドキュメントコレクションのエンドポイント (CRUD、件数、複製)。',
    tagGlobals: 'グローバル',
    tagGlobalsDesc: 'グローバルドキュメントのエンドポイント。',
    tagSystem: 'システム',
    tagSystemDesc: 'Payload システムのエンドポイント。',
    tagAuth: '認証',
    tagVersions: 'バージョン',
    tagJobs: 'ジョブ',
    tagUploads: 'アップロード',
    tagAccess: 'アクセス',

    localizationHeading: 'ローカライズ',
    localizationNote:
      '利用可能なロケール: {{locales}}。読み取りエンドポイントに `?locale=<code>` を渡すと、1 つのロケールを選択できます。`?locale=all` を渡すと、すべてのロケールを一度に取得できます。この場合、各ローカライズフィールドは単一の値ではなく、ロケールコードをキーとするオブジェクト (例: `{ "en": "Hello", "de": "Hallo" }`) として返されます。`locale=all` とともに `?flattenLocales=false` を設定すると、このロケールごとのオブジェクト形式が保持されます。フィールドスキーマは単一ロケールの形式を示します。',
    docLanguagesNote:
      'このドキュメントは次の言語でご利用いただけます: {{languages}}。言語を切り替えるには、この仕様 URL に `?lang=<code>` を付加してください。',
  },
}
