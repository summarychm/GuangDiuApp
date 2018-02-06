import React, { Component } from "react";
import { View, StyleSheet, Text, WebView } from "react-native";
import propTypes from "prop-types";

class ProductDetail extends Component {
  static propTypes = {
    navigation: propTypes.object
  };
  static navigationOptions = {
    headerTitle: "详情页"
  };
  render() {
      console.log('====================================');
      console.log(this.props.navigation.state.params);
      console.log('====================================');
      const id=this.props.navigation.state.params.id;
    let url = `https://guangdiu.com/api/showdetail.php?v=21&id=${id}`;
    return (
      <View>
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
    flex: 1
  }
});
