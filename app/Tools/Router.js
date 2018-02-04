import React from "react";

import { Image } from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";

import Home from "../Pages/Home/index";
import HaiTao from "../Pages/HaiTao/index";
import HourList from "../Pages/HourList/index";

export const Router = TabNavigator(
  {
    HomeTab: {
      screen: Home,
      path: "/home",
      navigationOptions: {
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
      screen: HaiTao,
      path: "/haitao",
      navigationOptions: {
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
      screen: HourList,
      path: "/hour",
      navigationOptions: {
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
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: "#c237e2", // 项目基色
      inactiveTintColor: "#0c32e3",
      style: {
        backgroundColor: "#eee"
      }
    }
  }
);
