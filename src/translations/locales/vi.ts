import type { PluginDefaultTranslationsObject } from '../types.js'

export const vi: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Số cấp tài liệu liên quan cần được điền dữ liệu.',
    paramSort: 'Trường để sắp xếp; thêm tiền tố `-` để sắp xếp giảm dần, ví dụ `-createdAt`.',
    paramSortShort: 'Trường để sắp xếp; thêm tiền tố `-` để sắp xếp giảm dần.',
    paramDraft: 'Trả về các phiên bản nháp.',
    paramTrash: 'Bao gồm các tài liệu đã đưa vào thùng rác.',
    paramAutosave: 'Lưu dưới dạng tự động lưu: cập nhật phiên bản tự động lưu gần nhất thay vì thêm phiên bản mới.',
    paramPublishAllLocales: 'Xuất bản mọi ngôn ngữ, không chỉ ngôn ngữ của yêu cầu.',
    paramUnpublishAllLocales: 'Hủy xuất bản mọi ngôn ngữ và đưa tài liệu về bản nháp.',
    paramOverrideLock: 'Bỏ qua khóa của người dùng khác. Mặc định false.',
    paramSelectedLocales: 'Chỉ sao chép các ngôn ngữ này sang bản sao. Mặc định: mọi ngôn ngữ.',
    paramFlattenLocales:
      'Với `locale=all`, đặt false để giữ các trường đa ngôn ngữ dưới dạng đối tượng theo từng ngôn ngữ. Mặc định là true.',
    paramLocale: 'Ngôn ngữ cần trả về, hoặc `all` để lấy mọi ngôn ngữ. Xem phần Đa ngôn ngữ trong phần mô tả API.',
    paramFallbackLocale: 'Ngôn ngữ dự phòng cho các giá trị đa ngôn ngữ bị thiếu, hoặc `none` để tắt.',

    schemaSelect: 'Chọn các trường cần trả về, ví dụ `select[title]=true`. Bỏ trống để trả về tất cả.',
    schemaPopulate: 'Điền dữ liệu các tài liệu liên quan theo từng collection, ví dụ `populate[posts][title]=true`.',
    schemaJoins: 'Tùy chỉnh theo từng phép join (limit/page/sort/where/count), ví dụ `joins[posts][limit]=10`.',
    schemaWhere:
      'Bộ lọc `where` của Payload. Lồng một trường rồi đến một toán tử: `where[field][equals]=value`. Kết hợp các mệnh đề bằng mảng `and` / `or`, ví dụ `where[or][0][field][equals]=value`. Mỗi trường chỉ liệt kê các toán tử hợp lệ với kiểu của nó.',
    schemaSupportedTimezones: 'Các múi giờ được hỗ trợ theo định dạng IANA.',
    schemaPerLocale: 'Giá trị theo từng ngôn ngữ, được trả về khi dùng `locale=all`.',

    collectionList: 'Danh sách tài liệu được phân trang',
    collectionDoc: 'Một tài liệu đơn lẻ',
    collectionCreated: 'Tài liệu đã được tạo',
    collectionUpdated: 'Tài liệu đã được cập nhật',
    collectionDeleted: 'Tài liệu đã được xóa',
    collectionBulkUpdate: 'Kết quả cập nhật hàng loạt',
    collectionBulkDelete: 'Kết quả xóa hàng loạt',
    collectionCount: 'Số lượng tài liệu',
    collectionDuplicated: 'Tài liệu đã được nhân bản',

    globalDoc: 'Tài liệu global',

    authLogin: 'Kết quả đăng nhập',
    authLogout: 'Kết quả đăng xuất',
    authMe: 'Người dùng hiện đang được xác thực',
    authRefreshToken: 'Token đã được làm mới',
    authForgotPassword: 'Email đặt lại mật khẩu đã được gửi',
    authResetPassword: 'Kết quả đặt lại mật khẩu',
    authFirstRegister: 'Người dùng đầu tiên, được tạo cùng với một token xác thực',
    authInit: 'Cho biết collection xác thực này đã có người dùng nào hay chưa',
    authAccess: 'Quyền truy cập (permissions) của người dùng hiện tại đối với collection này',
    authUnlock: 'Kết quả mở khóa',
    authVerify: 'Kết quả xác minh',

    versionList: 'Danh sách phiên bản được phân trang',
    versionSingle: 'Một phiên bản đơn lẻ',
    versionRestored: 'Tài liệu đã được khôi phục',
    versionWhere: 'Lọc theo các trường phiên bản, ví dụ `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'Chạy các job đang xếp hàng (và, theo mặc định, xử lý lịch trình)',
    jobsSchedulesSummary: 'Xếp hàng các job đến hạn theo lịch trình của chúng',
    jobsRunResult: 'Kết quả chạy',
    jobsSchedulesResult: 'Kết quả lập lịch',
    jobsRunAllQueues: 'Chạy các job trên tất cả các hàng đợi.',
    jobsLimit: 'Số job tối đa được chạy.',
    jobsDisableScheduling: 'Bỏ qua việc xử lý lịch trình mà `run` thực hiện theo mặc định.',
    jobsSilent: 'Tắt ghi log khi chạy.',
    jobsSchedulesAllQueues: 'Xử lý lịch trình trên tất cả các hàng đợi.',
    jobsQueue: 'Giới hạn thao tác chỉ trong một hàng đợi. Các hàng đợi đã biết: {{queues}}.',

    uploadFile: 'Tệp nhị phân cần tải lên.',
    uploadBody:
      'Gửi `multipart/form-data` để tải lên một tệp (một phần `file` nhị phân cùng với một phần `_payload` chứa các trường đã được chuyển thành chuỗi JSON), hoặc gửi `application/json` chỉ với các trường khi không có tệp.',
    uploadPayloadField: 'Các trường {{schema}} đã được chuyển thành chuỗi JSON. Ví dụ: `{"alt":"A caption"}`.',

    error400: 'Lỗi xác thực hoặc lỗi truy vấn (ValidationError, QueryError)',
    error401: 'Chưa được xác thực (AuthenticationError)',
    error403: 'Bị từ chối bởi kiểm soát truy cập (Forbidden, UnverifiedEmail)',
    error404: 'Không tìm thấy tài liệu (NotFound)',
    error500: 'Lỗi máy chủ nội bộ (APIError)',

    securityBearer:
      'Dán `token` được trả về bởi endpoint đăng nhập. Được gửi dưới dạng `Authorization: Bearer <token>`. Payload cũng chấp nhận lược đồ `JWT <token>` và cookie `{{cookiePrefix}}-token`.',
    securityInteractive:
      'Đăng nhập tương tác: nhập tên người dùng (hoặc email) và mật khẩu; để trống Client ID/Secret.',

    tagCollections: 'Collections',
    tagCollectionsDesc: 'Các endpoint của collection tài liệu (CRUD, đếm, nhân bản).',
    tagGlobals: 'Globals',
    tagGlobalsDesc: 'Các endpoint của tài liệu global.',
    tagSystem: 'Hệ thống',
    tagSystemDesc: 'Các endpoint hệ thống của Payload.',
    tagAuth: 'Xác thực',
    tagVersions: 'Phiên bản',
    tagJobs: 'Jobs',

    localizationHeading: 'Đa ngôn ngữ',
    localizationNote:
      'Các ngôn ngữ khả dụng: {{locales}}. Truyền `?locale=<code>` vào một endpoint đọc để chọn một ngôn ngữ. Truyền `?locale=all` để nhận mọi ngôn ngữ cùng lúc — khi đó mỗi trường đa ngôn ngữ sẽ được trả về dưới dạng một đối tượng có khóa là mã ngôn ngữ (ví dụ `{ "en": "Hello", "de": "Hallo" }`) thay vì một giá trị đơn lẻ. Đặt `?flattenLocales=false` cùng với `locale=all` để giữ dạng đối tượng theo từng ngôn ngữ đó. Lược đồ trường hiển thị cấu trúc của một ngôn ngữ đơn lẻ.',
    docLanguagesNote:
      'Tài liệu này có sẵn bằng các ngôn ngữ: {{languages}}. Thêm `?lang=<code>` vào URL spec này để chuyển đổi.',
  },
}
