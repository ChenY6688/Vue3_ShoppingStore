import type { App } from 'vue';
// npm i axios
import axios from 'axios';
// npm install sweetalert2
import Swal from 'sweetalert2';


const axiosPlugin = {
  install(app: App) {
    const axiosInstance = axios.create();

    axiosInstance.interceptors.request.use(config => {
      Swal.fire({
        title: "請稍候",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      return config;
    });

    axiosInstance.interceptors.response.use(response => {
      Swal.close();
      return response;
    }, error => {
      Swal.close();
      return Promise.reject(error);
    });

    // 使用Vue的(provide)和(inject)API=>配置攔截器
    app.provide('axios', axiosInstance);
  }
};

export default axiosPlugin;
