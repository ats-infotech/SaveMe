import { Platform, StyleSheet } from "react-native";
import { fontsName } from "../../constants";

const Style = (theme, insets) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: insets.top,
    },
    scrollViewContainer: {
      flexGrow: 1,
      paddingHorizontal: 32,
      paddingBottom: 15,
    },
    textStyle: {
      fontSize:19,
      color:theme.FONT_GREEN,
      textAlign:"center",
      alignSelf:"center",
      fontFamily:fontsName.NUNITO_REGULAR
    },
    errorText: {
      fontSize: 12,
      color: "#ff3b30",
      marginLeft: 5,
      marginTop: 2,
      fontFamily: fontsName.NUNITO_REGULAR,
    },
  });
};

export default Style;