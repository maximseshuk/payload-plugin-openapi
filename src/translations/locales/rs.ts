import type { PluginDefaultTranslationsObject } from '../types.js'

export const rs: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Колико нивоа повезаних докумената треба попунити.',
    paramSort: 'Поље по коме се сортира; додајте префикс `-` за опадајући редослед, нпр. `-createdAt`.',
    paramSortShort: 'Поље по коме се сортира; додајте префикс `-` за опадајући редослед.',
    paramDraft: 'Враћа нацрте верзија.',
    paramTrash: 'Укључује документе из корпе за отпатке.',
    paramAutosave: 'Сачувај као аутоматско чување: ажурира последњу аутоматски сачувану верзију уместо додавања нове.',
    paramPublishAllLocales: 'Објави све језике, не само језик захтева.',
    paramUnpublishAllLocales: 'Поништи објаву свих језика и врати документ у нацрт.',
    paramOverrideLock: 'Занемари закључавање другог корисника. Подразумевано false.',
    paramSelectedLocales: 'Копирај само ове језике у дупликат. Подразумевано: сви језици.',
    paramFlattenLocales:
      'Уз `locale=all`, поставите на false да би се локализована поља задржала као објекти по локалитету. Подразумевано true.',
    paramLocale: 'Локалитет који се враћа, или `all` за све локалитете. Погледајте одељак Локализација у опису API-ја.',
    paramFallbackLocale: 'Резервни локалитет за недостајуће локализоване вредности, или `none` за онемогућавање.',

    schemaSelect: 'Изаберите поља која се враћају, нпр. `select[title]=true`. Изоставите да би се вратила сва.',
    schemaPopulate: 'Попуњавање повезаних докумената по колекцији, нпр. `populate[posts][title]=true`.',
    schemaJoins: 'Контроле по споју (limit/page/sort/where/count), нпр. `joins[posts][limit]=10`.',
    schemaWhere:
      'Payload `where` филтер. Угнездите поље, па оператор: `where[field][equals]=value`. Комбинујте клаузуле помоћу низова `and` / `or`, нпр. `where[or][0][field][equals]=value`. Свако поље наводи само операторе важеће за његов тип.',
    schemaSupportedTimezones: 'Подржане временске зоне у IANA формату.',
    schemaPerLocale: 'Вредности по локалитету, враћају се када је `locale=all`.',

    collectionList: 'Страничена листа докумената',
    collectionDoc: 'Један документ',
    collectionCreated: 'Креиран документ',
    collectionUpdated: 'Ажуриран документ',
    collectionDeleted: 'Обрисан документ',
    collectionBulkUpdate: 'Резултат групног ажурирања',
    collectionBulkDelete: 'Резултат групног брисања',
    collectionCount: 'Број докумената',
    collectionDuplicated: 'Дуплирани документ',

    globalDoc: 'Глобални документ',

    authLogin: 'Резултат пријаве',
    authLogout: 'Резултат одјаве',
    authMe: 'Тренутно пријављени корисник',
    authRefreshToken: 'Освежени токен',
    authForgotPassword: 'Имејл за ресетовање лозинке је послат',
    authResetPassword: 'Резултат ресетовања лозинке',
    authFirstRegister: 'Први корисник, креиран са токеном за аутентификацију',
    authInit: 'Да ли ова колекција за аутентификацију већ има кориснике',
    authAccess: 'Приступ (дозволе) тренутног корисника за ову колекцију',
    authUnlock: 'Резултат откључавања',
    authVerify: 'Резултат верификације',

    versionList: 'Страничена листа верзија',
    versionSingle: 'Једна верзија',
    versionRestored: 'Враћени документ',
    versionWhere: 'Филтрирање по пољима верзије, нпр. `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'Покретање послова из реда чекања (и, подразумевано, обрада распореда)',
    jobsSchedulesSummary: 'Стављање у ред послова који су на реду према свом распореду',
    jobsRunResult: 'Резултат покретања',
    jobsSchedulesResult: 'Резултат распоређивања',
    jobsRunAllQueues: 'Покреће послове из свих редова чекања.',
    jobsLimit: 'Максималан број послова за покретање.',
    jobsDisableScheduling: 'Прескаче обраду распореда коју `run` подразумевано ради.',
    jobsSilent: 'Потискује бележење при покретању.',
    jobsSchedulesAllQueues: 'Обрађује распореде у свим редовима чекања.',
    jobsQueue: 'Ограничава операцију на један ред чекања. Познати редови: {{queues}}.',

    uploadFile: 'Бинарна датотека за отпремање.',
    uploadBody:
      'Пошаљите `multipart/form-data` да отпремите датотеку (бинарни `file` део плус `_payload` део са пољима у JSON стринг формату), или `application/json` само са пољима када нема датотеке.',
    uploadPayloadField: 'Поља {{schema}} у JSON стринг формату. Пример: `{"alt":"A caption"}`.',

    error400: 'Грешка валидације или упита (ValidationError, QueryError)',
    error401: 'Није аутентификован (AuthenticationError)',
    error403: 'Забрањено контролом приступа (Forbidden, UnverifiedEmail)',
    error404: 'Документ није пронађен (NotFound)',
    error500: 'Интерна грешка сервера (APIError)',

    securityBearer:
      'Налепите `token` који враћа крајња тачка за пријаву. Шаље се као `Authorization: Bearer <token>`. Payload такође прихвата шему `JWT <token>` и колачић `{{cookiePrefix}}-token`.',
    securityInteractive:
      'Интерактивна пријава: унесите корисничко име (или имејл) и лозинку; оставите Client ID/Secret празним.',

    tagCollections: 'Колекције',
    tagCollectionsDesc: 'Крајње тачке за колекције докумената (CRUD, бројање, дуплирање).',
    tagGlobals: 'Глобали',
    tagGlobalsDesc: 'Крајње тачке за глобалне документе.',
    tagSystem: 'Систем',
    tagSystemDesc: 'Системске крајње тачке Payload-а.',
    tagAuth: 'Аутентификација',
    tagVersions: 'Верзије',
    tagJobs: 'Послови',

    localizationHeading: 'Локализација',
    localizationNote:
      'Доступни локалитети: {{locales}}. Проследите `?locale=<code>` крајњој тачки за читање да изаберете један. Проследите `?locale=all` да примите све локалитете одједном — свако локализовано поље се тада враћа као објекат са кључевима по коду локалитета (нпр. `{ "en": "Hello", "de": "Hallo" }`) уместо као једна вредност. Поставите `?flattenLocales=false` уз `locale=all` да задржите тај облик објекта по локалитету. Шеме поља приказују облик за један локалитет.',
    docLanguagesNote:
      'Ова документација је доступна на следећим језицима: {{languages}}. Додајте `?lang=<code>` на овај URL спецификације да бисте променили језик.',
  },
}
