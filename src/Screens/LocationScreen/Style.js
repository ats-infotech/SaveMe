import {Dimensions, StyleSheet} from 'react-native';
import {fontsName} from '../../constants';
const {width} = Dimensions.get('window');
const Style = theme => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.white,
      justifyContent: 'flex-end',
    },
    subContainer: {
      paddingHorizontal: 25,
    },
    welcomeText: {
      color: theme.FONT_GREEN,
      fontSize: 45,
      lineHeight: 55,
      fontFamily: fontsName.NUNITO_BOLD,
    },
    suggestionText: {
      color: theme.FONT_GREEN,
      fontSize: 18, //21
      width: width - 100,
      marginTop: 80,
      fontFamily:fontsName.NUNITO_REGULAR
    },
  });
};
export default Style;
