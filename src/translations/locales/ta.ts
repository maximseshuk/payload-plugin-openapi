import type { PluginDefaultTranslationsObject } from '../types.js'

export const ta: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'தொடர்புடைய ஆவணங்களை எத்தனை நிலைகள் வரை நிரப்ப வேண்டும்.',
    paramSort: 'வரிசைப்படுத்த வேண்டிய புலம்; இறங்கு வரிசைக்கு `-` முன்னொட்டாக இடவும், எ.கா. `-createdAt`.',
    paramSortShort: 'வரிசைப்படுத்த வேண்டிய புலம்; இறங்கு வரிசைக்கு `-` முன்னொட்டாக இடவும்.',
    paramDraft: 'வரைவு பதிப்புகளைத் திருப்பி அளிக்கவும்.',
    paramTrash: 'குப்பையில் உள்ள ஆவணங்களையும் சேர்க்கவும்.',
    paramFlattenLocales:
      '`locale=all` உடன், உள்ளூராக்கப்பட்ட புலங்களை ஒவ்வொரு மொழியிடத்திற்கான பொருள்களாக வைத்திருக்க false என அமைக்கவும். இயல்பு true.',
    paramLocale:
      'திருப்பி அளிக்க வேண்டிய மொழியிடம், அல்லது ஒவ்வொரு மொழியிடத்திற்கும் `all`. API விளக்கத்தில் உள்ளூராக்கம் (Localization) பகுதியைப் பார்க்கவும்.',
    paramFallbackLocale: 'விடுபட்ட உள்ளூராக்கப்பட்ட மதிப்புகளுக்குப் பின்வாங்கப் பயன்படும் மொழியிடம், அல்லது முடக்க `none`.',

    schemaSelect:
      'திருப்பி அளிக்க வேண்டிய புலங்களைத் தேர்வுசெய்யவும், எ.கா. `select[title]=true`. அனைத்தையும் திருப்பி அளிக்க இதைத் தவிர்க்கவும்.',
    schemaPopulate: 'ஒவ்வொரு தொகுப்பிற்கும் தொடர்புடைய ஆவணங்களை நிரப்பவும், எ.கா. `populate[posts][title]=true`.',
    schemaJoins: 'ஒவ்வொரு இணைப்பிற்கும் கட்டுப்பாடுகள் (limit/page/sort/where/count), எ.கா. `joins[posts][limit]=10`.',
    schemaWhere:
      'Payload `where` வடிகட்டி. ஒரு புலத்தை, பின் ஒரு செயற்குறியை உள்ளமைக்கவும்: `where[field][equals]=value`. `and` / `or` வரிசைகளுடன் விதிகளை இணைக்கவும், எ.கா. `where[or][0][field][equals]=value`. ஒவ்வொரு புலமும் அதன் வகைக்குப் பொருந்தும் செயற்குறிகளை மட்டுமே பட்டியலிடுகிறது.',
    schemaSupportedTimezones: 'IANA வடிவத்தில் ஆதரிக்கப்படும் நேர மண்டலங்கள்.',
    schemaPerLocale: '`locale=all` எனும்போது திருப்பி அளிக்கப்படும், ஒவ்வொரு மொழியிடத்திற்குமான மதிப்புகள்.',

    collectionList: 'ஆவணங்களின் பக்கமிடப்பட்ட பட்டியல்',
    collectionDoc: 'ஒரு ஆவணம்',
    collectionCreated: 'உருவாக்கப்பட்ட ஆவணம்',
    collectionUpdated: 'புதுப்பிக்கப்பட்ட ஆவணம்',
    collectionDeleted: 'நீக்கப்பட்ட ஆவணம்',
    collectionBulkUpdate: 'மொத்தப் புதுப்பிப்பு முடிவு',
    collectionBulkDelete: 'மொத்த நீக்கம் முடிவு',
    collectionCount: 'ஆவண எண்ணிக்கை',
    collectionDuplicated: 'நகலெடுக்கப்பட்ட ஆவணம்',

    globalDoc: 'உலகளாவிய ஆவணம்',

    authLogin: 'உள்நுழைவு முடிவு',
    authLogout: 'வெளியேறும் முடிவு',
    authMe: 'தற்போது அங்கீகரிக்கப்பட்ட பயனர்',
    authRefreshToken: 'புதுப்பிக்கப்பட்ட டோக்கன்',
    authForgotPassword: 'கடவுச்சொல் மீட்டமைப்பு மின்னஞ்சல் அனுப்பப்பட்டது',
    authResetPassword: 'கடவுச்சொல் மீட்டமைப்பு முடிவு',
    authFirstRegister: 'அங்கீகார டோக்கனுடன் உருவாக்கப்பட்ட முதல் பயனர்',
    authInit: 'இந்த அங்கீகாரத் தொகுப்பில் இதுவரை ஏதேனும் பயனர்கள் உள்ளனரா என்பது',
    authAccess: 'இந்தத் தொகுப்பிற்கான தற்போதைய பயனரின் அணுகல் (அனுமதிகள்)',
    authUnlock: 'திறப்பு முடிவு',
    authVerify: 'சரிபார்ப்பு முடிவு',

    versionList: 'பதிப்புகளின் பக்கமிடப்பட்ட பட்டியல்',
    versionSingle: 'ஒரு பதிப்பு',
    versionRestored: 'மீட்டெடுக்கப்பட்ட ஆவணம்',
    versionWhere: 'பதிப்புப் புலங்கள் மீது வடிகட்டவும், எ.கா. `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'வரிசையில் உள்ள பணிகளை இயக்கவும் (மேலும், இயல்பாக, அட்டவணைகளைக் கையாளவும்)',
    jobsSchedulesSummary: 'அவற்றின் அட்டவணைப்படி உரிய பணிகளை வரிசையில் இடவும்',
    jobsRunResult: 'இயக்க முடிவு',
    jobsSchedulesResult: 'அட்டவணைப்படுத்தல் முடிவு',
    jobsRunAllQueues: 'அனைத்து வரிசைகளிலும் பணிகளை இயக்கவும்.',
    jobsLimit: 'இயக்க வேண்டிய அதிகபட்சப் பணிகள்.',
    jobsDisableScheduling: '`run` இயல்பாகச் செய்யும் அட்டவணைக் கையாளுதலைத் தவிர்க்கவும்.',
    jobsSilent: 'இயக்கப் பதிவை அடக்கவும்.',
    jobsSchedulesAllQueues: 'அனைத்து வரிசைகளிலும் அட்டவணைகளைக் கையாளவும்.',
    jobsQueue: 'செயல்பாட்டை ஒரே ஒரு வரிசைக்குக் கட்டுப்படுத்தவும். அறியப்பட்ட வரிசைகள்: {{queues}}.',

    uploadFile: 'பதிவேற்ற வேண்டிய பைனரி கோப்பு.',
    uploadBody:
      'ஒரு கோப்பைப் பதிவேற்ற `multipart/form-data` ஐ அனுப்பவும் (ஒரு பைனரி `file` பகுதி மற்றும் JSON-stringified புலங்களைக் கொண்ட `_payload` பகுதி), அல்லது கோப்பு இல்லாதபோது புலங்களை மட்டும் கொண்ட `application/json` ஐ அனுப்பவும்.',
    uploadPayloadField: 'JSON-stringified {{schema}} புலங்கள். எடுத்துக்காட்டு: `{"alt":"A caption"}`.',

    error400: 'சரிபார்ப்பு அல்லது வினவல் பிழை (ValidationError, QueryError)',
    error401: 'அங்கீகரிக்கப்படவில்லை (AuthenticationError)',
    error403: 'அணுகல் கட்டுப்பாட்டால் தடைசெய்யப்பட்டது (Forbidden, UnverifiedEmail)',
    error404: 'ஆவணம் கிடைக்கவில்லை (NotFound)',
    error500: 'உள் சேவையக பிழை (APIError)',

    securityBearer:
      'உள்நுழைவு எண்ட்பாயிண்ட் திருப்பி அளித்த `token` ஐ ஒட்டவும். `Authorization: Bearer <token>` ஆக அனுப்பப்படுகிறது. Payload `JWT <token>` திட்டத்தையும் `{{cookiePrefix}}-token` குக்கீயையும் ஏற்கிறது.',
    securityInteractive:
      'ஊடாடும் உள்நுழைவு: பயனர்பெயரை (அல்லது மின்னஞ்சல்) மற்றும் கடவுச்சொல்லை உள்ளிடவும்; Client ID/Secret ஐ வெறுமையாக விடவும்.',

    tagCollections: 'தொகுப்புகள்',
    tagCollectionsDesc: 'ஆவணத் தொகுப்பு எண்ட்பாயிண்ட்கள் (CRUD, count, duplicate).',
    tagGlobals: 'உலகளாவியவை',
    tagGlobalsDesc: 'உலகளாவிய ஆவண எண்ட்பாயிண்ட்கள்.',
    tagSystem: 'அமைப்பு',
    tagSystemDesc: 'Payload அமைப்பு எண்ட்பாயிண்ட்கள்.',
    tagAuth: 'அங்கீகாரம்',
    tagVersions: 'பதிப்புகள்',
    tagJobs: 'பணிகள்',

    localizationHeading: 'உள்ளூராக்கம்',
    localizationNote:
      'கிடைக்கும் மொழியிடங்கள்: {{locales}}. ஒன்றைத் தேர்வுசெய்ய ஒரு படிப்பு எண்ட்பாயிண்டிற்கு `?locale=<code>` ஐ அனுப்பவும். ஒரே நேரத்தில் ஒவ்வொரு மொழியிடத்தையும் பெற `?locale=all` ஐ அனுப்பவும் — அப்போது ஒவ்வொரு உள்ளூராக்கப்பட்ட புலமும் ஒற்றை மதிப்பிற்குப் பதிலாக மொழியிடக் குறியீட்டை விசையாகக் கொண்ட ஒரு பொருளாகத் (எ.கா. `{ "en": "Hello", "de": "Hallo" }`) திருப்பி அளிக்கப்படுகிறது. அந்த ஒவ்வொரு மொழியிடப் பொருள் வடிவத்தை வைத்திருக்க `locale=all` உடன் `?flattenLocales=false` ஐ அமைக்கவும். புல திட்டங்கள் ஒற்றை-மொழியிட வடிவத்தைக் காட்டுகின்றன.',
    docLanguagesNote:
      'இந்த ஆவணம் பின்வரும் மொழிகளில் கிடைக்கிறது: {{languages}}. மொழியை மாற்ற இந்த spec URL-இல் `?lang=<code>` என்பதைச் சேர்க்கவும்.',
  },
}
