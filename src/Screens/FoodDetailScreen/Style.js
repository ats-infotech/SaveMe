import { Platform, StyleSheet } from "react-native";
import { fontsName } from "../../constants";
const Style = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
    },
    foodImage: { height: 225, width: "100%", resizeMode: "cover" },

    totalLeft: {
      color: theme.PRIMARY_GREEN,
      backgroundColor: theme.white,
      paddingHorizontal: 15,
      paddingVertical: 3,
      borderRadius: 3,
      overflow: "hidden",
      fontFamily: fontsName.NUNITO_REGULAR,
      fontSize: 12,
      position: "absolute",
      right: 10,
      bottom: 10,
    },
    addressContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    commonBorderView: {
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.FONT_LIGHT_VIOLET,
      paddingHorizontal: 20,
      paddingVertical: Platform.OS === "ios" ? 15 : 15,
      flexDirection:'row'
    },
    addressText: {
      color: theme.FONT_LIGHT_VIOLET,
      fontSize: 12,
      fontFamily: fontsName.NUNITO_REGULAR,
    },
    horizontalCenter: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    twelveRegular: {
      fontSize: 12,
      fontFamily: fontsName.NUNITO_REGULAR,
    },
    ratingVw: {
      flexDirection: "row",
      alignSelf: "center",
      paddingHorizontal: 7,
      alignItems: "center",
      backgroundColor: theme.white,
      ...Platform.select({
        ios: {
          shadowColor: "grey",
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.4,
          shadowRadius: 3,
        },
        android: {
          elevation: 3,
        },
      }),
      paddingVertical: 3,
      marginVertical: 20,
      borderRadius: 5,
    },
    shareIconVw: { alignSelf: "flex-end", paddingHorizontal: 15, margin: 10 },
    shareIcon: { width: 21, height: 21, resizeMode: "contain" },
    confirmationEmailText:{
      color: theme.FONT_DARK_VIOLET,
      fontSize: 18,
      textAlign: "center",
      fontFamily: fontsName.NUNITO_MEDIUM,
      marginHorizontal: 40,
      paddingVertical: 12
    },
    modalDescriptionText: {
      color: theme.FONT_DARK_VIOLET,
      fontSize: 18,
      textAlign: "center",
      fontFamily: fontsName.NUNITO_MEDIUM,
    },
    packageNameVw:{
      backgroundColor: theme.white,
      ...Platform.select({
        ios: {
          shadowColor: "grey",
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.4,
          shadowRadius: 3,
        },
        android: {
          elevation: 3,
        },
      }),
      borderRadius: 20,
      paddingVertical: 5,
      paddingHorizontal: 20,
    }
  });
};
export default Style;
