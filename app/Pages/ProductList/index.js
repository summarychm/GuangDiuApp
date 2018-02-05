"use strict";
/*
 * @Author: Max.Liu 
 * @Date: 2018-02-05 17:23:50 
 * @Last Modified time: 2018-02-05 17:23:50 
 */

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

//import NavigationHeader from "app/navigation-header";
import { Config } from "apptools";

//因为使用了navigationOptions,styles放到最后options无法识别,所以提前了.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee"
  },
  TextRight: {
    color: Config.Styles.ColorMain,
    marginRight:15,
  }
});

export default class ProductList extends React.PureComponent {
  static navigationOptions= ({navigation}) => ({
    title: "近半小时热门商品",
    headerRight: (
      <TouchableOpacity onPress={()=>{
        console.log(navigation);
        navigation.goBack();
      }} >
        <Text style={styles.TextRight}>关闭</Text>
      </TouchableOpacity>
    )
  });
  render() {
    return <View style={styles.container}>{this._renderHeader}</View>;
  }
}

