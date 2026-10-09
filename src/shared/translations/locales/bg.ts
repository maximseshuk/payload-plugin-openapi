import type { PluginDefaultTranslationsObject } from '@/shared/translations/types.js'

export const bg: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Колко нива на свързани документи да се populate-нат.',
    paramSort: 'Поле за сортиране; добавете префикс `-` за низходящ ред, напр. `-createdAt`.',
    paramSortShort: 'Поле за сортиране; добавете префикс `-` за низходящ ред.',
    paramDraft: 'Връщане на чернови версии.',
    paramTrash: 'Включване на документите в кошчето.',
    paramAutosave: 'Запис като автоматично запазване: обновява последната автоматична версия, вместо да добавя нова.',
    paramPublishAllLocales: 'Публикуване на всички езици, не само на езика на заявката.',
    paramUnpublishAllLocales: 'Отмяна на публикуването на всички езици и връщане на документа в чернова.',
    paramOverrideLock: 'Игнориране на заключване от друг потребител. По подразбиране false.',
    paramSelectedLocales: 'Копиране само на тези езици в дубликата. По подразбиране: всички езици.',
    paramFlattenLocales:
      'С `locale=all` задайте false, за да запазите локализираните полета като обекти по локал. По подразбиране true.',
    paramLocale: 'Локал за връщане или `all` за всеки локал. Вижте раздела Localization в описанието на API.',
    paramFallbackLocale: 'Локал, към който да се връща при липсващи локализирани стойности, или `none` за изключване.',
    paramValidateLocale: 'Локали за валидиране или `all` за всеки локал. Повторете параметъра за повече от един локал.',
    paramComputeHierarchyPaths:
      'Задайте true, за да се изчислят пътищата `{{slugPath}}` и `{{titlePath}}`. Изборът на някое от полетата също ги изчислява.',

    schemaSelect: 'Изберете полета за връщане, напр. `select[title]=true`. Пропуснете, за да върнете всички.',
    schemaPopulate: 'Populate-ване на свързани документи по колекция, напр. `populate[posts][title]=true`.',
    schemaJoins: 'Контроли за всеки join (limit/page/sort/where/count), напр. `joins[posts][limit]=10`.',
    schemaWhere:
      'Payload `where` филтър. Вложете поле, след това оператор: `where[field][equals]=value`. Комбинирайте клаузи с масивите `and` / `or`, напр. `where[or][0][field][equals]=value`. Всяко поле изброява само операторите, валидни за неговия тип.',
    schemaSupportedTimezones: 'Поддържани часови зони във формат IANA.',
    schemaPerLocale: 'Стойности по локал, връщани когато `locale=all`.',
    schemaHierarchySlugPath:
      'Път от slug стойности, напр. `parent/child`. Изчислява се при четене с `computeHierarchyPaths=true` или когато е избран. Не може да се ползва в `where`.',
    schemaHierarchyTitlePath:
      'Път от заглавия, напр. `Parent/Child`. Изчислява се при четене с `computeHierarchyPaths=true` или когато е избран. Не може да се ползва в `where`.',

    collectionList: 'Списък на документи с пагинация',
    collectionDoc: 'Един документ',
    collectionCreated: 'Създаден документ',
    collectionUpdated: 'Обновен документ',
    collectionDeleted: 'Изтрит документ',
    collectionBulkUpdate: 'Резултат от групово обновяване',
    collectionBulkDelete: 'Резултат от групово изтриване',
    collectionCount: 'Брой документи',
    collectionDuplicated: 'Дублираният документ',
    validateResult:
      'Резултат от валидирането. Нищо не се записва. Невалидните стойности на полета връщат `valid: false` с грешките, а не статус за грешка.',
    validateBody:
      'Данни на документа за валидиране. При записан документ или глобален документ данните се сливат върху последната чернова, а ако няма чернова, върху записания документ.',

    globalDoc: 'Глобалният документ',

    authLogin: 'Резултат от вход',
    authLogout: 'Резултат от изход',
    authMe: 'Текущо удостовереният потребител',
    authRefreshToken: 'Обновен токен',
    authForgotPassword: 'Изпратен имейл за нулиране на парола',
    authResetPassword: 'Резултат от нулиране на парола',
    authFirstRegister: 'Първият потребител, създаден с токен за удостоверяване',
    authInit: 'Дали тази auth колекция вече има потребители',
    authAccess: 'Правата на текущия потребител за всички колекции и глобални',
    docAccess: 'Правата на текущия потребител за този документ',
    docAccessBody:
      'Данни на документа, спрямо които се проверява достъпът. Без тях Payload използва записания документ, ако има такъв.',
    authUnlock: 'Резултат от отключване',
    authVerify: 'Резултат от верификация',
    apiKeyReveal: 'Дешифрираният API ключ',

    versionList: 'Списък на версии с пагинация',
    versionSingle: 'Една версия',
    versionRestored: 'Възстановеният документ',
    versionWhere: 'Филтриране по полета на версия, напр. `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'Изпълнение на задачи от опашката (и по подразбиране обработка на графиците)',
    jobsSchedulesSummary: 'Поставяне в опашка на задачи, дължими според техния график',
    jobsRunResult: 'Резултат от изпълнение',
    jobsSchedulesResult: 'Резултат от планиране',
    jobsRunAllQueues: 'Изпълнение на задачи във всички опашки.',
    jobsLimit: 'Максимален брой задачи за изпълнение.',
    jobsDisableScheduling: 'Пропускане на обработката на графиците, която `run` извършва по подразбиране.',
    jobsSilent: 'Потискане на логването на изпълнението.',
    jobsSchedulesAllQueues: 'Обработка на графиците във всички опашки.',
    jobsQueue: 'Ограничаване на операцията до една опашка. Известни опашки: {{queues}}.',

    uploadFile: 'Двоичният файл за качване.',
    uploadBody:
      'Изпратете `multipart/form-data`, за да качите файл (двоична `file` част плюс `_payload` част с JSON-сериализираните полета), или `application/json` само с полетата, когато няма файл.',
    uploadPayloadField: 'JSON-сериализирани {{schema}} полета. Пример: `{"alt":"A caption"}`.',
    fileServe: 'Файлът',
    filePartial: 'Част от файла при заявка с `Range`',
    paramFileVersion: 'Връща файла, запазен с това ID на версия.',
    uploadInstructionsSummary: 'Получаване на инструкции за качване на файл преди запис на документа',
    uploadInstructionsResult:
      'Къде да се изпратят байтовете на файла и стойността `file` за заявката за създаване или обновяване',
    uploadStagePutSummary: 'Изпращане на байтовете на файла за временно качване',
    uploadStageDeleteSummary: 'Изтриване на временно качване',
    uploadStageResult: 'Готово, без съдържание',

    error400: 'Грешка при валидация или заявка (ValidationError, QueryError)',
    error401: 'Не сте удостоверени (AuthenticationError)',
    error403: 'Забранено от контрола за достъп (Forbidden, UnverifiedEmail)',
    error404: 'Документът не е намерен (NotFound)',
    error500: 'Вътрешна грешка на сървъра (APIError)',

    securityBearer:
      'Поставете `token`, върнат от endpoint-а за вход. Изпраща се като `Authorization: Bearer <token>`. Payload приема също схемата `JWT <token>` и бисквитка `{{cookiePrefix}}-token`.',
    securityInteractive:
      'Интерактивен вход: въведете потребителско име (или имейл) и парола; оставете Client ID/Secret празни.',

    tagCollections: 'Колекции',
    tagCollectionsDesc: 'Endpoint-и за колекции от документи (CRUD, преброяване, дублиране).',
    tagGlobals: 'Глобални',
    tagGlobalsDesc: 'Endpoint-и за глобални документи.',
    tagSystem: 'Система',
    tagSystemDesc: 'Системни endpoint-и на Payload.',
    tagAuth: 'Удостоверяване',
    tagVersions: 'Версии',
    tagJobs: 'Задачи',
    tagUploads: 'Качвания',
    tagAccess: 'Достъп',

    localizationHeading: 'Локализация',
    localizationNote:
      'Налични локали: {{locales}}. Подайте `?locale=<code>` към endpoint за четене, за да изберете един. Подайте `?locale=all`, за да получите всички локали наведнъж — всяко локализирано поле тогава се връща като обект с ключове по код на локал (напр. `{ "en": "Hello", "de": "Hallo" }`) вместо единична стойност. Задайте `?flattenLocales=false` с `locale=all`, за да запазите тази форма на обект по локал. Схемите на полетата показват формата за един локал.',
    docLanguagesNote:
      'Тази документация е достъпна на: {{languages}}. Добавете `?lang=<code>` към URL адреса на тази спецификация, за да превключите.',
  },
}
