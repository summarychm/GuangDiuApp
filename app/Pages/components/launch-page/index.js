import React, { Component } from "react";
import { Image, View, StyleSheet } from "react-native";

import { Config } from "apptools";

class LaunchPage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      header: <View />,
      title: "title"
      //headerMode:'none',
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate("TabBarPage");
    }, 1000 * 0.5);
  }
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
    //height:300,
    height: Config.Styles.DevicesHeight
  }
});
