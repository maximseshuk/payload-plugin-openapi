import type { PluginDefaultTranslationsObject } from '@/shared/translations/types.js'

export const cs: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Kolik úrovní souvisejících dokumentů se má naplnit.',
    paramSort: 'Pole pro řazení; pro sestupné řazení použijte předponu `-`, např. `-createdAt`.',
    paramSortShort: 'Pole pro řazení; pro sestupné řazení použijte předponu `-`.',
    paramDraft: 'Vrátit koncepty (draft verze).',
    paramTrash: 'Zahrnout dokumenty v koši.',
    paramAutosave:
      'Uložit jako automatické uložení: aktualizuje poslední automaticky uloženou verzi místo přidání nové.',
    paramPublishAllLocales: 'Publikovat všechny jazyky, nejen jazyk požadavku.',
    paramUnpublishAllLocales: 'Zrušit publikování všech jazyků a vrátit dokument do konceptu.',
    paramOverrideLock: 'Ignorovat zámek jiného uživatele. Výchozí false.',
    paramSelectedLocales: 'Zkopírovat do duplikátu jen tyto jazyky. Výchozí: všechny jazyky.',
    paramFlattenLocales:
      'S `locale=all` nastavte false, aby lokalizovaná pole zůstala jako objekty po jednotlivých jazycích. Výchozí hodnota je true.',
    paramLocale: 'Jazyk, který se má vrátit, nebo `all` pro všechny jazyky. Viz sekce Lokalizace v popisu API.',
    paramFallbackLocale: 'Jazyk, na který se přejde u chybějících lokalizovaných hodnot, nebo `none` pro vypnutí.',
    paramValidateLocale: 'Jazyky k ověření, nebo `all` pro všechny jazyky. Pro více jazyků parametr zopakujte.',
    paramComputeHierarchyPaths:
      'Nastavte true pro výpočet cest `{{slugPath}}` a `{{titlePath}}`. Výběr kteréhokoli z těchto polí je vypočítá také.',

    schemaSelect: 'Vyberte pole, která se mají vrátit, např. `select[title]=true`. Vynechte pro vrácení všech.',
    schemaPopulate: 'Naplňte související dokumenty podle kolekce, např. `populate[posts][title]=true`.',
    schemaJoins: 'Ovládání jednotlivých joinů (limit/page/sort/where/count), např. `joins[posts][limit]=10`.',
    schemaWhere:
      'Filtr `where` v Payloadu. Vnořte pole a poté operátor: `where[field][equals]=value`. Klauzule kombinujte pomocí polí `and` / `or`, např. `where[or][0][field][equals]=value`. Každé pole uvádí pouze operátory platné pro jeho typ.',
    schemaSupportedTimezones: 'Podporované časové zóny ve formátu IANA.',
    schemaPerLocale: 'Hodnoty po jednotlivých jazycích, vrácené při `locale=all`.',
    schemaHierarchySlugPath:
      'Cesta ze slugů, např. `parent/child`. Počítá se při čtení s `computeHierarchyPaths=true` nebo při výběru. Nelze použít ve `where`.',
    schemaHierarchyTitlePath:
      'Cesta z názvů, např. `Parent/Child`. Počítá se při čtení s `computeHierarchyPaths=true` nebo při výběru. Nelze použít ve `where`.',

    collectionList: 'Stránkovaný seznam dokumentů',
    collectionDoc: 'Jeden dokument',
    collectionCreated: 'Vytvořený dokument',
    collectionUpdated: 'Aktualizovaný dokument',
    collectionDeleted: 'Smazaný dokument',
    collectionBulkUpdate: 'Výsledek hromadné aktualizace',
    collectionBulkDelete: 'Výsledek hromadného smazání',
    collectionCount: 'Počet dokumentů',
    collectionDuplicated: 'Duplikovaný dokument',
    validateResult:
      'Výsledek ověření. Nic se neukládá. Neplatné hodnoty polí vrátí `valid: false` s chybami, nikoli chybový stav.',
    validateBody:
      'Data dokumentu k ověření. U uloženého dokumentu nebo globálního dokumentu se data sloučí s nejnovějším konceptem, případně s uloženým dokumentem, pokud koncept neexistuje.',

    globalDoc: 'Globální dokument',

    authLogin: 'Výsledek přihlášení',
    authLogout: 'Výsledek odhlášení',
    authMe: 'Aktuálně přihlášený uživatel',
    authRefreshToken: 'Obnovený token',
    authForgotPassword: 'E-mail pro obnovení hesla byl odeslán',
    authResetPassword: 'Výsledek obnovení hesla',
    authFirstRegister: 'První uživatel vytvořený s autentizačním tokenem',
    authInit: 'Zda tato autentizační kolekce již obsahuje nějaké uživatele',
    authAccess: 'Oprávnění aktuálního uživatele pro všechny kolekce a globální',
    docAccess: 'Oprávnění aktuálního uživatele pro tento dokument',
    docAccessBody:
      'Data dokumentu, vůči kterým se ověřuje přístup. Bez nich Payload použije uložený dokument, pokud existuje.',
    authUnlock: 'Výsledek odemčení',
    authVerify: 'Výsledek ověření',
    apiKeyReveal: 'Dešifrovaný API klíč',

    versionList: 'Stránkovaný seznam verzí',
    versionSingle: 'Jedna verze',
    versionRestored: 'Obnovený dokument',
    versionWhere: 'Filtrování podle polí verze, např. `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'Spustit úlohy ve frontě (a ve výchozím nastavení zpracovat rozvrhy)',
    jobsSchedulesSummary: 'Zařadit do fronty úlohy, které jsou podle svého rozvrhu na řadě',
    jobsRunResult: 'Výsledek spuštění',
    jobsSchedulesResult: 'Výsledek rozvrhování',
    jobsRunAllQueues: 'Spustit úlohy napříč všemi frontami.',
    jobsLimit: 'Maximální počet úloh ke spuštění.',
    jobsDisableScheduling: 'Přeskočit zpracování rozvrhu, které `run` ve výchozím nastavení provádí.',
    jobsSilent: 'Potlačit protokolování spuštění.',
    jobsSchedulesAllQueues: 'Zpracovat rozvrhy napříč všemi frontami.',
    jobsQueue: 'Omezit operaci na jednu frontu. Známé fronty: {{queues}}.',

    uploadFile: 'Binární soubor k nahrání.',
    uploadBody:
      'Pro nahrání souboru odešlete `multipart/form-data` (binární část `file` plus část `_payload` s poli serializovanými do JSON), nebo `application/json` jen s poli, pokud žádný soubor není.',
    uploadPayloadField: 'Pole {{schema}} serializovaná do JSON. Příklad: `{\\"alt\\":\\"A caption\\"}`.',
    fileServe: 'Soubor',
    filePartial: 'Část souboru pro požadavek `Range`',
    uploadInstructionsSummary: 'Získat pokyny k nahrání souboru před uložením dokumentu',
    uploadInstructionsResult: 'Kam poslat bajty souboru a hodnota `file` pro požadavek na vytvoření nebo úpravu',
    uploadStagePutSummary: 'Odeslat bajty souboru pro dočasné nahrání',
    uploadStageDeleteSummary: 'Smazat dočasné nahrání',
    uploadStageResult: 'Hotovo, bez obsahu',

    error400: 'Chyba validace nebo dotazu (ValidationError, QueryError)',
    error401: 'Neautentizováno (AuthenticationError)',
    error403: 'Zakázáno řízením přístupu (Forbidden, UnverifiedEmail)',
    error404: 'Dokument nenalezen (NotFound)',
    error500: 'Interní chyba serveru (APIError)',

    securityBearer:
      'Vložte `token` vrácený přihlašovacím endpointem. Odesílá se jako `Authorization: Bearer <token>`. Payload také akceptuje schéma `JWT <token>` a cookie `{{cookiePrefix}}-token`.',
    securityInteractive:
      'Interaktivní přihlášení: zadejte uživatelské jméno (nebo e-mail) a heslo; pole Client ID/Secret nechte prázdná.',

    tagCollections: 'Kolekce',
    tagCollectionsDesc: 'Endpointy kolekcí dokumentů (CRUD, počet, duplikace).',
    tagGlobals: 'Globální',
    tagGlobalsDesc: 'Endpointy globálních dokumentů.',
    tagSystem: 'Systém',
    tagSystemDesc: 'Systémové endpointy Payloadu.',
    tagAuth: 'Autentizace',
    tagVersions: 'Verze',
    tagJobs: 'Úlohy',
    tagUploads: 'Nahrávání',
    tagAccess: 'Přístup',

    localizationHeading: 'Lokalizace',
    localizationNote:
      'Dostupné jazyky: {{locales}}. Pro výběr jednoho předejte `?locale=<code>` čtecímu endpointu. Pro získání všech jazyků najednou předejte `?locale=all` — každé lokalizované pole se poté vrátí jako objekt s klíči podle kódu jazyka (např. `{ \\"en\\": \\"Hello\\", \\"de\\": \\"Hallo\\" }`) místo jedné hodnoty. Nastavením `?flattenLocales=false` s `locale=all` zachováte tuto formu objektu po jednotlivých jazycích. Schémata polí zobrazují podobu pro jeden jazyk.',
    docLanguagesNote:
      'Tato dokumentace je dostupná v těchto jazycích: {{languages}}. Pro přepnutí připojte k URL této specifikace `?lang=<code>`.',
  },
}
