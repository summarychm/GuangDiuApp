"use strict";
/*
 * @Author: Max.Liu 
 * @Date: 2018-02-04
 * @Last Modified time: 2018-02-05 12:15:52 
 */

import React from "react";
import { Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";

import HeaderComponent from './HeaderComponent';

export default class Home extends React.PureComponent {
  static navigationOptions = {
    headerTitle: "Homes",
    header: <HeaderComponent />
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <Text>Footer2018-2-5</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerRightText: { fontSize: 30 },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333"
  }
});
