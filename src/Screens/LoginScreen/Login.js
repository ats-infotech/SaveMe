import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  Text,
  useColorScheme,
  View,
  Pressable,
  Image,
  ScrollView,
  ImageBackground,
  Alert,
  TextInput,
} from "react-native";
import Style from "./Style";
import { LightTheme, DarkTheme } from "../../constants/theme";
import { NavigationButton } from "../../Components/Buttons/NavigationButton";
import resources from "../../constants/resources";
import { RegEx, screenTitle } from "../../constants/index";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks";
import { login } from "../../redux-store/auth/authSlice";
import { authSlice } from "../../redux-store/auth/authSlice";
import messaging from "@react-native-firebase/messaging"
const { usersReset } = authSlice.actions;
import LoaderComponent from "../../Components/LoaderComponent";
import Lottie from 'lottie-react-native';

const Login = ({ navigation, route }) => {
  const theme = useColorScheme() === "dark" ? LightTheme : DarkTheme;
  const styles = Style(theme);
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const [isRememberMe, setRememberMe] = useState(false);
  const [splash, setSplash] = useState(true);
  const [loginData, updateLoginData] = useState({
    email: "",
    password: "",
  });
  const [isShowError, setShowError] = useState(false);
  const [showPasscodeSecure, setPasscodeSecure] = useState(true);
  const { errorMessage, error, loading } = useAppSelector(
    (state) => state.auth
  );

  const passwordRef = useRef();

  // Validation Method
  const checkValidation = () => {
    if (
      loginData.email.length === 0 ||
      RegEx.EMAIL.test(loginData.email) === false
    ) {
      setShowError(true);
      return false;
    } else if (
      loginData.password.length === 0 ||
      loginData.password.length < 6
    ) {
      setShowError(true);
      return false;
    }
    return true;
  };

  // Login Method
  const loginPress = async () => {
    let token = await messaging().getToken()
    console.log("alsals,als,al--", token);
    let data = {};
    data.email = loginData.email;
    data.password = loginData.password;
    data.deviceToken = token
    if (checkValidation()) {
      dispatch(login(data));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setSplash(false)
    }, 3000)
  })

  return (
    <SafeAreaView style={styles.container}>
      {splash ? <Lottie source={require('../../assets/images/saveMeIcon.json')} autoPlay loop />
        : <ImageBackground style={{ flex: 1 }} source={resources.BG_IMAGE}>
          {/* <KeyboardAwareScrollView
            bounces={false}
            keyboardShouldPersistTaps={"always"}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainerStyle}
            style={styles.scrollStyle}
          > */}
          <View style={styles.scrollStyle}>
            <Image source={resources.SAVEMELOGO} style={styles.logoImage} />
            <View style={[styles.noneInputContainer, { marginTop: 30 }]}>
              <View style={styles.leftImage}>
                <Image
                  style={{ width: 18, height: 12 }}
                  source={resources.EMAIL}
                />
              </View>
              <TextInput
                placeholder={"Email"}
                returnKeyType="next"
                placeholderTextColor={theme.black}
                onSubmitEditing={() => {
                  passwordRef.current.focus()
                }}
                value={loginData.email}
                onChangeText={(value) => {
                  dispatch(usersReset());
                  updateLoginData({ ...loginData, email: value });
                }}
                style={[styles.noneTypeText, styles.text, { width: '80%' }]}
              />
            </View>


            {isShowError && (
              <Text style={styles.errorText} numberOfLines={1}>
                {loginData.email === '' ?
                  "Please enter Email Address"
                  : RegEx.EMAIL.test(loginData.email) === false && "Please enter correct email address"}
              </Text>
            )}

            <View style={[styles.noneInputContainer, { marginTop: 30 }]}>
                <Image
                  style={{  }}
                  source={resources.PASSWORD}
                />
              <TextInput
                ref={passwordRef}
                value={loginData.password}
                placeholderTextColor={theme.black}
                placeholder={"Password"}
                onChangeText={(value) => {
                  dispatch(usersReset());
                  updateLoginData({ ...loginData, password: value });
                }}
                style={[styles.noneTypeText, styles.text, { width: '80%' }]}
                secureTextEntry={showPasscodeSecure}
              />
              <Pressable style={{ paddingRight: 10 }} onPress={() => setPasscodeSecure(!showPasscodeSecure)}>
                <Image
                  style={{  }}
                  source={resources.SHOWPASSWORD}
                />
              </Pressable>
            </View>
            {isShowError && loginData.password === "" && (
              <Text style={styles.errorText} numberOfLines={1}>
                {"Please enter Password"}
              </Text>
            )}


            {/* <TextInputs
              theme={theme}
              placeHolder={"Email"}
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordRef.current.focus()
              }}
              leftIcon={
                <Image
                  style={{ width: 18, height: 12 }}
                  source={resources.EMAIL}
                />
              }
              value={loginData.email}
              isShowLeftIcon={true}
              extraStyle={{ marginTop: 30 }}
              keyboardType={"email-address"}
              onChangeText={(value) => {
                dispatch(usersReset());
                updateLoginData({ ...loginData, email: value });
              }}
            /> */}
            {/* {isShowError && (
              <Text style={styles.errorText} numberOfLines={1}>
                {loginData.email === '' ?
                  "Please enter Email Address"
                  : RegEx.EMAIL.test(loginData.email) === false && "Please enter correct email address"}
              </Text>
            )} */}
            {/* <TextInputs
              theme={theme}
              ref={passwordRef}
              value={loginData.password}
              placeHolder={"Password"}
              leftIcon={
                <Image
                  style={{ width: 15, height: 20 }}
                  source={resources.PASSWORD}
                />
              }
              rightIcon={
                <Image
                  style={{ width: 18, height: 12 }}
                  source={resources.SHOWPASSWORD}
                />
              }
              isShowRightIcon={true}
              isShowLeftIcon={true}
              onChangeText={(value) => {
                dispatch(usersReset());
                updateLoginData({ ...loginData, password: value });
              }}
              secureText={showPasscodeSecure}
              rightIconPress={() => {
                setPasscodeSecure(!showPasscodeSecure);
              }}
            /> */}
            {/* {isShowError && loginData.password === "" && (
              <Text style={styles.errorText} numberOfLines={1}>
                {"Please enter Password"}
              </Text>
            )} */}

            <View style={styles.rememberForgotPwView}>
              <View style={styles.rememberMeVw}>
                <Pressable
                  style={[
                    styles.checkBox,
                    {
                      borderColor: isRememberMe
                        ? theme.PRIMARY_LIGHT_GREEN
                        : theme.black,
                    },
                  ]}
                  onPress={() => setRememberMe(!isRememberMe)}
                >
                  {isRememberMe && (
                    <Image
                      style={styles.tickRightImage}
                      source={resources.TICK_RIGHT}
                    />
                  )}
                </Pressable>
                <Text
                  style={[styles.commonText, styles.rememberMe]}
                  numberOfLines={1}
                >
                  Remember me
                </Text>
              </View>
              <Text
                style={[styles.commonText, styles.forgotPassword]}
                numberOfLines={1}
                onPress={() => {
                  dispatch(usersReset());
                  navigation.navigate(screenTitle.FORGOTPASSWORD);
                }}
              >
                Forgot Password?
              </Text>
            </View>
            {error && (
              <Text style={styles.errorText} numberOfLines={1}>
                {errorMessage}
              </Text>
            )}
            <NavigationButton
              theme={theme}
              title={"Login"}
              containerStyle={{ marginTop: insets.bottom > 0 ? 80 : 40 }}
              onButtonPress={loginPress}
            />
            <Text
              style={styles.areVendorText}
              numberOfLines={1}
              onPress={() => navigation.navigate(screenTitle.BECOMEVENDOR)}
            >
              Are you a Vendor?
            </Text>
            <Pressable
              style={styles.signUpView}
              onPress={() => {
                dispatch(usersReset());
                navigation.navigate(screenTitle.SIGNUP);
              }}
            >
              <Text
                style={[styles.commonText, styles.signUpText]}
                numberOfLines={1}
              >
                Sign Up
              </Text>
            </Pressable>
            {/* </KeyboardAwareScrollView> */}
          </View>
        </ImageBackground>}
      {loading &&
        <LoaderComponent
          theme={theme}
          modalVisible={loading}
        />
      }
    </SafeAreaView>
  );
};
export default Login;
