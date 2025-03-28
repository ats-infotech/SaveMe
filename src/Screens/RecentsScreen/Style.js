import {Dimensions, StyleSheet, Platform} from 'react-native';
import {fontsName} from '../../constants';
const {width} = Dimensions.get('window');
const Style = theme => {
  return StyleSheet.create({
    container: {
      flex: 1
    },
    subContainer: {
      flex:1,
    },
    itemContainer:{
      borderRadius: 7,
      overflow:'hidden',
      backgroundColor:theme.white,
    },
    bottomContainer:{
      flexDirection:'row',
      alignItems:"center",
      paddingHorizontal: 12, 
      paddingVertical: 17,
      ...Platform.select({
        ios: {
            shadowColor: 'grey',
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.4,
            // shadowRadius: 3,
        },
        android: {
            elevation: 3,
        },
}),
    },
    commonText:{
      fontSize: 17,
      fontFamily: fontsName.NUNITO_REGULAR,
      color: theme.FONT_DARK_VIOLET,
    },
    pickupText:{
      color: theme.FONT_LIGHT_VIOLET,
      fontSize: 12,
      fontFamily: fontsName.NUNITO_REGULAR,
      marginTop: 3,
    },
    totalLeft:{
      color: theme.PRIMARY_GREEN,
      backgroundColor: theme.white,
      paddingHorizontal:15,
      paddingVertical:3,
      borderRadius: 3,
      overflow: 'hidden'
    }
  });
};
export default Style;
