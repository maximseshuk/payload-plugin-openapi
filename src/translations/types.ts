import type { DefaultTranslationKeys, NestedKeysStripped, TFunction } from '@payloadcms/translations'

import type { en } from './locales/en.js'

export type PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: string
    paramSort: string
    paramSortShort: string
    paramDraft: string
    paramTrash: string
    paramFlattenLocales: string
    paramLocale: string
    paramFallbackLocale: string

    schemaSelect: string
    schemaPopulate: string
    schemaJoins: string
    schemaWhere: string
    schemaSupportedTimezones: string
    schemaPerLocale: string

    collectionList: string
    collectionDoc: string
    collectionCreated: string
    collectionUpdated: string
    collectionDeleted: string
    collectionBulkUpdate: string
    collectionBulkDelete: string
    collectionCount: string
    collectionDuplicated: string

    globalDoc: string

    authLogin: string
    authLogout: string
    authMe: string
    authRefreshToken: string
    authForgotPassword: string
    authResetPassword: string
    authFirstRegister: string
    authInit: string
    authAccess: string
    authUnlock: string
    authVerify: string

    versionList: string
    versionSingle: string
    versionRestored: string
    versionWhere: string

    jobsRunSummary: string
    jobsSchedulesSummary: string
    jobsRunResult: string
    jobsSchedulesResult: string
    jobsRunAllQueues: string
    jobsLimit: string
    jobsDisableScheduling: string
    jobsSilent: string
    jobsSchedulesAllQueues: string
    jobsQueue: string

    uploadFile: string
    uploadBody: string
    uploadPayloadField: string

    error400: string
    error401: string
    error403: string
    error404: string
    error500: string

    securityBearer: string
    securityInteractive: string

    tagCollections: string
    tagCollectionsDesc: string
    tagGlobals: string
    tagGlobalsDesc: string
    tagSystem: string
    tagSystemDesc: string
    tagAuth: string
    tagVersions: string
    tagJobs: string

    localizationHeading: string
    localizationNote: string

    docLanguagesNote: string
  }
}

export type PluginOpenApiTranslations = typeof en
export type PluginOpenApiTranslationKeys = NestedKeysStripped<PluginOpenApiTranslations>
export type PluginOpenApiTFunction = TFunction<DefaultTranslationKeys | PluginOpenApiTranslationKeys>

export type MessageKey = keyof PluginDefaultTranslationsObject['@seshuk/payload-plugin-openapi']

export type Translate = (key: MessageKey, vars?: Record<string, unknown>) => string
