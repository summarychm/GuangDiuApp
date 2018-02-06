'use strict'; 
 /*
 * @Author: Max.Liu 
 * @Date: 2018-02-04
 * @Last Modified time: 2018-02-05 16:41:54 
 */
import { AppRegistry } from "react-native"; 

import {Router} from "apptools";
 
// 屏蔽APPRemote debugger的警告
console.ignoredYellowBox = ['Remote debugger'];
AppRegistry.registerComponent("GuangDiuApp", () => Router);
