import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class HaiTao extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text>HaiTao</Text>
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
