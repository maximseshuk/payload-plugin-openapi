import type { PluginDefaultTranslationsObject } from '@/shared/translations/types.js'

export const sl: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Koliko ravni povezanih dokumentov naj se napolni.',
    paramSort: 'Polje za razvrščanje; za padajoči vrstni red ga predpiši s `-`, npr. `-createdAt`.',
    paramSortShort: 'Polje za razvrščanje; za padajoči vrstni red ga predpiši s `-`.',
    paramDraft: 'Vrni osnutke različic.',
    paramTrash: 'Vključi dokumente v košu.',
    paramAutosave:
      'Shrani kot samodejno shranjevanje: posodobi zadnjo samodejno shranjeno različico, namesto da doda novo.',
    paramPublishAllLocales: 'Objavi vse jezike, ne le jezika zahteve.',
    paramUnpublishAllLocales: 'Prekliči objavo vseh jezikov in vrni dokument v osnutek.',
    paramOverrideLock: 'Prezri zaklep drugega uporabnika. Privzeto false.',
    paramSelectedLocales: 'V dvojnik kopiraj le te jezike. Privzeto: vsi jeziki.',
    paramFlattenLocales:
      'Pri `locale=all` nastavite na false, da lokalizirana polja ostanejo kot objekti po posameznih jezikih. Privzeto true.',
    paramLocale: 'Jezik, ki naj se vrne, ali `all` za vse jezike. Glejte razdelek Lokalizacija v opisu API-ja.',
    paramFallbackLocale:
      'Jezik, na katerega naj se zateče pri manjkajočih lokaliziranih vrednostih, ali `none` za onemogočenje.',
    paramValidateLocale: 'Jeziki za preverjanje ali `all` za vse jezike. Za več jezikov parameter ponovite.',
    paramComputeHierarchyPaths:
      'Nastavite true za izračun poti `{{slugPath}}` in `{{titlePath}}`. Izbira katerega koli od teh polj ju prav tako izračuna.',

    schemaSelect: 'Izberite polja, ki naj se vrnejo, npr. `select[title]=true`. Izpustite za vrnitev vseh.',
    schemaPopulate: 'Napolnite povezane dokumente po posamezni zbirki, npr. `populate[posts][title]=true`.',
    schemaJoins: 'Nadzor po posameznem združevanju (limit/page/sort/where/count), npr. `joins[posts][limit]=10`.',
    schemaWhere:
      'Payloadov filter `where`. Ugnezdite polje, nato operator: `where[field][equals]=value`. Stavke združite s polji `and` / `or`, npr. `where[or][0][field][equals]=value`. Vsako polje navaja le operatorje, veljavne za njegov tip.',
    schemaSupportedTimezones: 'Podprti časovni pasovi v zapisu IANA.',
    schemaPerLocale: 'Vrednosti po posameznem jeziku, vrnjene pri `locale=all`.',
    schemaHierarchySlugPath:
      'Pot iz slugov, npr. `parent/child`. Izračuna se pri branju z `computeHierarchyPaths=true` ali ko je izbrana. Ni je mogoče uporabiti v `where`.',
    schemaHierarchyTitlePath:
      'Pot iz naslovov, npr. `Parent/Child`. Izračuna se pri branju z `computeHierarchyPaths=true` ali ko je izbrana. Ni je mogoče uporabiti v `where`.',

    collectionList: 'Stranjen seznam dokumentov',
    collectionDoc: 'Posamezen dokument',
    collectionCreated: 'Ustvarjen dokument',
    collectionUpdated: 'Posodobljen dokument',
    collectionDeleted: 'Izbrisan dokument',
    collectionBulkUpdate: 'Rezultat množične posodobitve',
    collectionBulkDelete: 'Rezultat množičnega brisanja',
    collectionCount: 'Število dokumentov',
    collectionDuplicated: 'Podvojeni dokument',
    validateResult:
      'Rezultat preverjanja. Nič se ne shrani. Neveljavne vrednosti polj vrnejo `valid: false` z napakami, ne statusa napake.',
    validateBody:
      'Podatki dokumenta za preverjanje. Pri shranjenem dokumentu ali globalnem dokumentu se podatki združijo z zadnjim osnutkom ali s shranjenim dokumentom, če osnutka ni.',

    globalDoc: 'Globalni dokument',

    authLogin: 'Rezultat prijave',
    authLogout: 'Rezultat odjave',
    authMe: 'Trenutno overjeni uporabnik',
    authRefreshToken: 'Osvežen žeton',
    authForgotPassword: 'E-poštno sporočilo za ponastavitev gesla je bilo poslano',
    authResetPassword: 'Rezultat ponastavitve gesla',
    authFirstRegister: 'Prvi uporabnik, ustvarjen z žetonom za overjanje',
    authInit: 'Ali ta zbirka za overjanje že vsebuje kakšne uporabnike',
    authAccess: 'Dovoljenja trenutnega uporabnika za vse zbirke in globalne nastavitve',
    docAccess: 'Dovoljenja trenutnega uporabnika za ta dokument',
    docAccessBody:
      'Podatki dokumenta, glede na katere se preveri dostop. Brez njih Payload uporabi shranjeni dokument, če obstaja.',
    authUnlock: 'Rezultat odklepanja',
    authVerify: 'Rezultat preverjanja',
    apiKeyReveal: 'Dešifrirani ključ API',

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
    fileServe: 'Datoteka',
    filePartial: 'Del datoteke za zahtevo `Range`',
    paramFileVersion: 'Vrne datoteko, shranjeno s tem ID-jem različice.',
    uploadInstructionsSummary: 'Pridobi navodila za nalaganje datoteke pred shranjevanjem dokumenta',
    uploadInstructionsResult:
      'Kam poslati bajte datoteke in vrednost `file`, ki jo pošljete z zahtevo za ustvarjanje ali posodobitev',
    uploadStagePutSummary: 'Pošlji bajte datoteke za začasno nalaganje',
    uploadStageDeleteSummary: 'Izbriši začasno nalaganje',
    uploadStageResult: 'Končano, brez vsebine',

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
    tagUploads: 'Nalaganja',
    tagAccess: 'Dostop',
    tagPlugins: 'Vtičniki',
    tagPluginsDesc: 'Končne točke, ki jih dodajo uradni vtičniki Payload.',
    pluginError400: 'Neveljavna zahteva',
    pluginError401: 'Niste prijavljeni',
    pluginError403: 'Prepovedano',
    pluginError404: 'Ni najdeno',
    pluginError500: 'Notranja napaka strežnika',
    ecommerceAddItem: 'Dodaj izdelek v košarico',
    ecommerceRemoveItem: 'Odstrani izdelek iz košarice',
    ecommerceUpdateItem: 'Spremeni količino izdelka v košarici',
    ecommerceClearCart: 'Odstrani vse izdelke iz košarice',
    ecommerceMergeCart: 'Združi gostujočo košarico s to košarico',
    ecommerceCartAccess: 'Dovoljeno lastniku košarice ali za gostujočo košarico z njenim `secret` v telesu zahteve.',
    ecommerceCartResult: 'Posodobljena košarica',
    ecommerceCartNotFound: 'Košarica ni najdena ali ni dostopna',
    ecommerceQuantity: 'Nova količina ali `{ "$inc": n }` za spremembo za n.',
    ecommerceInitiatePayment: 'Začni plačilo z `{{method}}`',
    ecommerceConfirmOrder: 'Potrdi plačilo z `{{method}}` in ustvari naročilo',
    ecommercePaymentBody:
      'Uporabi `cartID` (s `secret` za gostujočo košarico) ali košarico uporabnika. Brez uporabnika je `customerEmail` obvezen. Plačilni adapter lahko zahteva dodatna polja.',
    ecommerceInitiateResult: 'Plačilo se je začelo. Adapter doda svoja polja, npr. client secret.',
    ecommerceConfirmResult: 'Naročilo je ustvarjeno',
    stripeWebhook: 'Prejmi Stripe webhook dogodke',
    stripeWebhookBody:
      'Neobdelan Stripe dogodek, podpisan v glavi `Stripe-Signature`. Kliče ga Stripe, ne odjemalci API-ja.',
    stripeWebhookResult: 'Dogodek prejet',
    stripeWebhookInvalid: 'Preverjanje podpisa ni uspelo',
    stripeRest: 'Pokliči dovoljeno metodo Stripe API-ja',
    stripeRestResult: 'Rezultat Stripe API-ja',
    stripeRestError: 'Stripe API je vrnil napako',
    mcp: 'Pošlji sporočilo MCP JSON-RPC',
    mcpDesc:
      'Model Context Protocol prek Streamable HTTP, z odgovori JSON. Anonimne zahteve delujejo; navedena orodja so odvisna od pravic uporabnika.',
    mcpResult: 'Odgovor JSON-RPC',
    mcpOverrideAccess: 'Preskoči preverjanja dostopa. Samo za razvoj.',
    mcpGet: 'Ni podprto: strežnik ne odpre toka dogodkov',
    mcpGetResult: 'Metoda ni dovoljena, uporabite POST',
    seoTitle: 'Ustvari meta naslov',
    seoDescription: 'Ustvari meta opis',
    seoUrl: 'Ustvari URL za predogled',
    seoImage: 'Ustvari meta sliko',
    seoBody:
      'Dokument, ki se ureja: `collectionSlug` ali `globalSlug`, njegov `id` in trenutni podatki `doc`. Posreduje se vaši funkciji za ustvarjanje.',
    seoResult: 'Ustvarjena vrednost. Prazen niz, če funkcija za ustvarjanje ni nastavljena.',
    searchReindex: 'Ponovno zgradi iskalni indeks za nekatere zbirke',
    searchReindexResult: 'Povzetek ponovnega indeksiranja',
    tenantOptions: 'Seznam najemnikov, ki jih uporabnik lahko izbere',
    tenantOptionsResult: 'Možnosti najemnikov',
    exportDownload: 'Izvozi dokumente v datoteko',
    exportDownloadResult: 'Izvozna datoteka',
    exportPreview: 'Predogled izvoza',
    importPreview: 'Predogled uvozne datoteke',
    previewResult: 'Stran dokumentov za predogled',
    importFileData: 'Vsebina datoteke, kodirana v base64.',
    r2Upload: 'Naloži datoteko v R2 po delih',
    r2UploadDesc:
      'Trije koraki na eni poti. Začetek: pošljite `collection`, `fileName` in `fileType`. Vsak del: dodajte `multipartId`, `multipartKey`, `multipartNumber` in `signedReceipt` ter pošljite bajte. Zaključek: enako brez `multipartNumber`, s seznamom delov v JSON.',
    r2UploadResult: 'Nalaganje se je začelo, del je naložen ali nalaganje je končano (ključ objekta kot besedilo)',
    r2Exists: 'Datoteka s tem ključem že obstaja',

    localizationHeading: 'Lokalizacija',
    localizationNote:
      'Razpoložljivi jeziki: {{locales}}. Za izbiro enega jezika dodajte `?locale=<code>` k bralni končni točki. Dodajte `?locale=all` za hkratni prejem vseh jezikov — vsako lokalizirano polje se nato vrne kot objekt, ključen po jezikovni kodi (npr. `{ \\"en\\": \\"Hello\\", \\"de\\": \\"Hallo\\" }`), namesto kot ena sama vrednost. Nastavite `?flattenLocales=false` skupaj z `locale=all`, da ohranite to obliko objekta po posameznih jezikih. Sheme polj prikazujejo obliko za en jezik.',
    docLanguagesNote:
      'Ta dokumentacija je na voljo v naslednjih jezikih: {{languages}}. Za preklop dodaj `?lang=<code>` k URL-ju te specifikacije.',
  },
}
