import { Platform, StyleSheet } from "react-native";
import { fontsName } from "../../constants";

const Style = (theme, insets) => {
  return StyleSheet.create({

    container: {
      flex: 1,
      paddingTop: insets.top,
    },
    searchVw: { 
        flexDirection: "row", 
        alignItems:"center", 
        backgroundColor: '#c7c7c7', 
        padding: Platform.OS == 'ios' ? 10 : 0, 
        marginHorizontal: 20, 
        borderRadius: 12,
        marginTop:40
    },
    searchImage:{
        width:15,
        height:15,
        marginRight: 10,
        marginLeft: Platform.OS == 'ios' ? 5 :15,
        tintColor:'white'
      },
      calloutView: {
        flexDirection: "row",
        // backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: 10,
        width: "40%",
        marginTop: 10
      },
      calloutSearch: {
        borderColor: "transparent",
        marginleft: 10,
        width: "90%",
        marginRight: 10,
        height: 40,
        borderWidth: 0.0  
      }
  });
};
export default Style;