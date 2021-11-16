import axios from "axios";
import qs from "qs";
import { ResponseCode, ResponseErrorCode } from '@/enum/responseCode';
import { IResponseInterface } from '@/api/types/IResponseInterface';

/* ==================== 取消重复请求，参考使用 =================== */
const pendingRequest = new Map();
const generateReqKey = (config: any) => {
  const { method, url, params, data } = config;
  return [method, url, qs.stringify(params), qs.stringify(data)].join('&');
}

const addPendingRequest = (config: any) => {
  const requestKey = generateReqKey(config);
  config.cancelToken = config.cancelToken || new axios.CancelToken((cancel: any) => {
    if (!pendingRequest.has(requestKey)) {
       pendingRequest.set(requestKey, cancel);
    }
  });
}

const removePendingRequest = (config: any) => {
  const requestKey = generateReqKey(config);
  if(pendingRequest.has(requestKey)) {
    const cancelToken = pendingRequest.get(requestKey);
    cancelToken(requestKey);
    pendingRequest.delete(requestKey);
  }
}
/* ======================================= */
// 基础配置
const instance = axios.create({
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  }
});
// 请求拦截
instance.interceptors.request.use((config: any) => {
  removePendingRequest(config);
  addPendingRequest(config);
  return config;
}, (error: any) => {
  return Promise.reject(error);
})
// 响应拦截
instance.interceptors.response.use((res: any) => {
  removePendingRequest(res.config);
  const data = res.data;
  switch (data.errNo) {
    // 请求成功
    case ResponseCode.SUCCESS:
      return data.data;
    default:
      return data.data;
  }
}, (error: any) => {
  removePendingRequest(error.config || {});
  if(axios.isCancel(error)) {
    console.log(`已取消的重复请求 ---->${error.message}`);
  } else {
    const status = error.response.status;
    switch (status) {
      case ResponseErrorCode.INVALID_ERROR:
        error.response.data.message = '请求参数错误';
        break;
      case ResponseErrorCode.UN_AUTHORIZED:
        error.response.data.message = '当前请求未授权';
        break;
      case ResponseErrorCode.FORBIDDEN:
        error.response.data.message = '该请求禁止访问';
        break;
      case ResponseErrorCode.NOT_FOUND:
        error.response.data.message = '该请求不存在';
        break;
      case ResponseErrorCode.NOT_ACCEPT_ABLE:
        error.response.data.message = '请求格式错误';
        break;
      case ResponseErrorCode.INTERNAL_SERVER_ERROR:
        error.response.data.message = '服务器内部错误';
        break;
      case ResponseErrorCode.SERVER_UNAVAIL_ABLE:
        error.response.data.message = '该请求暂时无法处理';
        break;
      default:
        error.response.data.message = `请求错误，状态码${error.response.status}`;
        break;
    }
    return Promise.reject(error.response.data);
  }
})
/**
 * @class CommonSerivce
 * @desc 基础服务请求
 */
export class CommonService {
  /**
   * @desc get请求
   * @return Promise<?any>;
   */
  public static _get(api: string, params: any) {
    try {
      return new Promise<IResponseInterface>((resolve, reject) => {
        instance({
          url: api,
          method: 'GET',
          params: params,
        }).then((res: any) => {
          resolve(res);
        }).catch((err: any) => {
          reject({
            errNo: ResponseCode.ERROR,
            errstr: err.message,
          });
        });
      });
    } catch (error) {
      console.log(
        `from ${api} _get method error__________${JSON.stringify(error)}`
      );
    }
  }
  /**
   * @desc post请求
   * @return Promise<?any>;
   */
  public static _post(api: string, data: any) {
    try {
      return new Promise<IResponseInterface>((resolve, reject) => {
        instance({
          url: api,
          method: "POST",
          data: data
        })
          .then((res: any) => {
            resolve(res);
          })
          .catch((err: any) => {
            reject({
              errNo: ResponseCode.ERROR,
              errstr: err.message,
            });
          });
      });
    } catch (error) {
      console.log(
        `from ${api} _post method error__________${JSON.stringify(error)}`
      );
    }
  }
}
