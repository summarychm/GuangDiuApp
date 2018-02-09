"use strict";
/*
 * @Author: Max.Liu 
 * @Date: 2018-02-05 15:42:54 
 * @Last Modified time: 2018-02-05 15:42:54 
 */
import React from "react";
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";

import NavigationHeader from "app/navigation-header";

// 首页和海淘页header封装组件
export default class PublicHeader extends React.PureComponent {
  static defaultProps = {
    country: "ch",
    countryTitle: "国内"
  };
  render() {
    const { navigation, country, countryTitle } = this.props;
    return (
      <NavigationHeader
        renderLeft={() => (
          <TouchableOpacity
            style={styles.ViewLeft}
            onPress={() => {
              navigation &&
                navigation.navigate("ProductList", {
                  country: country,
                  countryTitle: countryTitle
                });
            }}
          >
            <Image source={{ uri: "hot_icon_20x20" }} style={styles.image} />
          </TouchableOpacity>
        )}
        renderTitle={() => (
          <TouchableOpacity
            onPress={() => {
              console.log("TouchableTitle");
            }}
          >
            <Image
              source={{ uri: "navtitle_home_down_66x20" }}
              style={styles.title}
            />
          </TouchableOpacity>
        )}
        renderRight={() => (
          <TouchableOpacity
            style={styles.ViewRight}
            onPress={() => {
              navigation && navigation.navigate("Search");
            }}
          >
            <Image source={{ uri: "search_icon_20x20" }} style={styles.image} />
          </TouchableOpacity>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  ViewLeft: {
    paddingLeft: 10
  },
  ViewRight: {
    paddingRight: 10,
    alignItems: "flex-end"
  },
  image: { width: 20, height: 20 },
  title: { width: 66, height: 20 }
});
