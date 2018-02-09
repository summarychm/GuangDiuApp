/*
 * 
 * @Author: Max.Liu 
 * @Date: 2018-02-07 11:51:49 
 * @Last Modified time: 2018-02-07 11:51:49 
 */
"use strict";

// import React from 'react';
import { AppRegistry } from "react-native";

import { Router } from "apptools";
import Request from "./app/Tools/Request";
//全局载入RealmBase属性
 //import "./app/Storage/RealmStore";

// 屏蔽APPRemote debugger的警告
console.ignoredYellowBox = ["Remote debugger"];
AppRegistry.registerComponent("GuangDiuApp", () => Router);
