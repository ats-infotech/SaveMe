import {Platform, StyleSheet} from 'react-native';
import { fontsName } from '../../constants';
const Style = theme => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    savingItemContainer: {
      marginTop: 20,
    },
    horizontal: {
      flexDirection: "row",
      alignItems: "center",
    },
    foodImage: { width: 145, height: 110, borderRadius: 10 },
    tagImage: { width: 42, height: 42, borderRadius: 21, marginLeft: -21 },
    infoContainer:{ width: "74%", marginRight: "1%" },
    titleText:{
      fontSize: 18,
      fontFamily: fontsName.NUNITO_REGULAR,
      color: theme.FONT_DARK_VIOLET,
    },
    infoTexts:{
      fontSize: 13,
      fontFamily: fontsName.NUNITO_REGULAR,
      color: theme.FONT_LIGHT_VIOLET,
    },
    valueTexts:{
      fontSize: 17,
      fontFamily: fontsName.NUNITO_REGULAR,
      color: "#6a6a6a",
    },
    valueVw:{ flexDirection: "row", alignItems: "flex-end" }
  });
};
export default Style;