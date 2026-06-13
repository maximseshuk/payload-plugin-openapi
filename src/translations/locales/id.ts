import type { PluginDefaultTranslationsObject } from '../types.js'

export const id: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Berapa banyak tingkat dokumen terkait yang akan diisi.',
    paramSort: 'Field untuk pengurutan; awali dengan `-` untuk urutan menurun, mis. `-createdAt`.',
    paramSortShort: 'Field untuk pengurutan; awali dengan `-` untuk urutan menurun.',
    paramDraft: 'Mengembalikan versi draf.',
    paramTrash: 'Sertakan dokumen yang telah dibuang.',
    paramFlattenLocales:
      'Dengan `locale=all`, atur false untuk mempertahankan field terlokalisasi sebagai objek per-lokal. Default true.',
    paramLocale:
      'Lokal yang akan dikembalikan, atau `all` untuk setiap lokal. Lihat bagian Localization pada deskripsi API.',
    paramFallbackLocale: 'Lokal cadangan untuk nilai terlokalisasi yang hilang, atau `none` untuk menonaktifkan.',

    schemaSelect: 'Pilih field yang akan dikembalikan, mis. `select[title]=true`. Kosongkan untuk mengembalikan semua.',
    schemaPopulate: 'Mengisi dokumen terkait per koleksi, mis. `populate[posts][title]=true`.',
    schemaJoins: 'Kontrol per-join (limit/page/sort/where/count), mis. `joins[posts][limit]=10`.',
    schemaWhere:
      'Filter `where` Payload. Bersarangkan sebuah field lalu sebuah operator: `where[field][equals]=value`. Gabungkan klausa dengan array `and` / `or`, mis. `where[or][0][field][equals]=value`. Setiap field hanya mencantumkan operator yang valid untuk tipenya.',
    schemaSupportedTimezones: 'Zona waktu yang didukung dalam format IANA.',
    schemaPerLocale: 'Nilai per-lokal, dikembalikan saat `locale=all`.',

    collectionList: 'Daftar dokumen berpaginasi',
    collectionDoc: 'Sebuah dokumen tunggal',
    collectionCreated: 'Dokumen yang dibuat',
    collectionUpdated: 'Dokumen yang diperbarui',
    collectionDeleted: 'Dokumen yang dihapus',
    collectionBulkUpdate: 'Hasil pembaruan massal',
    collectionBulkDelete: 'Hasil penghapusan massal',
    collectionCount: 'Jumlah dokumen',
    collectionDuplicated: 'Dokumen hasil duplikasi',

    globalDoc: 'Dokumen global',

    authLogin: 'Hasil login',
    authLogout: 'Hasil logout',
    authMe: 'Pengguna yang saat ini terautentikasi',
    authRefreshToken: 'Token yang disegarkan',
    authForgotPassword: 'Email pengaturan ulang kata sandi telah dikirim',
    authResetPassword: 'Hasil pengaturan ulang kata sandi',
    authFirstRegister: 'Pengguna pertama, dibuat dengan token autentikasi',
    authInit: 'Apakah koleksi autentikasi ini sudah memiliki pengguna',
    authAccess: 'Akses (izin) pengguna saat ini untuk koleksi ini',
    authUnlock: 'Hasil pembukaan kunci',
    authVerify: 'Hasil verifikasi',

    versionList: 'Daftar versi berpaginasi',
    versionSingle: 'Sebuah versi tunggal',
    versionRestored: 'Dokumen yang dipulihkan',
    versionWhere: 'Filter atas field versi, mis. `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'Menjalankan job yang antre (dan, secara default, menangani jadwal)',
    jobsSchedulesSummary: 'Mengantrekan job yang sudah jatuh tempo sesuai jadwalnya',
    jobsRunResult: 'Hasil eksekusi',
    jobsSchedulesResult: 'Hasil penjadwalan',
    jobsRunAllQueues: 'Menjalankan job di semua antrean.',
    jobsLimit: 'Jumlah maksimum job yang dijalankan.',
    jobsDisableScheduling: 'Lewati penanganan jadwal yang dilakukan `run` secara default.',
    jobsSilent: 'Menonaktifkan pencatatan log eksekusi.',
    jobsSchedulesAllQueues: 'Menangani jadwal di semua antrean.',
    jobsQueue: 'Membatasi operasi ke satu antrean. Antrean yang dikenal: {{queues}}.',

    uploadFile: 'File biner yang akan diunggah.',
    uploadBody:
      'Kirim `multipart/form-data` untuk mengunggah file (sebuah bagian biner `file` ditambah sebuah bagian `_payload` berisi field yang sudah di-JSON-stringify), atau `application/json` hanya dengan field saja jika tidak ada file.',
    uploadPayloadField: 'Field {{schema}} yang sudah di-JSON-stringify. Contoh: `{"alt":"A caption"}`.',

    error400: 'Galat validasi atau kueri (ValidationError, QueryError)',
    error401: 'Tidak terautentikasi (AuthenticationError)',
    error403: 'Dilarang oleh kontrol akses (Forbidden, UnverifiedEmail)',
    error404: 'Dokumen tidak ditemukan (NotFound)',
    error500: 'Galat server internal (APIError)',

    securityBearer:
      'Tempelkan `token` yang dikembalikan oleh endpoint login. Dikirim sebagai `Authorization: Bearer <token>`. Payload juga menerima skema `JWT <token>` dan cookie `{{cookiePrefix}}-token`.',
    securityInteractive:
      'Login interaktif: masukkan nama pengguna (atau email) dan kata sandi; biarkan Client ID/Secret kosong.',

    tagCollections: 'Koleksi',
    tagCollectionsDesc: 'Endpoint koleksi dokumen (CRUD, count, duplikasi).',
    tagGlobals: 'Global',
    tagGlobalsDesc: 'Endpoint dokumen global.',
    tagSystem: 'Sistem',
    tagSystemDesc: 'Endpoint sistem Payload.',
    tagAuth: 'Autentikasi',
    tagVersions: 'Versi',
    tagJobs: 'Job',

    localizationHeading: 'Localization',
    localizationNote:
      'Lokal yang tersedia: {{locales}}. Berikan `?locale=<code>` ke endpoint baca untuk memilih satu. Berikan `?locale=all` untuk menerima setiap lokal sekaligus — setiap field terlokalisasi kemudian dikembalikan sebagai objek dengan kunci kode lokal (mis. `{ "en": "Hello", "de": "Hallo" }`) alih-alih satu nilai. Atur `?flattenLocales=false` dengan `locale=all` untuk mempertahankan bentuk objek per-lokal tersebut. Skema field menampilkan bentuk lokal tunggal.',
    docLanguagesNote:
      'Dokumentasi ini tersedia dalam: {{languages}}. Tambahkan `?lang=<code>` ke URL spesifikasi ini untuk beralih.',
  },
}
