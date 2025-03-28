import {StyleSheet} from 'react-native';
import {fontsName} from '../../constants';
const Style = theme => {
  return StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: theme.white,
    },
    scrollStyle: { marginHorizontal: 32, flex: 1 },
    logoImage:{
      alignSelf: "center",
      resizeMode: "contain",
      width: 200,
      height: 230,
      marginLeft: 50,
    },
    areVendorText: {
      fontSize: 15, //18
      textAlign: 'center',
      marginTop: 10,
      color: theme.PRIMARY_LIGHT_GREEN,
      fontFamily: fontsName.NUNITO_MEDIUM,
    },
    noneInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 15,
      backgroundColor: "rgba(0, 0, 0, 0.22)",
      paddingVertical: Platform.OS === "ios" ? 17 : 5,
      marginTop: 18,
      paddingLeft: 15,
      paddingRight: 10,
    },
    noneTypeText: {
      fontSize: 12,
      paddingVertical: 0,
      marginHorizontal:10
    },
    text: {
      fontSize: 16,
    },
    rememberForgotPwView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 15,
    },
    errorText: {
      fontSize: 12,
      color: "#ff3b30",
      marginLeft: 5,
      marginTop: 2,
      fontFamily: fontsName.NUNITO_REGULAR,
    },
    rememberMeVw: {
      flexDirection: "row",
      alignItems: "center",
      width: "50%",
    },
    checkBox: {
      width: 19,
      height: 19,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
    },
    commonText: {
      fontSize: 13,
      color: theme.black,
    },
    rememberMe:{
      marginLeft: 7,
      fontFamily:fontsName.NUNITO_REGULAR,
    },
    tickRightImage:{
      width:10, height:10,resizeMode:'contain'
    },
    forgotPassword: {
      textAlign: 'right',
      width: '50%',
      fontFamily: fontsName.NUNITO_REGULAR,
    },
    signUpView: {
      borderBottomWidth: 1,
      borderBottomColor: 'black',
      marginBottom: 10,
      marginTop: 25,
      width: 110,
      alignSelf: 'center',
    },
    signUpText: {
      textAlign: 'center',
      paddingBottom: 3,
      fontSize: 14,
      fontFamily:fontsName.NUNITO_REGULAR,
    },
    scrollContainerStyle:{ flexGrow: 1, justifyContent: "flex-end" }
  });
};
export default Style;
