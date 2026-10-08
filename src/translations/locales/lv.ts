import type { PluginDefaultTranslationsObject } from '../types.js'

export const lv: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Cik saistīto dokumentu līmeņus aizpildīt.',
    paramSort: 'Lauks, pēc kura kārtot; pievienojiet priedēkli `-` dilstošai secībai, piemēram, `-createdAt`.',
    paramSortShort: 'Lauks, pēc kura kārtot; pievienojiet priedēkli `-` dilstošai secībai.',
    paramDraft: 'Atgriezt melnrakstu versijas.',
    paramTrash: 'Iekļaut atkritnē pārvietotos dokumentus.',
    paramAutosave:
      'Saglabāt kā automātisko saglabāšanu: atjaunina pēdējo automātiski saglabāto versiju, nevis pievieno jaunu.',
    paramPublishAllLocales: 'Publicēt visas valodas, ne tikai pieprasījuma valodu.',
    paramUnpublishAllLocales: 'Atcelt visu valodu publicēšanu un atgriezt dokumentu melnrakstā.',
    paramOverrideLock: 'Ignorēt cita lietotāja bloķējumu. Noklusējums false.',
    paramSelectedLocales: 'Kopēt dublikātā tikai šīs valodas. Noklusējums: visas valodas.',
    paramFlattenLocales:
      'Ja izmantots `locale=all`, iestatiet false, lai lokalizētos laukus saglabātu kā atsevišķu lokāļu objektus. Noklusējums ir true.',
    paramLocale: 'Atgriežamā lokāle vai `all`, lai iegūtu visas lokāles. Skatiet sadaļu Lokalizācija API aprakstā.',
    paramFallbackLocale:
      'Lokāle, uz kuru atkāpties trūkstošu lokalizētu vērtību gadījumā, vai `none`, lai to atspējotu.',

    schemaSelect: 'Izvēlieties atgriežamos laukus, piemēram, `select[title]=true`. Izlaidiet, lai atgrieztu visus.',
    schemaPopulate: 'Aizpildiet saistītos dokumentus pa kolekcijām, piemēram, `populate[posts][title]=true`.',
    schemaJoins: 'Atsevišķu apvienojumu vadīkla (limit/page/sort/where/count), piemēram, `joins[posts][limit]=10`.',
    schemaWhere:
      'Payload `where` filtrs. Ietveriet lauku un pēc tam operatoru: `where[field][equals]=value`. Apvienojiet nosacījumus ar `and` / `or` masīviem, piemēram, `where[or][0][field][equals]=value`. Katrs lauks norāda tikai tā tipam derīgos operatorus.',
    schemaSupportedTimezones: 'Atbalstītās laika joslas IANA formātā.',
    schemaPerLocale: 'Atsevišķu lokāļu vērtības, kas tiek atgrieztas, kad izmantots `locale=all`.',

    collectionList: 'Lapotais dokumentu saraksts',
    collectionDoc: 'Atsevišķs dokuments',
    collectionCreated: 'Izveidots dokuments',
    collectionUpdated: 'Atjaunināts dokuments',
    collectionDeleted: 'Dzēsts dokuments',
    collectionBulkUpdate: 'Masveida atjaunināšanas rezultāts',
    collectionBulkDelete: 'Masveida dzēšanas rezultāts',
    collectionCount: 'Dokumentu skaits',
    collectionDuplicated: 'Dublētais dokuments',

    globalDoc: 'Globālais dokuments',

    authLogin: 'Pieteikšanās rezultāts',
    authLogout: 'Atteikšanās rezultāts',
    authMe: 'Pašlaik autentificētais lietotājs',
    authRefreshToken: 'Atjaunotais talons',
    authForgotPassword: 'Paroles atiestatīšanas e-pasts nosūtīts',
    authResetPassword: 'Paroles atiestatīšanas rezultāts',
    authFirstRegister: 'Pirmais lietotājs, izveidots ar autentifikācijas talonu',
    authInit: 'Vai šajā autentifikācijas kolekcijā jau ir kādi lietotāji',
    authAccess: 'Pašreizējā lietotāja piekļuve (atļaujas) šai kolekcijai',
    authUnlock: 'Atbloķēšanas rezultāts',
    authVerify: 'Verifikācijas rezultāts',

    versionList: 'Lapotais versiju saraksts',
    versionSingle: 'Atsevišķa versija',
    versionRestored: 'Atjaunotais dokuments',
    versionWhere: 'Filtrs pār versiju laukiem, piemēram, `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'Izpildīt rindā ievietotos darbus (un pēc noklusējuma apstrādāt grafikus)',
    jobsSchedulesSummary: 'Ievietot rindā darbus, kuru izpildes laiks pienācis saskaņā ar to grafiku',
    jobsRunResult: 'Izpildes rezultāts',
    jobsSchedulesResult: 'Grafiku plānošanas rezultāts',
    jobsRunAllQueues: 'Izpildīt darbus visās rindās.',
    jobsLimit: 'Maksimālais izpildāmo darbu skaits.',
    jobsDisableScheduling: 'Izlaist grafiku apstrādi, ko `run` veic pēc noklusējuma.',
    jobsSilent: 'Apslāpēt izpildes žurnālēšanu.',
    jobsSchedulesAllQueues: 'Apstrādāt grafikus visās rindās.',
    jobsQueue: 'Ierobežot darbību līdz vienai rindai. Zināmās rindas: {{queues}}.',

    uploadFile: 'Augšupielādējamais binārais fails.',
    uploadBody:
      'Sūtiet `multipart/form-data`, lai augšupielādētu failu (binārā `file` daļa un `_payload` daļa ar JSON virknē pārveidotajiem laukiem), vai `application/json` tikai ar laukiem, ja faila nav.',
    uploadPayloadField: 'JSON virknē pārveidotie {{schema}} lauki. Piemērs: `{"alt":"A caption"}`.',

    error400: 'Validācijas vai vaicājuma kļūda (ValidationError, QueryError)',
    error401: 'Nav autentificēts (AuthenticationError)',
    error403: 'Aizliegts piekļuves kontroles dēļ (Forbidden, UnverifiedEmail)',
    error404: 'Dokuments nav atrasts (NotFound)',
    error500: 'Iekšēja servera kļūda (APIError)',

    securityBearer:
      'Ielīmējiet `token`, ko atgriezis pieteikšanās galapunkts. Tiek sūtīts kā `Authorization: Bearer <token>`. Payload pieņem arī `JWT <token>` shēmu un `{{cookiePrefix}}-token` sīkdatni.',
    securityInteractive:
      'Interaktīva pieteikšanās: ievadiet lietotājvārdu (vai e-pastu) un paroli; atstājiet Client ID/Secret tukšu.',

    tagCollections: 'Kolekcijas',
    tagCollectionsDesc: 'Dokumentu kolekciju galapunkti (CRUD, skaits, dublēšana).',
    tagGlobals: 'Globālie objekti',
    tagGlobalsDesc: 'Globālo dokumentu galapunkti.',
    tagSystem: 'Sistēma',
    tagSystemDesc: 'Payload sistēmas galapunkti.',
    tagAuth: 'Autentifikācija',
    tagVersions: 'Versijas',
    tagJobs: 'Darbi',

    localizationHeading: 'Lokalizācija',
    localizationNote:
      'Pieejamās lokāles: {{locales}}. Nododiet `?locale=<code>` lasīšanas galapunktam, lai izvēlētos vienu. Nododiet `?locale=all`, lai uzreiz saņemtu visas lokāles — tad katrs lokalizētais lauks tiek atgriezts kā objekts ar lokāles kodu kā atslēgu (piemēram, `{ "en": "Hello", "de": "Hallo" }`) atsevišķas vērtības vietā. Iestatiet `?flattenLocales=false` kopā ar `locale=all`, lai saglabātu šo atsevišķu lokāļu objektu formu. Lauku shēmas parāda vienas lokāles formu.',
    docLanguagesNote:
      'Šī dokumentācija ir pieejama šādās valodās: {{languages}}. Lai pārslēgtu valodu, šim specifikācijas URL pievienojiet `?lang=<code>`.',
  },
}
