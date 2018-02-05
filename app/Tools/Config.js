import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
export class Config {
  static Styles = {
    DevicesWidth: width,
    ColorMain:'#6ebe64',
    ColorMinor:'#bbbabb'
  };
}
