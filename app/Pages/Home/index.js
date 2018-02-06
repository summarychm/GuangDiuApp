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
import { Config, Request } from "apptools";

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
    this.state = {
      ProductList: {}
    };
  }
  componentDidMount() {
    this._fetchData();
  }
  _fetchData = async () => {
    let options = { count: 10, mall: "京东商城" };
    let url = "http://guangdiu.com/api/getlist.php";
    let result = await Request.POST(url, options, {
      Accept: "application/json"
    });
    await this.setState({
      ProductList: result.data
    });
  };

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
