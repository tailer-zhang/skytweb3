import axios from 'axios';
import env from "../configs/env";
const { api } = env['prod'];
const instance = axios.create({
  baseURL: api
})

// instance.interceptors.request.use(
//   config => {
//     if (!config.headers['X-Wallet-Address'] && getAccount()) {
//       config.headers['X-Wallet-Address'] = getAccount();
//     }
//     return config
//   },
//   error => {
//     alert(error)
//     return Promise.reject(error)
//   }
// )

export default instance
