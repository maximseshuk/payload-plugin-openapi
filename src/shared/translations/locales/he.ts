import type { PluginDefaultTranslationsObject } from '@/shared/translations/types.js'

export const he: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'כמה רמות של מסמכים מקושרים לאכלס.',
    paramSort: 'שדה למיון לפיו; הוסף קידומת `-` לסדר יורד, למשל `-createdAt`.',
    paramSortShort: 'שדה למיון לפיו; הוסף קידומת `-` לסדר יורד.',
    paramDraft: 'החזרת גרסאות טיוטה.',
    paramTrash: 'כלול מסמכים שנמחקו (באשפה).',
    paramAutosave: 'שמירה כשמירה אוטומטית: מעדכנת את גרסת השמירה האוטומטית האחרונה במקום להוסיף חדשה.',
    paramPublishAllLocales: 'פרסום כל השפות, לא רק שפת הבקשה.',
    paramUnpublishAllLocales: 'ביטול פרסום כל השפות והחזרת המסמך לטיוטה.',
    paramOverrideLock: 'התעלמות מנעילה של משתמש אחר. ברירת מחדל false.',
    paramSelectedLocales: 'העתקת שפות אלה בלבד לשכפול. ברירת מחדל: כל השפות.',
    paramFlattenLocales: 'עם `locale=all`, הגדר false כדי לשמור שדות מתורגמים כאובייקטים לכל לוקאל. ברירת המחדל true.',
    paramLocale: 'הלוקאל להחזרה, או `all` עבור כל הלוקאלים. ראה את סעיף הלוקליזציה בתיאור ה-API.',
    paramFallbackLocale: 'לוקאל לחזרה אחורה עבור ערכים מתורגמים חסרים, או `none` כדי להשבית.',
    paramValidateLocale: 'לוקאלים לאימות, או `all` עבור כל הלוקאלים. חזור על הפרמטר עבור יותר מלוקאל אחד.',
    paramComputeHierarchyPaths:
      'הגדירו true כדי לחשב את הנתיבים `{{slugPath}}` ו-`{{titlePath}}`. בחירה של אחד מהשדות מחשבת אותם גם כן.',

    schemaSelect: 'בחר אילו שדות להחזיר, למשל `select[title]=true`. השמט כדי להחזיר את הכל.',
    schemaPopulate: 'אכלוס מסמכים מקושרים לכל אוסף, למשל `populate[posts][title]=true`.',
    schemaJoins: 'בקרות לכל צירוף (limit/page/sort/where/count), למשל `joins[posts][limit]=10`.',
    schemaWhere:
      'מסנן `where` של Payload. קנן שדה ואחריו אופרטור: `where[field][equals]=value`. שלב תנאים באמצעות המערכים `and` / `or`, למשל `where[or][0][field][equals]=value`. כל שדה מפרט רק את האופרטורים התקפים לסוג שלו.',
    schemaSupportedTimezones: 'אזורי זמן נתמכים בפורמט IANA.',
    schemaPerLocale: 'ערכים לכל לוקאל, מוחזרים כאשר `locale=all`.',
    schemaHierarchySlugPath:
      'נתיב slug, למשל `parent/child`. מחושב בקריאה עם `computeHierarchyPaths=true` או כשהשדה נבחר. לא ניתן להשתמש בו ב-`where`.',
    schemaHierarchyTitlePath:
      'נתיב כותרות, למשל `Parent/Child`. מחושב בקריאה עם `computeHierarchyPaths=true` או כשהשדה נבחר. לא ניתן להשתמש בו ב-`where`.',

    collectionList: 'רשימת מסמכים עם עימוד',
    collectionDoc: 'מסמך יחיד',
    collectionCreated: 'מסמך שנוצר',
    collectionUpdated: 'מסמך שעודכן',
    collectionDeleted: 'מסמך שנמחק',
    collectionBulkUpdate: 'תוצאת עדכון מרובה',
    collectionBulkDelete: 'תוצאת מחיקה מרובה',
    collectionCount: 'מספר מסמכים',
    collectionDuplicated: 'המסמך המשוכפל',
    validateResult:
      'תוצאת האימות. דבר אינו נשמר. ערכי שדות לא תקינים מחזירים `valid: false` עם השגיאות, ולא סטטוס שגיאה.',
    validateBody:
      'נתוני המסמך לאימות. במסמך שמור או במסמך גלובלי, הנתונים ממוזגים על הטיוטה האחרונה, או על המסמך השמור אם אין טיוטה.',

    globalDoc: 'המסמך הגלובלי',

    authLogin: 'תוצאת התחברות',
    authLogout: 'תוצאת התנתקות',
    authMe: 'המשתמש המאומת הנוכחי',
    authRefreshToken: 'טוקן מרוענן',
    authForgotPassword: 'נשלח דוא"ל לאיפוס סיסמה',
    authResetPassword: 'תוצאת איפוס סיסמה',
    authFirstRegister: 'המשתמש הראשון, נוצר עם טוקן אימות',
    authInit: 'האם לאוסף אימות זה כבר יש משתמשים',
    authAccess: 'ההרשאות של המשתמש הנוכחי לכל האוספים והגלובליים',
    docAccess: 'ההרשאות של המשתמש הנוכחי למסמך זה',
    docAccessBody: 'נתוני המסמך שמולם נבדקת הגישה. בלעדיהם Payload משתמש במסמך השמור, אם יש כזה.',
    authUnlock: 'תוצאת שחרור נעילה',
    authVerify: 'תוצאת אימות',
    apiKeyReveal: 'מפתח ה-API המפוענח',

    versionList: 'רשימת גרסאות עם עימוד',
    versionSingle: 'גרסה יחידה',
    versionRestored: 'המסמך המשוחזר',
    versionWhere: 'סינון על שדות גרסה, למשל `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'הרצת משימות בתור (וכברירת מחדל, טיפול בתזמונים)',
    jobsSchedulesSummary: 'הוספת משימות לתור שזמנן הגיע בהתאם לתזמון שלהן',
    jobsRunResult: 'תוצאת הרצה',
    jobsSchedulesResult: 'תוצאת תזמון',
    jobsRunAllQueues: 'הרצת משימות בכל התורים.',
    jobsLimit: 'מספר המשימות המרבי להרצה.',
    jobsDisableScheduling: 'דלג על טיפול בתזמונים ש-`run` מבצע כברירת מחדל.',
    jobsSilent: 'השתק רישום של הרצה.',
    jobsSchedulesAllQueues: 'טיפול בתזמונים בכל התורים.',
    jobsQueue: 'הגבל את הפעולה לתור יחיד. תורים ידועים: {{queues}}.',

    uploadFile: 'הקובץ הבינארי להעלאה.',
    uploadBody:
      'שלח `multipart/form-data` כדי להעלות קובץ (חלק `file` בינארי בתוספת חלק `_payload` עם השדות מקודדים כ-JSON), או `application/json` עם השדות בלבד כאשר אין קובץ.',
    uploadPayloadField: 'שדות {{schema}} מקודדים כ-JSON. דוגמה: `{"alt":"A caption"}`.',
    fileServe: 'הקובץ',
    filePartial: 'חלק מהקובץ, עבור בקשת `Range`',
    uploadInstructionsSummary: 'קבלת הוראות להעלאת קובץ לפני שמירת המסמך',
    uploadInstructionsResult: 'לאן לשלוח את בתי הקובץ, וערך `file` לשליחה עם בקשת היצירה או העדכון',
    uploadStagePutSummary: 'שליחת בתי הקובץ להעלאה זמנית',
    uploadStageDeleteSummary: 'מחיקת העלאה זמנית',
    uploadStageResult: 'בוצע, ללא תוכן',

    error400: 'שגיאת אימות או שאילתה (ValidationError, QueryError)',
    error401: 'לא מאומת (AuthenticationError)',
    error403: 'אסור על ידי בקרת גישה (Forbidden, UnverifiedEmail)',
    error404: 'המסמך לא נמצא (NotFound)',
    error500: 'שגיאת שרת פנימית (APIError)',

    securityBearer:
      'הדבק את ה-`token` שהוחזר על ידי נקודת הקצה של ההתחברות. נשלח כ-`Authorization: Bearer <token>`. Payload מקבל גם את הסכמה `JWT <token>` ועוגיית `{{cookiePrefix}}-token`.',
    securityInteractive: 'התחברות אינטראקטיבית: הזן שם משתמש (או דוא"ל) וסיסמה; השאר את Client ID/Secret ריקים.',

    tagCollections: 'אוספים',
    tagCollectionsDesc: 'נקודות קצה של אוספי מסמכים (CRUD, ספירה, שכפול).',
    tagGlobals: 'גלובליים',
    tagGlobalsDesc: 'נקודות קצה של מסמכים גלובליים.',
    tagSystem: 'מערכת',
    tagSystemDesc: 'נקודות קצה של מערכת Payload.',
    tagAuth: 'אימות',
    tagVersions: 'גרסאות',
    tagJobs: 'משימות',
    tagUploads: 'העלאות',
    tagAccess: 'גישה',

    localizationHeading: 'לוקליזציה',
    localizationNote:
      'לוקאלים זמינים: {{locales}}. העבר `?locale=<code>` לנקודת קצה לקריאה כדי לבחור אחד. העבר `?locale=all` כדי לקבל את כל הלוקאלים בבת אחת — כל שדה מתורגם מוחזר אז כאובייקט עם מפתחות לפי קוד לוקאל (למשל `{ "en": "Hello", "de": "Hallo" }`) במקום ערך יחיד. הגדר `?flattenLocales=false` עם `locale=all` כדי לשמור על צורת האובייקט לכל לוקאל. סכמות השדות מציגות את הצורה של לוקאל יחיד.',
    docLanguagesNote:
      'תיעוד זה זמין בשפות: {{languages}}. הוסיפו `?lang=<code>` לכתובת ה-URL של מפרט זה כדי להחליף שפה.',
  },
}
