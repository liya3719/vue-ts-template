import axios from 'axios';
axios.defaults.withCredentials = true;
/**
 * @class CommonSerivce
 * @desc 基础服务请求
 */
export class CommonService {
  /**
   * @desc get请求
   * @return Promise<?any>;
   */
  public static _get(api:string, params :any ) {
    try {
      return new Promise((resolve, reject) => {
        axios({
          url: api,
          method: 'GET',
          params,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }).then((res) => {
          resolve(res.data);
        }).catch((err) => {
          reject({
            errNo: 1001,
            errStr: err.message,
          })
        })
      })
    } catch (error) {
      console.log(`from ${api} _get method error__________${JSON.stringify(error)}`);
    }
  }
  /**
   * @desc post请求
   * @return Promise<?any>;
   */
  public static _post(api:string, data :any) {
    try {
      return new Promise((resolve, reject) => {
        axios({
          url: api,
          method: 'POST',
          data,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }).then((res) => {
          resolve(res.data);
        }).catch((err) => {
          reject({
            errNo: 1001,
            errStr: err.message,
          })
        })
      })
    } catch (error) {
      console.log(`from ${api} _post method error__________${JSON.stringify(error)}`);
    }
  }
}