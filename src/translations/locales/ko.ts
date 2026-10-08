import type { PluginDefaultTranslationsObject } from '../types.js'

export const ko: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: '관련 문서를 채울 단계 수입니다.',
    paramSort: '정렬 기준 필드입니다. 내림차순은 `-`를 접두사로 붙입니다(예: `-createdAt`).',
    paramSortShort: '정렬 기준 필드입니다. 내림차순은 `-`를 접두사로 붙입니다.',
    paramDraft: '초안 버전을 반환합니다.',
    paramTrash: '휴지통의 문서를 포함합니다.',
    paramAutosave: '자동 저장으로 저장합니다. 새 버전을 추가하지 않고 최신 자동 저장 버전을 업데이트합니다.',
    paramPublishAllLocales: '요청 로케일뿐 아니라 모든 로케일을 게시합니다.',
    paramUnpublishAllLocales: '모든 로케일의 게시를 취소하고 문서를 초안으로 되돌립니다.',
    paramOverrideLock: '다른 사용자의 잠금을 무시합니다. 기본값 false.',
    paramSelectedLocales: '이 로케일만 복제본에 복사합니다. 기본값: 모든 로케일.',
    paramFlattenLocales:
      '`locale=all`을 사용할 때, false로 설정하면 현지화된 필드를 로케일별 객체로 유지합니다. 기본값은 true입니다.',
    paramLocale:
      '반환할 로케일이며, 모든 로케일을 받으려면 `all`을 사용합니다. API 설명의 Localization 섹션을 참고하세요.',
    paramFallbackLocale: '현지화된 값이 없을 때 대체할 로케일이며, 비활성화하려면 `none`을 사용합니다.',

    schemaSelect: '반환할 필드를 선택합니다(예: `select[title]=true`). 생략하면 모두 반환합니다.',
    schemaPopulate: '컬렉션별로 관련 문서를 채웁니다(예: `populate[posts][title]=true`).',
    schemaJoins: '조인별 제어(limit/page/sort/where/count)입니다(예: `joins[posts][limit]=10`).',
    schemaWhere:
      'Payload `where` 필터입니다. 필드 다음에 연산자를 중첩합니다: `where[field][equals]=value`. `and` / `or` 배열로 절을 결합합니다(예: `where[or][0][field][equals]=value`). 각 필드는 해당 타입에 유효한 연산자만 나열합니다.',
    schemaSupportedTimezones: 'IANA 형식으로 지원되는 시간대입니다.',
    schemaPerLocale: '`locale=all`일 때 반환되는 로케일별 값입니다.',

    collectionList: '페이지네이션된 문서 목록',
    collectionDoc: '단일 문서',
    collectionCreated: '생성된 문서',
    collectionUpdated: '수정된 문서',
    collectionDeleted: '삭제된 문서',
    collectionBulkUpdate: '일괄 수정 결과',
    collectionBulkDelete: '일괄 삭제 결과',
    collectionCount: '문서 개수',
    collectionDuplicated: '복제된 문서',

    globalDoc: '글로벌 문서',

    authLogin: '로그인 결과',
    authLogout: '로그아웃 결과',
    authMe: '현재 인증된 사용자',
    authRefreshToken: '갱신된 토큰',
    authForgotPassword: '비밀번호 재설정 이메일이 전송됨',
    authResetPassword: '비밀번호 재설정 결과',
    authFirstRegister: '인증 토큰과 함께 생성된 첫 번째 사용자',
    authInit: '이 인증 컬렉션에 사용자가 있는지 여부',
    authAccess: '이 컬렉션에 대한 현재 사용자의 접근 권한(권한)',
    authUnlock: '잠금 해제 결과',
    authVerify: '인증 확인 결과',

    versionList: '페이지네이션된 버전 목록',
    versionSingle: '단일 버전',
    versionRestored: '복원된 문서',
    versionWhere: '버전 필드에 대한 필터입니다(예: `where[parent][equals]=<docId>`).',

    jobsRunSummary: '대기 중인 작업을 실행합니다(기본적으로 스케줄도 처리).',
    jobsSchedulesSummary: '스케줄에 따라 실행할 때가 된 작업을 큐에 추가합니다',
    jobsRunResult: '실행 결과',
    jobsSchedulesResult: '스케줄링 결과',
    jobsRunAllQueues: '모든 큐에 걸쳐 작업을 실행합니다.',
    jobsLimit: '실행할 최대 작업 수입니다.',
    jobsDisableScheduling: '`run`이 기본적으로 수행하는 스케줄 처리를 건너뜁니다.',
    jobsSilent: '실행 로깅을 억제합니다.',
    jobsSchedulesAllQueues: '모든 큐에 걸쳐 스케줄을 처리합니다.',
    jobsQueue: '작업을 단일 큐로 제한합니다. 알려진 큐: {{queues}}.',

    uploadFile: '업로드할 바이너리 파일입니다.',
    uploadBody:
      '파일을 업로드하려면 `multipart/form-data`를 전송하고(바이너리 `file` 파트와 JSON 문자열로 변환된 필드가 담긴 `_payload` 파트), 파일이 없으면 필드만 담은 `application/json`을 전송합니다.',
    uploadPayloadField: 'JSON 문자열로 변환된 {{schema}} 필드입니다. 예: `{"alt":"A caption"}`.',

    error400: '유효성 검사 또는 쿼리 오류 (ValidationError, QueryError)',
    error401: '인증되지 않음 (AuthenticationError)',
    error403: '접근 제어에 의해 금지됨 (Forbidden, UnverifiedEmail)',
    error404: '문서를 찾을 수 없음 (NotFound)',
    error500: '내부 서버 오류 (APIError)',

    securityBearer:
      '로그인 엔드포인트가 반환한 `token`을 붙여넣으세요. `Authorization: Bearer <token>`로 전송됩니다. Payload는 `JWT <token>` 방식과 `{{cookiePrefix}}-token` 쿠키도 허용합니다.',
    securityInteractive:
      '대화형 로그인: 사용자 이름(또는 이메일)과 비밀번호를 입력하고, Client ID/Secret은 비워 두세요.',

    tagCollections: '컬렉션',
    tagCollectionsDesc: '문서 컬렉션 엔드포인트(CRUD, 개수, 복제)입니다.',
    tagGlobals: '글로벌',
    tagGlobalsDesc: '글로벌 문서 엔드포인트입니다.',
    tagSystem: '시스템',
    tagSystemDesc: 'Payload 시스템 엔드포인트입니다.',
    tagAuth: '인증',
    tagVersions: '버전',
    tagJobs: '작업',

    localizationHeading: '현지화',
    localizationNote:
      '사용 가능한 로케일: {{locales}}. 읽기 엔드포인트에 `?locale=<code>`를 전달하면 하나를 선택합니다. `?locale=all`을 전달하면 모든 로케일을 한 번에 받으며, 이때 각 현지화된 필드는 단일 값 대신 로케일 코드를 키로 하는 객체로 반환됩니다(예: `{ "en": "Hello", "de": "Hallo" }`). `locale=all`과 함께 `?flattenLocales=false`를 설정하면 그 로케일별 객체 형태를 유지합니다. 필드 스키마는 단일 로케일 형태를 보여줍니다.',
    docLanguagesNote:
      '이 문서는 다음 언어로 제공됩니다: {{languages}}. 언어를 변경하려면 이 스펙 URL에 `?lang=<code>`를 추가하세요.',
  },
}
