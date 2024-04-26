import Axios from 'axios'

const request = Axios.create({
    baseURL: 'http://127.0.0.1:8001/api/accounts/',
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

  export default request