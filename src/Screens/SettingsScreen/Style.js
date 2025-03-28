import {StyleSheet} from 'react-native';
import { fontsName } from '../../constants';
const Style = theme => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    accountTitle:{
      color: theme.FONT_MEDIUM_BLACK,
      fontSize: 14,
      marginTop: 10,
      fontFamily: fontsName.NUNITO_REGULAR,
      backgroundColor: "rgba(86, 99, 255, 0.05)",
      padding: 15,
    },
    optionContainer:{
      paddingHorizontal: 15,
      paddingVertical: 16,
      borderBottomColor: "#bac0cb",
      flexDirection: "row",
      alignItems: "center",
    },
    optionTitleText:{
      fontSize: 18,
      fontFamily: fontsName.NUNITO_REGULAR,
      flex: 1,
    },
    commonText: {
      fontSize: 18,
      color: theme.FONT_DARK_VIOLET,
      fontFamily: fontsName.NUNITO_MEDIUM,
      textAlign: "center",
    }
  });
};
export default Style;
