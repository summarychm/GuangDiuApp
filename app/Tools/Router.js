"use strict";
/*
 * @Author: Max.Liu 
 * @Date: 2018-02-04
 * @Last Modified time: 2018-02-05 16:41:19 
 */
import React from "react";
import { StackNavigator, TabNavigator } from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Config } from "apptools";

import Home from "../Pages/Home/index";
import HaiTao from "../Pages/HaiTao/index";
import HourList from "../Pages/HourList/index";
import ProductList from "../Pages/ProductList/index";
import ProductDetail from "../Pages/components/product-detail";
//启动页
import LaunchPage from "../Pages/components/launch-page";

const HomeStack = StackNavigator({
  Home: { screen: Home, path: "/home" },
  ProductList: { screen: ProductList, path: "/productList" },
  ProductDetail: { screen: ProductDetail, path: "/productDetail" }
});
const HaiTaoStack = StackNavigator({
  HaiTao: { screen: HaiTao, path: "/home" }
});
const HourListStack = StackNavigator({
  HourList: { screen: HourList, path: "/home" }
});

const TabBarNavigation = TabNavigator(
  {
    HomeTab: {
      screen: HomeStack,
      navigationOptions: {
        title: "首页",
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            size={26}
            name={focused ? "ios-home" : "ios-home-outline"}
            style={{ color: tintColor }}
          />
        )
      }
    },
    HaiTaoTab: {
      screen: HaiTaoStack,
      navigationOptions: {
        title: "海淘",
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            size={26}
            name={focused ? "ios-paper-plane" : "ios-paper-plane-outline"}
            style={{ color: tintColor }}
          />
        )
      }
    },
    HourListTab: {
      screen: HourListStack,
      navigationOptions: {
        title: "小时风云榜",
        visible: "none",
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            size={26}
            name={focused ? "ios-timer" : "ios-timer-outline"}
            style={{ color: tintColor }}
          />
        )
      }
    }
  },
  {
    initialRouteName: "HomeTab",
    tabBarPosition: "bottom",
    tabBarVisible: false,
    lazyLoad: true,
    tabBarOptions: {
      showIcon: true,
      tabBarVisible: false,
      //showLabel: false,
      activeTintColor: Config.Styles.ColorMain, // 项目基色
      inactiveTintColor: "#000", //次要色
     // inactiveTintColor: Config.Styles.ColorMinor, //次要色
      style: {
        backgroundColor: "#fafafa"
      }
    }
  }
);
export const Router = StackNavigator(
  {
    LaunchPage: { screen: LaunchPage, path: "/launchPage" },
    TabBarPage: { screen: TabBarNavigation, path: "/main" }
  },
  {
    headerMode: "none"
  }
);
