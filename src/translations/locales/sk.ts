import type { PluginDefaultTranslationsObject } from '../types.js'

export const sk: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Koľko úrovní súvisiacich dokumentov sa má naplniť.',
    paramSort: 'Pole, podľa ktorého sa má zoradiť; pre zostupné poradie použite predponu `-`, napr. `-createdAt`.',
    paramSortShort: 'Pole, podľa ktorého sa má zoradiť; pre zostupné poradie použite predponu `-`.',
    paramDraft: 'Vrátiť koncepty verzií.',
    paramTrash: 'Zahrnúť dokumenty v koši.',
    paramFlattenLocales:
      'Pri `locale=all` nastavte na false, aby sa lokalizované polia zachovali ako objekty podľa jednotlivých lokalít. Predvolene true.',
    paramLocale:
      'Lokalita, ktorá sa má vrátiť, alebo `all` pre všetky lokality. Pozri sekciu Lokalizácia v popise API.',
    paramFallbackLocale:
      'Lokalita, na ktorú sa použije záloha pri chýbajúcich lokalizovaných hodnotách, alebo `none` pre vypnutie.',

    schemaSelect: 'Vyberte polia, ktoré sa majú vrátiť, napr. `select[title]=true`. Vynechajte pre vrátenie všetkých.',
    schemaPopulate: 'Naplniť súvisiace dokumenty podľa kolekcie, napr. `populate[posts][title]=true`.',
    schemaJoins:
      'Ovládacie prvky pre jednotlivé spojenia (limit/page/sort/where/count), napr. `joins[posts][limit]=10`.',
    schemaWhere:
      'Filter `where` v Payloade. Vnorte pole a potom operátor: `where[field][equals]=value`. Klauzuly kombinujte pomocou polí `and` / `or`, napr. `where[or][0][field][equals]=value`. Každé pole uvádza iba operátory platné pre jeho typ.',
    schemaSupportedTimezones: 'Podporované časové pásma vo formáte IANA.',
    schemaPerLocale: 'Hodnoty podľa jednotlivých lokalít, vrátené pri `locale=all`.',

    collectionList: 'Stránkovaný zoznam dokumentov',
    collectionDoc: 'Jeden dokument',
    collectionCreated: 'Vytvorený dokument',
    collectionUpdated: 'Aktualizovaný dokument',
    collectionDeleted: 'Odstránený dokument',
    collectionBulkUpdate: 'Výsledok hromadnej aktualizácie',
    collectionBulkDelete: 'Výsledok hromadného odstránenia',
    collectionCount: 'Počet dokumentov',
    collectionDuplicated: 'Duplikovaný dokument',

    globalDoc: 'Globálny dokument',

    authLogin: 'Výsledok prihlásenia',
    authLogout: 'Výsledok odhlásenia',
    authMe: 'Aktuálne prihlásený používateľ',
    authRefreshToken: 'Obnovený token',
    authForgotPassword: 'E-mail na obnovenie hesla odoslaný',
    authResetPassword: 'Výsledok obnovenia hesla',
    authFirstRegister: 'Prvý používateľ vytvorený s autentifikačným tokenom',
    authInit: 'Či táto autentifikačná kolekcia už má nejakých používateľov',
    authAccess: 'Prístup (oprávnenia) aktuálneho používateľa pre túto kolekciu',
    authUnlock: 'Výsledok odomknutia',
    authVerify: 'Výsledok overenia',

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

    localizationHeading: 'Lokalizácia',
    localizationNote:
      'Dostupné lokality: {{locales}}. Pre výber jednej odovzdajte `?locale=<code>` čítaciemu koncovému bodu. Pre prijatie všetkých lokalít naraz odovzdajte `?locale=all` — každé lokalizované pole sa potom vráti ako objekt s kľúčmi podľa kódu lokality (napr. `{ \\"en\\": \\"Hello\\", \\"de\\": \\"Hallo\\" }`) namiesto jedinej hodnoty. Nastavte `?flattenLocales=false` spolu s `locale=all`, aby sa zachoval tento tvar objektu podľa jednotlivých lokalít. Schémy polí zobrazujú tvar pre jednu lokalitu.',
    docLanguagesNote:
      'Táto dokumentácia je dostupná v jazykoch: {{languages}}. Ak chcete jazyk zmeniť, pripojte `?lang=<code>` k tejto URL adrese špecifikácie.',
  },
}
