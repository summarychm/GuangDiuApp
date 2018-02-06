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
  StyleSheet,
  FlatList,
} from "react-native";

import HeaderComponent from "./HeaderComponent";
import ProductListItem from "app/product-list-item";
import NoDataComponent from "app/no-data-component";

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
      isRefreshing: false,
      sinceid: 0,
      ProductData: []
    };
  }
  componentDidMount() {
    this._fetchData();
  }

  render() {
    return <View style={styles.container}>{this._renderList()}</View>;
  }
  _renderList = () => {
    return !this.state.ProductData.length ? (
      <NoDataComponent />
    ) : (
      <FlatList
        data={this.state.ProductData}
        //距离底部20dp触发就触发onEndReached回调
        onEndReachedThreshold={0.5}
        //触底刷新事件
        onEndReached={this._fetchData}
        keyExtractor={product => product.id}
        renderItem={product => (
          <ProductListItem
            {...product.item}
            navigation={this.props.navigation}
          />
        )}
      />
    );
  };
  _fetchData = () => {
    //, country: "", sinceid: ""
    let url = Config.URL.ProductList;
    let options = { count: 10, mall: "京东商城" };
    if (this.state.sinceid !== 0) options.sinceid = this.state.sinceid;
    let header = { Accept: "application/json" };
    Request.POST(url, options, header).then(result => {
      if (result.status !== "ok")
        throw new Error("获取首页商品列表异常.", result);
      let ProductData = this.state.ProductData;
      ProductData = ProductData.concat(result.data);
      //console.log(ProductData);
      this.setState({
        ProductData: ProductData,
        sinceid: ProductData[ProductData.length - 1].id,
        isRefreshing: false
      });
    });
  };
}

const styles = StyleSheet.create({
  headerRightText: { fontSize: 30 },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    paddingTop: 20
  }
});
