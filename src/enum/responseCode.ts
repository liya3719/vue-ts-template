export enum ResponseCode {
  // 请求成功
  SUCCESS = 0,
  // 自定义错误码
  ERROR = 8899
}
export enum ResponseErrorCode {
  // 参数错误
  INVALID_ERROR = 400,
  // 未授权
  UN_AUTHORIZED = 401,
  // 禁止用户访问
  FORBIDDEN = 403,
  // 请求不存在
  NOT_FOUND = 404,
  // 用户请求格式不正确
  NOT_ACCEPT_ABLE = 406,
  // 服务器错误
  INTERNAL_SERVER_ERROR = 500,
  // 暂时无法处理的请求
  SERVER_UNAVAIL_ABLE = 503
}