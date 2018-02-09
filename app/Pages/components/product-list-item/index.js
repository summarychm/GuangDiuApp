"use strict";
/*
 * 商品列表公共item项组件
 * @Author: Max.Liu 
 * @Date: 2018-02-05 20:06:32 
 * @Last Modified time: 2018-02-05 20:06:32 
 */
import React from "react";
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet
} from "react-native";
import PropType from "prop-types";

import { Config } from "apptools";

import ProductDetail from "app/product-detail";

export default class ProductListItem extends React.Component {
  static propTypes = {
    image: PropType.string,
    title: PropType.string,
    id: PropType.number
  };
  render() {
    const { image, title, id, navigation } = this.props;
    return (
      <TouchableHighlight
        underlayColor={Config.Styles.ColorMain}
        onPress={() => {
          navigation &&
            navigation.navigate("ProductDetail", {
              id: id,
              title: title
            });
        }}
      >
        <View style={styles.container}>
          {/* 左侧商品图片 */}
          <Image
            style={styles.ViewImage}
            source={{
              uri: image === undefined ? "defaullt_thumb_250x250" : image
            }}
          />
          {/* 中间商品详情 */}
          <View style={styles.ViewTitle}>
            <Text numberOfLines={3}>{title}</Text>
            {/* 如果有平台信息 */}
            {this.props.mall ? (
              <View style={styles.MallView}>
                <Text style={styles.MallText}>{this.props.mall}</Text>
                <Text style={styles.MallTime}>
                  {this._formatTime(this.props.pubtime, this.props.fromsite)}
                </Text>
              </View>
            ) : null}
          </View>
          {/* 右侧箭头图标 */}
          <Image
            style={styles.ViewArrowRight}
            source={{ uri: "icon_cell_rightarrow" }}
          />
        </View>
      </TouchableHighlight>
    );
  }
  _formatTime = (pubtime, fromsite) => {
    var val = "";
    let timeVal = new Date() - new Date(pubtime);
    if (timeVal < 0) return "刚刚";
    let minute = 1000 * 60; // 1分钟
    let hour = minute * 60; // 1小时
    let day = hour * 24; // 1天
    let week = day * 7; // 1周
    let month = day * 30; // 1月

    let monthC = timeVal / month; //相差了几个月
    let weekC = timeVal / week; // 相差了几周
    let dayC = timeVal / day; // 相差了几天
    let hourC = timeVal / hour; // 相差了几小时
    let minuteC = timeVal / minute; // 相差了几分钟
    if (monthC >= 1) {
      val = parseInt(monthC) + "月前";
    } else if (weekC >= 1) {
      val = parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
      val = parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
      val = parseInt(hourC) + "小时前";
    } else if (minuteC >= 1) {
      val = parseInt(minuteC) + "分钟前";
    }
    return val + " · " + fromsite;
  };
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    //alignItems: "center",
    width: Config.Styles.DevicesWidth,
    flex: 1,
    height: 120,
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  ViewImage: {
    width: 100,
    height: 100
  },
  ViewTitle: {
    marginLeft: 5,
    flex: 1,
    justifyContent: "center",
    // backgroundColor: "red",
    paddingLeft: 10,
    paddingRight: 10
  },
  MallView: {
    //backgroundColor: "yellow",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  MallText: {
    fontSize: 12,
    color: Config.Styles.ColorMain
  },
  MallTime: {
    fontSize: 12,
    color: "gray"
  },
  ViewArrowRight: {
    width: 10,
    height: 10
  }
});
