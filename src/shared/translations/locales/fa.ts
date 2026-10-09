import type { PluginDefaultTranslationsObject } from '@/shared/translations/types.js'

export const fa: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'چند سطح از اسناد مرتبط باید پر شوند.',
    paramSort: 'فیلدی که بر اساس آن مرتب‌سازی شود؛ برای ترتیب نزولی پیشوند `-` بگذارید، مثلاً `-createdAt`.',
    paramSortShort: 'فیلدی که بر اساس آن مرتب‌سازی شود؛ برای ترتیب نزولی پیشوند `-` بگذارید.',
    paramDraft: 'بازگرداندن نسخه‌های پیش‌نویس.',
    paramTrash: 'شامل اسناد حذف‌شده (در سطل زباله) شود.',
    paramAutosave: 'ذخیره به‌صورت ذخیرهٔ خودکار: به‌جای افزودن نسخهٔ جدید، آخرین نسخهٔ ذخیرهٔ خودکار به‌روز می‌شود.',
    paramPublishAllLocales: 'انتشار همهٔ زبان‌ها، نه فقط زبان درخواست.',
    paramUnpublishAllLocales: 'لغو انتشار همهٔ زبان‌ها و بازگرداندن سند به پیش‌نویس.',
    paramOverrideLock: 'نادیده گرفتن قفل کاربر دیگر. پیش‌فرض false.',
    paramSelectedLocales: 'فقط این زبان‌ها در نسخهٔ تکراری کپی شوند. پیش‌فرض: همهٔ زبان‌ها.',
    paramFlattenLocales:
      'با `locale=all`، مقدار false را تنظیم کنید تا فیلدهای محلی‌سازی‌شده به‌صورت اشیای جداگانه برای هر زبان نگه داشته شوند. مقدار پیش‌فرض true است.',
    paramLocale:
      'زبانی که باید بازگردانده شود، یا `all` برای همه زبان‌ها. به بخش بومی‌سازی (Localization) در توضیحات API مراجعه کنید.',
    paramFallbackLocale:
      'زبانی که در صورت نبودن مقادیر محلی‌سازی‌شده به آن بازگشت داده شود، یا `none` برای غیرفعال کردن.',
    paramValidateLocale:
      'زبان‌هایی که باید اعتبارسنجی شوند، یا `all` برای همه زبان‌ها. برای بیش از یک زبان، پارامتر را تکرار کنید.',
    paramComputeHierarchyPaths:
      'برای محاسبه مسیرهای `{{slugPath}}` و `{{titlePath}}` مقدار true بدهید. انتخاب هر یک از این فیلدها هم آن‌ها را محاسبه می‌کند.',

    schemaSelect:
      'فیلدهایی که باید بازگردانده شوند را انتخاب کنید، مثلاً `select[title]=true`. برای بازگرداندن همه، حذفش کنید.',
    schemaPopulate: 'پر کردن اسناد مرتبط برای هر مجموعه، مثلاً `populate[posts][title]=true`.',
    schemaJoins: 'کنترل‌های مربوط به هر join (limit/page/sort/where/count)، مثلاً `joins[posts][limit]=10`.',
    schemaWhere:
      'فیلتر `where` در Payload. ابتدا یک فیلد و سپس یک عملگر را تو در تو بنویسید: `where[field][equals]=value`. شرط‌ها را با آرایه‌های `and` / `or` ترکیب کنید، مثلاً `where[or][0][field][equals]=value`. هر فیلد فقط عملگرهای معتبر برای نوع خود را فهرست می‌کند.',
    schemaSupportedTimezones: 'منطقه‌های زمانی پشتیبانی‌شده با قالب IANA.',
    schemaPerLocale: 'مقادیر هر زبان، که هنگام `locale=all` بازگردانده می‌شوند.',
    schemaHierarchySlugPath:
      'مسیر اسلاگ، مثلاً `parent/child`. هنگام خواندن با `computeHierarchyPaths=true` یا در صورت انتخاب محاسبه می‌شود. در `where` قابل استفاده نیست.',
    schemaHierarchyTitlePath:
      'مسیر عنوان، مثلاً `Parent/Child`. هنگام خواندن با `computeHierarchyPaths=true` یا در صورت انتخاب محاسبه می‌شود. در `where` قابل استفاده نیست.',

    collectionList: 'فهرست صفحه‌بندی‌شده اسناد',
    collectionDoc: 'یک سند واحد',
    collectionCreated: 'سند ایجادشده',
    collectionUpdated: 'سند به‌روزرسانی‌شده',
    collectionDeleted: 'سند حذف‌شده',
    collectionBulkUpdate: 'نتیجه به‌روزرسانی گروهی',
    collectionBulkDelete: 'نتیجه حذف گروهی',
    collectionCount: 'تعداد اسناد',
    collectionDuplicated: 'سند تکثیرشده',
    validateResult:
      'نتیجه اعتبارسنجی. چیزی ذخیره نمی‌شود. مقادیر نامعتبر فیلدها به‌جای وضعیت خطا، `valid: false` را همراه با خطاها برمی‌گردانند.',
    validateBody:
      'داده‌های سند برای اعتبارسنجی. در یک سند ذخیره‌شده یا سند سراسری (global)، داده‌ها روی آخرین پیش‌نویس ادغام می‌شوند، و اگر پیش‌نویسی نباشد روی سند ذخیره‌شده.',

    globalDoc: 'سند سراسری (global)',

    authLogin: 'نتیجه ورود',
    authLogout: 'نتیجه خروج',
    authMe: 'کاربری که در حال حاضر احراز هویت شده است',
    authRefreshToken: 'توکن تازه‌سازی‌شده',
    authForgotPassword: 'ایمیل بازنشانی رمز عبور ارسال شد',
    authResetPassword: 'نتیجه بازنشانی رمز عبور',
    authFirstRegister: 'نخستین کاربر، که همراه با یک توکن احراز هویت ایجاد شد',
    authInit: 'اینکه آیا این مجموعه احراز هویت تاکنون کاربری دارد یا خیر',
    authAccess: 'مجوزهای کاربر فعلی برای همه مجموعه‌ها و سراسری‌ها',
    docAccess: 'مجوزهای کاربر فعلی برای این سند',
    docAccessBody:
      'داده‌های سند برای بررسی دسترسی. بدون آن، Payload از سند ذخیره‌شده استفاده می‌کند، اگر وجود داشته باشد.',
    authUnlock: 'نتیجه باز کردن قفل',
    authVerify: 'نتیجه تأیید',
    apiKeyReveal: 'کلید API رمزگشایی‌شده',

    versionList: 'فهرست صفحه‌بندی‌شده نسخه‌ها',
    versionSingle: 'یک نسخه واحد',
    versionRestored: 'سند بازیابی‌شده',
    versionWhere: 'فیلتر روی فیلدهای نسخه، مثلاً `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'اجرای کارهای در صف (و به‌طور پیش‌فرض، رسیدگی به زمان‌بندی‌ها)',
    jobsSchedulesSummary: 'به صف افزودن کارهایی که طبق زمان‌بندی‌شان موعدشان رسیده است',
    jobsRunResult: 'نتیجه اجرا',
    jobsSchedulesResult: 'نتیجه زمان‌بندی',
    jobsRunAllQueues: 'اجرای کارها در همه صف‌ها.',
    jobsLimit: 'حداکثر تعداد کارهایی که اجرا شوند.',
    jobsDisableScheduling: 'رد شدن از رسیدگی به زمان‌بندی که `run` به‌طور پیش‌فرض انجام می‌دهد.',
    jobsSilent: 'سرکوب گزارش‌گیری اجرا.',
    jobsSchedulesAllQueues: 'رسیدگی به زمان‌بندی‌ها در همه صف‌ها.',
    jobsQueue: 'محدود کردن عملیات به یک صف واحد. صف‌های شناخته‌شده: {{queues}}.',

    uploadFile: 'فایل باینری برای بارگذاری.',
    uploadBody:
      'برای بارگذاری یک فایل، `multipart/form-data` ارسال کنید (یک بخش باینری `file` به‌علاوه یک بخش `_payload` حاوی فیلدهای به‌صورت JSON رشته‌شده)، یا وقتی فایلی وجود ندارد، `application/json` فقط با فیلدها ارسال کنید.',
    uploadPayloadField: 'فیلدهای {{schema}} به‌صورت JSON رشته‌شده. مثال: `{\\"alt\\":\\"A caption\\"}`.',
    fileServe: 'فایل',
    filePartial: 'بخشی از فایل، برای درخواست `Range`',
    paramFileVersion: 'فایل ذخیره‌شده با این شناسه نسخه را برمی‌گرداند.',
    uploadInstructionsSummary: 'دریافت دستورالعمل بارگذاری فایل پیش از ذخیره سند',
    uploadInstructionsResult: 'مقصد ارسال بایت‌های فایل و مقدار `file` که همراه درخواست ایجاد یا به‌روزرسانی ارسال می‌شود',
    uploadStagePutSummary: 'ارسال بایت‌های فایل برای بارگذاری موقت',
    uploadStageDeleteSummary: 'حذف بارگذاری موقت',
    uploadStageResult: 'انجام شد، بدون محتوا',

    error400: 'خطای اعتبارسنجی یا پرس‌وجو (ValidationError, QueryError)',
    error401: 'احراز هویت نشده (AuthenticationError)',
    error403: 'ممنوع توسط کنترل دسترسی (Forbidden, UnverifiedEmail)',
    error404: 'سند یافت نشد (NotFound)',
    error500: 'خطای داخلی سرور (APIError)',

    securityBearer:
      '`token` بازگردانده‌شده توسط نقطه پایانی ورود را الصاق کنید. به‌صورت `Authorization: Bearer <token>` ارسال می‌شود. Payload همچنین طرح `JWT <token>` و کوکی `{{cookiePrefix}}-token` را می‌پذیرد.',
    securityInteractive:
      'ورود تعاملی: نام کاربری (یا ایمیل) و رمز عبور را وارد کنید؛ Client ID/Secret را خالی بگذارید.',

    tagCollections: 'مجموعه‌ها',
    tagCollectionsDesc: 'نقاط پایانی مجموعه اسناد (CRUD، شمارش، تکثیر).',
    tagGlobals: 'سراسری‌ها',
    tagGlobalsDesc: 'نقاط پایانی اسناد سراسری.',
    tagSystem: 'سیستم',
    tagSystemDesc: 'نقاط پایانی سیستمی Payload.',
    tagAuth: 'احراز هویت',
    tagVersions: 'نسخه‌ها',
    tagJobs: 'کارها',
    tagUploads: 'بارگذاری‌ها',
    tagAccess: 'دسترسی',

    localizationHeading: 'بومی‌سازی',
    localizationNote:
      'زبان‌های موجود: {{locales}}. برای انتخاب یک زبان، `?locale=<code>` را به یک نقطه پایانی خواندنی ارسال کنید. برای دریافت همه زبان‌ها به‌طور هم‌زمان، `?locale=all` را ارسال کنید — در این حالت هر فیلد محلی‌سازی‌شده به‌جای یک مقدار واحد، به‌صورت یک شیء با کلید کد زبان بازگردانده می‌شود (مثلاً `{ \\"en\\": \\"Hello\\", \\"de\\": \\"Hallo\\" }`). برای حفظ همان قالب شیء به‌ازای هر زبان، `?flattenLocales=false` را همراه با `locale=all` تنظیم کنید. اسکیماهای فیلد، شکل تک‌زبانه را نشان می‌دهند.',
    docLanguagesNote:
      'این مستندات به این زبان‌ها در دسترس است: {{languages}}. برای تغییر زبان، `?lang=<code>` را به انتهای نشانی این اسپک اضافه کنید.',
  },
}
