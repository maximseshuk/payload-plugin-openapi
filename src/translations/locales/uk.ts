import type { PluginDefaultTranslationsObject } from '../types.js'

export const uk: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Скільки рівнів пов’язаних документів заповнювати.',
    paramSort: 'Поле для сортування; додайте префікс `-` для спадання, напр. `-createdAt`.',
    paramSortShort: 'Поле для сортування; додайте префікс `-` для спадання.',
    paramDraft: 'Повертати чернеткові версії.',
    paramTrash: 'Включати документи з кошика.',
    paramFlattenLocales:
      'З `locale=all` встановіть false, щоб зберегти локалізовані поля як об’єкти за локалями. За замовчуванням true.',
    paramLocale: 'Локаль для повернення або `all` для всіх локалей. Див. розділ Localization в описі API.',
    paramFallbackLocale: 'Локаль для підстановки відсутніх локалізованих значень або `none`, щоб вимкнути.',

    schemaSelect: 'Виберіть поля для повернення, напр. `select[title]=true`. Пропустіть, щоб повернути всі.',
    schemaPopulate: 'Заповнюйте пов’язані документи для кожної колекції, напр. `populate[posts][title]=true`.',
    schemaJoins: 'Налаштування для кожного приєднання (limit/page/sort/where/count), напр. `joins[posts][limit]=10`.',
    schemaWhere:
      'Фільтр Payload `where`. Вкладіть поле, а потім оператор: `where[field][equals]=value`. Комбінуйте умови за допомогою масивів `and` / `or`, напр. `where[or][0][field][equals]=value`. Кожне поле перелічує лише оператори, дійсні для його типу.',
    schemaSupportedTimezones: 'Підтримувані часові пояси у форматі IANA.',
    schemaPerLocale: 'Значення для кожної локалі, що повертаються, коли `locale=all`.',

    collectionList: 'Посторінковий список документів',
    collectionDoc: 'Окремий документ',
    collectionCreated: 'Створений документ',
    collectionUpdated: 'Оновлений документ',
    collectionDeleted: 'Видалений документ',
    collectionBulkUpdate: 'Результат масового оновлення',
    collectionBulkDelete: 'Результат масового видалення',
    collectionCount: 'Кількість документів',
    collectionDuplicated: 'Дубльований документ',

    globalDoc: 'Глобальний документ',

    authLogin: 'Результат входу',
    authLogout: 'Результат виходу',
    authMe: 'Поточний автентифікований користувач',
    authRefreshToken: 'Оновлений токен',
    authForgotPassword: 'Лист для скидання пароля надіслано',
    authResetPassword: 'Результат скидання пароля',
    authFirstRegister: 'Перший користувач, створений із токеном автентифікації',
    authInit: 'Чи має ця колекція автентифікації хоча б одного користувача',
    authAccess: 'Доступ (дозволи) поточного користувача до цієї колекції',
    authUnlock: 'Результат розблокування',
    authVerify: 'Результат підтвердження',

    versionList: 'Посторінковий список версій',
    versionSingle: 'Окрема версія',
    versionRestored: 'Відновлений документ',
    versionWhere: 'Фільтр за полями версії, напр. `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'Запустити завдання з черги (і, за замовчуванням, обробити розклади)',
    jobsSchedulesSummary: 'Поставити в чергу завдання, час яких настав згідно з розкладом',
    jobsRunResult: 'Результат запуску',
    jobsSchedulesResult: 'Результат планування',
    jobsRunAllQueues: 'Запускати завдання в усіх чергах.',
    jobsLimit: 'Максимальна кількість завдань для запуску.',
    jobsDisableScheduling: 'Пропустити обробку розкладу, яку `run` виконує за замовчуванням.',
    jobsSilent: 'Придушити логування запуску.',
    jobsSchedulesAllQueues: 'Обробляти розклади в усіх чергах.',
    jobsQueue: 'Обмежити операцію однією чергою. Відомі черги: {{queues}}.',

    uploadFile: 'Двійковий файл для завантаження.',
    uploadBody:
      'Надішліть `multipart/form-data`, щоб завантажити файл (двійкова частина `file` плюс частина `_payload` з полями у вигляді JSON-рядка), або `application/json` лише з полями, коли файлу немає.',
    uploadPayloadField: 'Поля {{schema}} у вигляді JSON-рядка. Приклад: `{"alt":"A caption"}`.',

    error400: 'Помилка валідації або запиту (ValidationError, QueryError)',
    error401: 'Не автентифіковано (AuthenticationError)',
    error403: 'Заборонено контролем доступу (Forbidden, UnverifiedEmail)',
    error404: 'Документ не знайдено (NotFound)',
    error500: 'Внутрішня помилка сервера (APIError)',

    securityBearer:
      'Вставте `token`, повернений ендпоінтом входу. Надсилається як `Authorization: Bearer <token>`. Payload також приймає схему `JWT <token>` та cookie `{{cookiePrefix}}-token`.',
    securityInteractive:
      'Інтерактивний вхід: введіть ім’я користувача (або email) і пароль; залиште Client ID/Secret порожніми.',

    tagCollections: 'Колекції',
    tagCollectionsDesc: 'Ендпоінти колекцій документів (CRUD, підрахунок, дублювання).',
    tagGlobals: 'Глобальні',
    tagGlobalsDesc: 'Ендпоінти глобальних документів.',
    tagSystem: 'Система',
    tagSystemDesc: 'Системні ендпоінти Payload.',
    tagAuth: 'Автентифікація',
    tagVersions: 'Версії',
    tagJobs: 'Завдання',

    localizationHeading: 'Локалізація',
    localizationNote:
      'Доступні локалі: {{locales}}. Передайте `?locale=<code>` до ендпоінта читання, щоб вибрати одну. Передайте `?locale=all`, щоб отримати всі локалі одразу — тоді кожне локалізоване поле повертається як об’єкт із ключами за кодом локалі (напр. `{ "en": "Hello", "de": "Hallo" }`) замість одного значення. Встановіть `?flattenLocales=false` разом із `locale=all`, щоб зберегти цю форму об’єкта за локалями. Схеми полів показують форму для однієї локалі.',
    docLanguagesNote:
      'Ця документація доступна цими мовами: {{languages}}. Додайте `?lang=<code>` до URL цієї специфікації, щоб перемкнути.',
  },
}
