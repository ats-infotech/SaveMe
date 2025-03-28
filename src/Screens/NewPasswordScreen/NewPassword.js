import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  useColorScheme,
  View,
  Image,
  ImageBackground,
  Text
} from "react-native";
import Style from "./Style";
import { LightTheme, DarkTheme } from "../../constants/theme";
import { NavigationButton } from "../../Components/Buttons/NavigationButton";
import TextInputs from "../../Components/Inputs/TextInputs";
import Header from "../../Components/Header";
import { fontsName, screenTitle } from "../../constants";
import resources from "../../constants/resources";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks";
import { resetPassword } from "../../redux-store/auth/authSlice";
import {
  authSlice,
} from "../../redux-store/auth/authSlice";
const { usersReset } = authSlice.actions

const NewPassword = ({ navigation, route }) => {
  const theme = useColorScheme() === "dark" ? LightTheme : DarkTheme;
  const styles = Style(theme);
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmCodeValue, setConfirmCode] = useState("");
  const [otpCode, setOtpCode] = useState(route?.params?.otpCode);
  const dispatch = useAppDispatch();
  const { resetPasswordData,errorResetMessage,error } = useAppSelector((state) => state.auth);

  // OnConfirm Method
  const onPressConfirm = () => {
    dispatch(usersReset())
    let data = {}
    data.email = route?.params?.email
    data.OTP = otpCode
    data.password = passwordValue
    data.password_confirmation = confirmCodeValue
    if (passwordValue.length >= 6 && confirmCodeValue.length >= 6) {
      dispatch(resetPassword(data))      
    }
  }

  useEffect(() => {
    if (resetPasswordData?.data?.status) {
      let data = {}
      data.email = route?.params?.email
      data.OTP = otpCode
      data.password = passwordValue
      data.password_confirmation = confirmCodeValue
      navigation.navigate(screenTitle.LOGIN);
      dispatch(resetPassword(data))    
    }
  })
    
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={{ flex: 1 }} source={resources.BG_IMAGE}>
        <Header
          theme={theme}
          title={"New Password"}
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
            <TextInputs
              theme={theme}
              placeHolder={"New Password"}
              value={passwordValue}
              extraStyle={{ marginTop: 120 }}
              leftIcon={
                <Image
                  style={{ width: 15, height: 20 }}
                  source={resources.PASSWORD}
                />
              }
              isShowLeftIcon={true}
              onChangeText={(value) => {
                dispatch(usersReset())
                setPasswordValue(value);
              }}
            />
            <TextInputs
              theme={theme}
              value={confirmCodeValue}
              placeHolder={"Confirm New Password"}
              onChangeText={(value) => {
                dispatch(usersReset())
                setConfirmCode(value);
              }}
              isShowLeftIcon={true}
              leftIcon={
                <Image
                  style={{ width: 15, height: 20 }}
                  source={resources.PASSWORD}
                />
              }
            />

            {error && (
            <Text style={styles.errorText} numberOfLines={1}>
              {errorResetMessage}
            </Text>
            )}  

            <NavigationButton
              theme={theme}
              title={"Confirm"}
              containerStyle={{ marginTop: error ? 0 : 90 }}
              onButtonPress={() => {onPressConfirm()}}
            />
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};
export default NewPassword;
