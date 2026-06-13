import type { PluginDefaultTranslationsObject } from '../types.js'

export const bnBd: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'কতগুলো স্তর পর্যন্ত সম্পর্কিত ডকুমেন্ট পপুলেট করতে হবে।',
    paramSort: 'যে ফিল্ড দিয়ে সাজানো হবে; অবরোহী ক্রমের জন্য `-` উপসর্গ দিন, যেমন `-createdAt`।',
    paramSortShort: 'যে ফিল্ড দিয়ে সাজানো হবে; অবরোহী ক্রমের জন্য `-` উপসর্গ দিন।',
    paramDraft: 'ড্রাফট সংস্করণ ফেরত দিন।',
    paramTrash: 'ট্র্যাশে থাকা ডকুমেন্ট অন্তর্ভুক্ত করুন।',
    paramFlattenLocales:
      '`locale=all` এর সাথে, লোকালাইজড ফিল্ডগুলো প্রতি-লোকেল অবজেক্ট হিসেবে রাখতে false সেট করুন। ডিফল্ট true।',
    paramLocale: 'যে লোকেল ফেরত দিতে হবে, অথবা প্রতিটি লোকেলের জন্য `all`। API বিবরণের Localization অংশটি দেখুন।',
    paramFallbackLocale: 'অনুপস্থিত লোকালাইজড মানের জন্য যে লোকেলে ফিরে যাওয়া হবে, অথবা নিষ্ক্রিয় করতে `none`।',

    schemaSelect: 'কোন ফিল্ডগুলো ফেরত দেওয়া হবে তা নির্বাচন করুন, যেমন `select[title]=true`। সবগুলো ফেরত পেতে বাদ দিন।',
    schemaPopulate: 'প্রতি কালেকশন অনুযায়ী সম্পর্কিত ডকুমেন্ট পপুলেট করুন, যেমন `populate[posts][title]=true`।',
    schemaJoins: 'প্রতি-join নিয়ন্ত্রণ (limit/page/sort/where/count), যেমন `joins[posts][limit]=10`।',
    schemaWhere:
      'Payload `where` ফিল্টার। একটি ফিল্ড তারপর একটি অপারেটর নেস্ট করুন: `where[field][equals]=value`। `and` / `or` অ্যারে দিয়ে শর্তসমূহ একত্র করুন, যেমন `where[or][0][field][equals]=value`। প্রতিটি ফিল্ড শুধু তার টাইপের জন্য বৈধ অপারেটরগুলোই তালিকাভুক্ত করে।',
    schemaSupportedTimezones: 'IANA ফরম্যাটে সমর্থিত টাইমজোন।',
    schemaPerLocale: 'প্রতি-লোকেল মান, `locale=all` দেওয়া হলে ফেরত দেওয়া হয়।',

    collectionList: 'ডকুমেন্টের পেজিনেটেড তালিকা',
    collectionDoc: 'একটি একক ডকুমেন্ট',
    collectionCreated: 'তৈরি করা ডকুমেন্ট',
    collectionUpdated: 'আপডেট করা ডকুমেন্ট',
    collectionDeleted: 'মুছে ফেলা ডকুমেন্ট',
    collectionBulkUpdate: 'বাল্ক আপডেটের ফলাফল',
    collectionBulkDelete: 'বাল্ক ডিলিটের ফলাফল',
    collectionCount: 'ডকুমেন্ট সংখ্যা',
    collectionDuplicated: 'ডুপ্লিকেট করা ডকুমেন্ট',

    globalDoc: 'গ্লোবাল ডকুমেন্ট',

    authLogin: 'লগইনের ফলাফল',
    authLogout: 'লগআউটের ফলাফল',
    authMe: 'বর্তমানে প্রমাণীকৃত ব্যবহারকারী',
    authRefreshToken: 'রিফ্রেশ করা টোকেন',
    authForgotPassword: 'পাসওয়ার্ড রিসেট ইমেইল পাঠানো হয়েছে',
    authResetPassword: 'পাসওয়ার্ড রিসেটের ফলাফল',
    authFirstRegister: 'প্রথম ব্যবহারকারী, একটি auth টোকেনসহ তৈরি করা হয়েছে',
    authInit: 'এই auth কালেকশনে এখনও কোনো ব্যবহারকারী আছে কিনা',
    authAccess: 'এই কালেকশনের জন্য বর্তমান ব্যবহারকারীর অ্যাক্সেস (অনুমতি)',
    authUnlock: 'আনলকের ফলাফল',
    authVerify: 'যাচাইয়ের ফলাফল',

    versionList: 'সংস্করণের পেজিনেটেড তালিকা',
    versionSingle: 'একটি একক সংস্করণ',
    versionRestored: 'পুনরুদ্ধার করা ডকুমেন্ট',
    versionWhere: 'সংস্করণ ফিল্ডের উপর ফিল্টার করুন, যেমন `where[parent][equals]=<docId>`।',

    jobsRunSummary: 'সারিবদ্ধ জব চালান (এবং ডিফল্টভাবে, শিডিউল পরিচালনা করুন)',
    jobsSchedulesSummary: 'শিডিউল অনুযায়ী যেসব জব নির্ধারিত সময়ে আছে সেগুলো সারিবদ্ধ করুন',
    jobsRunResult: 'চালানোর ফলাফল',
    jobsSchedulesResult: 'শিডিউলিংয়ের ফলাফল',
    jobsRunAllQueues: 'সব সারির জব চালান।',
    jobsLimit: 'সর্বোচ্চ যতগুলো জব চালানো হবে।',
    jobsDisableScheduling: '`run` যে শিডিউল পরিচালনা ডিফল্টভাবে করে তা বাদ দিন।',
    jobsSilent: 'চালানোর লগিং বন্ধ রাখুন।',
    jobsSchedulesAllQueues: 'সব সারির শিডিউল পরিচালনা করুন।',
    jobsQueue: 'অপারেশনটি একটি একক সারিতে সীমাবদ্ধ করুন। পরিচিত সারি: {{queues}}।',

    uploadFile: 'আপলোড করার জন্য বাইনারি ফাইল।',
    uploadBody:
      'একটি ফাইল আপলোড করতে `multipart/form-data` পাঠান (একটি বাইনারি `file` অংশ এবং JSON-স্ট্রিংফাইড ফিল্ডসহ একটি `_payload` অংশ), অথবা কোনো ফাইল না থাকলে শুধু ফিল্ডসহ `application/json` পাঠান।',
    uploadPayloadField: 'JSON-স্ট্রিংফাইড {{schema}} ফিল্ড। উদাহরণ: `{"alt":"A caption"}`।',

    error400: 'ভ্যালিডেশন বা কোয়েরি ত্রুটি (ValidationError, QueryError)',
    error401: 'প্রমাণীকৃত নয় (AuthenticationError)',
    error403: 'অ্যাক্সেস নিয়ন্ত্রণ দ্বারা নিষিদ্ধ (Forbidden, UnverifiedEmail)',
    error404: 'ডকুমেন্ট পাওয়া যায়নি (NotFound)',
    error500: 'অভ্যন্তরীণ সার্ভার ত্রুটি (APIError)',

    securityBearer:
      'লগইন এন্ডপয়েন্ট থেকে ফেরত আসা `token` পেস্ট করুন। `Authorization: Bearer <token>` হিসেবে পাঠানো হয়। Payload `JWT <token>` স্কিম এবং একটি `{{cookiePrefix}}-token` কুকিও গ্রহণ করে।',
    securityInteractive: 'ইন্টারঅ্যাক্টিভ লগইন: ব্যবহারকারীর নাম (বা ইমেইল) ও পাসওয়ার্ড লিখুন; Client ID/Secret খালি রাখুন।',

    tagCollections: 'কালেকশন',
    tagCollectionsDesc: 'ডকুমেন্ট কালেকশন এন্ডপয়েন্ট (CRUD, count, duplicate)।',
    tagGlobals: 'গ্লোবাল',
    tagGlobalsDesc: 'গ্লোবাল ডকুমেন্ট এন্ডপয়েন্ট।',
    tagSystem: 'সিস্টেম',
    tagSystemDesc: 'Payload সিস্টেম এন্ডপয়েন্ট।',
    tagAuth: 'অথেনটিকেশন',
    tagVersions: 'সংস্করণ',
    tagJobs: 'জব',

    localizationHeading: 'লোকালাইজেশন',
    localizationNote:
      'উপলব্ধ লোকেল: {{locales}}। একটি নির্বাচন করতে কোনো রিড এন্ডপয়েন্টে `?locale=<code>` পাস করুন। একবারে প্রতিটি লোকেল পেতে `?locale=all` পাস করুন — তখন প্রতিটি লোকালাইজড ফিল্ড একটি একক মানের পরিবর্তে লোকেল কোড দিয়ে কী করা একটি অবজেক্ট হিসেবে ফেরত আসে (যেমন `{ "en": "Hello", "de": "Hallo" }`)। সেই প্রতি-লোকেল অবজেক্ট ফর্ম বজায় রাখতে `locale=all` এর সাথে `?flattenLocales=false` সেট করুন। ফিল্ড স্কিমা একক-লোকেল আকৃতি দেখায়।',
    docLanguagesNote:
      'এই ডকুমেন্টেশন এই ভাষাগুলোতে উপলব্ধ: {{languages}}। ভাষা পরিবর্তন করতে এই স্পেক URL-এর শেষে `?lang=<code>` যোগ করুন।',
  },
}
