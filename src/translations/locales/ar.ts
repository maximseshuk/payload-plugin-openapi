import type { PluginDefaultTranslationsObject } from '../types.js'

export const ar: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'عدد مستويات المستندات المرتبطة المراد جلبها.',
    paramSort: 'الحقل المراد الترتيب حسبه؛ ضع البادئة `-` للترتيب التنازلي، مثل `-createdAt`.',
    paramSortShort: 'الحقل المراد الترتيب حسبه؛ ضع البادئة `-` للترتيب التنازلي.',
    paramDraft: 'إرجاع نسخ المسودة.',
    paramTrash: 'تضمين المستندات المحذوفة.',
    paramAutosave: 'الحفظ كحفظ تلقائي: تحديث آخر نسخة محفوظة تلقائيًا بدلًا من إضافة نسخة جديدة.',
    paramPublishAllLocales: 'نشر كل اللغات، وليس لغة الطلب فقط.',
    paramUnpublishAllLocales: 'إلغاء نشر كل اللغات وإعادة المستند إلى مسودة.',
    paramOverrideLock: 'تجاهل القفل الذي يملكه مستخدم آخر. الافتراضي false.',
    paramSelectedLocales: 'نسخ هذه اللغات فقط إلى النسخة المكررة. الافتراضي: كل اللغات.',
    paramFlattenLocales:
      'مع `locale=all`، اضبط على false للإبقاء على الحقول المترجمة ككائنات لكل لغة. القيمة الافتراضية true.',
    paramLocale: 'اللغة المراد إرجاعها، أو `all` لكل اللغات. راجع قسم الترجمة في وصف الـ API.',
    paramFallbackLocale: 'اللغة الاحتياطية للقيم المترجمة المفقودة، أو `none` للتعطيل.',

    schemaSelect: 'اختر الحقول المراد إرجاعها، مثل `select[title]=true`. اتركه فارغًا لإرجاع الكل.',
    schemaPopulate: 'جلب المستندات المرتبطة لكل مجموعة، مثل `populate[posts][title]=true`.',
    schemaJoins: 'عناصر تحكم لكل ربط (limit/page/sort/where/count)، مثل `joins[posts][limit]=10`.',
    schemaWhere:
      'مرشح `where` الخاص بـ Payload. ضمّن حقلاً ثم عاملاً: `where[field][equals]=value`. ادمج الجمل باستخدام المصفوفتين `and` / `or`، مثل `where[or][0][field][equals]=value`. يسرد كل حقل فقط العوامل الصالحة لنوعه.',
    schemaSupportedTimezones: 'المناطق الزمنية المدعومة بتنسيق IANA.',
    schemaPerLocale: 'القيم لكل لغة، تُرجَع عند استخدام `locale=all`.',

    collectionList: 'قائمة مستندات مقسّمة إلى صفحات',
    collectionDoc: 'مستند واحد',
    collectionCreated: 'المستند المُنشأ',
    collectionUpdated: 'المستند المُحدَّث',
    collectionDeleted: 'المستند المحذوف',
    collectionBulkUpdate: 'نتيجة التحديث المجمّع',
    collectionBulkDelete: 'نتيجة الحذف المجمّع',
    collectionCount: 'عدد المستندات',
    collectionDuplicated: 'المستند المُكرَّر',

    globalDoc: 'المستند العام',

    authLogin: 'نتيجة تسجيل الدخول',
    authLogout: 'نتيجة تسجيل الخروج',
    authMe: 'المستخدم المُصادَق عليه حاليًا',
    authRefreshToken: 'رمز مُحدَّث',
    authForgotPassword: 'تم إرسال بريد إعادة تعيين كلمة المرور',
    authResetPassword: 'نتيجة إعادة تعيين كلمة المرور',
    authFirstRegister: 'المستخدم الأول، تم إنشاؤه برمز مصادقة',
    authInit: 'ما إذا كان لدى مجموعة المصادقة هذه أي مستخدمين بعد',
    authAccess: 'صلاحيات (أذونات) المستخدم الحالي لهذه المجموعة',
    authUnlock: 'نتيجة إلغاء القفل',
    authVerify: 'نتيجة التحقق',

    versionList: 'قائمة إصدارات مقسّمة إلى صفحات',
    versionSingle: 'إصدار واحد',
    versionRestored: 'المستند المُستعاد',
    versionWhere: 'تصفية حقول الإصدار، مثل `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'تشغيل المهام المُدرَجة في قائمة الانتظار (ومعالجة الجداول الزمنية افتراضيًا)',
    jobsSchedulesSummary: 'إدراج المهام المستحقة وفقًا لجدولها الزمني في قائمة الانتظار',
    jobsRunResult: 'نتيجة التشغيل',
    jobsSchedulesResult: 'نتيجة الجدولة',
    jobsRunAllQueues: 'تشغيل المهام عبر جميع قوائم الانتظار.',
    jobsLimit: 'الحد الأقصى للمهام المراد تشغيلها.',
    jobsDisableScheduling: 'تخطّي معالجة الجداول الزمنية التي يقوم بها `run` افتراضيًا.',
    jobsSilent: 'إخفاء سجلات التشغيل.',
    jobsSchedulesAllQueues: 'معالجة الجداول الزمنية عبر جميع قوائم الانتظار.',
    jobsQueue: 'تقييد العملية بقائمة انتظار واحدة. قوائم الانتظار المعروفة: {{queues}}.',

    uploadFile: 'الملف الثنائي المراد رفعه.',
    uploadBody:
      'أرسِل `multipart/form-data` لرفع ملف (جزء ثنائي `file` بالإضافة إلى جزء `_payload` يحتوي على الحقول بصيغة JSON)، أو `application/json` بالحقول فقط في حال عدم وجود ملف.',
    uploadPayloadField: 'حقول {{schema}} بصيغة JSON. مثال: `{"alt":"A caption"}`.',

    error400: 'خطأ في التحقق أو الاستعلام (ValidationError، QueryError)',
    error401: 'غير مُصادَق عليه (AuthenticationError)',
    error403: 'محظور بواسطة التحكم في الوصول (Forbidden، UnverifiedEmail)',
    error404: 'المستند غير موجود (NotFound)',
    error500: 'خطأ داخلي في الخادم (APIError)',

    securityBearer:
      'الصق الرمز `token` الذي يُرجعه نقطة نهاية تسجيل الدخول. يُرسَل بصيغة `Authorization: Bearer <token>`. يقبل Payload أيضًا مخطط `JWT <token>` وملف تعريف ارتباط `{{cookiePrefix}}-token`.',
    securityInteractive:
      'تسجيل دخول تفاعلي: أدخِل اسم المستخدم (أو البريد الإلكتروني) وكلمة المرور؛ اترك Client ID/Secret فارغين.',

    tagCollections: 'المجموعات',
    tagCollectionsDesc: 'نقاط نهاية مجموعات المستندات (CRUD، العدّ، التكرار).',
    tagGlobals: 'العناصر العامة',
    tagGlobalsDesc: 'نقاط نهاية المستندات العامة.',
    tagSystem: 'النظام',
    tagSystemDesc: 'نقاط نهاية نظام Payload.',
    tagAuth: 'المصادقة',
    tagVersions: 'الإصدارات',
    tagJobs: 'المهام',

    localizationHeading: 'الترجمة',
    localizationNote:
      'اللغات المتاحة: {{locales}}. مرّر `?locale=<code>` إلى نقطة نهاية قراءة لاختيار لغة واحدة. مرّر `?locale=all` لتلقّي كل اللغات دفعة واحدة — عندئذٍ يُرجَع كل حقل مترجم ككائن مفهرس بحسب رمز اللغة (مثل `{ "en": "Hello", "de": "Hallo" }`) بدلاً من قيمة واحدة. اضبط `?flattenLocales=false` مع `locale=all` للإبقاء على شكل الكائن لكل لغة. تعرض مخططات الحقول شكل اللغة الواحدة.',
    docLanguagesNote:
      'يتوفر هذا التوثيق باللغات التالية: {{languages}}. أضِف `?lang=<code>` إلى عنوان URL لهذه المواصفة للتبديل.',
  },
}
