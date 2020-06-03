import axios from "axios";
import { Loading, Message } from "element-ui";
import router from "../router"

//加载动画
let loading;
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: "拼命加载中...",
    background: "rgba(0,0,0,.7)"
  });
}

function endLoading() {
  loading.close();
}

axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.transformRequest = [
  function(data) {
    let ret = "";
    for (let it in data) {
      ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
    }
    return ret;
  }
];

const urlMap = {
  development: "/",
  test: "/",
  production: "/"
};
const baseUrl = process.env.VUE_APP_CURRENTMODE
  ? urlMap[process.env.VUE_APP_CURRENTMODE]
  : urlMap[process.env.NODE_ENV];
// const ERR_OK = 1

axios.interceptors.request.use(
  config => {
    // const token = store.state.token;
    // token && (config.headers.Authorization = token);
    startLoading();
    if (localStorage.eleToken) {
      config.headers.Authorization = localStorage.eleToken;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//http response 拦截器
axios.interceptors.response.use(
  response => {
    endLoading();
    if (response.status === 200 || response.status === 304) {
      // if(response.data.flag != ERR_OK){        //与java逻辑冲突，不做状态码校验，仅依靠http状态码校验接口状态
      // Message({
      //     message: '接口异常',
      //     center: true,
      //     type: 'error',
      //     offset: 150
      // });

      // router.push({
      //     path:"/login",
      //     querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
      // })
      // }else {
      Message({
        message: "接口请求成功",
        center: true,
        type: "success",
        offset: 300
      });
      console.log("接口成功");
      // }
      return Promise.resolve(response);
    } else {
      Message({
        message: "接口请求失败",
        center: true,
        type: "error",
        offset: 150
      });
      return Promise.reject(response);
    }
  },
  error => {
    endLoading();
    console.log(error.response);
    let errMsg = error.response.data.errMsg || "";
    
    if (error.response.status) {
      switch (error.response.status) {
        case 404:
          Message({
            message: "接口不存在",
            center: true,
            type: "error",
            offset: 150
          });
          break;
        case 401:
          Message({
            message: "Token失效，请重新登录",
            center: true,
            type: "error",
            offset: 150
          });
          localStorage.removeItem("eleToken");
          router.push("/login");
          break;
        default:
          Message({
            message: errMsg,
            center: true,
            type: "error",
            offset: 150
          });
          break;
      }
    }
    console.log(error.response.status);

    return Promise.reject(error);
  }
);

export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(baseUrl + url, params).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}

export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

export function _delete(url, params) {
    return new Promise((resolve, reject) => {
      axios.delete(baseUrl + url, params).then(
        response => {
          resolve(response.data);
        },
        err => {
          reject(err);
        }
      );
    });
  }