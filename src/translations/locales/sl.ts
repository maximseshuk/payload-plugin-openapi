import type { PluginDefaultTranslationsObject } from '../types.js'

export const sl: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Koliko ravni povezanih dokumentov naj se napolni.',
    paramSort: 'Polje za razvrščanje; za padajoči vrstni red ga predpiši s `-`, npr. `-createdAt`.',
    paramSortShort: 'Polje za razvrščanje; za padajoči vrstni red ga predpiši s `-`.',
    paramDraft: 'Vrni osnutke različic.',
    paramTrash: 'Vključi dokumente v košu.',
    paramFlattenLocales:
      'Pri `locale=all` nastavite na false, da lokalizirana polja ostanejo kot objekti po posameznih jezikih. Privzeto true.',
    paramLocale: 'Jezik, ki naj se vrne, ali `all` za vse jezike. Glejte razdelek Lokalizacija v opisu API-ja.',
    paramFallbackLocale:
      'Jezik, na katerega naj se zateče pri manjkajočih lokaliziranih vrednostih, ali `none` za onemogočenje.',

    schemaSelect: 'Izberite polja, ki naj se vrnejo, npr. `select[title]=true`. Izpustite za vrnitev vseh.',
    schemaPopulate: 'Napolnite povezane dokumente po posamezni zbirki, npr. `populate[posts][title]=true`.',
    schemaJoins: 'Nadzor po posameznem združevanju (limit/page/sort/where/count), npr. `joins[posts][limit]=10`.',
    schemaWhere:
      'Payloadov filter `where`. Ugnezdite polje, nato operator: `where[field][equals]=value`. Stavke združite s polji `and` / `or`, npr. `where[or][0][field][equals]=value`. Vsako polje navaja le operatorje, veljavne za njegov tip.',
    schemaSupportedTimezones: 'Podprti časovni pasovi v zapisu IANA.',
    schemaPerLocale: 'Vrednosti po posameznem jeziku, vrnjene pri `locale=all`.',

    collectionList: 'Stranjen seznam dokumentov',
    collectionDoc: 'Posamezen dokument',
    collectionCreated: 'Ustvarjen dokument',
    collectionUpdated: 'Posodobljen dokument',
    collectionDeleted: 'Izbrisan dokument',
    collectionBulkUpdate: 'Rezultat množične posodobitve',
    collectionBulkDelete: 'Rezultat množičnega brisanja',
    collectionCount: 'Število dokumentov',
    collectionDuplicated: 'Podvojeni dokument',

    globalDoc: 'Globalni dokument',

    authLogin: 'Rezultat prijave',
    authLogout: 'Rezultat odjave',
    authMe: 'Trenutno overjeni uporabnik',
    authRefreshToken: 'Osvežen žeton',
    authForgotPassword: 'E-poštno sporočilo za ponastavitev gesla je bilo poslano',
    authResetPassword: 'Rezultat ponastavitve gesla',
    authFirstRegister: 'Prvi uporabnik, ustvarjen z žetonom za overjanje',
    authInit: 'Ali ta zbirka za overjanje že vsebuje kakšne uporabnike',
    authAccess: 'Dostop (dovoljenja) trenutnega uporabnika za to zbirko',
    authUnlock: 'Rezultat odklepanja',
    authVerify: 'Rezultat preverjanja',

    versionList: 'Stranjen seznam različic',
    versionSingle: 'Posamezna različica',
    versionRestored: 'Obnovljeni dokument',
    versionWhere: 'Filtriraj po poljih različic, npr. `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'Zaženi opravila v čakalni vrsti (in privzeto obdelaj urnike)',
    jobsSchedulesSummary: 'Postavi v vrsto opravila, ki so zapadla glede na svoj urnik',
    jobsRunResult: 'Rezultat zagona',
    jobsSchedulesResult: 'Rezultat razporejanja',
    jobsRunAllQueues: 'Zaženi opravila v vseh čakalnih vrstah.',
    jobsLimit: 'Največje število opravil za zagon.',
    jobsDisableScheduling: 'Preskoči obdelavo urnikov, ki jo `run` izvede privzeto.',
    jobsSilent: 'Zatri beleženje zagona.',
    jobsSchedulesAllQueues: 'Obdelaj urnike v vseh čakalnih vrstah.',
    jobsQueue: 'Omeji operacijo na eno samo čakalno vrsto. Znane čakalne vrste: {{queues}}.',

    uploadFile: 'Binarna datoteka za nalaganje.',
    uploadBody:
      'Za nalaganje datoteke pošljite `multipart/form-data` (binarni del `file` ter del `_payload` s polji, pretvorjenimi v niz JSON) ali `application/json` zgolj s polji, kadar datoteke ni.',
    uploadPayloadField: 'Polja {{schema}}, pretvorjena v niz JSON. Primer: `{\\"alt\\":\\"A caption\\"}`.',

    error400: 'Napaka pri preverjanju ali poizvedbi (ValidationError, QueryError)',
    error401: 'Niste overjeni (AuthenticationError)',
    error403: 'Prepovedano zaradi nadzora dostopa (Forbidden, UnverifiedEmail)',
    error404: 'Dokument ni najden (NotFound)',
    error500: 'Notranja napaka strežnika (APIError)',

    securityBearer:
      'Prilepite `token`, ki ga vrne končna točka za prijavo. Pošlje se kot `Authorization: Bearer <token>`. Payload sprejema tudi shemo `JWT <token>` in piškotek `{{cookiePrefix}}-token`.',
    securityInteractive:
      'Interaktivna prijava: vnesite uporabniško ime (ali e-pošto) in geslo; polji Client ID/Secret pustite prazni.',

    tagCollections: 'Zbirke',
    tagCollectionsDesc: 'Končne točke za zbirke dokumentov (CRUD, štetje, podvajanje).',
    tagGlobals: 'Globalne nastavitve',
    tagGlobalsDesc: 'Končne točke za globalne dokumente.',
    tagSystem: 'Sistem',
    tagSystemDesc: 'Sistemske končne točke Payloada.',
    tagAuth: 'Overjanje',
    tagVersions: 'Različice',
    tagJobs: 'Opravila',

    localizationHeading: 'Lokalizacija',
    localizationNote:
      'Razpoložljivi jeziki: {{locales}}. Za izbiro enega jezika dodajte `?locale=<code>` k bralni končni točki. Dodajte `?locale=all` za hkratni prejem vseh jezikov — vsako lokalizirano polje se nato vrne kot objekt, ključen po jezikovni kodi (npr. `{ \\"en\\": \\"Hello\\", \\"de\\": \\"Hallo\\" }`), namesto kot ena sama vrednost. Nastavite `?flattenLocales=false` skupaj z `locale=all`, da ohranite to obliko objekta po posameznih jezikih. Sheme polj prikazujejo obliko za en jezik.',
    docLanguagesNote:
      'Ta dokumentacija je na voljo v naslednjih jezikih: {{languages}}. Za preklop dodaj `?lang=<code>` k URL-ju te specifikacije.',
  },
}
