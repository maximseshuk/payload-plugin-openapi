import type { DefaultTranslationKeys, NestedKeysStripped, TFunction } from '@payloadcms/translations'

import type { en } from '@/shared/translations/locales/en.js'

export type PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: string
    paramSort: string
    paramSortShort: string
    paramDraft: string
    paramTrash: string
    paramAutosave: string
    paramPublishAllLocales: string
    paramUnpublishAllLocales: string
    paramOverrideLock: string
    paramSelectedLocales: string
    paramFlattenLocales: string
    paramLocale: string
    paramFallbackLocale: string
    paramValidateLocale: string
    paramComputeHierarchyPaths: string

    schemaSelect: string
    schemaPopulate: string
    schemaJoins: string
    schemaWhere: string
    schemaSupportedTimezones: string
    schemaPerLocale: string
    schemaHierarchySlugPath: string
    schemaHierarchyTitlePath: string

    collectionList: string
    collectionDoc: string
    collectionCreated: string
    collectionUpdated: string
    collectionDeleted: string
    collectionBulkUpdate: string
    collectionBulkDelete: string
    collectionCount: string
    collectionDuplicated: string
    validateResult: string
    validateBody: string

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
    docAccess: string
    docAccessBody: string
    authUnlock: string
    authVerify: string
    apiKeyReveal: string

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
    fileServe: string
    filePartial: string
    paramFileVersion: string
    uploadInstructionsSummary: string
    uploadInstructionsResult: string
    uploadStagePutSummary: string
    uploadStageDeleteSummary: string
    uploadStageResult: string

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
    tagUploads: string
    tagAccess: string
    tagPlugins: string
    tagPluginsDesc: string
    pluginError400: string
    pluginError401: string
    pluginError403: string
    pluginError404: string
    pluginError500: string
    ecommerceAddItem: string
    ecommerceRemoveItem: string
    ecommerceUpdateItem: string
    ecommerceClearCart: string
    ecommerceMergeCart: string
    ecommerceCartAccess: string
    ecommerceCartResult: string
    ecommerceError404: string
    ecommerceQuantity: string
    ecommerceInitiatePayment: string
    ecommerceConfirmOrder: string
    ecommercePaymentBody: string
    ecommerceInitiateResult: string
    ecommerceConfirmResult: string
    stripeWebhook: string
    stripeWebhookBody: string
    stripeWebhookResult: string
    stripeWebhookError400: string
    stripeRest: string
    stripeRestResult: string
    stripeRestError404: string
    mcp: string
    mcpDesc: string
    mcpResult: string
    mcpOverrideAccess: string
    mcpGet: string
    mcpGetError405: string
    mcpProtocolVersion: string
    mcpResult202: string
    mcpError404: string
    mcpError406: string
    mcpError413: string
    mcpError415: string
    seoTitle: string
    seoDescription: string
    seoUrl: string
    seoImage: string
    seoBody: string
    seoResult: string
    searchReindex: string
    searchReindexResult: string
    tenantOptions: string
    tenantOptionsResult: string
    exportDownload: string
    exportDownloadResult: string
    exportPreview: string
    importPreview: string
    previewResult: string
    importFileData: string
    r2Upload: string
    r2UploadDesc: string
    r2UploadResult: string
    r2Error412: string

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
