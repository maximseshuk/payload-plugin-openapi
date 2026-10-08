import type { PluginDefaultTranslationsObject } from '../types.js'

export const tr: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'İlişkili dokümanların kaç seviyesinin doldurulacağı.',
    paramSort: 'Sıralanacak alan; azalan sıralama için başına `-` ekleyin, örn. `-createdAt`.',
    paramSortShort: 'Sıralanacak alan; azalan sıralama için başına `-` ekleyin.',
    paramDraft: 'Taslak sürümleri döndür.',
    paramTrash: 'Çöp kutusundaki dokümanları dahil et.',
    paramAutosave: 'Otomatik kayıt olarak kaydet: yeni sürüm eklemek yerine son otomatik kayıt sürümünü günceller.',
    paramPublishAllLocales: 'Yalnızca isteğin dilini değil, tüm dilleri yayımla.',
    paramUnpublishAllLocales: 'Tüm dillerin yayınını kaldır ve dokümanı taslağa geri al.',
    paramOverrideLock: 'Başka bir kullanıcının kilidini yok say. Varsayılan false.',
    paramSelectedLocales: 'Kopyaya yalnızca bu dilleri aktar. Varsayılan: tüm diller.',
    paramFlattenLocales:
      '`locale=all` ile, yerelleştirilmiş alanları yerel başına nesneler olarak tutmak için false yapın. Varsayılan true.',
    paramLocale:
      'Döndürülecek yerel ayar veya her yerel ayar için `all`. API açıklamasındaki Yerelleştirme bölümüne bakın.',
    paramFallbackLocale:
      'Eksik yerelleştirilmiş değerler için geri dönülecek yerel ayar veya devre dışı bırakmak için `none`.',

    schemaSelect: 'Döndürülecek alanları seçin, örn. `select[title]=true`. Tümünü döndürmek için boş bırakın.',
    schemaPopulate: 'İlişkili dokümanları koleksiyon başına doldurun, örn. `populate[posts][title]=true`.',
    schemaJoins: 'Birleştirme başına denetimler (limit/page/sort/where/count), örn. `joins[posts][limit]=10`.',
    schemaWhere:
      'Payload `where` filtresi. Önce bir alanı, sonra bir operatörü yuvalayın: `where[field][equals]=value`. Yan tümceleri `and` / `or` dizileriyle birleştirin, örn. `where[or][0][field][equals]=value`. Her alan yalnızca kendi türü için geçerli operatörleri listeler.',
    schemaSupportedTimezones: 'IANA formatında desteklenen saat dilimleri.',
    schemaPerLocale: '`locale=all` kullanıldığında döndürülen yerel başına değerler.',

    collectionList: 'Sayfalandırılmış doküman listesi',
    collectionDoc: 'Tek bir doküman',
    collectionCreated: 'Oluşturulan doküman',
    collectionUpdated: 'Güncellenen doküman',
    collectionDeleted: 'Silinen doküman',
    collectionBulkUpdate: 'Toplu güncelleme sonucu',
    collectionBulkDelete: 'Toplu silme sonucu',
    collectionCount: 'Doküman sayısı',
    collectionDuplicated: 'Çoğaltılan doküman',

    globalDoc: 'Genel doküman',

    authLogin: 'Giriş sonucu',
    authLogout: 'Çıkış sonucu',
    authMe: 'Şu anda kimliği doğrulanmış kullanıcı',
    authRefreshToken: 'Yenilenmiş token',
    authForgotPassword: 'Parola sıfırlama e-postası gönderildi',
    authResetPassword: 'Parola sıfırlama sonucu',
    authFirstRegister: 'Bir auth token ile oluşturulan ilk kullanıcı',
    authInit: 'Bu auth koleksiyonunda henüz kullanıcı olup olmadığı',
    authAccess: 'Geçerli kullanıcının bu koleksiyon için erişimi (izinleri)',
    authUnlock: 'Kilit açma sonucu',
    authVerify: 'Doğrulama sonucu',

    versionList: 'Sayfalandırılmış sürüm listesi',
    versionSingle: 'Tek bir sürüm',
    versionRestored: 'Geri yüklenen doküman',
    versionWhere: 'Sürüm alanları üzerinde filtreleyin, örn. `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'Kuyruktaki işleri çalıştır (ve varsayılan olarak zamanlamaları işle)',
    jobsSchedulesSummary: 'Zamanlamasına göre vakti gelmiş işleri kuyruğa al',
    jobsRunResult: 'Çalıştırma sonucu',
    jobsSchedulesResult: 'Zamanlama sonucu',
    jobsRunAllQueues: 'İşleri tüm kuyruklarda çalıştır.',
    jobsLimit: 'Çalıştırılacak maksimum iş sayısı.',
    jobsDisableScheduling: '`run` komutunun varsayılan olarak yaptığı zamanlama işlemini atla.',
    jobsSilent: 'Çalıştırma günlüğünü bastır.',
    jobsSchedulesAllQueues: 'Zamanlamaları tüm kuyruklarda işle.',
    jobsQueue: 'İşlemi tek bir kuyrukla sınırla. Bilinen kuyruklar: {{queues}}.',

    uploadFile: 'Yüklenecek ikili dosya.',
    uploadBody:
      'Bir dosya yüklemek için `multipart/form-data` gönderin (ikili bir `file` bölümü ile JSON olarak dizgeleştirilmiş alanları içeren bir `_payload` bölümü) veya dosya yoksa yalnızca alanlarla `application/json` gönderin.',
    uploadPayloadField: 'JSON olarak dizgeleştirilmiş {{schema}} alanları. Örnek: `{\\"alt\\":\\"A caption\\"}`.',

    error400: 'Doğrulama veya sorgu hatası (ValidationError, QueryError)',
    error401: 'Kimlik doğrulanmadı (AuthenticationError)',
    error403: 'Erişim denetimi tarafından yasaklandı (Forbidden, UnverifiedEmail)',
    error404: 'Doküman bulunamadı (NotFound)',
    error500: 'Sunucu iç hatası (APIError)',

    securityBearer:
      'Giriş uç noktası tarafından döndürülen `token` değerini yapıştırın. `Authorization: Bearer <token>` olarak gönderilir. Payload ayrıca `JWT <token>` şemasını ve bir `{{cookiePrefix}}-token` çerezini de kabul eder.',
    securityInteractive:
      'Etkileşimli giriş: kullanıcı adını (veya e-postayı) ve parolayı girin; Client ID/Secret alanlarını boş bırakın.',

    tagCollections: 'Koleksiyonlar',
    tagCollectionsDesc: 'Doküman koleksiyonu uç noktaları (CRUD, sayım, çoğaltma).',
    tagGlobals: 'Globaller',
    tagGlobalsDesc: 'Genel doküman uç noktaları.',
    tagSystem: 'Sistem',
    tagSystemDesc: 'Payload sistem uç noktaları.',
    tagAuth: 'Kimlik Doğrulama',
    tagVersions: 'Sürümler',
    tagJobs: 'İşler',

    localizationHeading: 'Yerelleştirme',
    localizationNote:
      'Mevcut yerel ayarlar: {{locales}}. Birini seçmek için bir okuma uç noktasına `?locale=<code>` iletin. Tüm yerel ayarları aynı anda almak için `?locale=all` iletin — bu durumda her yerelleştirilmiş alan, tek bir değer yerine yerel ayar koduyla anahtarlanmış bir nesne olarak döndürülür (örn. `{ \\"en\\": \\"Hello\\", \\"de\\": \\"Hallo\\" }`). Bu yerel başına nesne biçimini korumak için `locale=all` ile birlikte `?flattenLocales=false` ayarlayın. Alan şemaları tek yerelli biçimi gösterir.',
    docLanguagesNote:
      "Bu dokümantasyon şu dillerde mevcuttur: {{languages}}. Dili değiştirmek için bu spec URL'sine `?lang=<code>` ekleyin.",
  },
}
