"use strict";
/*
 * @Author: Max.Liu 
 * @Date: 2018-02-04
 * @Last Modified time: 2018-02-05 12:15:52 
 */

import React from "react";
import {
  Button,
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import HeaderComponent from "./HeaderComponent";

// APP首页
export default class Home extends React.PureComponent {
  static navigationOptions = {
    headerTitle: "Homes",
    header: ({ navigation }) => {
      return <HeaderComponent navigation={navigation} />;
    }
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
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
    backgroundColor: "#355"
  }
});
