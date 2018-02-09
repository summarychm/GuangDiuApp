/*
 * // 小时风云榜
 * @Author: Max.Liu 
 * @Date: 2018-02-04
 * @Last Modified time: 2018-02-05 12:15:52 
 */

"use strict";
import React from "react";
import {
  Button,
  Image,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";

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
                alignSelf: "flex-end",
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
      hour: "",
      date: ""
    };
    let currentTime = new Date();
  }
  componentDidMount() {
    this._fetchData();
  }
  render() {
    return (
      <View style={styles.container}>
        {/* 顶部时间段提示部分 */}
        <View style={styles.HeaderContainer}>
          <Text>{this._titleFormat()}</Text>
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
            onRefresh={() => {
              this.setState(
                {
                  hour: "",
                  date: ""
                },this._fetchData);
            }}
          />
        </View>
        {/* 底部事件选择部分 */}
        <View style={styles.FooterContainer}>
          <Text
            style={styles.FooterText}
            onPress={() => {
              this.setState(
                {
                  hour: this.state.lasthourhour,
                  date: this.state.lasthourdate
                },this._fetchData);
            }}
          >{`<上一小时`}</Text>
          <Text
            style={styles.FooterText}
            onPress={() => {
              this.setState(
                {
                  hour: this.state.nexthourhour,
                  date: this.state.nexthourdate
                },this._fetchData);
            }}
          >{`下一小时>`}</Text>
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

    let options = {
      date: this.state.date || "", //格式：20160711
      hour: this.state.hour || "" //13
    };
    let header = { Accept: "application/json" };
    global.RequestBase.POST(Config.URL.HourList, options, header)
      .catch(err => {
        console.error(err);
      })
      .then(async result => {
        if (result.status !== "ok") {
          console.log("获取小时风云榜数据异常.", result);
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
          displaydate: result.displaydate, // "今日"
          rankduring: result.rankduring, //"12:00-13:00"
          rankhour: result.rankhour, // 13
          lasthourhour: result.lasthourhour, // "12"
          lasthourdate: result.lasthourdate, // "20180209"
          nexthourhour: result.nexthourhour, //
          nexthourdate: result.nexthourdate, //
          isRefreshing: false
        });
      });
  };

  //标题格式化
  _titleFormat = () => {
    let { displaydate, rankhour, rankduring } = this.state;
    if (this.state.displaydate)
      return `${displaydate}${rankhour}点档 (${rankduring})`;
    else return "今日";
  };
}
