"use strict";
/*
 * @Author: Max.Liu 
 * @Date: 2018-02-05 15:42:54 
 * @Last Modified time: 2018-02-05 15:42:54 
 */
import React from "react";
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";

import NavigationHeader from "app/navigation-header";

export default class HeaderComponent extends React.PureComponent {
  render() {
    return (
      <NavigationHeader
        renderLeft={() => (
          <TouchableOpacity
            style={styles.ViewLeft}
            onPress={() => {
              const { navigation } = this.props;
              navigation && navigation.navigate("ProductList");
            }}
          >
            <Image source={{ uri: "hot_icon_20x20" }} style={styles.image} />
          </TouchableOpacity>
        )}
        renderTitle={() => (
          <TouchableOpacity
            onPress={() => {
              console.log("TouchableRight");
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
              console.log("TouchableRight");
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
