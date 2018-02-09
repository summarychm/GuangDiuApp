"use strict";
/*
 * @Author: Max.Liu 
 * @Date: 2018-02-05 15:43:05 
 * @Last Modified time: 2018-02-05 15:43:05 
 */
import React, { Component } from "react";
import { View, StyleSheet, Platform } from "react-native";
import PropTypes from "prop-types";

import { Config } from "apptools";
// 自定义Navigation公共Header组件
export default class NavigationHeader extends Component {
  static propTypes = {
    renderLeft: PropTypes.func,
    renderTitle: PropTypes.func,
    renderRight: PropTypes.func
  };
  render() {
    const { renderLeft, renderTitle, renderRight } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.View}>{renderLeft && renderLeft()}</View>
        <View style={styles.View}>{renderTitle && renderTitle()}</View>
        <View style={styles.View}>{renderRight && renderRight()}</View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: Config.Styles.DevicesWidth,
    height: Platform.OS === "ios" ? 60 : 40,
    backgroundColor: "#eee",
   // backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1
  },
  View: {
    flex: 1
  }
});
