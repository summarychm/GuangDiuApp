/*
 * // 小时风云榜
 * @Author: Max.Liu 
 * @Date: 2018-02-04
 * @Last Modified time: 2018-02-05 12:15:52 
 */

"use strict";
import React from "react";
import { Button, Image, View, Text, StyleSheet, FlatList } from "react-native";

// 公共头部
import NavigationHeader from "app/navigation-header";
// 公共列表项
import ProductListItem from "app/product-list-item";
// 公共空白页
import NoDataComponent from "app/no-data-component";

// 公共方法
import { Config } from "apptools";

const styles = StyleSheet.create({
  headerLeftText: {},
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  HeaderContainer: {
    width: Config.Styles.DevicesWidth,
    height: 44,
    backgroundColor: Config.Styles.ColorMinor,
    justifyContent: "center",
    alignItems: "center"
  },
  BodyContainer: {
    flex: 1
  },
  FooterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: Config.Styles.DevicesWidth,
    height: 44
  },
  FooterText: {
    fontSize: 14,
    color: Config.Styles.ColorMain,
    marginRight: 20
  }
});

export default class HourList extends React.PureComponent {
  static navigationOptions = {
    header: ({ navigation }) => {
      return (
        <NavigationHeader
          renderLeft={() => <Text />}
          renderTitle={() => (
            <View>
              <Image
                source={{ uri: "navtitle_rank_107x20" }}
                style={{ width: 107, height: 20 }}
              />
            </View>
          )}
          renderRight={() => (
            <Text
              style={{
                alignSelf:'flex-end',
                marginRight: 20,
                fontSize: 12,
                color: Config.Styles.ColorMain
              }}
            >
              设置
            </Text>
          )}
        />
      );
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false, //下拉刷新
      ProductData: [],
      config: {
        date: 20180209, //格式：20160711
        hour: 10 //格式：7~23)
      }
    };
  }
  componentDidMount() {
    this._fetchData();
  }
  render() {
    return (
      <View style={styles.container}>
        {/* 顶部时间段提示部分 */}
        <View style={styles.HeaderContainer}>
          <Text>提示栏提示栏提示栏提示栏</Text>
        </View>
        {/* 中间列表展示部分 */}
        <View style={styles.BodyContainer}>
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
            onRefresh={this._fetchData}
          />
        </View>
        {/* 底部事件选择部分 */}
        <View style={styles.FooterContainer}>
          <Text style={styles.FooterText}>{`<上一小时`}</Text>
          <Text style={styles.FooterText}>{`下一小时>`}</Text>
        </View>
      </View>
    );
  }
  // 获取最新数据方法
  _fetchData = async () => {
    if (this.state.isRefreshing) return;
    await this.setState({
      isRefreshing: true
    });

    let options = this.state.config;
    let header = { Accept: "application/json" };

    global.RequestBase.POST(Config.URL.HourList, options, header)
      .catch(err => {
        console.error(err);
        // //从Realm数据库汇总读取数据.
        // let data = RealmBase.loadAll("HomeRealm");
        // data &&
        //   this.setState({
        //     ProductData: data,
        //     isRefreshing: false
        //   });
      })
      .then(async result => {
        if (result.status !== "ok") {
          console.error("获取首页商品列表异常.", err);
          await this.setState({
            isRefreshing: false
          });
          return;
        }
        let ProductData = this.state.isRefreshing
          ? result.data
          : [...this.state.ProductData, ...result.data];

        //更新最新商品编号
        await this.setState({
          ProductData: ProductData,
          isRefreshing: false
        });
        /* 
        // 更新本地Realm数据库.
        // 先清空Realm数据库,再将最新的数据存入
        await RealmBase.removeAllData("HomeRealm");
        await RealmBase.create("HomeRealm", ProductData);
         */
      });
  };
}
