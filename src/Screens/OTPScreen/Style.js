import {Platform, StyleSheet} from 'react-native';
import {fontsName} from '../../constants';
const Style = (theme, insets) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: insets.top,
    },
    subContainer: {
      flex: 1,
      justifyContent:'center'
    },
    scrollViewContainer: {
      flexGrow: 1,
      // backgroundColor: 'pink',
      paddingHorizontal: 30,
      paddingBottom: 15
    },
    errorText: {
      fontSize: 12,
      color: "#ff3b30",
      marginLeft: 5,
      marginTop: 2,
      marginBottom:5,
      fontFamily: fontsName.NUNITO_REGULAR,
    },
  });
};
export default Style;
