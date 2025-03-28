import { Platform, StyleSheet } from "react-native";
import { fontsName } from "../../constants";
const Style = (theme, insets) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: insets.top,
    },
    subContainer: {
      marginTop: 40,
      flex: 1,
    },
    login: {
      color: theme.PRIMARY_GREEN,
      fontSize: 18,
      fontFamily: fontsName.NUNITO_BOLD,
      marginLeft: 7,
    },
    scrollViewContainer: {
      flexGrow: 1,
      paddingHorizontal: 32,
      paddingBottom: 15,
    },
    bottomVw:{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 15,
    },
    haveAccountText:{
      color: theme.FONT_GREEN,
      fontSize: 16, //19
      textAlign: "center",
      fontFamily: fontsName.NUNITO_REGULAR,
    },
    inputTitle: {
      fontSize: 14, //19
      color: theme.FONT_MEDIUM_BLACK,
      marginTop: 17,
      fontFamily: fontsName.NUNITO_REGULAR,
    },
    star: {
      color: "#ff3b30",
    },
    errorText: {
      fontSize: 12,
      color: "#ff3b30",
      marginLeft: 5,
      marginTop: 2,
      fontFamily: fontsName.NUNITO_REGULAR,
    },
    noneTypeText: {
      fontSize: 12,
      paddingVertical: 0,
      marginHorizontal:10
    },
    text: {
      fontSize: 16,
    },
    noneInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 15,
      backgroundColor: "rgba(0, 0, 0, 0.22)",
      paddingVertical: Platform.OS === "ios" ? 17 : 5,
      paddingLeft: 15,
      paddingRight: 10,
    },
  });
};
export default Style;
