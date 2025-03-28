import { Platform, StyleSheet } from "react-native";
import { fontsName } from "../../constants";
const Style = (theme, insets) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: insets.top,
    },

  });
};
export default Style;
