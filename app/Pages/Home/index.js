"use strict";
/*
 * // APP首页
 * @Author: Max.Liu 
 * @Date: 2018-02-04
 * @Last Modified time: 2018-02-05 12:15:52 
 */

import React from "react";
import { Button, Image, View, Text, StyleSheet, FlatList } from "react-native";

// 公共头部
import PublicHeader from "app/public-header";
// 公共列表项
import ProductListItem from "app/product-list-item";
// 公共空白页
import NoDataComponent from "app/no-data-component";

// 公共方法
import { Config } from "apptools";

export default class Home extends React.PureComponent {
  static navigationOptions = {
    header: ({ navigation }) => {
      return (
        <PublicHeader
          navigation={navigation}
          country="ch"
          countryTitle="国内"
        />
      );
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false, //下拉刷新
      isLoadingTail: false, // 上拉加载
      config: {
        sinceid: 0, //上次最后一个结果id
        count: 5, //数量
        country: "ch", //国内ch,海淘us
        mall: "", // 电商平台
        cate: "" //分类
      },
      ProductData: []
    };
  }
  componentDidMount() {
    this._fetchData("tail");
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.ProductData}
          initialNumToRender={0}
          keyExtractor={product => product.id}
          renderItem={product => (
            <ProductListItem
              {...product.item}
              navigation={this.props.navigation}
            />
          )}
          ListEmptyComponent={<NoDataComponent />}
          refreshing={this.state.isRefreshing}
          onRefresh={async () => {
            let config = this.state.config;
            config.sinceid = 0;
            // 设置为刷新状态,清空ProductData和重置sinceid
            await this.setState({
              isRefreshing: true,
              config: config
            });
            this._fetchData("refresh");
          }}
          //距离底部30%触发上滑加载方法
          onEndReachedThreshold={0.3}
          //触底刷新事件
          onEndReached={() => {
            //console.log("length", this.state.ProductData.length);
            if (this.state.ProductData.length > 0) this._fetchData("tail");
          }}
        />
      </View>
    );
  }
  // 获取最新数据方法
  _fetchData = async flag => {
    if (this.state.isLoadingTail || this.state.isRefreshing) return;
    await this.setState({
      isRefreshing: flag === "refresh" ? true : false,
      isLoadingTail: flag === "tail" ? true : false
    });

    let options = this.state.config;
    // 获取最新数据时,不要附带sinceid参数
    if (options.sinceid === 0) delete options.sinceid;

    let header = { Accept: "application/json" };
    global.RequestBase.POST(Config.URL.ProductList, options, header)
      .catch(err => {
        console.error(err);
      })
      .then(result => {
        if (result.status !== "ok") {
          console.error("获取首页商品列表异常.", err);
          this.setState({
            isRefreshing: false,
            isLoadingTail: false
          });
        }
        let ProductData = this.state.isRefreshing
          ? result.data
          : [...this.state.ProductData, ...result.data];
        let config = this.state.config;
        //更新最新商品编号
        config.sinceid = ProductData[ProductData.length - 1].id;

        this.setState({
          ProductData: ProductData,
          config: config,
          isRefreshing: false,
          isLoadingTail: false
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
