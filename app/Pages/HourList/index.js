'use strict'; 
 /*
 * @Author: Max.Liu 
 * @Date: 2018-02-04
 * @Last Modified time: 2018-02-05 12:16:39 
 */
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class HourList extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text>HourList</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#eee",
  }
});
