import React, { Component } from "react";
import { Image, View, StyleSheet } from "react-native";
import { Router } from "apptools";

import { Config } from "apptools";

class LaunchPage extends Component {
  render() {
    return (
      <View>
        <Image source={{ uri: "launchimage" }} style={styles.imageStyle} />
      </View>
    );
  }
}

export default LaunchPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  imageStyle: {
    width: Config.Styles.DevicesWidth,
    height: Config.Styles.DevicesHeight
  }
});
