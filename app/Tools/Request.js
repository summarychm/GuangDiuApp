"use strict";
/*
 * @Author: Max.Liu 
 * @Date: 2018-02-06 10:44:35 
 * @Last Modified time: 2018-02-06 10:44:35 
 */
import { Config, Tools } from "apptools";

let RequestBase = {};

/**
 * GET请求封装
 * @param {string} url 接口地址
 * @param {object} params 请求的参数,只接受对象类型{}
 * @return 返回Promise
 */
RequestBase.GET = (url, params) => {
  if (url && url.length <= 5) throw new Error("请传递正确的URL地址");
  if (params) {
    !url.includes("?") && (url += "?");
    if (Tools.GetValueType(params) === "Object") {
      let paramArray = [];
      for (const key of Object.keys(params)) {
        paramArray.push(key);
      }
      url += paramArray.join("&");
    }
  }
  let options = {
    method: "GET",
    headers: Config.Headers
  };
  return FetchFn(url, options);
};

/**
 * POST请求封装
 * @param {string} url  接口地址
 * @param {object} params 请求的参数,只接受对象类型{}
 * @param {object} headers 请求头参数,只接受对象类型{}
 */
RequestBase.POST = (url, params, headers) => {
  if (url && url.length <= 5) throw new Error("请传递正确的URL地址");

  let options = {
    method: "POST",
    headers: headers || Config.Headers
  };
  if (params) {
    let formData = new FormData();
    for (const key of Object.keys(params)) {
      formData.append(key, params[key]);
    }
    options.body = formData;
  }
  return FetchFn(url, options);
};

//公共的Fetch方法
const FetchFn = (url, options) => {
  return fetch(url, options)
    .catch(err => {
      throw new Error(`${options.method}请求期间发生错误`, err);
    })
    .then(response => response.json());
};

global.RequestBase = RequestBase;
