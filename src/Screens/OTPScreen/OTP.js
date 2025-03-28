import React, { useEffect, useState } from "react";
import {
  Text,
  useColorScheme,
  View,
  ScrollView,
  BackHandler,
  ImageBackground,
} from "react-native";
import Style from "./Style";
import { LightTheme, DarkTheme } from "../../constants/theme";
import { fontsName, screenTitle } from "../../constants";
import TextInputs from "../../Components/Inputs/TextInputs";
import SignUpButtons from "../../Components/Buttons/SignUpButtons";
import resources from "../../constants/resources";
import Header from "../../Components/Header";
import { NavigationBottomButton } from "../../Components/Buttons/NavigationButton";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import OTPinput from "../../Components/OTPinput";
import { resendOTP, verifyOTP } from "../../redux-store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks";
import {
  authSlice,
} from "../../redux-store/auth/authSlice";
import messaging from "@react-native-firebase/messaging"
const { usersReset } = authSlice.actions

const OTP = ({ navigation, route }) => {
  const theme = useColorScheme() === "dark" ? LightTheme : DarkTheme;
  const insets = useSafeAreaInsets();
  const styles = Style(theme, insets);
  const [otpCode, setOtpCode] = useState("");
  const [seconds, setSeconds] = useState(59)
  const dispatch = useAppDispatch();
  const { errorOTPMessage,verifyOTPData } = useAppSelector((state) => state.auth);
  const [isShowError, setShowError] = useState(false);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds(0);
    }
  }, [seconds])

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => backHandler.remove()
  }, [])

  // Validation Method
  const checkValidation = () => {
    if (
      otpCode < 4
    ) {
      setShowError(true);
      return false;
    } 
    return true;
  };

  // OnConfirm Method 
  const onPressConfirm = async () => {
    let token = await messaging().getToken()
    let data = {}
    data.email = route.params.email;
    data.OTP = otpCode;
    data.deviceToken = token
    if (checkValidation()) {
      dispatch(verifyOTP(data));
    }
  }

  // ResendOTP Method
  const onPressResendOTP = () => {
    let data = {}
    data.email = route.params.email;
      dispatch(resendOTP(data));
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <ImageBackground style={{ flex: 1 }} source={resources.BG_IMAGE}>
        <Header
          theme={theme}
          title={"Sign Up"}
          onBackPress={() => {
            navigation.goBack();
          }}
          isLeftIconShow={false}
          titleStyle={{ fontFamily: fontsName.NUNITO_BOLD }}
        />
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <Text
            style={{
              textAlign: "center",
              color: theme.FONT_GREEN,
              fontSize: 18, //21
              marginHorizontal: 20,
              marginTop: 40,
              fontFamily: fontsName.NUNITO_REGULAR,
            }}
          >
            Please enter the OTP to Sign Up
          </Text>

          <View style={styles.subContainer}>
            {isShowError || errorOTPMessage && <Text style={styles.errorText} numberOfLines={1}>
              {errorOTPMessage ? errorOTPMessage : 'Please enter Correct OTP'}
            </Text>}
          <OTPinput
              theme={theme}
              otpCode={otpCode}
              inputStyle={{marginTop:0}}
              onChangeOTPCode={value => {
                dispatch(usersReset())
                setShowError(false);
                setOtpCode(value);
              }}
              seconds={seconds}
              onResend={() => {
                onPressResendOTP()
                setSeconds(59)
              }}
            />
            
          </View>
        </ScrollView>
        <NavigationBottomButton
          theme={theme}
          title={"Confirm"}
          containerStyle={{
            height: insets.bottom > 0 ? 40 : 55,
            paddingTop: insets.bottom > 0 ? 10 : 0,
          }}
          onButtonPress={() => {
              onPressConfirm()
          }}
        />
        {insets.bottom > 0 && (
          <View
            style={{
              height: insets.bottom,
              backgroundColor: theme.PRIMARY_GREEN,
            }}
          />
        )}
      </ImageBackground>
    </SafeAreaProvider>
  );
};
export default OTP;
