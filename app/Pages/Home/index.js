import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class Home extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
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
