import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import { Config } from "apptools";

class Category extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
   // this.setState({ data: SiftData });
  }
  render() {
    return (
      <TouchableOpacity onPress={this.props.onCloseModal}>
        <View style={styles.container}>
          <FlatList
            numColumns={4}
            data={this.props.data}
            keyExtractor={item => item.image}
            renderItem={this._renderItem}
          />
        </View>
      </TouchableOpacity>
    );
  }
  // 渲染行
  _renderItem = item => {
    item = item.item;
    return (
      <View style={styles.itemView}>
        <TouchableOpacity
          onPress={() => {
            this._changeSelect(item.mall, item.cate);
          }}
        >
          <View style={styles.itemView}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <Text style={styles.itemText}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  //切换选择
  _changeSelect = (mall, cate) => {
    this.props.changeSelect(mall, cate);
  };
}
export default Category;

const styles = StyleSheet.create({
  container: {
    top: Platform.OS === "ios" ? 60 : 40,
    width: Config.Styles.DevicesWidth,
    height: Config.Styles.DevicesHeight
  },
  itemView: {
    width: Config.Styles.DevicesWidth / 4,
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    paddingLeft: 4
  },
  itemImage: {
    width: 70,
    height: 70
  },
  itemText: {
    fontSize: 12,
    color: Config.Styles.ColorMain
  }
});
