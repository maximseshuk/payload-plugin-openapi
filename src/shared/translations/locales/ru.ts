import type { PluginDefaultTranslationsObject } from '@/shared/translations/types.js'

export const ru: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Сколько уровней связанных документов подгружать.',
    paramSort: 'Поле для сортировки; добавьте префикс `-` для убывания, например `-createdAt`.',
    paramSortShort: 'Поле для сортировки; добавьте префикс `-` для убывания.',
    paramDraft: 'Возвращать черновые версии.',
    paramTrash: 'Включать документы из корзины.',
    paramAutosave: 'Сохранить как автосохранение: обновляет последнюю автосохранённую версию вместо добавления новой.',
    paramPublishAllLocales: 'Опубликовать все локали, а не только локаль запроса.',
    paramUnpublishAllLocales: 'Снять с публикации все локали и вернуть документ в черновик.',
    paramOverrideLock: 'Игнорировать блокировку другого пользователя. По умолчанию false.',
    paramSelectedLocales: 'Копировать в дубликат только эти локали. По умолчанию: все локали.',
    paramFlattenLocales:
      'При `locale=all` установите false, чтобы локализованные поля оставались объектами по локалям. По умолчанию true.',
    paramLocale: 'Локаль для возврата или `all` для всех локалей. См. раздел «Локализация» в описании API.',
    paramFallbackLocale: 'Локаль для подстановки при отсутствии локализованных значений или `none`, чтобы отключить.',
    paramValidateLocale: 'Локали для проверки или `all` для всех локалей. Для нескольких локалей повторите параметр.',
    paramComputeHierarchyPaths:
      'Передайте true, чтобы вычислить пути `{{slugPath}}` и `{{titlePath}}`. Выбор любого из этих полей тоже их вычисляет.',

    schemaSelect: 'Выберите возвращаемые поля, например `select[title]=true`. Опустите, чтобы вернуть все.',
    schemaPopulate: 'Подгрузка связанных документов по коллекциям, например `populate[posts][title]=true`.',
    schemaJoins: 'Управление по каждому join (limit/page/sort/where/count), например `joins[posts][limit]=10`.',
    schemaWhere:
      'Фильтр Payload `where`. Вложите поле, затем оператор: `where[field][equals]=value`. Объединяйте условия с помощью массивов `and` / `or`, например `where[or][0][field][equals]=value`. Для каждого поля перечислены только операторы, допустимые для его типа.',
    schemaSupportedTimezones: 'Поддерживаемые часовые пояса в формате IANA.',
    schemaPerLocale: 'Значения по локалям, возвращаемые при `locale=all`.',
    schemaHierarchySlugPath:
      'Путь из slug, например `parent/child`. Вычисляется при чтении с `computeHierarchyPaths=true` или если поле выбрано. Нельзя использовать в `where`.',
    schemaHierarchyTitlePath:
      'Путь из заголовков, например `Parent/Child`. Вычисляется при чтении с `computeHierarchyPaths=true` или если поле выбрано. Нельзя использовать в `where`.',

    collectionList: 'Постраничный список документов',
    collectionDoc: 'Один документ',
    collectionCreated: 'Созданный документ',
    collectionUpdated: 'Обновлённый документ',
    collectionDeleted: 'Удалённый документ',
    collectionBulkUpdate: 'Результат массового обновления',
    collectionBulkDelete: 'Результат массового удаления',
    collectionCount: 'Количество документов',
    collectionDuplicated: 'Дублированный документ',
    validateResult:
      'Результат проверки. Ничего не сохраняется. Недопустимые значения полей возвращают `valid: false` с ошибками, а не статус ошибки.',
    validateBody:
      'Данные документа для проверки. Для сохранённого документа или глобального документа данные накладываются на последний черновик, а если черновика нет, на сохранённый документ.',

    globalDoc: 'Глобальный документ',

    authLogin: 'Результат входа',
    authLogout: 'Результат выхода',
    authMe: 'Текущий аутентифицированный пользователь',
    authRefreshToken: 'Обновлённый токен',
    authForgotPassword: 'Письмо для сброса пароля отправлено',
    authResetPassword: 'Результат сброса пароля',
    authFirstRegister: 'Первый пользователь, созданный с токеном аутентификации',
    authInit: 'Есть ли уже пользователи в этой коллекции аутентификации',
    authAccess: 'Права текущего пользователя для всех коллекций и глобальных данных',
    docAccess: 'Права текущего пользователя для этого документа',
    docAccessBody:
      'Данные документа, по которым проверяется доступ. Без них Payload использует сохранённый документ, если он есть.',
    authUnlock: 'Результат разблокировки',
    authVerify: 'Результат подтверждения',
    apiKeyReveal: 'Расшифрованный API-ключ',

    versionList: 'Постраничный список версий',
    versionSingle: 'Одна версия',
    versionRestored: 'Восстановленный документ',
    versionWhere: 'Фильтр по полям версий, например `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'Запустить задачи из очереди (и по умолчанию обработать расписания)',
    jobsSchedulesSummary: 'Поставить в очередь задачи, наступившие по их расписанию',
    jobsRunResult: 'Результат запуска',
    jobsSchedulesResult: 'Результат планирования',
    jobsRunAllQueues: 'Запускать задачи во всех очередях.',
    jobsLimit: 'Максимальное число запускаемых задач.',
    jobsDisableScheduling: 'Пропустить обработку расписаний, которую `run` выполняет по умолчанию.',
    jobsSilent: 'Подавлять логирование запуска.',
    jobsSchedulesAllQueues: 'Обрабатывать расписания во всех очередях.',
    jobsQueue: 'Ограничить операцию одной очередью. Известные очереди: {{queues}}.',

    uploadFile: 'Бинарный файл для загрузки.',
    uploadBody:
      'Отправьте `multipart/form-data` для загрузки файла (бинарная часть `file` плюс часть `_payload` с полями в виде JSON-строки) или `application/json` только с полями, если файла нет.',
    uploadPayloadField: 'Поля {{schema}} в виде JSON-строки. Пример: `{"alt":"A caption"}`.',
    fileServe: 'Файл',
    filePartial: 'Часть файла для запроса с `Range`',
    uploadInstructionsSummary: 'Получить инструкции для загрузки файла до сохранения документа',
    uploadInstructionsResult:
      'Куда отправить байты файла и какое значение `file` передать в запросе на создание или обновление',
    uploadStagePutSummary: 'Отправить байты файла для временной загрузки',
    uploadStageDeleteSummary: 'Удалить временную загрузку',
    uploadStageResult: 'Готово, без содержимого',

    error400: 'Ошибка валидации или запроса (ValidationError, QueryError)',
    error401: 'Не аутентифицирован (AuthenticationError)',
    error403: 'Запрещено контролем доступа (Forbidden, UnverifiedEmail)',
    error404: 'Документ не найден (NotFound)',
    error500: 'Внутренняя ошибка сервера (APIError)',

    securityBearer:
      'Вставьте `token`, возвращённый эндпоинтом входа. Передаётся как `Authorization: Bearer <token>`. Payload также принимает схему `JWT <token>` и cookie `{{cookiePrefix}}-token`.',
    securityInteractive:
      'Интерактивный вход: введите имя пользователя (или email) и пароль; поля Client ID/Secret оставьте пустыми.',

    tagCollections: 'Коллекции',
    tagCollectionsDesc: 'Эндпоинты коллекций документов (CRUD, подсчёт, дублирование).',
    tagGlobals: 'Глобальные данные',
    tagGlobalsDesc: 'Эндпоинты глобальных документов.',
    tagSystem: 'Система',
    tagSystemDesc: 'Системные эндпоинты Payload.',
    tagAuth: 'Аутентификация',
    tagVersions: 'Версии',
    tagJobs: 'Задачи',
    tagUploads: 'Загрузки',
    tagAccess: 'Доступ',

    localizationHeading: 'Локализация',
    localizationNote:
      'Доступные локали: {{locales}}. Передайте `?locale=<code>` в эндпоинт чтения, чтобы выбрать одну. Передайте `?locale=all`, чтобы получить все локали сразу — тогда каждое локализованное поле возвращается как объект с ключами по кодам локалей (например, `{ "en": "Hello", "de": "Hallo" }`) вместо одного значения. Установите `?flattenLocales=false` вместе с `locale=all`, чтобы сохранить эту форму объекта по локалям. Схемы полей показывают форму с одной локалью.',
    docLanguagesNote:
      'Эта документация доступна на следующих языках: {{languages}}. Добавьте `?lang=<code>` к URL этой спецификации, чтобы переключить язык.',
  },
}
