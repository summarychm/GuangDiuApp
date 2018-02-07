"use strict";
/*
 * // APP首页
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
  StyleSheet,
  FlatList
} from "react-native";

// 公共头部
import PublicHeader from "app/public-header";
// 公共列表项
import ProductListItem from "app/product-list-item";
// 公共空白页
import NoDataComponent from "app/no-data-component";

// 公共方法
import { Config, Request } from "apptools";

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
      isRefreshing: false,
      config: {
        sinceid: 0, //上次最后一个结果id
        count: 10, //数量
        country: "ch", //国内ch,海淘us
        mall: "", // 电商平台
        cate: "" //分类
      },
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
        refreshing={this.state.isRefreshing}
        onRefresh={() => {
          let config = this.state.config;
          config.sinceid = 0;
          // 设置为刷新状态,清空ProductData和重置sinceid
          this.setState({
              isRefreshing: true,
              config: config,
              ProductData:[]
            },() => {
              this._fetchData();
            }
          );
        }}
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
    let url = Config.URL.ProductList;
    let { config } = this.state;
    let options = this.state.config;
    if (options.sinceid === 0) delete options.sinceid;

    let header = { Accept: "application/json" };
    Request.POST(url, options, header).then(result => {
      if (result.status !== "ok")
        throw new Error("获取首页商品列表异常.", result);
      let ProductData = [];
      if (!this.state.isRefreshing) {
        //上滑加载
        ProductData = this.state.ProductData;
        ProductData = ProductData.concat(result.data);
      } else {
        //下拉刷新
        ProductData = result.data;
      }

      let config = this.state.config;
      config.sinceid = ProductData[ProductData.length - 1].id;
      this.setState({
        ProductData: ProductData,
        config: config,
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
