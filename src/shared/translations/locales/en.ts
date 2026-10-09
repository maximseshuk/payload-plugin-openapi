import type { PluginDefaultTranslationsObject } from '@/shared/translations/types.js'

export const en: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'How many levels of related documents to populate.',
    paramSort: 'Field to sort by; prefix with `-` for descending, e.g. `-createdAt`.',
    paramSortShort: 'Field to sort by; prefix with `-` for descending.',
    paramDraft: 'Return draft versions.',
    paramTrash: 'Include trashed documents.',
    paramAutosave: 'Save as an autosave: update the latest autosave version instead of adding a new one.',
    paramPublishAllLocales: 'Publish every locale, not only the request locale.',
    paramUnpublishAllLocales: 'Unpublish every locale and set the document back to draft.',
    paramOverrideLock: 'Ignore a lock held by another user. Default false.',
    paramSelectedLocales: 'Copy only these locales to the duplicate. Default: every locale.',
    paramFlattenLocales: 'With `locale=all`, set false to keep localized fields as per-locale objects. Default true.',
    paramLocale: 'Locale to return, or `all` for every locale. See the Localization section in the API description.',
    paramFallbackLocale: 'Locale to fall back to for missing localized values, or `none` to disable.',
    paramValidateLocale:
      'Locales to validate, or `all` for every locale. Repeat the parameter for more than one locale.',
    paramComputeHierarchyPaths:
      'Set true to compute the `{{slugPath}}` and `{{titlePath}}` paths. Selecting either field computes them too.',

    schemaSelect: 'Choose fields to return, e.g. `select[title]=true`. Omit to return all.',
    schemaPopulate: 'Populate related documents per collection, e.g. `populate[posts][title]=true`.',
    schemaJoins: 'Per-join controls (limit/page/sort/where/count), e.g. `joins[posts][limit]=10`.',
    schemaWhere:
      'Payload `where` filter. Nest a field then an operator: `where[field][equals]=value`. Combine clauses with the `and` / `or` arrays, e.g. `where[or][0][field][equals]=value`. Each field lists only the operators valid for its type.',
    schemaSupportedTimezones: 'Supported timezones in IANA format.',
    schemaPerLocale: 'Per-locale values, returned when `locale=all`.',
    schemaHierarchySlugPath:
      'Slug path, e.g. `parent/child`. Computed on read with `computeHierarchyPaths=true` or when selected. Cannot be used in `where`.',
    schemaHierarchyTitlePath:
      'Title path, e.g. `Parent/Child`. Computed on read with `computeHierarchyPaths=true` or when selected. Cannot be used in `where`.',

    collectionList: 'Paginated list of documents',
    collectionDoc: 'A single document',
    collectionCreated: 'Created document',
    collectionUpdated: 'Updated document',
    collectionDeleted: 'Deleted document',
    collectionBulkUpdate: 'Bulk update result',
    collectionBulkDelete: 'Bulk delete result',
    collectionCount: 'Document count',
    collectionDuplicated: 'The duplicated document',
    validateResult:
      'Validation result. Nothing is saved. Invalid field values return `valid: false` with the errors, not an error status.',
    validateBody:
      'Document data to validate. On a saved document or a global, the data is merged over the latest draft, or the saved document if there is no draft.',

    globalDoc: 'The global document',

    authLogin: 'Login result',
    authLogout: 'Logout result',
    authMe: 'The currently authenticated user',
    authRefreshToken: 'Refreshed token',
    authForgotPassword: 'Password reset email sent',
    authResetPassword: 'Password reset result',
    authFirstRegister: 'The first user, created with an auth token',
    authInit: 'Whether this auth collection has any users yet',
    authAccess: 'The current user’s permissions for every collection and global',
    docAccess: 'The current user’s permissions for this document',
    docAccessBody:
      'Document data to check access against. Without it, Payload uses the saved document, if there is one.',
    authUnlock: 'Unlock result',
    authVerify: 'Verification result',
    apiKeyReveal: 'The decrypted API key',

    versionList: 'Paginated list of versions',
    versionSingle: 'A single version',
    versionRestored: 'The restored document',
    versionWhere: 'Filter over version fields, e.g. `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'Run queued jobs (and, by default, handle schedules)',
    jobsSchedulesSummary: 'Queue jobs that are due according to their schedule',
    jobsRunResult: 'Run result',
    jobsSchedulesResult: 'Scheduling result',
    jobsRunAllQueues: 'Run jobs across all queues.',
    jobsLimit: 'Max jobs to run.',
    jobsDisableScheduling: 'Skip the schedule handling that `run` does by default.',
    jobsSilent: 'Suppress run logging.',
    jobsSchedulesAllQueues: 'Handle schedules across all queues.',
    jobsQueue: 'Restrict the operation to a single queue. Known queues: {{queues}}.',

    uploadFile: 'The binary file to upload.',
    uploadBody:
      'Send `multipart/form-data` to upload a file (a binary `file` part plus a `_payload` part with the JSON-stringified fields), or `application/json` with just the fields when there’s no file.',
    uploadPayloadField: 'JSON-stringified {{schema}} fields. Example: `{"alt":"A caption"}`.',
    fileServe: 'The file',
    filePartial: 'Part of the file, for a `Range` request',
    paramFileVersion: 'Return the file stored with this version ID.',
    uploadInstructionsSummary: 'Get instructions to upload a file before saving the document',
    uploadInstructionsResult:
      'Where to send the file bytes, and the `file` value to send with the create or update request',
    uploadStagePutSummary: 'Send the file bytes for a staged upload',
    uploadStageDeleteSummary: 'Delete a staged upload',
    uploadStageResult: 'Done, no content',

    error400: 'Validation or query error (ValidationError, QueryError)',
    error401: 'Not authenticated (AuthenticationError)',
    error403: 'Forbidden by access control (Forbidden, UnverifiedEmail)',
    error404: 'Document not found (NotFound)',
    error500: 'Internal server error (APIError)',

    securityBearer:
      'Paste the `token` returned by the login endpoint. Sent as `Authorization: Bearer <token>`. Payload also accepts the `JWT <token>` scheme and a `{{cookiePrefix}}-token` cookie.',
    securityInteractive: 'Interactive login: enter username (or email) and password; leave Client ID/Secret blank.',

    tagCollections: 'Collections',
    tagCollectionsDesc: 'Document collection endpoints (CRUD, count, duplicate).',
    tagGlobals: 'Globals',
    tagGlobalsDesc: 'Global document endpoints.',
    tagSystem: 'System',
    tagSystemDesc: 'Payload system endpoints.',
    tagAuth: 'Auth',
    tagVersions: 'Versions',
    tagJobs: 'Jobs',
    tagUploads: 'Uploads',
    tagAccess: 'Access',

    localizationHeading: 'Localization',
    localizationNote:
      'Available locales: {{locales}}. Pass `?locale=<code>` to a read endpoint to select one. Pass `?locale=all` to receive every locale at once — each localized field is then returned as an object keyed by locale code (e.g. `{ "en": "Hello", "de": "Hallo" }`) instead of a single value. Set `?flattenLocales=false` with `locale=all` to keep that per-locale object form. Field schemas show the single-locale shape.',

    docLanguagesNote:
      'This documentation is available in: {{languages}}. Append `?lang=<code>` to this spec URL to switch.',
  },
}
