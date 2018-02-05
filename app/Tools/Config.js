'use strict'; 
 /*
 * @Author: Max.Liu 
 * @Date: 2018-02-05 16:41:41 
 * @Last Modified time: 2018-02-05 16:41:41 
 */
import { Dimensions,StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");
export class Config {
  static Styles = {
    DevicesWidth: width,
    ColorMain:'#6ebe64',
    ColorMinor:'#bbbabb',
    hairlineWidth:StyleSheet.hairlineWidth,
  };
}
