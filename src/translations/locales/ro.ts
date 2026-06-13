import type { PluginDefaultTranslationsObject } from '../types.js'

export const ro: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Câte niveluri de documente asociate să fie populate.',
    paramSort: 'Câmp după care se sortează; prefixați cu `-` pentru ordine descrescătoare, de ex. `-createdAt`.',
    paramSortShort: 'Câmp după care se sortează; prefixați cu `-` pentru ordine descrescătoare.',
    paramDraft: 'Returnează versiunile ciornă.',
    paramTrash: 'Include documentele aflate la coșul de gunoi.',
    paramFlattenLocales:
      'Cu `locale=all`, setați false pentru a păstra câmpurile localizate ca obiecte per-locale. Implicit true.',
    paramLocale:
      'Locale-ul de returnat sau `all` pentru toate locale-urile. Consultați secțiunea Localizare din descrierea API.',
    paramFallbackLocale: 'Locale-ul de rezervă pentru valorile localizate lipsă sau `none` pentru a dezactiva.',

    schemaSelect: 'Alegeți câmpurile de returnat, de ex. `select[title]=true`. Omiteți pentru a le returna pe toate.',
    schemaPopulate: 'Populați documentele asociate per colecție, de ex. `populate[posts][title]=true`.',
    schemaJoins: 'Controale per-join (limit/page/sort/where/count), de ex. `joins[posts][limit]=10`.',
    schemaWhere:
      'Filtru `where` Payload. Imbricați un câmp, apoi un operator: `where[field][equals]=value`. Combinați clauzele cu tablourile `and` / `or`, de ex. `where[or][0][field][equals]=value`. Fiecare câmp listează doar operatorii valizi pentru tipul său.',
    schemaSupportedTimezones: 'Fusuri orare acceptate în format IANA.',
    schemaPerLocale: 'Valori per-locale, returnate când `locale=all`.',

    collectionList: 'Listă paginată de documente',
    collectionDoc: 'Un singur document',
    collectionCreated: 'Document creat',
    collectionUpdated: 'Document actualizat',
    collectionDeleted: 'Document șters',
    collectionBulkUpdate: 'Rezultatul actualizării în masă',
    collectionBulkDelete: 'Rezultatul ștergerii în masă',
    collectionCount: 'Numărul de documente',
    collectionDuplicated: 'Documentul duplicat',

    globalDoc: 'Documentul global',

    authLogin: 'Rezultatul autentificării',
    authLogout: 'Rezultatul deconectării',
    authMe: 'Utilizatorul autentificat în prezent',
    authRefreshToken: 'Token reîmprospătat',
    authForgotPassword: 'E-mail de resetare a parolei trimis',
    authResetPassword: 'Rezultatul resetării parolei',
    authFirstRegister: 'Primul utilizator, creat cu un token de autentificare',
    authInit: 'Dacă această colecție de autentificare are deja utilizatori',
    authAccess: 'Accesul (permisiunile) utilizatorului curent pentru această colecție',
    authUnlock: 'Rezultatul deblocării',
    authVerify: 'Rezultatul verificării',

    versionList: 'Listă paginată de versiuni',
    versionSingle: 'O singură versiune',
    versionRestored: 'Documentul restaurat',
    versionWhere: 'Filtrează după câmpurile versiunii, de ex. `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'Rulează joburile din coadă (și, implicit, gestionează programările)',
    jobsSchedulesSummary: 'Pune în coadă joburile scadente conform programării lor',
    jobsRunResult: 'Rezultatul rulării',
    jobsSchedulesResult: 'Rezultatul programării',
    jobsRunAllQueues: 'Rulează joburile din toate cozile.',
    jobsLimit: 'Numărul maxim de joburi de rulat.',
    jobsDisableScheduling: 'Sare peste gestionarea programărilor pe care `run` o face implicit.',
    jobsSilent: 'Suprimă jurnalizarea rulării.',
    jobsSchedulesAllQueues: 'Gestionează programările din toate cozile.',
    jobsQueue: 'Restricționează operațiunea la o singură coadă. Cozi cunoscute: {{queues}}.',

    uploadFile: 'Fișierul binar de încărcat.',
    uploadBody:
      'Trimiteți `multipart/form-data` pentru a încărca un fișier (o parte binară `file` plus o parte `_payload` cu câmpurile serializate în JSON) sau `application/json` doar cu câmpurile când nu există fișier.',
    uploadPayloadField: 'Câmpuri {{schema}} serializate în JSON. Exemplu: `{\\"alt\\":\\"A caption\\"}`.',

    error400: 'Eroare de validare sau de interogare (ValidationError, QueryError)',
    error401: 'Neautentificat (AuthenticationError)',
    error403: 'Interzis de controlul accesului (Forbidden, UnverifiedEmail)',
    error404: 'Document negăsit (NotFound)',
    error500: 'Eroare internă de server (APIError)',

    securityBearer:
      'Lipiți `token`-ul returnat de endpoint-ul de autentificare. Trimis ca `Authorization: Bearer <token>`. Payload acceptă și schema `JWT <token>` și un cookie `{{cookiePrefix}}-token`.',
    securityInteractive:
      'Autentificare interactivă: introduceți numele de utilizator (sau e-mailul) și parola; lăsați Client ID/Secret necompletate.',

    tagCollections: 'Colecții',
    tagCollectionsDesc: 'Endpoint-uri pentru colecții de documente (CRUD, numărare, duplicare).',
    tagGlobals: 'Globale',
    tagGlobalsDesc: 'Endpoint-uri pentru documente globale.',
    tagSystem: 'Sistem',
    tagSystemDesc: 'Endpoint-uri de sistem Payload.',
    tagAuth: 'Autentificare',
    tagVersions: 'Versiuni',
    tagJobs: 'Joburi',

    localizationHeading: 'Localizare',
    localizationNote:
      'Locale-uri disponibile: {{locales}}. Transmiteți `?locale=<code>` către un endpoint de citire pentru a selecta unul. Transmiteți `?locale=all` pentru a primi toate locale-urile deodată — fiecare câmp localizat este apoi returnat ca obiect indexat după codul locale-ului (de ex. `{ \\"en\\": \\"Hello\\", \\"de\\": \\"Hallo\\" }`) în loc de o singură valoare. Setați `?flattenLocales=false` împreună cu `locale=all` pentru a păstra acea formă de obiect per-locale. Schemele câmpurilor afișează forma cu un singur locale.',
    docLanguagesNote:
      'Această documentație este disponibilă în: {{languages}}. Adaugă `?lang=<code>` la acest URL de specificație pentru a schimba limba.',
  },
}
