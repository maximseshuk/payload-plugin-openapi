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
    tagPlugins: 'プラグイン',
    tagPluginsDesc: 'Payload 公式プラグインが追加するエンドポイント。',
    error400Plugin: '不正なリクエスト',
    error401Plugin: '未認証',
    error403Plugin: 'アクセス禁止',
    error404Plugin: '見つかりません',
    error500Plugin: 'サーバー内部エラー',
    ecommerceAddItem: 'カートに商品を追加',
    ecommerceRemoveItem: 'カートから商品を削除',
    ecommerceUpdateItem: 'カート内の商品の数量を変更',
    ecommerceClearCart: 'カートの商品をすべて削除',
    ecommerceMergeCart: 'ゲストカートをこのカートに統合',
    ecommerceCartAccess: 'カートの所有者、またはリクエスト本文に `secret` を含むゲストカートに許可されます。',
    ecommerceCartResult: '更新されたカート',
    error404Ecommerce: 'カートが見つからないか、アクセスできません',
    ecommerceQuantity: '新しい数量、または n だけ増減する `{ "$inc": n }`。',
    ecommerceInitiatePayment: '`{{method}}` で決済を開始',
    ecommerceConfirmOrder: '`{{method}}` で決済を確定して注文を作成',
    ecommercePaymentBody:
      '`cartID`（ゲストカートの場合は `secret` も）またはユーザーのカートを使います。ユーザーがいない場合は `customerEmail` が必須です。決済アダプターによっては追加のフィールドが必要です。',
    ecommerceInitiateResult: '決済を開始しました。アダプターは client secret などの独自フィールドを追加します。',
    ecommerceConfirmResult: '注文が作成されました',
    stripeWebhook: 'Stripe の Webhook イベントを受信',
    stripeWebhookBody:
      '`Stripe-Signature` ヘッダーで署名された Stripe の生イベント。API クライアントではなく Stripe が呼び出します。',
    stripeWebhookResult: 'イベントを受信しました',
    error400StripeWebhook: '署名の検証に失敗しました',
    stripeRest: '許可された Stripe API メソッドを呼び出す',
    stripeRestResult: 'Stripe API の結果',
    error404StripeRest: 'Stripe API がエラーを返しました',
    mcp: 'MCP JSON-RPC メッセージを送信',
    mcpDesc:
      'Streamable HTTP 上の Model Context Protocol で、JSON で応答します。匿名リクエストも使えます。表示されるツールはユーザーの権限によって変わります。2025 年のプロトコルバージョンを使うクライアントは `Accept: application/json, text/event-stream` を送信する必要があります。',
    mcpResult: 'JSON-RPC レスポンス',
    mcpOverrideAccess: 'アクセスチェックをスキップします。開発専用です。',
    mcpGet: '未対応: サーバーはイベントストリームを開きません',
    error405McpGet: '許可されていないメソッドです。POST を使ってください',
    mcpProtocolVersion: 'ネゴシエートされた MCP プロトコルバージョン。例: `2025-06-18`。',
    mcpResult202: '受理: 本文には通知またはレスポンスのみが含まれていました',
    error404Mcp: '不明な MCP メソッド',
    error406Mcp: '`Accept` ヘッダーに `application/json` または `text/event-stream` がありません',
    error413Mcp: 'リクエスト本文が大きすぎます',
    error415Mcp: '`Content-Type` は `application/json` である必要があります',
    seoTitle: 'メタタイトルを生成',
    seoDescription: 'メタディスクリプションを生成',
    seoUrl: 'プレビュー URL を生成',
    seoImage: 'メタ画像を生成',
    seoBody:
      '編集中のドキュメント: `collectionSlug` または `globalSlug`、その `id`、現在の `doc` データ。生成関数に渡されます。',
    seoResult: '生成された値。生成関数が設定されていない場合は空文字列です。',
    searchReindex: '一部のコレクションの検索インデックスを再構築',
    searchReindexResult: '再インデックスの概要',
    tenantOptions: 'ユーザーが選択できるテナントの一覧',
    tenantOptionsResult: 'テナントの選択肢',
    exportDownload: 'ドキュメントをファイルにエクスポート',
    exportDownloadResult: 'エクスポートファイル',
    exportPreview: 'エクスポートのプレビュー',
    importPreview: 'インポートファイルのプレビュー',
    previewResult: 'プレビュードキュメントの 1 ページ',
    importFileData: 'base64 でエンコードしたファイル内容。',
    r2Upload: 'R2 にファイルを分割アップロード',
    r2UploadDesc:
      '1 つのルートで 3 ステップ。開始: `collection`、`fileName`、`fileType` を送信。各パート: `multipartId`、`multipartKey`、`multipartNumber`、`signedReceipt` を追加してバイト列を送信。完了: `multipartNumber` を除いた同じパラメーターで、パートの JSON リストを送信。',
    r2UploadResult:
      'アップロード開始、パートのアップロード、またはアップロード完了（オブジェクトキーをテキストで返す）',
    error412R2: 'このキーのファイルはすでに存在します',

    localizationHeading: 'ローカライズ',
    localizationNote:
      '利用可能なロケール: {{locales}}。読み取りエンドポイントに `?locale=<code>` を渡すと、1 つのロケールを選択できます。`?locale=all` を渡すと、すべてのロケールを一度に取得できます。この場合、各ローカライズフィールドは単一の値ではなく、ロケールコードをキーとするオブジェクト (例: `{ "en": "Hello", "de": "Hallo" }`) として返されます。`locale=all` とともに `?flattenLocales=false` を設定すると、このロケールごとのオブジェクト形式が保持されます。フィールドスキーマは単一ロケールの形式を示します。',
    docLanguagesNote:
      'このドキュメントは次の言語でご利用いただけます: {{languages}}。言語を切り替えるには、この仕様 URL に `?lang=<code>` を付加してください。',
  },
}
