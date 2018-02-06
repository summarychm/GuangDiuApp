import React, { Component } from "react";
import { View, StyleSheet, Text, WebView } from "react-native";
import propTypes from "prop-types";

import { Config } from "apptools";

class ProductDetail extends Component {
  static propTypes = {
    navigation: propTypes.object
  };
  static navigationOptions = ({ navigation }) => ({
    headerTitle: "优惠详情页",
    tabBarVisible: false
  });
  render() {
    let { id, title } = this.props.navigation.state.params;
    let url = `https://guangdiu.com/api/showdetail.php?v=21&id=${id}`;

    return (
      <View style={styles.container}>
        <WebView
          style={styles.webView}
          source={{ uri: url, method: "GET" }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={false}
        />
      </View>
    );
  }
}

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  webView: {
    flex: 1,
    width: Config.Styles.DevicesWidth,
    height: Config.Styles.DevicesHeight
  }
});
