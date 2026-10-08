import type { PluginDefaultTranslationsObject } from '../types.js'

export const az: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Əlaqəli sənədlərin neçə səviyyəsinin doldurulacağı.',
    paramSort: 'Sıralanacaq sahə; azalan sıra üçün önünə `-` əlavə edin, məs. `-createdAt`.',
    paramSortShort: 'Sıralanacaq sahə; azalan sıra üçün önünə `-` əlavə edin.',
    paramDraft: 'Qaralama versiyalarını qaytarın.',
    paramTrash: 'Zibilə atılmış sənədləri daxil edin.',
    paramAutosave:
      'Avtomatik yadda saxlama kimi saxlayın: yeni versiya əlavə etmək əvəzinə son avtomatik versiyanı yeniləyin.',
    paramPublishAllLocales: 'Yalnız sorğu dilini deyil, bütün dilləri dərc edin.',
    paramUnpublishAllLocales: 'Bütün dillərin dərcini ləğv edin və sənədi qaralamaya qaytarın.',
    paramOverrideLock: 'Başqa istifadəçinin kilidinə məhəl qoymayın. Defolt false.',
    paramSelectedLocales: 'Dublikata yalnız bu dilləri köçürün. Defolt: bütün dillər.',
    paramFlattenLocales:
      '`locale=all` ilə, lokallaşdırılmış sahələri hər lokal üzrə obyekt kimi saxlamaq üçün false təyin edin. Standart olaraq true.',
    paramLocale: 'Qaytarılacaq lokal, və ya hər lokal üçün `all`. API təsvirindəki Lokallaşdırma bölməsinə baxın.',
    paramFallbackLocale: 'Çatışmayan lokallaşdırılmış dəyərlər üçün geri dönüləcək lokal, və ya söndürmək üçün `none`.',

    schemaSelect: 'Qaytarılacaq sahələri seçin, məs. `select[title]=true`. Hamısını qaytarmaq üçün buraxın.',
    schemaPopulate: 'Hər kolleksiya üzrə əlaqəli sənədləri doldurun, məs. `populate[posts][title]=true`.',
    schemaJoins: 'Hər birləşmə üzrə nəzarət elementləri (limit/page/sort/where/count), məs. `joins[posts][limit]=10`.',
    schemaWhere:
      'Payload `where` filtri. Əvvəlcə sahəni, sonra operatoru yuvalandırın: `where[field][equals]=value`. Şərtləri `and` / `or` massivləri ilə birləşdirin, məs. `where[or][0][field][equals]=value`. Hər sahə yalnız öz tipinə uyğun operatorları sadalayır.',
    schemaSupportedTimezones: 'IANA formatında dəstəklənən saat qurşaqları.',
    schemaPerLocale: '`locale=all` zamanı qaytarılan hər lokal üzrə dəyərlər.',

    collectionList: 'Səhifələnmiş sənəd siyahısı',
    collectionDoc: 'Tək sənəd',
    collectionCreated: 'Yaradılmış sənəd',
    collectionUpdated: 'Yenilənmiş sənəd',
    collectionDeleted: 'Silinmiş sənəd',
    collectionBulkUpdate: 'Toplu yeniləmə nəticəsi',
    collectionBulkDelete: 'Toplu silmə nəticəsi',
    collectionCount: 'Sənəd sayı',
    collectionDuplicated: 'Dublikat edilmiş sənəd',

    globalDoc: 'Qlobal sənəd',

    authLogin: 'Giriş nəticəsi',
    authLogout: 'Çıxış nəticəsi',
    authMe: 'Hazırda autentifikasiya olunmuş istifadəçi',
    authRefreshToken: 'Yenilənmiş token',
    authForgotPassword: 'Parol sıfırlama e-poçtu göndərildi',
    authResetPassword: 'Parol sıfırlama nəticəsi',
    authFirstRegister: 'Autentifikasiya tokeni ilə yaradılmış ilk istifadəçi',
    authInit: 'Bu autentifikasiya kolleksiyasında hələ hər hansı istifadəçinin olub-olmaması',
    authAccess: 'Cari istifadəçinin bu kolleksiya üçün girişi (icazələri)',
    authUnlock: 'Kiliddən çıxarma nəticəsi',
    authVerify: 'Doğrulama nəticəsi',

    versionList: 'Səhifələnmiş versiya siyahısı',
    versionSingle: 'Tək versiya',
    versionRestored: 'Bərpa edilmiş sənəd',
    versionWhere: 'Versiya sahələri üzrə filtr, məs. `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'Növbədəki işləri icra edin (və standart olaraq cədvəlləri idarə edin)',
    jobsSchedulesSummary: 'Cədvəlinə görə vaxtı çatmış işləri növbəyə qoyun',
    jobsRunResult: 'İcra nəticəsi',
    jobsSchedulesResult: 'Cədvəlləmə nəticəsi',
    jobsRunAllQueues: 'Bütün növbələrdə işləri icra edin.',
    jobsLimit: 'İcra ediləcək maksimum iş sayı.',
    jobsDisableScheduling: '`run` əməliyyatının standart olaraq etdiyi cədvəl idarəetməsini ötürün.',
    jobsSilent: 'İcra qeydiyyatını söndürün.',
    jobsSchedulesAllQueues: 'Bütün növbələrdə cədvəlləri idarə edin.',
    jobsQueue: 'Əməliyyatı tək növbə ilə məhdudlaşdırın. Məlum növbələr: {{queues}}.',

    uploadFile: 'Yüklənəcək binar fayl.',
    uploadBody:
      'Fayl yükləmək üçün `multipart/form-data` göndərin (binar `file` hissəsi və JSON-a çevrilmiş sahələri olan `_payload` hissəsi), və ya fayl olmadıqda yalnız sahələrlə `application/json` göndərin.',
    uploadPayloadField: 'JSON-a çevrilmiş {{schema}} sahələri. Nümunə: `{"alt":"A caption"}`.',

    error400: 'Doğrulama və ya sorğu xətası (ValidationError, QueryError)',
    error401: 'Autentifikasiya olunmayıb (AuthenticationError)',
    error403: 'Giriş nəzarəti tərəfindən qadağan edilib (Forbidden, UnverifiedEmail)',
    error404: 'Sənəd tapılmadı (NotFound)',
    error500: 'Daxili server xətası (APIError)',

    securityBearer:
      'Giriş endpointinin qaytardığı `token`-i yapışdırın. `Authorization: Bearer <token>` kimi göndərilir. Payload həmçinin `JWT <token>` sxemini və `{{cookiePrefix}}-token` kukisini qəbul edir.',
    securityInteractive:
      'İnteraktiv giriş: istifadəçi adını (və ya e-poçtu) və parolu daxil edin; Client ID/Secret sahələrini boş buraxın.',

    tagCollections: 'Kolleksiyalar',
    tagCollectionsDesc: 'Sənəd kolleksiyası endpointləri (CRUD, sayma, dublikat).',
    tagGlobals: 'Qloballar',
    tagGlobalsDesc: 'Qlobal sənəd endpointləri.',
    tagSystem: 'Sistem',
    tagSystemDesc: 'Payload sistem endpointləri.',
    tagAuth: 'Autentifikasiya',
    tagVersions: 'Versiyalar',
    tagJobs: 'İşlər',

    localizationHeading: 'Lokallaşdırma',
    localizationNote:
      'Mövcud lokallar: {{locales}}. Birini seçmək üçün oxuma endpointinə `?locale=<code>` ötürün. Bütün lokalları eyni anda almaq üçün `?locale=all` ötürün — onda hər lokallaşdırılmış sahə tək dəyər əvəzinə lokal koduna görə açarlanmış obyekt kimi qaytarılır (məs. `{ "en": "Hello", "de": "Hallo" }`). Həmin hər lokal üzrə obyekt formasını saxlamaq üçün `locale=all` ilə birlikdə `?flattenLocales=false` təyin edin. Sahə sxemləri tək lokal formasını göstərir.',
    docLanguagesNote:
      'Bu sənədlər aşağıdakı dillərdə mövcuddur: {{languages}}. Dili dəyişmək üçün bu spesifikasiya URL-inə `?lang=<code>` əlavə edin.',
  },
}
