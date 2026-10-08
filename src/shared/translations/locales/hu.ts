import type { PluginDefaultTranslationsObject } from '@/shared/translations/types.js'

export const hu: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Hány szintnyi kapcsolódó dokumentumot töltsön be.',
    paramSort: 'Rendezési mező; csökkenő sorrendhez `-` előtaggal, pl. `-createdAt`.',
    paramSortShort: 'Rendezési mező; csökkenő sorrendhez `-` előtaggal.',
    paramDraft: 'Vázlat (draft) verziók visszaadása.',
    paramTrash: 'A kukába helyezett dokumentumok belevétele.',
    paramAutosave: 'Mentés automatikus mentésként: új verzió helyett a legutóbbi automatikus mentést frissíti.',
    paramPublishAllLocales: 'Minden nyelv közzététele, nem csak a kérés nyelvéé.',
    paramUnpublishAllLocales: 'Minden nyelv közzétételének visszavonása és a dokumentum vázlattá alakítása.',
    paramOverrideLock: 'Másik felhasználó zárolásának figyelmen kívül hagyása. Alapértelmezés false.',
    paramSelectedLocales: 'Csak ezeket a nyelveket másolja a másolatba. Alapértelmezés: minden nyelv.',
    paramFlattenLocales:
      'A `locale=all` esetén állítsd false értékre, hogy a lokalizált mezők lokálonkénti objektumokként maradjanak meg. Alapértelmezetten true.',
    paramLocale: 'A visszaadandó lokál, vagy `all` az összes lokálhoz. Lásd az API leírásban a Lokalizáció szakaszt.',
    paramFallbackLocale: 'A hiányzó lokalizált értékekhez használt tartalék lokál, vagy `none` a letiltáshoz.',
    paramValidateLocale:
      'Az ellenőrzendő lokálok, vagy `all` az összes lokálhoz. Több lokálhoz ismételje meg a paramétert.',
    paramComputeHierarchyPaths:
      'Állítsa true értékre a(z) `{{slugPath}}` és `{{titlePath}}` útvonalak kiszámításához. Bármelyik mező kiválasztása is kiszámítja őket.',

    schemaSelect: 'Válaszd ki a visszaadandó mezőket, pl. `select[title]=true`. Hagyd üresen az összes visszaadásához.',
    schemaPopulate: 'Kapcsolódó dokumentumok betöltése gyűjteményenként, pl. `populate[posts][title]=true`.',
    schemaJoins: 'Összekapcsolásonkénti vezérlők (limit/page/sort/where/count), pl. `joins[posts][limit]=10`.',
    schemaWhere:
      'Payload `where` szűrő. Ágyazz be egy mezőt, majd egy operátort: `where[field][equals]=value`. A feltételeket az `and` / `or` tömbökkel kombinálhatod, pl. `where[or][0][field][equals]=value`. Minden mezőnél csak az adott típushoz érvényes operátorok szerepelnek.',
    schemaSupportedTimezones: 'Támogatott időzónák IANA formátumban.',
    schemaPerLocale: 'Lokálonkénti értékek, amelyeket a `locale=all` esetén ad vissza.',
    schemaHierarchySlugPath:
      'Slug útvonal, pl. `parent/child`. Olvasáskor számolódik `computeHierarchyPaths=true` esetén vagy ha ki van választva. A `where` feltételben nem használható.',
    schemaHierarchyTitlePath:
      'Cím útvonal, pl. `Parent/Child`. Olvasáskor számolódik `computeHierarchyPaths=true` esetén vagy ha ki van választva. A `where` feltételben nem használható.',

    collectionList: 'Dokumentumok lapozott listája',
    collectionDoc: 'Egyetlen dokumentum',
    collectionCreated: 'Létrehozott dokumentum',
    collectionUpdated: 'Frissített dokumentum',
    collectionDeleted: 'Törölt dokumentum',
    collectionBulkUpdate: 'Tömeges frissítés eredménye',
    collectionBulkDelete: 'Tömeges törlés eredménye',
    collectionCount: 'Dokumentumok száma',
    collectionDuplicated: 'A duplikált dokumentum',
    validateResult:
      'Az ellenőrzés eredménye. Semmi sem kerül mentésre. Az érvénytelen mezőértékek `valid: false` értéket adnak vissza a hibákkal, nem hibaállapotot.',
    validateBody:
      'Az ellenőrizendő dokumentumadatok. Mentett dokumentum vagy globális dokumentum esetén az adatok a legutóbbi vázlatra, vázlat hiányában a mentett dokumentumra egyesülnek.',

    globalDoc: 'A globális dokumentum',

    authLogin: 'Bejelentkezés eredménye',
    authLogout: 'Kijelentkezés eredménye',
    authMe: 'A jelenleg hitelesített felhasználó',
    authRefreshToken: 'Megújított token',
    authForgotPassword: 'Jelszó-visszaállító e-mail elküldve',
    authResetPassword: 'Jelszó-visszaállítás eredménye',
    authFirstRegister: 'Az első felhasználó, hitelesítési tokennel létrehozva',
    authInit: 'Hogy ennek a hitelesítési gyűjteménynek van-e már bármilyen felhasználója',
    authAccess: 'Az aktuális felhasználó jogosultságai az összes gyűjteményhez és globálishoz',
    docAccess: 'Az aktuális felhasználó jogosultságai ehhez a dokumentumhoz',
    docAccessBody:
      'Dokumentumadatok, amelyek alapján a hozzáférés ellenőrizve van. Nélküle a Payload a mentett dokumentumot használja, ha van.',
    authUnlock: 'Feloldás eredménye',
    authVerify: 'Ellenőrzés eredménye',
    apiKeyReveal: 'A visszafejtett API-kulcs',

    versionList: 'Verziók lapozott listája',
    versionSingle: 'Egyetlen verzió',
    versionRestored: 'A visszaállított dokumentum',
    versionWhere: 'Szűrés a verziómezőkre, pl. `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'Várólistára helyezett feladatok futtatása (és alapértelmezetten az ütemezések kezelése)',
    jobsSchedulesSummary: 'Az ütemezésük szerint esedékes feladatok várólistára helyezése',
    jobsRunResult: 'Futtatás eredménye',
    jobsSchedulesResult: 'Ütemezés eredménye',
    jobsRunAllQueues: 'Feladatok futtatása az összes várólistán.',
    jobsLimit: 'A futtatandó feladatok maximális száma.',
    jobsDisableScheduling: 'A `run` által alapértelmezetten végzett ütemezéskezelés kihagyása.',
    jobsSilent: 'A futtatási naplózás elnyomása.',
    jobsSchedulesAllQueues: 'Ütemezések kezelése az összes várólistán.',
    jobsQueue: 'A művelet korlátozása egyetlen várólistára. Ismert várólisták: {{queues}}.',

    uploadFile: 'A feltöltendő bináris fájl.',
    uploadBody:
      'Küldj `multipart/form-data` formátumot fájl feltöltéséhez (egy bináris `file` rész, valamint egy `_payload` rész a JSON-stringgé alakított mezőkkel), vagy `application/json` formátumot csak a mezőkkel, ha nincs fájl.',
    uploadPayloadField: 'JSON-stringgé alakított {{schema}} mezők. Példa: `{"alt":"A caption"}`.',
    fileServe: 'A fájl',
    filePartial: 'A fájl egy része `Range` kéréshez',
    uploadInstructionsSummary: 'Utasítások lekérése fájl feltöltéséhez a dokumentum mentése előtt',
    uploadInstructionsResult:
      'Hová kell küldeni a fájl bájtjait, és milyen `file` értéket kell küldeni a létrehozási vagy frissítési kéréssel',
    uploadStagePutSummary: 'A fájl bájtjainak küldése ideiglenes feltöltéshez',
    uploadStageDeleteSummary: 'Ideiglenes feltöltés törlése',
    uploadStageResult: 'Kész, nincs tartalom',

    error400: 'Érvényesítési vagy lekérdezési hiba (ValidationError, QueryError)',
    error401: 'Nincs hitelesítve (AuthenticationError)',
    error403: 'A hozzáférés-vezérlés tiltja (Forbidden, UnverifiedEmail)',
    error404: 'A dokumentum nem található (NotFound)',
    error500: 'Belső szerverhiba (APIError)',

    securityBearer:
      'Illeszd be a bejelentkezési végpont által visszaadott `token` értéket. Az `Authorization: Bearer <token>` formátumban kerül elküldésre. A Payload elfogadja a `JWT <token>` sémát és egy `{{cookiePrefix}}-token` sütit is.',
    securityInteractive:
      'Interaktív bejelentkezés: add meg a felhasználónevet (vagy e-mailt) és a jelszót; a Client ID/Secret mezőket hagyd üresen.',

    tagCollections: 'Gyűjtemények',
    tagCollectionsDesc: 'Dokumentumgyűjtemény-végpontok (CRUD, darabszám, duplikálás).',
    tagGlobals: 'Globálisok',
    tagGlobalsDesc: 'Globális dokumentumvégpontok.',
    tagSystem: 'Rendszer',
    tagSystemDesc: 'Payload rendszervégpontok.',
    tagAuth: 'Hitelesítés',
    tagVersions: 'Verziók',
    tagJobs: 'Feladatok',
    tagUploads: 'Feltöltések',
    tagAccess: 'Hozzáférés',

    localizationHeading: 'Lokalizáció',
    localizationNote:
      'Elérhető lokálok: {{locales}}. Adj át egy `?locale=<code>` paramétert egy olvasási végpontnak az egyik kiválasztásához. Adj át `?locale=all` paramétert az összes lokál egyszerre történő megkapásához — ekkor minden lokalizált mező lokálkóddal kulcsolt objektumként kerül vissza (pl. `{ "en": "Hello", "de": "Hallo" }`) egyetlen érték helyett. Állítsd be a `?flattenLocales=false` paramétert a `locale=all` mellett, hogy megmaradjon ez a lokálonkénti objektumforma. A mezősémák az egylokálos formát mutatják.',
    docLanguagesNote:
      'Ez a dokumentáció a következő nyelveken érhető el: {{languages}}. A nyelv váltásához fűzd a `?lang=<code>` paramétert ehhez a spec URL-hez.',
  },
}
