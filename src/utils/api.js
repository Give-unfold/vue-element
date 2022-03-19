const axios = require("axios");
const baseURL = "http://localhost:8080/#/login";
const api = {};

const apiAxios = async (method, url, params) => {
  let headers = { "Content-Type": "application/json" };
  // 读取存储在sessionStorage中的token
  if (sessionStorage.getItem("token")) {
    headers.token = sessionStorage.getItem("token");
  }
  return await new Promise((resolve) => {
    axios({
      // 如果缓存里有token则所有请求都包含
      headers: headers,
      method: method,
      url: baseURL + url,
      // 数据内容
      data: method === "POST" ? params : null,
      params: method === "GET" ? params : null,
    })
      .then((res) => {
        console.log(res.data);
        resolve(res.data);
      })
      .cath((e) => {
        console.log(e);
      });
  });
};

// get请求
api.get = async (url, params) => {
  return await apiAxios("GET", url, params);
};
// post请求
api.post = async (url, params) => {
  return await apiAxios("POST", url, params);
};

export default api;
