'use strict'; 
 /*
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

import { Config } from "apptools";

// 商品列表公共item项组件
class ProductListItem extends React.Component {
  render() {
    const { image, title, id } = this.props;
    return (
      <TouchableHighlight>
        <View style={styles.container}>
          <Image style={styles.ViewImage} source={{ uri: image }} />
          <Text style={styles.ViewText} numberOfLines={3}>
            {title}
          </Text>
          <Image
            style={styles.ViewArrowRight}
            source={{ uri: "icon_cell_rightarrow" }}
          />
        </View>
      </TouchableHighlight>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: Config.Styles.DevicesWidth,
    height: 120,
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  ViewImage: {
    width: 100,
    height: 100
  },
  ViewText: {
    marginLeft: 5,
    flex: 1
  },
  ViewArrowRight: {
    width: 10,
    height: 10
  }
});

export default ProductListItem;