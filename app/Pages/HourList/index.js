"use strict";
/*
 * @Author: Max.Liu 
 * @Date: 2018-02-04
 * @Last Modified time: 2018-02-05 12:16:39 
 */
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Config } from "apptools";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee"
  },
  HeaderTitle: {
    paddingLeft: 50
  },
  HeaderTitleText: {
    color: Config.Styles.ColorMain
  },
  TextRight: {
    color: Config.Styles.ColorMain,
    marginRight: 15
  }
});

export default class HourList extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: (
      <Text>
        小时<Text style={styles.HeaderTitleText}>风云榜</Text>
      </Text>
    ),
    headerLeft :<View></View>,
    headerStyle: styles.HeaderTitle,
    headerRight: (
      <Text
        style={styles.TextRight}
        onPress={() => {
          console.log(navigation);
          navigation.goBack();
        }}
      >
        关闭
      </Text>
    )
  });
  render() {
    return (
      <View style={styles.container}>
        <Text>HourList</Text>
      </View>
    );
  }
}
