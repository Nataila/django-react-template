import { message } from 'antd';
import Axios from 'axios'
import _ from 'lodash'

const request = Axios.create({
    baseURL: 'http://127.0.0.1:8001/api',
    timeout: 2000,
});

// 添加请求拦截器
request.interceptors.request.use(
    config => {
      // 假设 token 存储在 localStorage，这里从 localStorage 获取 token
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;  // 将 token 添加到请求头部
      }
      return config;
    },
    error => {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  request.interceptors.response.use(
    (response)=>{
      //响应数据后做点什么
      if (response.status && [200, 201].includes(response.status)) {
        return response.data;
      }
    },
    (error)=>{
      // 对响应错误做点什么
      _.flattenDeep(Object.values(error.response.data)).forEach(item => {
        return message.error(item);
      })
      return Promise.reject(error);
    }
  )

  export default request