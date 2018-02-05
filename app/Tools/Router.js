"use strict";
/*
 * @Author: Max.Liu 
 * @Date: 2018-02-04
 * @Last Modified time: 2018-02-05 16:41:19 
 */
import React from "react";

import { Image } from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Config } from "apptools";
import Home from "../Pages/Home/index";
import HaiTao from "../Pages/HaiTao/index";
import HourList from "../Pages/HourList/index";
import ProductList from "../Pages/ProductList/index";

const HomeStack = StackNavigator({
  Home: { screen: Home, path: "/home" },
  ProductList: { screen: ProductList, path: "/productList" }
});
const HaiTaoStack = StackNavigator({
  HaiTao: { screen: HaiTao, path: "/home" }
});
const HourListStack = StackNavigator({
  HourList: { screen: HourList, path: "/home" }
});

export const Router = TabNavigator(
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
        visible:'none',
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
    tabBarVisible:false,
    tabBarOptions: {
      showIcon: true,
      tabBarVisible:false,
      //showLabel: false,
      activeTintColor: Config.Styles.ColorMain, // 项目基色
      inactiveTintColor: Config.Styles.ColorMinor, //次要色
      style: {
        backgroundColor: "#eee"
      }
    }
  }
);