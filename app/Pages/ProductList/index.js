"use strict";
/*
 * 
 * @Author: Max.Liu 
 * @Date: 2018-02-05 17:23:50 
 * @Last Modified time: 2018-02-05 17:23:50 
 */

import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";

import ProductListItem from "app/product-list-item";
import NoDataComponent from "app/no-data-component";

import { Config } from "apptools";

// styles放到最后,navigationOptions无法识别,所以将其提前.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee"
  },
  TextRight: {
    color: Config.Styles.ColorMain,
    marginRight: 15
  },
  flexCenter: {
    justifyContent: "center",
    alignItems: "center"
  },
  subTitle: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    color: Config.Styles.ColorMain
  }
});

// 半小时内最热商品页
export default class ProductList extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    title: "半小时内最热商品",
    headerLeft: <View />,
    headerRight: (
      <Text
        style={styles.TextRight}
        onPress={() => {
          navigation.goBack();
        }}
      >
        关闭
      </Text>
    )
  });
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false, //是否刷新中
      ProductData: {}
    };
  }
  componentDidMount() {
    this._fetchData();
  }
  render() {
    return (
      <View style={styles.container}>
        {!this.state.ProductData.length ? (
          <NoDataComponent />
        ) : (
          <FlatList
            ListHeaderComponent={
              <View style={styles.flexCenter}>
                <Text style={styles.subTitle}>
                  根据每条折扣的点击进行统计,每5分钟更新一次
                </Text>
              </View>
            }
            refreshing={this.state.isRefreshing}
            onRefresh={this._fetchData}
            data={this.state.ProductData}
            keyExtractor={product => product.id}
            renderItem={product => <ProductListItem {...product.item} />}
          />
        )}
      </View>
    );
  }
  //获取最新数据
  _fetchData = async () => {
    await this.setState({
      isRefreshing: true,
      ProductData: {}
    });
    const url = "http://guangdiu.com/api/gethots.php";
    let response = await fetch(url).catch(err => {
      throw new Error("获取半小时内最热商品出错.", err);
    });
    const result = await response.json();
    if (result.status !== "ok")
      throw new Error("获取30分钟内最热商品异常.", result);
    await this.setState({
      ProductData: result.data,
      isRefreshing: false
    });
  };
}
