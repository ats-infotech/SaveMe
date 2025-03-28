import {Platform, StyleSheet} from 'react-native';
import { fontsName } from '../../constants';
const Style = theme => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    categoryContainer:{
      overflow:'hidden',
      borderRadius: 10,
      margin:5
    },
    itemInnerView: {
      flex: 1,
      // paddingVertical: 10,
      height:55,
      alignItems: "center",
      justifyContent: "center",
    },
    itemText:{
      fontSize: 18,
      fontFamily: fontsName.NUNITO_BOLD,
      marginHorizontal:5,
    },
    contentContainerStyle :{ flexWrap: "wrap", flexDirection: "row" },
    distanceValueView:{
      flexDirection: "row",
      alignItems: "center",
      marginHorizontal: 5,
      justifyContent: "space-between",
    }
  });
};
export default Style;
