/*
 * 搜索页
 * @Author: Max.Liu 
 * @Date: 2018-02-09 14:26:23 
 * @Last Modified time: 2018-02-09 14:26:23 
 */
"use strict";

import React from "react";
import {
  Button,
  Image,
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList
} from "react-native";

// 公共列表项
import ProductListItem from "app/product-list-item";
// 公共方法
import { Config } from "apptools";

export default class Search extends React.PureComponent {
  static navigationOptions = {
    title: "搜索全网折扣",
    headerBackTitle: "首页"
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoadingTail: false, // 上拉加载
      count: 10, // 返回数据个数
      sinceid: 0, // 搜索结果最后一组数据的id
      q: "", // 用户查询的关键字
      ProductData: []
    };
  }
  componentDidMount() {}
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerView}>
            <Image
              source={{ uri: "search_icon_20x20" }}
              style={styles.headerIconStyles}
            />
            <TextInput
              autoFocus={true}
              style={styles.textInput}
              underlineColorAndroid="transparent" //设置下划线背景色透明 达到去掉下划线的效果
              placeholer="请输入商品名称"
              returnKeyType={"search"}
              onChangeText={text => {
                this.setState({ q: text });
              }}
            />
          </View>
          <Button
            title={this.state.q.length > 0 ? "搜索" : "取消"}
            color={Config.Styles.ColorMain}
            disabled={this.state.isLoadingTail}
            onPress={() => {
              this.setState({
                ProductData: []
              });
              this._fetchData();
            }}
          />
        </View>
        <View style={styles.bodyContainer}>
          <FlatList
            data={this.state.ProductData}
            initialNumToRender={7}
            keyExtractor={product => product.id}
            renderItem={product => (
              <ProductListItem
                {...product.item}
                navigation={this.props.navigation}
              />
            )}
            //距离底部30%触发上滑加载方法
            onEndReachedThreshold={0.3}
            //触底刷新事件
            onEndReached={() => {
              if (this.state.ProductData.length > 0) this._fetchData("tail");
            }}
          />
          {/*
           
           */}
        </View>
      </View>
    );
  }
  // 获取最新数据方法
  _fetchData = async flag => {
    if (this.state.isLoadingTail || this.state.q.length <= 1) return;
    await this.setState({
      isLoadingTail: true
    });
    let options = {
      count: this.state.count,
      q: this.state.q // 用户查询的关键字
    };
    if (this.state.sinceid !== 0) options.sinceid = this.state.sinceid;

    let header = { Accept: "application/json" };
    global.RequestBase.POST(Config.URL.Search, options, header)
      .catch(error => {
        console.error(error);
        this.setState({
          isLoadingTail: false
        });
      })
      .then(result => {
        if (result.status !== "ok") {
          console.log("获取首页商品列表异常.", result);
          this.setState({
            isLoadingTail: false
          });
          return;
        }
        let ProductData = [...this.state.ProductData, ...result.data];
        //更新最新商品编号
        this.setState({
          ProductData: ProductData,
          sinceid: ProductData[ProductData.length - 1].id,
          isLoadingTail: false
        });
      });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 20
  },
  headerContainer: {
    height: 40,
    width: Config.Styles.DevicesWidth,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5
  },
  headerView: {
    flex: 1,
    height: 40,
    backgroundColor: "#ebebee",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    margin: 5
  },
  headerIconStyles: { width: 20, height: 20, margin: 5 },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10
  }
});
