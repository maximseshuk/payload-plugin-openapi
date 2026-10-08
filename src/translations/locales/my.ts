import type { PluginDefaultTranslationsObject } from '../types.js'

export const my: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'ဆက်စပ်စာရွက်စာတမ်းများကို မည်မျှအဆင့်အထိ ဖြည့်သွင်းရမည်ကို သတ်မှတ်သည်။',
    paramSort: 'အစီအစဉ်ခွဲရန် အကွက်; ဆင်းသက်စီရန် `-` ဖြင့် ရှေ့ဆက်ထည့်ပါ၊ ဥပမာ `-createdAt`။',
    paramSortShort: 'အစီအစဉ်ခွဲရန် အကွက်; ဆင်းသက်စီရန် `-` ဖြင့် ရှေ့ဆက်ထည့်ပါ။',
    paramDraft: 'မူကြမ်းဗားရှင်းများကို ပြန်ပေးသည်။',
    paramTrash: 'ဖျက်ထားသော စာရွက်စာတမ်းများ ပါဝင်စေသည်။',
    paramAutosave: 'အလိုအလျောက်သိမ်းဆည်းမှုအဖြစ် သိမ်းပါ။ ဗားရှင်းအသစ်မထည့်ဘဲ နောက်ဆုံး autosave ဗားရှင်းကို အပ်ဒိတ်လုပ်သည်။',
    paramPublishAllLocales: 'တောင်းဆိုမှု locale သာမက locale အားလုံးကို ထုတ်ဝေသည်။',
    paramUnpublishAllLocales: 'locale အားလုံး၏ ထုတ်ဝေမှုကို ဖျက်သိမ်းပြီး စာရွက်စာတမ်းကို draft သို့ ပြန်ထားသည်။',
    paramOverrideLock: 'အခြားအသုံးပြုသူ၏ lock ကို လျစ်လျူရှုသည်။ မူလ false။',
    paramSelectedLocales: 'ဤ locale များကိုသာ မိတ္တူသို့ ကူးယူသည်။ မူလ- locale အားလုံး။',
    paramFlattenLocales:
      '`locale=all` ဖြင့်အသုံးပြုသောအခါ ဒေသန္တရပြုလုပ်ထားသော အကွက်များကို တစ်ဒေသစီ object အဖြစ် ဆက်ထားရန် false သတ်မှတ်ပါ။ မူရင်းတန်ဖိုးမှာ true ဖြစ်သည်။',
    paramLocale: 'ပြန်ပေးရမည့် ဒေသ၊ သို့မဟုတ် ဒေသအားလုံးအတွက် `all`။ API ဖော်ပြချက်ရှိ Localization အပိုင်းကို ကြည့်ပါ။',
    paramFallbackLocale: 'ပျောက်ဆုံးနေသော ဒေသန္တရတန်ဖိုးများအတွက် အစားထိုးပြန်လှည့်မည့် ဒေသ၊ သို့မဟုတ် ပိတ်ရန် `none`။',

    schemaSelect: 'ပြန်ပေးမည့် အကွက်များကို ရွေးချယ်ပါ၊ ဥပမာ `select[title]=true`။ အားလုံးပြန်ပေးစေရန် ချန်လှပ်ထားပါ။',
    schemaPopulate: 'collection အလိုက် ဆက်စပ်စာရွက်စာတမ်းများကို ဖြည့်သွင်းသည်၊ ဥပမာ `populate[posts][title]=true`။',
    schemaJoins: 'join အလိုက် ထိန်းချုပ်မှုများ (limit/page/sort/where/count)၊ ဥပမာ `joins[posts][limit]=10`။',
    schemaWhere:
      'Payload ၏ `where` စစ်ထုတ်ချက်။ အကွက်တစ်ခုပြီး operator တစ်ခုကို အလွှာဆင့်ထည့်ပါ: `where[field][equals]=value`။ စကားစုများကို `and` / `or` array များဖြင့် ပေါင်းစပ်ပါ၊ ဥပမာ `where[or][0][field][equals]=value`။ အကွက်တစ်ခုစီသည် ၎င်း၏အမျိုးအစားအတွက် မှန်ကန်သော operator များကိုသာ ဖော်ပြသည်။',
    schemaSupportedTimezones: 'IANA ပုံစံဖြင့် ပံ့ပိုးထားသော အချိန်ဇုန်များ။',
    schemaPerLocale: '`locale=all` သုံးသောအခါ ပြန်ပေးသော တစ်ဒေသစီ တန်ဖိုးများ။',

    collectionList: 'စာရွက်စာတမ်းများ၏ စာမျက်နှာခွဲ စာရင်း',
    collectionDoc: 'စာရွက်စာတမ်းတစ်ခု',
    collectionCreated: 'ဖန်တီးထားသော စာရွက်စာတမ်း',
    collectionUpdated: 'အပ်ဒိတ်လုပ်ထားသော စာရွက်စာတမ်း',
    collectionDeleted: 'ဖျက်ထားသော စာရွက်စာတမ်း',
    collectionBulkUpdate: 'အစုလိုက် အပ်ဒိတ်လုပ်မှု ရလဒ်',
    collectionBulkDelete: 'အစုလိုက် ဖျက်မှု ရလဒ်',
    collectionCount: 'စာရွက်စာတမ်း အရေအတွက်',
    collectionDuplicated: 'ပွားယူထားသော စာရွက်စာတမ်း',

    globalDoc: 'global စာရွက်စာတမ်း',

    authLogin: 'အကောင့်ဝင်ရောက်မှု ရလဒ်',
    authLogout: 'အကောင့်ထွက်မှု ရလဒ်',
    authMe: 'လက်ရှိ အထောက်အထားစိစစ်ထားသော အသုံးပြုသူ',
    authRefreshToken: 'ပြန်လည်ရယူထားသော token',
    authForgotPassword: 'စကားဝှက်ပြန်လည်သတ်မှတ်ရန် အီးမေးလ် ပေးပို့ပြီးပါပြီ',
    authResetPassword: 'စကားဝှက် ပြန်လည်သတ်မှတ်မှု ရလဒ်',
    authFirstRegister: 'auth token ဖြင့် ဖန်တီးထားသော ပထမဆုံး အသုံးပြုသူ',
    authInit: 'ဤ auth collection တွင် အသုံးပြုသူ ရှိပြီးဖြစ်မဖြစ်',
    authAccess: 'ဤ collection အတွက် လက်ရှိအသုံးပြုသူ၏ ဝင်ရောက်ခွင့် (ခွင့်ပြုချက်များ)',
    authUnlock: 'သော့ဖွင့်မှု ရလဒ်',
    authVerify: 'အတည်ပြုမှု ရလဒ်',

    versionList: 'ဗားရှင်းများ၏ စာမျက်နှာခွဲ စာရင်း',
    versionSingle: 'ဗားရှင်းတစ်ခု',
    versionRestored: 'ပြန်လည်ရယူထားသော စာရွက်စာတမ်း',
    versionWhere: 'ဗားရှင်းအကွက်များပေါ်တွင် စစ်ထုတ်သည်၊ ဥပမာ `where[parent][equals]=<docId>`။',

    jobsRunSummary: 'တန်းစီထားသော jobs များကို လုပ်ဆောင်သည် (ထို့ပြင် မူရင်းအားဖြင့် အချိန်ဇယားများကို စီမံသည်)',
    jobsSchedulesSummary: '၎င်းတို့၏ အချိန်ဇယားအရ ပြုလုပ်ရန်ရောက်ရှိနေသော jobs များကို တန်းစီသည်',
    jobsRunResult: 'လုပ်ဆောင်မှု ရလဒ်',
    jobsSchedulesResult: 'အချိန်ဇယားသတ်မှတ်မှု ရလဒ်',
    jobsRunAllQueues: 'queue အားလုံးတွင် jobs များကို လုပ်ဆောင်သည်။',
    jobsLimit: 'လုပ်ဆောင်ရမည့် jobs အများဆုံး အရေအတွက်။',
    jobsDisableScheduling: '`run` က မူရင်းအားဖြင့် လုပ်ဆောင်သော အချိန်ဇယားစီမံမှုကို ကျော်လွှားသည်။',
    jobsSilent: 'လုပ်ဆောင်မှု မှတ်တမ်းတင်ခြင်းကို ပိတ်သည်။',
    jobsSchedulesAllQueues: 'queue အားလုံးတွင် အချိန်ဇယားများကို စီမံသည်။',
    jobsQueue: 'လုပ်ဆောင်ချက်ကို queue တစ်ခုတည်းသာ ကန့်သတ်သည်။ သိရှိထားသော queue များ: {{queues}}။',

    uploadFile: 'အပ်လုဒ်လုပ်ရန် binary ဖိုင်။',
    uploadBody:
      'ဖိုင်တစ်ခု အပ်လုဒ်လုပ်ရန် `multipart/form-data` ပေးပို့ပါ (binary `file` အပိုင်းနှင့် JSON-stringified အကွက်များပါသော `_payload` အပိုင်း)၊ သို့မဟုတ် ဖိုင်မရှိသည့်အခါ အကွက်များသာပါသော `application/json` ကို ပေးပို့ပါ။',
    uploadPayloadField: 'JSON-stringified {{schema}} အကွက်များ။ ဥပမာ: `{"alt":"A caption"}`။',

    error400: 'အတည်ပြုမှု သို့မဟုတ် query အမှား (ValidationError, QueryError)',
    error401: 'အထောက်အထား မစိစစ်ရသေးပါ (AuthenticationError)',
    error403: 'ဝင်ရောက်ခွင့်ထိန်းချုပ်မှုဖြင့် တားမြစ်ထားသည် (Forbidden, UnverifiedEmail)',
    error404: 'စာရွက်စာတမ်း ရှာမတွေ့ပါ (NotFound)',
    error500: 'ဆာဗာ အတွင်းပိုင်း အမှား (APIError)',

    securityBearer:
      'login endpoint မှ ပြန်ပေးသော `token` ကို ကူးထည့်ပါ။ `Authorization: Bearer <token>` အဖြစ် ပေးပို့သည်။ Payload သည် `JWT <token>` scheme နှင့် `{{cookiePrefix}}-token` cookie ကိုလည်း လက်ခံသည်။',
    securityInteractive:
      'အပြန်အလှန် အကောင့်ဝင်ရောက်ခြင်း: အသုံးပြုသူအမည် (သို့မဟုတ် အီးမေးလ်) နှင့် စကားဝှက်ကို ထည့်ပါ; Client ID/Secret ကို ကွက်လပ်ထားပါ။',

    tagCollections: 'Collections',
    tagCollectionsDesc: 'စာရွက်စာတမ်း collection endpoint များ (CRUD, count, duplicate)။',
    tagGlobals: 'Globals',
    tagGlobalsDesc: 'Global စာရွက်စာတမ်း endpoint များ။',
    tagSystem: 'System',
    tagSystemDesc: 'Payload system endpoint များ။',
    tagAuth: 'Auth',
    tagVersions: 'Versions',
    tagJobs: 'Jobs',

    localizationHeading: 'Localization',
    localizationNote:
      'ရရှိနိုင်သော ဒေသများ: {{locales}}။ တစ်ခုကို ရွေးချယ်ရန် read endpoint သို့ `?locale=<code>` ပေးပို့ပါ။ ဒေသအားလုံးကို တစ်ပြိုင်နက် လက်ခံရရှိရန် `?locale=all` ပေးပို့ပါ — ထိုအခါ ဒေသန္တရပြုလုပ်ထားသော အကွက်တစ်ခုစီကို တန်ဖိုးတစ်ခုတည်းအစား ဒေသကုဒ်ဖြင့် key သတ်မှတ်ထားသော object အဖြစ် ပြန်ပေးသည် (ဥပမာ `{ "en": "Hello", "de": "Hallo" }`)။ ထို တစ်ဒေသစီ object ပုံစံကို ဆက်ထားရန် `locale=all` နှင့်အတူ `?flattenLocales=false` သတ်မှတ်ပါ။ အကွက် schema များသည် တစ်ဒေသတည်း ပုံစံကို ပြသသည်။',
    docLanguagesNote:
      'ဤစာရွက်စာတမ်းကို အောက်ပါဘာသာစကားများဖြင့် ရရှိနိုင်ပါသည်— {{languages}}။ ဘာသာစကားပြောင်းရန် ဤ spec URL နောက်တွင် `?lang=<code>` ကို ထည့်ပါ။',
  },
}
