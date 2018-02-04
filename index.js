import { AppRegistry } from "react-native";
// import App from './App';
import { Router } from "./app/Tools/Router";

// 屏蔽APPRemote debugger的警告
console.ignoredYellowBox = ['Remote debugger'];
// AppRegistry.registerComponent('GuangDiuApp', () => App);
AppRegistry.registerComponent("GuangDiuApp", () => Router);
