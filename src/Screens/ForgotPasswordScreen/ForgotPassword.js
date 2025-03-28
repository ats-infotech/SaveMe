import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  useColorScheme,
  View,
  Image,
  ImageBackground,
} from "react-native";
import Style from "./Style";
import { LightTheme, DarkTheme } from "../../constants/theme";
import { NavigationButton } from "../../Components/Buttons/NavigationButton";
import TextInputs from "../../Components/Inputs/TextInputs";
import Header from "../../Components/Header";
import { fontsName, screenTitle, RegEx } from "../../constants";
import resources from "../../constants/resources";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import OTPinput from "../../Components/OTPinput";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks";
import { forgotPassword,resendOTP } from "../../redux-store/auth/authSlice";
import {
  authSlice,
} from "../../redux-store/auth/authSlice";
const { usersReset } = authSlice.actions
const ForgotPassword = ({ navigation, route }) => {
  const theme = useColorScheme() === "dark" ? LightTheme : DarkTheme;
  const styles = Style(theme);
  const [emailValue, setEmailValue] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [sendOTP, setOTPSend] = useState(false);
  const [countSeconds, setSeconds] = useState(59);
  const [isShowError, setShowError] = useState(false);
  const dispatch = useAppDispatch();
  const { forgotPasswordData,errorPasswordData, error } = useAppSelector((state) => state.auth);
  
  useEffect(() => {
    if (sendOTP) {
      if (countSeconds > 0) {
        setTimeout(() => setSeconds(countSeconds - 1), 1000);
      } else {
        setSeconds(0);
      }
    }
  }, [sendOTP, countSeconds]);

  // Validation Method
  const checkValidation = () => {
    if (
      emailValue.length === 0 ||
      RegEx.EMAIL.test(emailValue) === false
    ) {
      setShowError(true);
      return false;
    }
    return true;
  };

  // Send Method
  const onSend = () => {
    if (!sendOTP) {
      if (checkValidation()) {
        let data = {}
        data.email = emailValue
        dispatch(forgotPassword(data))
      }
    }
    else {
      if (otpCode.length >= 4) {
        dispatch(usersReset())
        navigation.navigate(screenTitle.NEWPASSWORD, { otpCode: otpCode,email: emailValue });
      }
    }
  };

  useEffect(() => {
    if (forgotPasswordData?.data?.status) {
      setOTPSend(true);
    }
  })

  // Resend OTP Method
  const onPressResendOTP = () => {
    let data = {}
    data.email = emailValue;
      dispatch(resendOTP(data));
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={{ flex: 1 }} source={resources.BG_IMAGE}>
        <Header
          theme={theme}
          title={"Forgot Password"}
          onBackPress={() => {
            navigation.goBack();
          }}
          titleStyle={{ fontFamily: fontsName.NUNITO_BOLD }}
        />
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginHorizontal: 32, flex: 1 }}>
            <Text style={[styles.commonText, { marginTop: 30 }]}>
              Please enter your email
            </Text>
            <Text style={[styles.commonText, { marginBottom: 30 }]}>
              We will send you OTP to reset it
            </Text>

            <TextInputs
              theme={theme}
              placeHolder={"Email"}
              extraStyle={{ marginTop: 25 }}
              keyboardType={"email-address"}
              value={emailValue}
              isEdit={sendOTP ? false : true}
              leftIcon={
                <Image
                  style={{ width: 18, height: 12 }}
                  source={resources.EMAIL}
                />
              }
              isShowLeftIcon={true}
              onChangeText={(value) => {
                dispatch(usersReset())
                setEmailValue(value);
              }}
            />

            {isShowError && RegEx.EMAIL.test(emailValue) === false && (
              <Text style={styles.errorText} numberOfLines={1}>
                {'Please enter Email Address'}
              </Text>
            )}

            {sendOTP && (
              <OTPinput
                theme={theme}
                otpCode={otpCode}
                onChangeOTPCode={(value) => {
                  setOtpCode(value);
                }}
                seconds={countSeconds}
                onResend={() => {
                  onPressResendOTP()
                  setSeconds(59);
                }}
              />
             )} 

           {error && (
            <Text style={styles.errorText} numberOfLines={1}>
              {errorPasswordData}
            </Text>
            )}  

            <NavigationButton
              theme={theme}
              title={"Send"}
              containerStyle={{ marginTop: 50 }}
              onButtonPress={() => onSend()}
            />
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default ForgotPassword;
