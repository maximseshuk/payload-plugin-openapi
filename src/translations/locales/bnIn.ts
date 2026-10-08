import type { PluginDefaultTranslationsObject } from '../types.js'

export const bnIn: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'কতগুলো স্তরের সম্পর্কিত নথি পপুলেট করা হবে।',
    paramSort: 'যে ফিল্ড অনুযায়ী সাজানো হবে; অবরোহী ক্রমের জন্য `-` দিয়ে শুরু করুন, যেমন `-createdAt`।',
    paramSortShort: 'যে ফিল্ড অনুযায়ী সাজানো হবে; অবরোহী ক্রমের জন্য `-` দিয়ে শুরু করুন।',
    paramDraft: 'খসড়া সংস্করণ ফেরত দিন।',
    paramTrash: 'আবর্জনায় থাকা নথি অন্তর্ভুক্ত করুন।',
    paramAutosave: 'অটোসেভ হিসেবে সংরক্ষণ করুন: নতুন সংস্করণ যোগ না করে সর্বশেষ অটোসেভ সংস্করণ আপডেট করুন।',
    paramPublishAllLocales: 'শুধু অনুরোধের ভাষা নয়, সব ভাষা প্রকাশ করুন।',
    paramUnpublishAllLocales: 'সব ভাষার প্রকাশ বাতিল করে নথিটিকে আবার খসড়া করুন।',
    paramOverrideLock: 'অন্য ব্যবহারকারীর লক উপেক্ষা করুন। ডিফল্ট false।',
    paramSelectedLocales: 'প্রতিলিপিতে শুধু এই ভাষাগুলি কপি করুন। ডিফল্ট: সব ভাষা।',
    paramFlattenLocales: '`locale=all` সহ, স্থানীয়কৃত ফিল্ডগুলো প্রতি-লোকেল অবজেক্ট হিসেবে রাখতে false সেট করুন। ডিফল্ট true।',
    paramLocale: 'যে লোকেল ফেরত দেওয়া হবে, অথবা প্রতিটি লোকেলের জন্য `all`। API বিবরণে Localization বিভাগটি দেখুন।',
    paramFallbackLocale: 'অনুপস্থিত স্থানীয়কৃত মানের জন্য যে লোকেলে ফিরে যাওয়া হবে, অথবা নিষ্ক্রিয় করতে `none`।',

    schemaSelect: 'যে ফিল্ডগুলো ফেরত দেওয়া হবে তা বেছে নিন, যেমন `select[title]=true`। সব ফেরত দিতে বাদ দিন।',
    schemaPopulate: 'প্রতিটি কালেকশন অনুযায়ী সম্পর্কিত নথি পপুলেট করুন, যেমন `populate[posts][title]=true`।',
    schemaJoins: 'প্রতি-join নিয়ন্ত্রণ (limit/page/sort/where/count), যেমন `joins[posts][limit]=10`।',
    schemaWhere:
      'Payload `where` ফিল্টার। একটি ফিল্ড তারপর একটি অপারেটর নেস্ট করুন: `where[field][equals]=value`। `and` / `or` অ্যারে দিয়ে ক্লজগুলো একত্র করুন, যেমন `where[or][0][field][equals]=value`। প্রতিটি ফিল্ড কেবল তার টাইপের জন্য বৈধ অপারেটরগুলোই তালিকাভুক্ত করে।',
    schemaSupportedTimezones: 'IANA ফরম্যাটে সমর্থিত টাইমজোন।',
    schemaPerLocale: 'প্রতি-লোকেল মান, `locale=all` দিলে ফেরত দেওয়া হয়।',

    collectionList: 'নথির পেজিনেটেড তালিকা',
    collectionDoc: 'একটি একক নথি',
    collectionCreated: 'তৈরি করা নথি',
    collectionUpdated: 'আপডেট করা নথি',
    collectionDeleted: 'মুছে ফেলা নথি',
    collectionBulkUpdate: 'বাল্ক আপডেটের ফলাফল',
    collectionBulkDelete: 'বাল্ক ডিলিটের ফলাফল',
    collectionCount: 'নথির সংখ্যা',
    collectionDuplicated: 'নকল করা নথি',

    globalDoc: 'গ্লোবাল নথি',

    authLogin: 'লগইনের ফলাফল',
    authLogout: 'লগআউটের ফলাফল',
    authMe: 'বর্তমানে প্রমাণীকৃত ব্যবহারকারী',
    authRefreshToken: 'রিফ্রেশ করা টোকেন',
    authForgotPassword: 'পাসওয়ার্ড রিসেট ইমেল পাঠানো হয়েছে',
    authResetPassword: 'পাসওয়ার্ড রিসেটের ফলাফল',
    authFirstRegister: 'প্রথম ব্যবহারকারী, একটি auth টোকেন সহ তৈরি করা হয়েছে',
    authInit: 'এই auth কালেকশনে এখনও কোনো ব্যবহারকারী আছে কিনা',
    authAccess: 'এই কালেকশনের জন্য বর্তমান ব্যবহারকারীর অ্যাক্সেস (অনুমতি)',
    authUnlock: 'আনলকের ফলাফল',
    authVerify: 'যাচাইয়ের ফলাফল',

    versionList: 'সংস্করণের পেজিনেটেড তালিকা',
    versionSingle: 'একটি একক সংস্করণ',
    versionRestored: 'পুনরুদ্ধার করা নথি',
    versionWhere: 'সংস্করণের ফিল্ডগুলোর উপর ফিল্টার করুন, যেমন `where[parent][equals]=<docId>`।',

    jobsRunSummary: 'সারিবদ্ধ জব চালান (এবং, ডিফল্টভাবে, সময়সূচি পরিচালনা করুন)',
    jobsSchedulesSummary: 'যেসব জব তাদের সময়সূচি অনুযায়ী চালানোর সময় হয়েছে সেগুলো সারিবদ্ধ করুন',
    jobsRunResult: 'চালানোর ফলাফল',
    jobsSchedulesResult: 'সময়সূচি নির্ধারণের ফলাফল',
    jobsRunAllQueues: 'সব সারি জুড়ে জব চালান।',
    jobsLimit: 'সর্বোচ্চ যতগুলো জব চালানো হবে।',
    jobsDisableScheduling: '`run` ডিফল্টভাবে যে সময়সূচি পরিচালনা করে তা এড়িয়ে যান।',
    jobsSilent: 'চালানোর লগিং দমন করুন।',
    jobsSchedulesAllQueues: 'সব সারি জুড়ে সময়সূচি পরিচালনা করুন।',
    jobsQueue: 'অপারেশনটি একটিমাত্র সারিতে সীমাবদ্ধ করুন। পরিচিত সারি: {{queues}}।',

    uploadFile: 'আপলোড করার জন্য বাইনারি ফাইল।',
    uploadBody:
      'কোনো ফাইল আপলোড করতে `multipart/form-data` পাঠান (একটি বাইনারি `file` অংশ এবং JSON-স্ট্রিংকৃত ফিল্ডসহ একটি `_payload` অংশ), অথবা যখন কোনো ফাইল নেই তখন শুধু ফিল্ডগুলোসহ `application/json` পাঠান।',
    uploadPayloadField: 'JSON-স্ট্রিংকৃত {{schema}} ফিল্ড। উদাহরণ: `{"alt":"A caption"}`।',

    error400: 'যাচাই বা কোয়েরি ত্রুটি (ValidationError, QueryError)',
    error401: 'প্রমাণীকৃত নয় (AuthenticationError)',
    error403: 'অ্যাক্সেস নিয়ন্ত্রণ দ্বারা নিষিদ্ধ (Forbidden, UnverifiedEmail)',
    error404: 'নথি পাওয়া যায়নি (NotFound)',
    error500: 'অভ্যন্তরীণ সার্ভার ত্রুটি (APIError)',

    securityBearer:
      'লগইন এন্ডপয়েন্ট থেকে ফেরত আসা `token` পেস্ট করুন। `Authorization: Bearer <token>` হিসেবে পাঠানো হয়। Payload `JWT <token>` স্কিম এবং একটি `{{cookiePrefix}}-token` কুকিও গ্রহণ করে।',
    securityInteractive: 'ইন্টারঅ্যাক্টিভ লগইন: ব্যবহারকারীর নাম (বা ইমেল) এবং পাসওয়ার্ড লিখুন; Client ID/Secret খালি রাখুন।',

    tagCollections: 'কালেকশন',
    tagCollectionsDesc: 'নথি কালেকশন এন্ডপয়েন্ট (CRUD, count, duplicate)।',
    tagGlobals: 'গ্লোবাল',
    tagGlobalsDesc: 'গ্লোবাল নথি এন্ডপয়েন্ট।',
    tagSystem: 'সিস্টেম',
    tagSystemDesc: 'Payload সিস্টেম এন্ডপয়েন্ট।',
    tagAuth: 'প্রমাণীকরণ',
    tagVersions: 'সংস্করণ',
    tagJobs: 'জব',

    localizationHeading: 'স্থানীয়করণ',
    localizationNote:
      'উপলব্ধ লোকেল: {{locales}}। একটি লোকেল নির্বাচন করতে একটি রিড এন্ডপয়েন্টে `?locale=<code>` পাঠান। একবারে প্রতিটি লোকেল পেতে `?locale=all` পাঠান — তখন প্রতিটি স্থানীয়কৃত ফিল্ড একটি একক মানের পরিবর্তে লোকেল কোড দ্বারা কী করা একটি অবজেক্ট হিসেবে ফেরত দেওয়া হয় (যেমন `{ "en": "Hello", "de": "Hallo" }`)। সেই প্রতি-লোকেল অবজেক্ট রূপটি রাখতে `locale=all` সহ `?flattenLocales=false` সেট করুন। ফিল্ড স্কিমাগুলো একক-লোকেল রূপটি দেখায়।',
    docLanguagesNote:
      'এই ডকুমেন্টেশন এই ভাষাগুলিতে উপলব্ধ: {{languages}}। ভাষা পরিবর্তন করতে এই স্পেক URL-এর সাথে `?lang=<code>` যুক্ত করুন।',
  },
}
