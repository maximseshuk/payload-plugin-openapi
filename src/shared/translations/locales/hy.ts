import type { PluginDefaultTranslationsObject } from '@/shared/translations/types.js'

export const hy: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Քանի մակարդակ կապակցված փաստաթղթեր ներառել։',
    paramSort: 'Դաշտ, ըստ որի դասավորվում է. նվազման համար նախածանցեք `-`-ով, օր. `-createdAt`։',
    paramSortShort: 'Դաշտ, ըստ որի դասավորվում է. նվազման համար նախածանցեք `-`-ով։',
    paramDraft: 'Վերադարձնել սևագիր տարբերակները։',
    paramTrash: 'Ներառել ջնջված (աղբարկղի) փաստաթղթերը։',
    paramAutosave:
      'Պահպանել որպես ավտոպահպանում՝ նոր տարբերակ ավելացնելու փոխարեն թարմացնում է վերջին ավտոպահպանված տարբերակը։',
    paramPublishAllLocales: 'Հրապարակել բոլոր լեզուները, ոչ միայն հարցման լեզուն։',
    paramUnpublishAllLocales: 'Չեղարկել բոլոր լեզուների հրապարակումը և փաստաթուղթը վերադարձնել սևագրի։',
    paramOverrideLock: 'Անտեսել այլ օգտատիրոջ կողպումը։ Լռելյայն false։',
    paramSelectedLocales: 'Կրկնօրինակում պատճենել միայն այս լեզուները։ Լռելյայն՝ բոլոր լեզուները։',
    paramFlattenLocales:
      '`locale=all`-ի դեպքում սահմանեք false-ի, որպեսզի տեղայնացված դաշտերը պահվեն որպես ըստ-locale-ի օբյեկտներ։ Լռելյայն՝ true։',
    paramLocale:
      'Վերադարձվող locale-ը, կամ `all`՝ բոլոր locale-ների համար։ Տես API-ի նկարագրության Տեղայնացման բաժինը։',
    paramFallbackLocale:
      'Locale, որին վերադառնալ բացակայող տեղայնացված արժեքների դեպքում, կամ `none`՝ անջատելու համար։',
    paramValidateLocale:
      'Վավերացվող locale-ները, կամ `all`՝ բոլոր locale-ների համար։ Մեկից ավելի locale-ի համար կրկնեք պարամետրը։',
    paramComputeHierarchyPaths:
      'Նշեք true՝ `{{slugPath}}` և `{{titlePath}}` ուղիները հաշվարկելու համար։ Դաշտերից որևէ մեկի ընտրությունը նույնպես հաշվարկում է դրանք։',

    schemaSelect: 'Ընտրեք վերադարձվող դաշտերը, օր. `select[title]=true`։ Բաց թողեք՝ բոլորը վերադարձնելու համար։',
    schemaPopulate: 'Ներառել կապակցված փաստաթղթերն ըստ կոլեկցիայի, օր. `populate[posts][title]=true`։',
    schemaJoins: 'Ըստ-join-ի կարգավորումներ (limit/page/sort/where/count), օր. `joins[posts][limit]=10`։',
    schemaWhere:
      'Payload-ի `where` ֆիլտր։ Ներդրեք դաշտ, ապա օպերատոր. `where[field][equals]=value`։ Համատեղեք պայմանները `and` / `or` զանգվածներով, օր. `where[or][0][field][equals]=value`։ Յուրաքանչյուր դաշտ ցուցադրում է միայն իր տիպին վավեր օպերատորները։',
    schemaSupportedTimezones: 'Աջակցվող ժամային գոտիները IANA ձևաչափով։',
    schemaPerLocale: 'Ըստ-locale-ի արժեքներ, վերադարձվում են `locale=all`-ի դեպքում։',
    schemaHierarchySlugPath:
      'Slug ուղի, օր.՝ `parent/child`։ Հաշվարկվում է կարդալիս `computeHierarchyPaths=true`-ով կամ ընտրելիս։ Չի կարող օգտագործվել `where`-ում։',
    schemaHierarchyTitlePath:
      'Վերնագրերի ուղի, օր.՝ `Parent/Child`։ Հաշվարկվում է կարդալիս `computeHierarchyPaths=true`-ով կամ ընտրելիս։ Չի կարող օգտագործվել `where`-ում։',

    collectionList: 'Փաստաթղթերի էջավորված ցանկ',
    collectionDoc: 'Մեկ փաստաթուղթ',
    collectionCreated: 'Ստեղծված փաստաթուղթ',
    collectionUpdated: 'Թարմացված փաստաթուղթ',
    collectionDeleted: 'Ջնջված փաստաթուղթ',
    collectionBulkUpdate: 'Զանգվածային թարմացման արդյունք',
    collectionBulkDelete: 'Զանգվածային ջնջման արդյունք',
    collectionCount: 'Փաստաթղթերի քանակ',
    collectionDuplicated: 'Կրկնօրինակված փաստաթուղթը',
    validateResult:
      'Վավերացման արդյունքը։ Ոչինչ չի պահպանվում։ Դաշտերի անվավեր արժեքների դեպքում վերադարձվում է `valid: false`՝ սխալներով, ոչ թե սխալի կարգավիճակ։',
    validateBody:
      'Վավերացվող փաստաթղթի տվյալները։ Պահպանված փաստաթղթի կամ գլոբալ փաստաթղթի դեպքում տվյալները միավորվում են վերջին սևագրի վրա, իսկ եթե սևագիր չկա՝ պահպանված փաստաթղթի վրա։',

    globalDoc: 'Գլոբալ փաստաթուղթը',

    authLogin: 'Մուտքի արդյունք',
    authLogout: 'Ելքի արդյունք',
    authMe: 'Ընթացիկ նույնականացված օգտատերը',
    authRefreshToken: 'Թարմացված token',
    authForgotPassword: 'Գաղտնաբառի վերականգնման նամակն ուղարկվեց',
    authResetPassword: 'Գաղտնաբառի վերականգնման արդյունք',
    authFirstRegister: 'Առաջին օգտատերը, ստեղծված auth token-ով',
    authInit: 'Արդյոք այս auth կոլեկցիան արդեն ունի օգտատերեր',
    authAccess: 'Ընթացիկ օգտատիրոջ թույլտվությունները բոլոր կոլեկցիաների և գլոբալների համար',
    docAccess: 'Ընթացիկ օգտատիրոջ թույլտվությունները այս փաստաթղթի համար',
    docAccessBody:
      'Փաստաթղթի տվյալներ, որոնց համեմատ ստուգվում է մուտքը։ Առանց դրանց Payload-ը օգտագործում է պահպանված փաստաթուղթը, եթե այն կա։',
    authUnlock: 'Ապակողպման արդյունք',
    authVerify: 'Հաստատման արդյունք',
    apiKeyReveal: 'Վերծանված API բանալին',

    versionList: 'Տարբերակների էջավորված ցանկ',
    versionSingle: 'Մեկ տարբերակ',
    versionRestored: 'Վերականգնված փաստաթուղթը',
    versionWhere: 'Ֆիլտրել ըստ տարբերակի դաշտերի, օր. `where[parent][equals]=<docId>`։',

    jobsRunSummary: 'Գործարկել հերթագրված առաջադրանքները (և, լռելյայն, մշակել ժամանակացույցերը)',
    jobsSchedulesSummary: 'Հերթագրել առաջադրանքները, որոնց ժամկետը հասել է ըստ իրենց ժամանակացույցի',
    jobsRunResult: 'Գործարկման արդյունք',
    jobsSchedulesResult: 'Ժամանակացույցի արդյունք',
    jobsRunAllQueues: 'Գործարկել առաջադրանքները բոլոր հերթերում։',
    jobsLimit: 'Գործարկվող առաջադրանքների առավելագույն քանակը։',
    jobsDisableScheduling: 'Բաց թողնել ժամանակացույցի մշակումը, որը `run`-ը կատարում է լռելյայն։',
    jobsSilent: 'Ճնշել գործարկման լոգավորումը։',
    jobsSchedulesAllQueues: 'Մշակել ժամանակացույցերը բոլոր հերթերում։',
    jobsQueue: 'Սահմանափակել գործողությունը մեկ հերթով։ Հայտնի հերթեր՝ {{queues}}։',

    uploadFile: 'Վերբեռնվող երկուական ֆայլը։',
    uploadBody:
      'Ֆայլ վերբեռնելու համար ուղարկեք `multipart/form-data` (երկուական `file` մաս և `_payload` մաս՝ JSON-ի տողի վերածված դաշտերով), կամ `application/json`՝ միայն դաշտերով, երբ ֆայլ չկա։',
    uploadPayloadField: 'JSON-ի տողի վերածված {{schema}} դաշտեր։ Օրինակ՝ `{"alt":"A caption"}`։',
    fileServe: 'Ֆայլը',
    filePartial: 'Ֆայլի մի մասը՝ `Range` հարցման համար',
    paramFileVersion: 'Վերադարձնում է այս տարբերակի ID-ով պահված ֆայլը։',
    uploadInstructionsSummary: 'Ստանալ ֆայլի վերբեռնման հրահանգներ մինչև փաստաթղթի պահպանումը',
    uploadInstructionsResult:
      'Որտեղ ուղարկել ֆայլի բայթերը և `file` արժեքը, որն ուղարկվում է ստեղծման կամ թարմացման հարցման հետ',
    uploadStagePutSummary: 'Ուղարկել ֆայլի բայթերը ժամանակավոր վերբեռնման համար',
    uploadStageDeleteSummary: 'Ջնջել ժամանակավոր վերբեռնումը',
    uploadStageResult: 'Պատրաստ է, առանց բովանդակության',

    error400: 'Վավերացման կամ հարցման սխալ (ValidationError, QueryError)',
    error401: 'Չնույնականացված (AuthenticationError)',
    error403: 'Արգելված մուտքի վերահսկման կողմից (Forbidden, UnverifiedEmail)',
    error404: 'Փաստաթուղթը չի գտնվել (NotFound)',
    error500: 'Սերվերի ներքին սխալ (APIError)',

    securityBearer:
      'Տեղադրեք login էնդփոյնթի վերադարձրած `token`-ը։ Ուղարկվում է որպես `Authorization: Bearer <token>`։ Payload-ն ընդունում է նաև `JWT <token>` սխեման և `{{cookiePrefix}}-token` քուքին։',
    securityInteractive:
      'Ինտերակտիվ մուտք. մուտքագրեք օգտանունը (կամ էլ. փոստը) և գաղտնաբառը; Client ID/Secret դաշտերը թողեք դատարկ։',

    tagCollections: 'Կոլեկցիաներ',
    tagCollectionsDesc: 'Փաստաթղթերի կոլեկցիայի էնդփոյնթներ (CRUD, քանակ, կրկնօրինակում)։',
    tagGlobals: 'Գլոբալներ',
    tagGlobalsDesc: 'Գլոբալ փաստաթղթերի էնդփոյնթներ։',
    tagSystem: 'Համակարգ',
    tagSystemDesc: 'Payload-ի համակարգային էնդփոյնթներ։',
    tagAuth: 'Նույնականացում',
    tagVersions: 'Տարբերակներ',
    tagJobs: 'Առաջադրանքներ',
    tagUploads: 'Վերբեռնումներ',
    tagAccess: 'Մուտք',
    tagPlugins: 'Պլագիններ',
    tagPluginsDesc: 'Payload-ի պաշտոնական պլագինների ավելացրած էնդփոյնթներ։',
    errorPlugin400: 'Անվավեր հարցում',
    errorPlugin401: 'Նույնականացված չէ',
    errorPlugin403: 'Արգելված է',
    errorPlugin404: 'Չի գտնվել',
    errorPlugin500: 'Սերվերի ներքին սխալ',
    ecommerceAddItem: 'Ավելացնել ապրանքը զամբյուղ',
    ecommerceRemoveItem: 'Հեռացնել ապրանքը զամբյուղից',
    ecommerceUpdateItem: 'Փոխել զամբյուղի ապրանքի քանակը',
    ecommerceClearCart: 'Հեռացնել բոլոր ապրանքները զամբյուղից',
    ecommerceMergeCart: 'Միավորել հյուրի զամբյուղը այս զամբյուղի հետ',
    ecommerceCartAccess: 'Թույլատրված է զամբյուղի տիրոջը կամ հյուրի զամբյուղի համար՝ հարցման մարմնում դրա `secret`-ով։',
    ecommerceCartResult: 'Թարմացված զամբյուղը',
    errorEcommerce404: 'Զամբյուղը չի գտնվել կամ հասանելի չէ',
    ecommerceQuantity: 'Նոր քանակ, կամ `{ "$inc": n }`՝ այն n-ով փոխելու համար։',
    ecommerceInitiatePayment: 'Սկսել վճարում `{{method}}`-ով',
    ecommerceConfirmOrder: 'Հաստատել վճարումը `{{method}}`-ով և ստեղծել պատվերը',
    ecommercePaymentBody:
      'Օգտագործում է `cartID` (հյուրի զամբյուղի համար՝ `secret`-ով) կամ օգտատիրոջ զամբյուղը։ Առանց օգտատիրոջ `customerEmail`-ը պարտադիր է։ Վճարման ադապտերին կարող են պետք լինել այլ դաշտեր։',
    ecommerceInitiateResult: 'Վճարումը սկսված է։ Ադապտերն ավելացնում է իր դաշտերը, օր.՝ client secret։',
    ecommerceConfirmResult: 'Պատվերը ստեղծված է',
    stripeWebhook: 'Ստանալ Stripe webhook իրադարձություններ',
    stripeWebhookBody:
      'Stripe-ի հում իրադարձությունը՝ ստորագրված `Stripe-Signature` վերնագրում։ Կանչում է Stripe-ը, ոչ թե API հաճախորդները։',
    stripeWebhookResult: 'Իրադարձությունը ստացված է',
    errorStripeWebhook400: 'Ստորագրության ստուգումը ձախողվեց',
    stripeRest: 'Կանչել Stripe API-ի թույլատրված մեթոդ',
    stripeRestResult: 'Stripe API-ի արդյունքը',
    errorStripeRest404: 'Stripe API-ն սխալ վերադարձրեց',
    mcp: 'Ուղարկել MCP JSON-RPC հաղորդագրություն',
    mcpDesc:
      'Model Context Protocol Streamable HTTP-ով՝ JSON պատասխաններով։ Անանուն հարցումներն աշխատում են. ցուցադրվող գործիքները կախված են օգտատիրոջ իրավունքներից։ 2025 թվականի արձանագրության տարբերակով հաճախորդները պետք է ուղարկեն `Accept: application/json, text/event-stream`։',
    mcpResult: 'JSON-RPC պատասխան',
    mcpOverrideAccess: 'Բաց թողնել մուտքի ստուգումները։ Միայն մշակման համար։',
    mcpGet: 'Չի աջակցվում. սերվերը իրադարձությունների հոսք չի բացում',
    errorMcpGet405: 'Մեթոդը թույլատրված չէ, օգտագործեք POST',
    mcpProtocolVersion: 'Համաձայնեցված MCP արձանագրության տարբերակը, օր.՝ `2025-06-18`։',
    mcpResult202: 'Ընդունված է. մարմինը պարունակում էր միայն ծանուցումներ կամ պատասխաններ',
    errorMcp404: 'Անհայտ MCP մեթոդ',
    errorMcp406: '`Accept` վերնագրում բացակայում է `application/json` կամ `text/event-stream`',
    errorMcp413: 'Հարցման մարմինը չափազանց մեծ է',
    errorMcp415: '`Content-Type`-ը պետք է լինի `application/json`',
    seoTitle: 'Ստեղծել մետա վերնագիրը',
    seoDescription: 'Ստեղծել մետա նկարագրությունը',
    seoUrl: 'Ստեղծել նախադիտման URL-ը',
    seoImage: 'Ստեղծել մետա պատկերը',
    seoBody:
      'Խմբագրվող փաստաթուղթը՝ `collectionSlug` կամ `globalSlug`, դրա `id`-ն և ընթացիկ `doc` տվյալները։ Փոխանցվում է ձեր ստեղծման ֆունկցիային։',
    seoResult: 'Ստեղծված արժեքը։ Դատարկ տող, եթե ստեղծման ֆունկցիա սահմանված չէ։',
    searchReindex: 'Վերակառուցել որոնման ինդեքսը որոշ հավաքածուների համար',
    searchReindexResult: 'Վերաինդեքսավորման ամփոփում',
    tenantOptions: 'Ցուցակել այն վարձակալներին, որոնց օգտատերը կարող է ընտրել',
    tenantOptionsResult: 'Վարձակալների տարբերակներ',
    exportDownload: 'Արտահանել փաստաթղթերը ֆայլի մեջ',
    exportDownloadResult: 'Արտահանման ֆայլը',
    exportPreview: 'Արտահանման նախադիտում',
    importPreview: 'Ներմուծման ֆայլի նախադիտում',
    previewResult: 'Նախադիտման փաստաթղթերի մեկ էջ',
    importFileData: 'Ֆայլի բովանդակությունը՝ base64 կոդավորմամբ։',
    r2Upload: 'Վերբեռնել ֆայլը R2 մասերով',
    r2UploadDesc:
      'Երեք քայլ մեկ երթուղու վրա։ Սկիզբ՝ ուղարկեք `collection`, `fileName` և `fileType`։ Յուրաքանչյուր մաս՝ ավելացրեք `multipartId`, `multipartKey`, `multipartNumber` և `signedReceipt` և ուղարկեք բայթերը։ Ավարտ՝ նույնը առանց `multipartNumber`-ի, մասերի JSON ցուցակով։',
    r2UploadResult: 'Վերբեռնումը սկսված է, մասը վերբեռնված է կամ վերբեռնումն ավարտված է (օբյեկտի բանալին՝ տեքստով)',
    errorR2412: 'Այս բանալիով ֆայլ արդեն կա',

    localizationHeading: 'Տեղայնացում',
    localizationNote:
      'Հասանելի locale-ներ՝ {{locales}}։ Փոխանցեք `?locale=<code>` read էնդփոյնթին՝ մեկը ընտրելու համար։ Փոխանցեք `?locale=all`՝ բոլոր locale-ները միանգամից ստանալու համար — այդ դեպքում յուրաքանչյուր տեղայնացված դաշտ վերադարձվում է որպես locale-ի կոդով բանալիավորված օբյեկտ (օր. `{ "en": "Hello", "de": "Hallo" }`) մեկ արժեքի փոխարեն։ Սահմանեք `?flattenLocales=false` `locale=all`-ի հետ՝ ըստ-locale-ի օբյեկտի այդ ձևը պահելու համար։ Դաշտերի սխեմաները ցույց են տալիս մեկ-locale-ի ձևը։',
    docLanguagesNote:
      'Այս փաստաթղթերը հասանելի են հետևյալ լեզուներով՝ {{languages}}: Լեզուն փոխելու համար այս սպեցիֆիկացիայի URL-ին ավելացրեք `?lang=<code>`:',
  },
}
