import axios from 'axios';
import {baseURL} from '@/config';
import {get} from '@/utils';
import {Message} from 'element-ui';

import Result from './result';

// const timeout = process.env.NODE_ENV === 'production' ? 10000 : 11000;
const instance = axios.create({
  baseURL
  // timeout
});

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return new Result(response);
  },
  error => {
    // 对响应错误做点什么
    let msg = get(error, 'response.data.msg', '系统异常');
    let status = get(error, 'response.status', '-999');
    let info = `【${status}】: ${msg}`;

    console.error('接口报错：');
    console.log(error.request);
    Message.error(info);
    return Promise.reject(error);
  }
);

instance.Result = Result;
export default instance;
