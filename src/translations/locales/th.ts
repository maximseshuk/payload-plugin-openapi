import type { PluginDefaultTranslationsObject } from '../types.js'

export const th: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'จำนวนระดับของเอกสารที่เกี่ยวข้องที่จะดึงข้อมูลมาแสดง',
    paramSort: 'ฟิลด์ที่ใช้เรียงลำดับ; เติม `-` นำหน้าเพื่อเรียงจากมากไปน้อย เช่น `-createdAt`',
    paramSortShort: 'ฟิลด์ที่ใช้เรียงลำดับ; เติม `-` นำหน้าเพื่อเรียงจากมากไปน้อย',
    paramDraft: 'คืนค่าเวอร์ชันแบบร่าง',
    paramTrash: 'รวมเอกสารที่อยู่ในถังขยะด้วย',
    paramAutosave: 'บันทึกเป็นการบันทึกอัตโนมัติ: อัปเดตเวอร์ชันบันทึกอัตโนมัติล่าสุดแทนการเพิ่มเวอร์ชันใหม่',
    paramPublishAllLocales: 'เผยแพร่ทุกภาษา ไม่ใช่เฉพาะภาษาของคำขอ',
    paramUnpublishAllLocales: 'ยกเลิกการเผยแพร่ทุกภาษาและเปลี่ยนเอกสารกลับเป็นแบบร่าง',
    paramOverrideLock: 'ไม่สนใจการล็อกของผู้ใช้อื่น ค่าเริ่มต้น false',
    paramSelectedLocales: 'คัดลอกเฉพาะภาษาเหล่านี้ไปยังสำเนา ค่าเริ่มต้น: ทุกภาษา',
    paramFlattenLocales:
      'เมื่อใช้ `locale=all` ให้ตั้งค่าเป็น false เพื่อเก็บฟิลด์ที่แปลภาษาไว้เป็นออบเจ็กต์แยกตามแต่ละโลแคล ค่าเริ่มต้นคือ true',
    paramLocale: 'โลแคลที่จะคืนค่า หรือ `all` เพื่อรับทุกโลแคล ดูที่หัวข้อ Localization ในคำอธิบาย API',
    paramFallbackLocale: 'โลแคลที่จะใช้แทนเมื่อไม่มีค่าที่แปลภาษาไว้ หรือ `none` เพื่อปิดการใช้งาน',

    schemaSelect: 'เลือกฟิลด์ที่จะคืนค่า เช่น `select[title]=true` หากไม่ระบุจะคืนค่าทั้งหมด',
    schemaPopulate: 'ดึงข้อมูลเอกสารที่เกี่ยวข้องในแต่ละคอลเลกชัน เช่น `populate[posts][title]=true`',
    schemaJoins: 'การควบคุมแต่ละ join (limit/page/sort/where/count) เช่น `joins[posts][limit]=10`',
    schemaWhere:
      'ตัวกรอง `where` ของ Payload ซ้อนฟิลด์แล้วตามด้วยตัวดำเนินการ: `where[field][equals]=value` รวมหลายเงื่อนไขด้วยอาเรย์ `and` / `or` เช่น `where[or][0][field][equals]=value` แต่ละฟิลด์จะแสดงเฉพาะตัวดำเนินการที่ใช้ได้กับชนิดของฟิลด์นั้น',
    schemaSupportedTimezones: 'เขตเวลาที่รองรับในรูปแบบ IANA',
    schemaPerLocale: 'ค่าแยกตามแต่ละโลแคล จะคืนค่าเมื่อใช้ `locale=all`',

    collectionList: 'รายการเอกสารแบบแบ่งหน้า',
    collectionDoc: 'เอกสารหนึ่งรายการ',
    collectionCreated: 'เอกสารที่สร้างขึ้น',
    collectionUpdated: 'เอกสารที่อัปเดตแล้ว',
    collectionDeleted: 'เอกสารที่ถูกลบ',
    collectionBulkUpdate: 'ผลการอัปเดตแบบกลุ่ม',
    collectionBulkDelete: 'ผลการลบแบบกลุ่ม',
    collectionCount: 'จำนวนเอกสาร',
    collectionDuplicated: 'เอกสารที่ทำสำเนา',

    globalDoc: 'เอกสาร global',

    authLogin: 'ผลการเข้าสู่ระบบ',
    authLogout: 'ผลการออกจากระบบ',
    authMe: 'ผู้ใช้ที่เข้าสู่ระบบอยู่ในปัจจุบัน',
    authRefreshToken: 'โทเค็นที่รีเฟรชแล้ว',
    authForgotPassword: 'ส่งอีเมลรีเซ็ตรหัสผ่านแล้ว',
    authResetPassword: 'ผลการรีเซ็ตรหัสผ่าน',
    authFirstRegister: 'ผู้ใช้คนแรกที่สร้างขึ้นพร้อมกับโทเค็นการยืนยันตัวตน',
    authInit: 'ระบุว่าคอลเลกชันการยืนยันตัวตนนี้มีผู้ใช้อยู่แล้วหรือยัง',
    authAccess: 'สิทธิ์การเข้าถึง (permissions) ของผู้ใช้ปัจจุบันสำหรับคอลเลกชันนี้',
    authUnlock: 'ผลการปลดล็อก',
    authVerify: 'ผลการยืนยัน',

    versionList: 'รายการเวอร์ชันแบบแบ่งหน้า',
    versionSingle: 'เวอร์ชันหนึ่งรายการ',
    versionRestored: 'เอกสารที่กู้คืนแล้ว',
    versionWhere: 'กรองตามฟิลด์ของเวอร์ชัน เช่น `where[parent][equals]=<docId>`',

    jobsRunSummary: 'รันงานที่อยู่ในคิว (และจัดการตารางเวลาตามค่าเริ่มต้น)',
    jobsSchedulesSummary: 'เพิ่มงานที่ถึงกำหนดตามตารางเวลาเข้าคิว',
    jobsRunResult: 'ผลการรัน',
    jobsSchedulesResult: 'ผลการจัดตารางเวลา',
    jobsRunAllQueues: 'รันงานในทุกคิว',
    jobsLimit: 'จำนวนงานสูงสุดที่จะรัน',
    jobsDisableScheduling: 'ข้ามการจัดการตารางเวลาที่ `run` ทำตามค่าเริ่มต้น',
    jobsSilent: 'ระงับการบันทึกล็อกการรัน',
    jobsSchedulesAllQueues: 'จัดการตารางเวลาในทุกคิว',
    jobsQueue: 'จำกัดการดำเนินการให้อยู่เพียงคิวเดียว คิวที่รู้จัก: {{queues}}',

    uploadFile: 'ไฟล์ไบนารีที่จะอัปโหลด',
    uploadBody:
      'ส่ง `multipart/form-data` เพื่ออัปโหลดไฟล์ (ส่วน `file` ที่เป็นไบนารี พร้อมส่วน `_payload` ที่มีฟิลด์ในรูปแบบ JSON string) หรือส่ง `application/json` พร้อมเฉพาะฟิลด์เมื่อไม่มีไฟล์',
    uploadPayloadField: 'ฟิลด์ {{schema}} ในรูปแบบ JSON string ตัวอย่าง: `{"alt":"A caption"}`',

    error400: 'ข้อผิดพลาดในการตรวจสอบความถูกต้องหรือการค้นหา (ValidationError, QueryError)',
    error401: 'ยังไม่ได้ยืนยันตัวตน (AuthenticationError)',
    error403: 'ถูกปฏิเสธโดยการควบคุมการเข้าถึง (Forbidden, UnverifiedEmail)',
    error404: 'ไม่พบเอกสาร (NotFound)',
    error500: 'ข้อผิดพลาดภายในเซิร์ฟเวอร์ (APIError)',

    securityBearer:
      'วาง `token` ที่ได้จากเอนด์พอยต์การเข้าสู่ระบบ โดยจะส่งในรูปแบบ `Authorization: Bearer <token>` Payload ยังรองรับรูปแบบ `JWT <token>` และคุกกี้ `{{cookiePrefix}}-token` ด้วย',
    securityInteractive: 'การเข้าสู่ระบบแบบโต้ตอบ: กรอกชื่อผู้ใช้ (หรืออีเมล) และรหัสผ่าน เว้นช่อง Client ID/Secret ว่างไว้',

    tagCollections: 'คอลเลกชัน',
    tagCollectionsDesc: 'เอนด์พอยต์ของคอลเลกชันเอกสาร (CRUD, การนับจำนวน, การทำสำเนา)',
    tagGlobals: 'Globals',
    tagGlobalsDesc: 'เอนด์พอยต์ของเอกสาร global',
    tagSystem: 'ระบบ',
    tagSystemDesc: 'เอนด์พอยต์ของระบบ Payload',
    tagAuth: 'การยืนยันตัวตน',
    tagVersions: 'เวอร์ชัน',
    tagJobs: 'งาน',

    localizationHeading: 'การแปลภาษา',
    localizationNote:
      'โลแคลที่ใช้ได้: {{locales}} ส่ง `?locale=<code>` ไปยังเอนด์พอยต์อ่านข้อมูลเพื่อเลือกหนึ่งโลแคล ส่ง `?locale=all` เพื่อรับทุกโลแคลพร้อมกัน โดยแต่ละฟิลด์ที่แปลภาษาไว้จะถูกคืนค่าเป็นออบเจ็กต์ที่ใช้รหัสโลแคลเป็นคีย์ (เช่น `{ "en": "Hello", "de": "Hallo" }`) แทนค่าเดียว ตั้งค่า `?flattenLocales=false` ร่วมกับ `locale=all` เพื่อเก็บรูปแบบออบเจ็กต์แยกตามโลแคลนั้นไว้ สคีมาของฟิลด์จะแสดงรูปแบบของโลแคลเดียว',
    docLanguagesNote: 'เอกสารนี้มีให้บริการในภาษา: {{languages}} เพิ่ม `?lang=<code>` ต่อท้าย URL ของสเปกนี้เพื่อสลับภาษา',
  },
}
