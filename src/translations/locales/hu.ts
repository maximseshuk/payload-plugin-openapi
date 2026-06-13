import type { PluginDefaultTranslationsObject } from '../types.js'

export const hu: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Hány szintnyi kapcsolódó dokumentumot töltsön be.',
    paramSort: 'Rendezési mező; csökkenő sorrendhez `-` előtaggal, pl. `-createdAt`.',
    paramSortShort: 'Rendezési mező; csökkenő sorrendhez `-` előtaggal.',
    paramDraft: 'Vázlat (draft) verziók visszaadása.',
    paramTrash: 'A kukába helyezett dokumentumok belevétele.',
    paramFlattenLocales:
      'A `locale=all` esetén állítsd false értékre, hogy a lokalizált mezők lokálonkénti objektumokként maradjanak meg. Alapértelmezetten true.',
    paramLocale: 'A visszaadandó lokál, vagy `all` az összes lokálhoz. Lásd az API leírásban a Lokalizáció szakaszt.',
    paramFallbackLocale: 'A hiányzó lokalizált értékekhez használt tartalék lokál, vagy `none` a letiltáshoz.',

    schemaSelect: 'Válaszd ki a visszaadandó mezőket, pl. `select[title]=true`. Hagyd üresen az összes visszaadásához.',
    schemaPopulate: 'Kapcsolódó dokumentumok betöltése gyűjteményenként, pl. `populate[posts][title]=true`.',
    schemaJoins: 'Összekapcsolásonkénti vezérlők (limit/page/sort/where/count), pl. `joins[posts][limit]=10`.',
    schemaWhere:
      'Payload `where` szűrő. Ágyazz be egy mezőt, majd egy operátort: `where[field][equals]=value`. A feltételeket az `and` / `or` tömbökkel kombinálhatod, pl. `where[or][0][field][equals]=value`. Minden mezőnél csak az adott típushoz érvényes operátorok szerepelnek.',
    schemaSupportedTimezones: 'Támogatott időzónák IANA formátumban.',
    schemaPerLocale: 'Lokálonkénti értékek, amelyeket a `locale=all` esetén ad vissza.',

    collectionList: 'Dokumentumok lapozott listája',
    collectionDoc: 'Egyetlen dokumentum',
    collectionCreated: 'Létrehozott dokumentum',
    collectionUpdated: 'Frissített dokumentum',
    collectionDeleted: 'Törölt dokumentum',
    collectionBulkUpdate: 'Tömeges frissítés eredménye',
    collectionBulkDelete: 'Tömeges törlés eredménye',
    collectionCount: 'Dokumentumok száma',
    collectionDuplicated: 'A duplikált dokumentum',

    globalDoc: 'A globális dokumentum',

    authLogin: 'Bejelentkezés eredménye',
    authLogout: 'Kijelentkezés eredménye',
    authMe: 'A jelenleg hitelesített felhasználó',
    authRefreshToken: 'Megújított token',
    authForgotPassword: 'Jelszó-visszaállító e-mail elküldve',
    authResetPassword: 'Jelszó-visszaállítás eredménye',
    authFirstRegister: 'Az első felhasználó, hitelesítési tokennel létrehozva',
    authInit: 'Hogy ennek a hitelesítési gyűjteménynek van-e már bármilyen felhasználója',
    authAccess: 'Az aktuális felhasználó hozzáférése (jogosultságai) ehhez a gyűjteményhez',
    authUnlock: 'Feloldás eredménye',
    authVerify: 'Ellenőrzés eredménye',

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

    localizationHeading: 'Lokalizáció',
    localizationNote:
      'Elérhető lokálok: {{locales}}. Adj át egy `?locale=<code>` paramétert egy olvasási végpontnak az egyik kiválasztásához. Adj át `?locale=all` paramétert az összes lokál egyszerre történő megkapásához — ekkor minden lokalizált mező lokálkóddal kulcsolt objektumként kerül vissza (pl. `{ "en": "Hello", "de": "Hallo" }`) egyetlen érték helyett. Állítsd be a `?flattenLocales=false` paramétert a `locale=all` mellett, hogy megmaradjon ez a lokálonkénti objektumforma. A mezősémák az egylokálos formát mutatják.',
    docLanguagesNote:
      'Ez a dokumentáció a következő nyelveken érhető el: {{languages}}. A nyelv váltásához fűzd a `?lang=<code>` paramétert ehhez a spec URL-hez.',
  },
}
