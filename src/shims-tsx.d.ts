import Vue, { VNode } from 'vue';
import * as axios from 'axios';
declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

declare module 'axios' {
  // 这里自定义AxiosResponse返回数据
  export interface AxiosResponse {

  }
  // 这里自定义AxiosError返回数据
  export interface AxiosError {

  }
}