import type { PluginDefaultTranslationsObject } from '../types.js'

export const is: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Hversu mörg stig tengdra skjala á að birta.',
    paramSort: 'Reitur til að raða eftir; settu `-` fyrir framan fyrir lækkandi röð, t.d. `-createdAt`.',
    paramSortShort: 'Reitur til að raða eftir; settu `-` fyrir framan fyrir lækkandi röð.',
    paramDraft: 'Skila drögum.',
    paramTrash: 'Hafa skjöl í ruslafötu með.',
    paramFlattenLocales:
      'Með `locale=all`, settu false til að halda staðfærðum reitum sem hlutum eftir tungumáli. Sjálfgefið true.',
    paramLocale: 'Tungumál til að skila, eða `all` fyrir öll tungumál. Sjá Staðfærsla-kaflann í API-lýsingunni.',
    paramFallbackLocale:
      'Tungumál til að nota til vara fyrir staðfærð gildi sem vantar, eða `none` til að slökkva á því.',

    schemaSelect: 'Veldu reiti til að skila, t.d. `select[title]=true`. Slepptu til að skila öllum.',
    schemaPopulate: 'Birta tengd skjöl eftir safni, t.d. `populate[posts][title]=true`.',
    schemaJoins: 'Stýringar fyrir hverja tengingu (limit/page/sort/where/count), t.d. `joins[posts][limit]=10`.',
    schemaWhere:
      'Payload `where`-sía. Hreiðraðu reit og svo virkja: `where[field][equals]=value`. Sameinaðu skilyrði með `and` / `or` fylkjunum, t.d. `where[or][0][field][equals]=value`. Hver reitur tilgreinir aðeins þá virkja sem gilda fyrir gerð hans.',
    schemaSupportedTimezones: 'Studd tímabelti á IANA-sniði.',
    schemaPerLocale: 'Gildi eftir tungumáli, skilað þegar `locale=all`.',

    collectionList: 'Síðuskiptur listi yfir skjöl',
    collectionDoc: 'Eitt skjal',
    collectionCreated: 'Stofnað skjal',
    collectionUpdated: 'Uppfært skjal',
    collectionDeleted: 'Eytt skjal',
    collectionBulkUpdate: 'Niðurstaða magnuppfærslu',
    collectionBulkDelete: 'Niðurstaða magneyðingar',
    collectionCount: 'Fjöldi skjala',
    collectionDuplicated: 'Afritaða skjalið',

    globalDoc: 'Algilda skjalið',

    authLogin: 'Niðurstaða innskráningar',
    authLogout: 'Niðurstaða útskráningar',
    authMe: 'Notandinn sem er innskráður núna',
    authRefreshToken: 'Endurnýjaður tóki',
    authForgotPassword: 'Tölvupóstur til að endurstilla lykilorð sendur',
    authResetPassword: 'Niðurstaða endurstillingar lykilorðs',
    authFirstRegister: 'Fyrsti notandinn, stofnaður með auðkennistóka',
    authInit: 'Hvort þetta auðkenningarsafn hafi þegar einhverja notendur',
    authAccess: 'Aðgangur (heimildir) núverandi notanda fyrir þetta safn',
    authUnlock: 'Niðurstaða aflæsingar',
    authVerify: 'Niðurstaða staðfestingar',

    versionList: 'Síðuskiptur listi yfir útgáfur',
    versionSingle: 'Ein útgáfa',
    versionRestored: 'Endurheimta skjalið',
    versionWhere: 'Sía yfir útgáfureiti, t.d. `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'Keyra verk í biðröð (og, sjálfgefið, meðhöndla áætlanir)',
    jobsSchedulesSummary: 'Setja í biðröð verk sem eru á gjalddaga samkvæmt áætlun sinni',
    jobsRunResult: 'Niðurstaða keyrslu',
    jobsSchedulesResult: 'Niðurstaða áætlunar',
    jobsRunAllQueues: 'Keyra verk í öllum biðröðum.',
    jobsLimit: 'Hámarksfjöldi verka til að keyra.',
    jobsDisableScheduling: 'Sleppa meðhöndlun áætlana sem `run` framkvæmir sjálfgefið.',
    jobsSilent: 'Bæla niður keyrsluskráningu.',
    jobsSchedulesAllQueues: 'Meðhöndla áætlanir í öllum biðröðum.',
    jobsQueue: 'Takmarka aðgerðina við eina biðröð. Þekktar biðraðir: {{queues}}.',

    uploadFile: 'Tvíundarskráin sem á að hlaða upp.',
    uploadBody:
      'Sendu `multipart/form-data` til að hlaða upp skrá (tvíundarhluta `file` ásamt `_payload`-hluta með reitunum sem JSON-strengur), eða `application/json` með aðeins reitunum þegar engin skrá er til staðar.',
    uploadPayloadField: '{{schema}}-reitir sem JSON-strengur. Dæmi: `{"alt":"A caption"}`.',

    error400: 'Staðfestingar- eða fyrirspurnarvilla (ValidationError, QueryError)',
    error401: 'Ekki auðkenndur (AuthenticationError)',
    error403: 'Bannað af aðgangsstýringu (Forbidden, UnverifiedEmail)',
    error404: 'Skjal fannst ekki (NotFound)',
    error500: 'Innri þjónsvilla (APIError)',

    securityBearer:
      'Límdu `token` sem innskráningarendapunkturinn skilar. Sent sem `Authorization: Bearer <token>`. Payload tekur einnig við `JWT <token>`-fyrirkomulaginu og `{{cookiePrefix}}-token`-vafraköku.',
    securityInteractive:
      'Gagnvirk innskráning: sláðu inn notandanafn (eða netfang) og lykilorð; skildu Client ID/Secret eftir auð.',

    tagCollections: 'Söfn',
    tagCollectionsDesc: 'Endapunktar skjalasafna (CRUD, fjöldi, afritun).',
    tagGlobals: 'Algild gögn',
    tagGlobalsDesc: 'Endapunktar algildra skjala.',
    tagSystem: 'Kerfi',
    tagSystemDesc: 'Payload kerfisendapunktar.',
    tagAuth: 'Auðkenning',
    tagVersions: 'Útgáfur',
    tagJobs: 'Verk',

    localizationHeading: 'Staðfærsla',
    localizationNote:
      'Tiltæk tungumál: {{locales}}. Sendu `?locale=<code>` á lesendapunkt til að velja eitt. Sendu `?locale=all` til að fá öll tungumál í einu — hver staðfærður reitur er þá skilað sem hlutur lyklaður eftir tungumálakóða (t.d. `{ "en": "Hello", "de": "Hallo" }`) í stað eins gildis. Settu `?flattenLocales=false` með `locale=all` til að halda þessu hlutaformi eftir tungumáli. Reitaskemar sýna eins-tungumáls formið.',
    docLanguagesNote:
      'Þessi skjölun er fáanleg á: {{languages}}. Bættu `?lang=<code>` aftan við þessa lýsingar-vefslóð til að skipta um tungumál.',
  },
}
