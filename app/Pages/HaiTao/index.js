"use strict";
/*
 * // 海淘
 * @Author: Max.Liu 
 * @Date: 2018-02-04
 * @Last Modified time: 2018-02-05 12:15:52 
 */

import React from "react";
import {
  Button,
  FlatList,
  Image,
  View,
  Text,
  StyleSheet,
  Modal
} from "react-native";

// 公共头部
import PublicHeader from "app/public-header";
// 公共列表项
import ProductListItem from "app/product-list-item";
// 公共空白页
import NoDataComponent from "app/no-data-component";
// 分类数据
import Category from "app/category-js";
import SiftData from "../../Storage/Data/HTSiftData.json";
// 公共方法
import { Config } from "apptools";



let that = null;
export default class HaiTao extends React.PureComponent {
  static navigationOptions = {
    header: ({ navigation }) => {
      return (
        <PublicHeader
          navigation={navigation}
          country="us"
          countryTitle="海淘"
          onTitleFn={() => {
            // navigation.setParams({ isShow: true });
            that._ToggleModal();
          }}
        />
      );
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false, //下拉刷新
      isLoadingTail: false, // 上拉加载
      isSiftModal: false, // 是否显示筛选界面
      config: {
        sinceid: 0, //上次最后一个结果id
        count: 5, //数量
        country: "us", //国内ch,海淘us
        mall: "", // 电商平台
        cate: "" //分类
      },
      ProductData: []
    };
  }
  componentDidMount() {
    that = this;
    this._fetchData("tail");
  }
  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType={"none"}
          transparent={true}
          visible={this.state.isSiftModal}
          onRequestClose={this._ToggleModal}
        >
          <Category
            data={SiftData}
            onCloseModal={this._ToggleModal}
            changeSelect={(mall, cate) => {
              this._changeSelect(mall, cate);
            }}
          />
        </Modal>
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
          ListEmptyComponent={<NoDataComponent />}
          refreshing={this.state.isRefreshing}
          onRefresh={async () => {
            let config = this.state.config;
            config.sinceid = 0;
            // 设置为刷新状态
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
  // 切换商城和分类
  _changeSelect = (mall, cate) => {
    let config = Object.assign({}, this.state.config);
    config.cate = cate;
    config.mall = mall;
    this.setState(
      {
        isSiftModal:false,
        ProductData:[],
        config: config
      },
      this._fetchData
    );
  };
  //显示模态窗
  _ToggleModal = () => {
    this.setState({
      isSiftModal: !this.state.isSiftModal
    });
  };

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
    let response = global.RequestBase.POST(
      Config.URL.ProductList,
      options,
      header
    ).catch(err => {
      console.error(err);
    });
    response.then(result => {
      if (result.status !== "ok") {
        console.log("获取首页商品列表异常.", result);
      }
      let ProductData = this.state.isRefreshing
        ? result.data
        : [...this.state.ProductData, ...result.data];

      //更新最新商品编号
      let config = Object.assign({}, this.state.config);
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
