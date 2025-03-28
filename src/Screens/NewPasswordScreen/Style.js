import {StyleSheet} from 'react-native';
import { fontsName } from '../../constants';
const Style = theme => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    areVendorText:{
      fontSize: 18,
      textAlign:'center',
      marginTop:10,
      color: theme.PRIMARY_LIGHT_GREEN,
      // fontFamily: fontsName.NUNITO_MEDIUM,
    },
    commonText:{
      textAlign: 'center',
      color: theme.FONT_GREEN,
      fontSize: 18, //21
      fontFamily:fontsName.NUNITO_REGULAR,
    },
    resendText: {
      color: theme.PRIMARY_GREEN,
      fontSize: 16,
        fontFamily:fontsName.NUNITO_BOLD,
        marginLeft:5
    },
    errorText: {
      fontSize: 12,
      color: "#ff3b30",
      marginLeft: 5,
      marginTop: 2,
      fontFamily: fontsName.NUNITO_REGULAR,
      marginTop: 50,
      marginBottom:10
    },
  });
};
export default Style;
