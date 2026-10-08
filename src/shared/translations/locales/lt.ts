import type { PluginDefaultTranslationsObject } from '@/shared/translations/types.js'

export const lt: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Kiek susijusių dokumentų lygių užpildyti.',
    paramSort: 'Laukas, pagal kurį rūšiuoti; mažėjančiai tvarkai naudokite priešdėlį `-`, pvz. `-createdAt`.',
    paramSortShort: 'Laukas, pagal kurį rūšiuoti; mažėjančiai tvarkai naudokite priešdėlį `-`.',
    paramDraft: 'Grąžinti juodraščių versijas.',
    paramTrash: 'Įtraukti į šiukšliadėžę perkeltus dokumentus.',
    paramAutosave:
      'Išsaugoti kaip automatinį išsaugojimą: atnaujina paskutinę automatiškai išsaugotą versiją, užuot pridėjus naują.',
    paramPublishAllLocales: 'Paskelbti visas kalbas, ne tik užklausos kalbą.',
    paramUnpublishAllLocales: 'Atšaukti visų kalbų paskelbimą ir grąžinti dokumentą į juodraštį.',
    paramOverrideLock: 'Nepaisyti kito naudotojo užrakto. Numatytoji reikšmė false.',
    paramSelectedLocales: 'Į kopiją kopijuoti tik šias kalbas. Numatytoji reikšmė: visos kalbos.',
    paramFlattenLocales:
      'Su `locale=all` nustatykite false, kad lokalizuoti laukai liktų kaip atskirų lokalių objektai. Numatytoji reikšmė true.',
    paramLocale: 'Lokalė, kurią grąžinti, arba `all` visoms lokalėms. Žr. lokalizacijos skyrių API aprašyme.',
    paramFallbackLocale: 'Atsarginė lokalė trūkstamoms lokalizuotoms reikšmėms, arba `none` norint išjungti.',
    paramValidateLocale: 'Tikrintinos lokalės arba `all` visoms lokalėms. Kelioms lokalėms kartokite parametrą.',
    paramComputeHierarchyPaths:
      'Nustatykite true, kad būtų apskaičiuoti keliai `{{slugPath}}` ir `{{titlePath}}`. Pasirinkus bet kurį iš šių laukų jie taip pat apskaičiuojami.',

    schemaSelect: 'Pasirinkite grąžintinus laukus, pvz. `select[title]=true`. Praleiskite, kad būtų grąžinti visi.',
    schemaPopulate: 'Užpildykite susijusius dokumentus pagal kolekciją, pvz. `populate[posts][title]=true`.',
    schemaJoins: 'Atskiros sujungimo valdymo parinktys (limit/page/sort/where/count), pvz. `joins[posts][limit]=10`.',
    schemaWhere:
      'Payload `where` filtras. Įdėkite lauką, tada operatorių: `where[field][equals]=value`. Sąlygas derinkite naudodami `and` / `or` masyvus, pvz. `where[or][0][field][equals]=value`. Kiekvienas laukas nurodo tik jo tipui tinkamus operatorius.',
    schemaSupportedTimezones: 'Palaikomos laiko juostos IANA formatu.',
    schemaPerLocale: 'Atskirų lokalių reikšmės, grąžinamos kai naudojama `locale=all`.',
    schemaHierarchySlugPath:
      'Slug kelias, pvz., `parent/child`. Apskaičiuojamas skaitant su `computeHierarchyPaths=true` arba kai pasirinktas. Negalima naudoti `where`.',
    schemaHierarchyTitlePath:
      'Pavadinimų kelias, pvz., `Parent/Child`. Apskaičiuojamas skaitant su `computeHierarchyPaths=true` arba kai pasirinktas. Negalima naudoti `where`.',

    collectionList: 'Puslapiuojamas dokumentų sąrašas',
    collectionDoc: 'Vienas dokumentas',
    collectionCreated: 'Sukurtas dokumentas',
    collectionUpdated: 'Atnaujintas dokumentas',
    collectionDeleted: 'Ištrintas dokumentas',
    collectionBulkUpdate: 'Masinio atnaujinimo rezultatas',
    collectionBulkDelete: 'Masinio ištrynimo rezultatas',
    collectionCount: 'Dokumentų skaičius',
    collectionDuplicated: 'Dublikuotas dokumentas',
    validateResult:
      'Patikros rezultatas. Niekas neišsaugoma. Netinkamos laukų reikšmės grąžina `valid: false` su klaidomis, o ne klaidos būseną.',
    validateBody:
      'Tikrintini dokumento duomenys. Išsaugotame dokumente ar globaliame dokumente duomenys sujungiami su naujausiu juodraščiu, o jei juodraščio nėra – su išsaugotu dokumentu.',

    globalDoc: 'Globalus dokumentas',

    authLogin: 'Prisijungimo rezultatas',
    authLogout: 'Atsijungimo rezultatas',
    authMe: 'Šiuo metu autentifikuotas naudotojas',
    authRefreshToken: 'Atnaujintas tokenas',
    authForgotPassword: 'Slaptažodžio atstatymo el. laiškas išsiųstas',
    authResetPassword: 'Slaptažodžio atstatymo rezultatas',
    authFirstRegister: 'Pirmasis naudotojas, sukurtas su autentifikacijos tokenu',
    authInit: 'Ar ši autentifikacijos kolekcija jau turi naudotojų',
    authAccess: 'Dabartinio naudotojo teisės visoms kolekcijoms ir globaliems objektams',
    docAccess: 'Dabartinio naudotojo teisės šiam dokumentui',
    docAccessBody:
      'Dokumento duomenys, pagal kuriuos tikrinama prieiga. Be jų Payload naudoja išsaugotą dokumentą, jei toks yra.',
    authUnlock: 'Atrakinimo rezultatas',
    authVerify: 'Patvirtinimo rezultatas',
    apiKeyReveal: 'Iššifruotas API raktas',

    versionList: 'Puslapiuojamas versijų sąrašas',
    versionSingle: 'Viena versija',
    versionRestored: 'Atkurtas dokumentas',
    versionWhere: 'Filtruoti pagal versijos laukus, pvz. `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'Vykdyti eilėje esančias užduotis (ir, pagal numatytuosius nustatymus, tvarkyti tvarkaraščius)',
    jobsSchedulesSummary: 'Įtraukti į eilę užduotis, kurių laikas atėjo pagal jų tvarkaraštį',
    jobsRunResult: 'Vykdymo rezultatas',
    jobsSchedulesResult: 'Tvarkaraščio sudarymo rezultatas',
    jobsRunAllQueues: 'Vykdyti užduotis visose eilėse.',
    jobsLimit: 'Maksimalus vykdytinų užduočių skaičius.',
    jobsDisableScheduling: 'Praleisti tvarkaraščių tvarkymą, kurį `run` atlieka pagal numatytuosius nustatymus.',
    jobsSilent: 'Nuslopinti vykdymo žurnalo įrašus.',
    jobsSchedulesAllQueues: 'Tvarkyti tvarkaraščius visose eilėse.',
    jobsQueue: 'Apriboti operaciją iki vienos eilės. Žinomos eilės: {{queues}}.',

    uploadFile: 'Įkeltinas dvejetainis failas.',
    uploadBody:
      'Siųskite `multipart/form-data`, kad įkeltumėte failą (dvejetainė `file` dalis ir `_payload` dalis su JSON eilute pavaizduotais laukais), arba `application/json` tik su laukais, kai failo nėra.',
    uploadPayloadField: 'JSON eilute pavaizduoti {{schema}} laukai. Pavyzdys: `{"alt":"A caption"}`.',
    fileServe: 'Failas',
    filePartial: 'Failo dalis `Range` užklausai',
    uploadInstructionsSummary: 'Gauti failo įkėlimo instrukcijas prieš išsaugant dokumentą',
    uploadInstructionsResult:
      'Kur siųsti failo baitus ir kokią `file` reikšmę siųsti su kūrimo arba atnaujinimo užklausa',
    uploadStagePutSummary: 'Siųsti failo baitus laikinam įkėlimui',
    uploadStageDeleteSummary: 'Ištrinti laikiną įkėlimą',
    uploadStageResult: 'Atlikta, be turinio',

    error400: 'Patvirtinimo arba užklausos klaida (ValidationError, QueryError)',
    error401: 'Neautentifikuota (AuthenticationError)',
    error403: 'Uždrausta prieigos kontrolės (Forbidden, UnverifiedEmail)',
    error404: 'Dokumentas nerastas (NotFound)',
    error500: 'Vidinė serverio klaida (APIError)',

    securityBearer:
      'Įklijuokite `token`, kurį grąžino prisijungimo galutinis taškas. Siunčiamas kaip `Authorization: Bearer <token>`. Payload taip pat priima `JWT <token>` schemą ir `{{cookiePrefix}}-token` slapuką.',
    securityInteractive:
      'Interaktyvus prisijungimas: įveskite naudotojo vardą (arba el. paštą) ir slaptažodį; Client ID/Secret palikite tuščius.',

    tagCollections: 'Kolekcijos',
    tagCollectionsDesc: 'Dokumentų kolekcijų galutiniai taškai (CRUD, skaičiavimas, dublikavimas).',
    tagGlobals: 'Globalūs objektai',
    tagGlobalsDesc: 'Globalių dokumentų galutiniai taškai.',
    tagSystem: 'Sistema',
    tagSystemDesc: 'Payload sistemos galutiniai taškai.',
    tagAuth: 'Autentifikacija',
    tagVersions: 'Versijos',
    tagJobs: 'Užduotys',
    tagUploads: 'Įkėlimai',
    tagAccess: 'Prieiga',

    localizationHeading: 'Lokalizacija',
    localizationNote:
      'Galimos lokalės: {{locales}}. Perduokite `?locale=<code>` skaitymo galutiniam taškui, kad pasirinktumėte vieną. Perduokite `?locale=all`, kad iš karto gautumėte visas lokales — kiekvienas lokalizuotas laukas tada grąžinamas kaip objektas, kurio raktai yra lokalių kodai (pvz. `{ "en": "Hello", "de": "Hallo" }`), o ne kaip viena reikšmė. Nustatykite `?flattenLocales=false` kartu su `locale=all`, kad išliktų ši atskirų lokalių objekto forma. Laukų schemos rodo vienos lokalės formą.',
    docLanguagesNote:
      'Ši dokumentacija pateikiama kalbomis: {{languages}}. Norėdami pakeisti kalbą, prie šio specifikacijos URL pridėkite `?lang=<code>`.',
  },
}
