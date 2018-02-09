"use strict";
/*
 * @Author: Max.Liu 
 * @Date: 2018-02-05 16:41:41 
 * @Last Modified time: 2018-02-05 16:41:41 
 */
import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");
const BASE_URL = "https://guangdiu.com/api/";
export class Config {
  static Styles = {
    DevicesWidth: width,
    DevicesHeight: height,
    ColorMain: "#6ebe64",
    ColorMinor: "#efefef",
    hairlineWidth: StyleSheet.hairlineWidth
  };
  static Headers = {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8"
  };
  static URL = {
    Hot30Minute: `${BASE_URL}gethots.php`, // 30分钟内最热商品
    ProductList: `${BASE_URL}getlist.php`, // 商品列表
    HourList: `${BASE_URL}getranklist.php` // 小时风云榜
  };
}
