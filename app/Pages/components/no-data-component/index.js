import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class NoDataComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textData}>数据加载中...</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  textData: {
    fontSize: 20,
    color: "gray"
  }
});
