'use strict'; 
 /*
 * @Author: Max.Liu 
 * @Date: 2018-02-04
 * @Last Modified time: 2018-02-05 11:16:27  
 */ 
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class HaiTao extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text>海淘</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#999",
  }
});
