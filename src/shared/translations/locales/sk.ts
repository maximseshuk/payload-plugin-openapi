import type { PluginDefaultTranslationsObject } from '@/shared/translations/types.js'

export const sk: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Koľko úrovní súvisiacich dokumentov sa má naplniť.',
    paramSort: 'Pole, podľa ktorého sa má zoradiť; pre zostupné poradie použite predponu `-`, napr. `-createdAt`.',
    paramSortShort: 'Pole, podľa ktorého sa má zoradiť; pre zostupné poradie použite predponu `-`.',
    paramDraft: 'Vrátiť koncepty verzií.',
    paramTrash: 'Zahrnúť dokumenty v koši.',
    paramAutosave:
      'Uložiť ako automatické uloženie: aktualizuje poslednú automaticky uloženú verziu namiesto pridania novej.',
    paramPublishAllLocales: 'Publikovať všetky jazyky, nielen jazyk požiadavky.',
    paramUnpublishAllLocales: 'Zrušiť publikovanie všetkých jazykov a vrátiť dokument do konceptu.',
    paramOverrideLock: 'Ignorovať zámok iného používateľa. Predvolene false.',
    paramSelectedLocales: 'Skopírovať do duplikátu len tieto jazyky. Predvolene: všetky jazyky.',
    paramFlattenLocales:
      'Pri `locale=all` nastavte na false, aby sa lokalizované polia zachovali ako objekty podľa jednotlivých lokalít. Predvolene true.',
    paramLocale:
      'Lokalita, ktorá sa má vrátiť, alebo `all` pre všetky lokality. Pozri sekciu Lokalizácia v popise API.',
    paramFallbackLocale:
      'Lokalita, na ktorú sa použije záloha pri chýbajúcich lokalizovaných hodnotách, alebo `none` pre vypnutie.',
    paramValidateLocale: 'Lokality na overenie, alebo `all` pre všetky lokality. Pre viac lokalít parameter zopakujte.',
    paramComputeHierarchyPaths:
      'Nastavte true na výpočet ciest `{{slugPath}}` a `{{titlePath}}`. Výber ktoréhokoľvek z týchto polí ich vypočíta tiež.',

    schemaSelect: 'Vyberte polia, ktoré sa majú vrátiť, napr. `select[title]=true`. Vynechajte pre vrátenie všetkých.',
    schemaPopulate: 'Naplniť súvisiace dokumenty podľa kolekcie, napr. `populate[posts][title]=true`.',
    schemaJoins:
      'Ovládacie prvky pre jednotlivé spojenia (limit/page/sort/where/count), napr. `joins[posts][limit]=10`.',
    schemaWhere:
      'Filter `where` v Payloade. Vnorte pole a potom operátor: `where[field][equals]=value`. Klauzuly kombinujte pomocou polí `and` / `or`, napr. `where[or][0][field][equals]=value`. Každé pole uvádza iba operátory platné pre jeho typ.',
    schemaSupportedTimezones: 'Podporované časové pásma vo formáte IANA.',
    schemaPerLocale: 'Hodnoty podľa jednotlivých lokalít, vrátené pri `locale=all`.',
    schemaHierarchySlugPath:
      'Cesta zo slugov, napr. `parent/child`. Počíta sa pri čítaní s `computeHierarchyPaths=true` alebo pri výbere. Nedá sa použiť vo `where`.',
    schemaHierarchyTitlePath:
      'Cesta z názvov, napr. `Parent/Child`. Počíta sa pri čítaní s `computeHierarchyPaths=true` alebo pri výbere. Nedá sa použiť vo `where`.',

    collectionList: 'Stránkovaný zoznam dokumentov',
    collectionDoc: 'Jeden dokument',
    collectionCreated: 'Vytvorený dokument',
    collectionUpdated: 'Aktualizovaný dokument',
    collectionDeleted: 'Odstránený dokument',
    collectionBulkUpdate: 'Výsledok hromadnej aktualizácie',
    collectionBulkDelete: 'Výsledok hromadného odstránenia',
    collectionCount: 'Počet dokumentov',
    collectionDuplicated: 'Duplikovaný dokument',
    validateResult:
      'Výsledok overenia. Nič sa neukladá. Neplatné hodnoty polí vrátia `valid: false` s chybami, nie chybový stav.',
    validateBody:
      'Údaje dokumentu na overenie. Pri uloženom dokumente alebo globálnom dokumente sa údaje zlúčia s najnovším konceptom, prípadne s uloženým dokumentom, ak koncept neexistuje.',

    globalDoc: 'Globálny dokument',

    authLogin: 'Výsledok prihlásenia',
    authLogout: 'Výsledok odhlásenia',
    authMe: 'Aktuálne prihlásený používateľ',
    authRefreshToken: 'Obnovený token',
    authForgotPassword: 'E-mail na obnovenie hesla odoslaný',
    authResetPassword: 'Výsledok obnovenia hesla',
    authFirstRegister: 'Prvý používateľ vytvorený s autentifikačným tokenom',
    authInit: 'Či táto autentifikačná kolekcia už má nejakých používateľov',
    authAccess: 'Oprávnenia aktuálneho používateľa pre všetky kolekcie a globály',
    docAccess: 'Oprávnenia aktuálneho používateľa pre tento dokument',
    docAccessBody:
      'Údaje dokumentu, voči ktorým sa overuje prístup. Bez nich Payload použije uložený dokument, ak existuje.',
    authUnlock: 'Výsledok odomknutia',
    authVerify: 'Výsledok overenia',
    apiKeyReveal: 'Dešifrovaný API kľúč',

    versionList: 'Stránkovaný zoznam verzií',
    versionSingle: 'Jedna verzia',
    versionRestored: 'Obnovený dokument',
    versionWhere: 'Filter cez polia verzie, napr. `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'Spustiť úlohy z fronty (a predvolene spracovať plány)',
    jobsSchedulesSummary: 'Zaradiť do fronty úlohy, ktoré sú splatné podľa svojho plánu',
    jobsRunResult: 'Výsledok spustenia',
    jobsSchedulesResult: 'Výsledok plánovania',
    jobsRunAllQueues: 'Spustiť úlohy vo všetkých frontoch.',
    jobsLimit: 'Maximálny počet úloh na spustenie.',
    jobsDisableScheduling: 'Preskočiť spracovanie plánov, ktoré `run` predvolene vykonáva.',
    jobsSilent: 'Potlačiť protokolovanie spustenia.',
    jobsSchedulesAllQueues: 'Spracovať plány vo všetkých frontoch.',
    jobsQueue: 'Obmedziť operáciu na jeden front. Známe fronty: {{queues}}.',

    uploadFile: 'Binárny súbor na nahranie.',
    uploadBody:
      'Pre nahranie súboru odošlite `multipart/form-data` (binárnu časť `file` plus časť `_payload` s poliami serializovanými do JSON), alebo `application/json` len s poliami, ak súbor nie je.',
    uploadPayloadField: 'Polia {{schema}} serializované do JSON. Príklad: `{\\"alt\\":\\"A caption\\"}`.',
    fileServe: 'Súbor',
    filePartial: 'Časť súboru pre požiadavku `Range`',
    uploadInstructionsSummary: 'Získať pokyny na nahranie súboru pred uložením dokumentu',
    uploadInstructionsResult:
      'Kam poslať bajty súboru a hodnota `file`, ktorá sa pošle s požiadavkou na vytvorenie alebo úpravu',
    uploadStagePutSummary: 'Odoslať bajty súboru pre dočasné nahranie',
    uploadStageDeleteSummary: 'Odstrániť dočasné nahranie',
    uploadStageResult: 'Hotovo, bez obsahu',

    error400: 'Chyba validácie alebo dotazu (ValidationError, QueryError)',
    error401: 'Neprihlásený (AuthenticationError)',
    error403: 'Zakázané riadením prístupu (Forbidden, UnverifiedEmail)',
    error404: 'Dokument sa nenašiel (NotFound)',
    error500: 'Interná chyba servera (APIError)',

    securityBearer:
      'Vložte `token` vrátený prihlasovacím koncovým bodom. Odosiela sa ako `Authorization: Bearer <token>`. Payload tiež akceptuje schému `JWT <token>` a cookie `{{cookiePrefix}}-token`.',
    securityInteractive:
      'Interaktívne prihlásenie: zadajte používateľské meno (alebo e-mail) a heslo; Client ID/Secret nechajte prázdne.',

    tagCollections: 'Kolekcie',
    tagCollectionsDesc: 'Koncové body kolekcií dokumentov (CRUD, počet, duplikovanie).',
    tagGlobals: 'Globály',
    tagGlobalsDesc: 'Koncové body globálnych dokumentov.',
    tagSystem: 'Systém',
    tagSystemDesc: 'Systémové koncové body Payloadu.',
    tagAuth: 'Autentifikácia',
    tagVersions: 'Verzie',
    tagJobs: 'Úlohy',
    tagUploads: 'Nahrávanie',
    tagAccess: 'Prístup',

    localizationHeading: 'Lokalizácia',
    localizationNote:
      'Dostupné lokality: {{locales}}. Pre výber jednej odovzdajte `?locale=<code>` čítaciemu koncovému bodu. Pre prijatie všetkých lokalít naraz odovzdajte `?locale=all` — každé lokalizované pole sa potom vráti ako objekt s kľúčmi podľa kódu lokality (napr. `{ \\"en\\": \\"Hello\\", \\"de\\": \\"Hallo\\" }`) namiesto jedinej hodnoty. Nastavte `?flattenLocales=false` spolu s `locale=all`, aby sa zachoval tento tvar objektu podľa jednotlivých lokalít. Schémy polí zobrazujú tvar pre jednu lokalitu.',
    docLanguagesNote:
      'Táto dokumentácia je dostupná v jazykoch: {{languages}}. Ak chcete jazyk zmeniť, pripojte `?lang=<code>` k tejto URL adrese špecifikácie.',
  },
}
