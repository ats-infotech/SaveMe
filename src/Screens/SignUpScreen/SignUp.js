import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  useColorScheme,
  View,
  Image,
  ImageBackground,
  Alert,
  TextInput,
  Platform
} from "react-native";
import Style from "./Style";
import { LightTheme, DarkTheme } from "../../constants/theme";
import { fontsName, screenTitle, RegEx, WEB_CLIENT_ID } from "../../constants";
import SignUpButtons from "../../Components/Buttons/SignUpButtons";
import resources from "../../constants/resources";
import Header from "../../Components/Header";
import { NavigationBottomButton } from "../../Components/Buttons/NavigationButton";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ValidateInput from "../../Components/Inputs/ValidateInput";
import { signUp, googleSignIn, appleSignIn } from "../../redux-store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks";
import {
  authSlice,
} from "../../redux-store/auth/authSlice";
const { usersReset } = authSlice.actions
import ConfirmationModal from "../../Components/Modals/ConfirmationModal";
import LoaderComponent from "../../Components/LoaderComponent";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import messaging from "@react-native-firebase/messaging";
import { appleAuth } from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({ webClientId: WEB_CLIENT_ID });

const SignUp = ({ navigation, route }) => {
  const theme = useColorScheme() === "dark" ? LightTheme : DarkTheme;
  const insets = useSafeAreaInsets();
  const styles = Style(theme, insets);
  const dispatch = useAppDispatch();
  const [isEmailSignUp, setEmailSignUp] = useState(false);
  const [isShowError, setShowError] = useState(false);
  const [signUpModal, setSignUPModal] = useState(false);
  const [openLoader, setOpenLoader] = useState(false);
  const [signUpData, updateSignupData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    location: "",
  });
  const emailRef = useRef();
  const passworRef = useRef();
  const confirmPassRef = useRef();
  const phoneNumberRef = useRef();
  const { registerData, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (registerData?.status) {
      setSignUPModal(true)
    } else {
      if (registerData) {
        Alert.alert("Error", registerData?.errors?.email[0])
      }
    }
  })

  const onGoogleButtonPress = async () => {
    try {
      let token = await messaging().getToken()
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("sdsjknsj0---s-s-s---s-s", userInfo);
      let data = {
        name: userInfo?.user?.name,
        email: userInfo?.user.email,
        googleId: userInfo?.user?.id,
        deviceToken: token,
      }
      dispatch(googleSignIn(data))
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }

  const onAppleButtonPress = async () => {
    console.log("-------0-0-0-0-0-----");
    let token = await messaging().getToken()
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }

    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse;
    if (identityToken) {
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

      auth()
        .signInWithCredential(appleCredential)
        .then((user) => {
          var str = user.user.email;
          str = str.split("@");
          console.log("-------1-1-1-1-1-1-1-1-1-1-1-1", user.user.uid);

          let data = {}
          data.email = user.user.email
          data.name = str
          data.appleId = user.user.uid
          data.deviceToken = token
          dispatch(appleSignIn(data))
          // Succeed fully user logs in
        })
        .catch((error) => {
          console.log("-------1-1-1-1-1-1-1-1-1-1-1-1-----", error);
          // Something goes wrong 
        });
    }
  }

  // Validation Method
  const checkValidation = () => {
    if (signUpData.userName.length === 0) {
      setShowError(true);
      return false;
    } else if (
      signUpData.email.length === 0 ||
      RegEx.EMAIL.test(signUpData.email) === false
    ) {
      setShowError(true);
      return false;
    } else if (
      signUpData.password.length === 0 ||
      signUpData.password.length < 6
    ) {
      setShowError(true);
      return false;
    } else if (
      signUpData.confirmPassword.length === 0 ||
      signUpData.confirmPassword.length < 6 ||
      signUpData.confirmPassword !== signUpData.password
    ) {
      setShowError(true);
      return false;
    } else if (
      signUpData.phoneNumber.length === 0 ||
      signUpData.phoneNumber.length < 10
    ) {
      setShowError(true);
      return false;
    }
    return true;
  };

  // SignUp Method
  const onSignUp = () => {
    dispatch(usersReset())
    if (checkValidation()) {
      let data = {}
      data.name = signUpData.userName;
      data.email = signUpData.email;
      data.phone = signUpData.phoneNumber;
      data.password_confirmation = signUpData.confirmPassword;
      data.password = signUpData.password;
      data.address = signUpData.location;
      dispatch(signUp(data));
    }
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <ImageBackground style={{ flex: 1 }} source={resources.BG_IMAGE}>
        <Header
          theme={theme}
          title={"Sign Up"}
          onBackPress={() => {
            if (isEmailSignUp) {
              setEmailSignUp(false);
            } else {
              navigation.goBack();
            }
          }}
          titleStyle={{ fontFamily: fontsName.NUNITO_BOLD }}
        />
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContainer}
        >
          {isEmailSignUp ? (
            <>
              {/* <ValidateInput
                theme={theme}
                titleText={"Name"}
                value={signUpData.userName}
                onChangeValue={(value) => {
                  dispatch(usersReset())
                  updateSignupData({ ...signUpData, userName: value });
                }}

                shouldErrorShow={
                  isShowError && signUpData.userName === "" ? true : false
                }
                extraHeaderTxtStyle={{ fontSize: 16, fontFamily: fontsName.NUNITO_MEDIUM, fontWeight: '500' }}
                errorMessage={"Please enter a valid Name"}
              /> */}
              <Text style={[styles.inputTitle, { fontSize: 16, fontFamily: fontsName.NUNITO_MEDIUM, fontWeight: '500' }]} numberOfLines={1}>
                Name
                <Text style={styles.star}>*</Text>
              </Text>
              <View style={[styles.noneInputContainer, { marginTop: 10 }]}>
                <TextInput
                  ref={emailRef}
                  returnKeyType="next"
                  placeholderTextColor={theme.black}
                  onSubmitEditing={() => {
                    emailRef.current.focus()
                  }}
                  value={signUpData.userName}
                  onChangeText={(value) => {
                    dispatch(usersReset())
                    updateSignupData({ ...signUpData, userName: value });
                  }}
                  style={[styles.noneTypeText, styles.text, { width: '80%' }]}
                />
              </View>
              {isShowError && signUpData.userName === "" && (
                <Text style={styles.errorText} numberOfLines={1}>
                  Please enter a valid Name
                </Text>
              )}
              <Text style={[styles.inputTitle, { fontSize: 16, fontFamily: fontsName.NUNITO_MEDIUM, fontWeight: '500' }]} numberOfLines={1}>
                Email
                <Text style={styles.star}>*</Text>
              </Text>
              <View style={[styles.noneInputContainer, { marginTop: 10 }]}>
                <TextInput
                  ref={emailRef}
                  returnKeyType="next"
                  placeholderTextColor={theme.black}
                  onSubmitEditing={() => {
                    passworRef.current.focus()
                  }}
                  value={signUpData.email}
                  onChangeText={(value) => {
                    dispatch(usersReset())
                    updateSignupData({ ...signUpData, email: value });
                  }}
                  keyboardType={"email-address"}
                  style={[styles.noneTypeText, styles.text, { width: '80%' }]}
                />
              </View>
              {isShowError &&
                (signUpData.email.length === 0 ||
                  RegEx.EMAIL.test(signUpData.email) === false) && (
                  <Text style={styles.errorText} numberOfLines={1}>
                    Please enter a valid Email address
                  </Text>
                )}

              {/* <ValidateInput

                theme={theme}
                titleText={"Email"}
                value={signUpData.email}
                onChangeValue={(value) => {
                  dispatch(usersReset())
                  updateSignupData({ ...signUpData, email: value });
                }}
                keyboardType={"email-address"}
                shouldErrorShow={
                  isShowError &&
                    (signUpData.email.length === 0 ||
                      RegEx.EMAIL.test(signUpData.email) === false)
                    ? true
                    : false
                }
                errorMessage={"Please enter a valid Email address"}
              /> */}

              <Text style={[styles.inputTitle, { fontSize: 16, fontFamily: fontsName.NUNITO_MEDIUM, fontWeight: '500' }]} numberOfLines={1}>
                Password
                <Text style={styles.star}>*</Text>
              </Text>
              <View style={[styles.noneInputContainer, { marginTop: 10 }]}>
                <TextInput
                  ref={passworRef}
                  returnKeyType="next"
                  placeholderTextColor={theme.black}
                  onSubmitEditing={() => {
                    confirmPassRef.current.focus()
                  }}
                  secureTextEntry={true}
                  value={signUpData.password}
                  maxLength={6}
                  onChangeText={(value) => {
                    dispatch(usersReset())
                    updateSignupData({ ...signUpData, password: value });
                  }}
                  style={[styles.noneTypeText, styles.text, { width: '80%' }]}
                />
              </View>
              {isShowError &&
                (signUpData.password.length === 0 ||
                  signUpData.password.length < 6) && (
                  <Text style={styles.errorText} numberOfLines={1}>
                    Please enter a valid Password
                  </Text>
                )}

              {/* <ValidateInput
                theme={theme}
                titleText={"Password"}
                value={signUpData.password}
                maxLength={6}
                onChangeValue={(value) => {
                  dispatch(usersReset())
                  updateSignupData({ ...signUpData, password: value });
                }}
                shouldErrorShow={
                  isShowError &&
                    (signUpData.password.length === 0 ||
                      signUpData.password.length < 6)
                    ? true
                    : false
                }
                extraHeaderTxtStyle={{ fontSize: 16, fontFamily: fontsName.NUNITO_MEDIUM, fontWeight: '500' }}
                errorMessage={"Please enter a valid Password"}
              /> */}

              <Text style={[styles.inputTitle, { fontSize: 16, fontFamily: fontsName.NUNITO_MEDIUM, fontWeight: '500' }]} numberOfLines={1}>
                Confirm Password
                <Text style={styles.star}>*</Text>
              </Text>
              <View style={[styles.noneInputContainer, { marginTop: 10 }]}>
                <TextInput
                  ref={confirmPassRef}
                  returnKeyType="next"
                  placeholderTextColor={theme.black}
                  onSubmitEditing={() => {
                    phoneNumberRef.current.focus()
                  }}
                  value={signUpData.confirmPassword}
                  maxLength={6}
                  onChangeText={(value) => {
                    dispatch(usersReset())
                    updateSignupData({ ...signUpData, confirmPassword: value });
                  }}
                  secureTextEntry={true}
                  style={[styles.noneTypeText, styles.text, { width: '80%' }]}
                />
              </View>
              {isShowError &&
                (signUpData.confirmPassword.length === 0 ||
                  signUpData.confirmPassword.length < 6 ||
                  signUpData.confirmPassword !== signUpData.password) && (
                  <Text style={styles.errorText} numberOfLines={1}>
                    Please enter a valid Confirm Password
                  </Text>
                )}

              {/* <ValidateInput
                theme={theme}
                titleText={"Confirm Password"}
                value={signUpData.confirmPassword}
                maxLength={6}
                onChangeValue={(value) => {
                  dispatch(usersReset())
                  updateSignupData({ ...signUpData, confirmPassword: value });
                }}
                shouldErrorShow={
                  isShowError &&
                    (signUpData.confirmPassword.length === 0 ||
                      signUpData.confirmPassword.length < 6 ||
                      signUpData.confirmPassword !== signUpData.password)
                    ? true
                    : false
                }
                extraHeaderTxtStyle={{ fontSize: 16, fontFamily: fontsName.NUNITO_MEDIUM, fontWeight: '500' }}
                errorMessage={"Please enter a valid Confirm Password"}
              /> */}

              <Text style={[styles.inputTitle, { fontSize: 16, fontFamily: fontsName.NUNITO_MEDIUM, fontWeight: '500' }]} numberOfLines={1}>
                Phone Number
                <Text style={styles.star}>*</Text>
              </Text>
              <View style={[styles.noneInputContainer, { marginTop: 10 }]}>
                <TextInput
                  ref={phoneNumberRef}
                  returnKeyType="next"
                  placeholderTextColor={theme.black}
                  value={signUpData.phoneNumber}
                  maxLength={10}
                  keyboardType={"number-pad"}
                  onChangeText={(value) => {
                    dispatch(usersReset())
                    updateSignupData({ ...signUpData, phoneNumber: value });
                  }}
                  style={[styles.noneTypeText, styles.text, { width: '80%' }]}
                />
              </View>
              {isShowError &&
                (signUpData.phoneNumber.length === 0 ||
                  signUpData.phoneNumber.length < 10) && (
                  <Text style={styles.errorText} numberOfLines={1}>
                    Please enter a valid Phone Number
                  </Text>
                )}

              {/* <ValidateInput
                theme={theme}
                titleText={"Phone Number"}
                value={signUpData.phoneNumber}
                maxLength={10}
                keyboardType={"number-pad"}
                onChangeValue={(value) => {
                  dispatch(usersReset())
                  updateSignupData({ ...signUpData, phoneNumber: value });
                }}
                shouldErrorShow={
                  isShowError &&
                    (signUpData.phoneNumber.length === 0 ||
                      signUpData.phoneNumber.length < 10)
                    ? true
                    : false
                }
                extraHeaderTxtStyle={{ fontSize: 16, fontFamily: fontsName.NUNITO_MEDIUM, fontWeight: '500' }}
                errorMessage={"Please enter a valid Phone Number"}
              /> */}

              <Text style={[styles.inputTitle, { fontSize: 16, fontFamily: fontsName.NUNITO_MEDIUM, fontWeight: '500' }]} numberOfLines={1}>
                Location
              </Text>
              <View style={[styles.noneInputContainer, { marginTop: 10 }]}>
                <TextInput
                  placeholderTextColor={theme.black}
                  value={signUpData.location}
                  onChangeText={(value) => {
                    dispatch(usersReset())
                    updateSignupData({ ...signUpData, location: value });
                  }}
                  style={[styles.noneTypeText, styles.text, { width: '80%' }]}
                />
              </View>

              {/* <ValidateInput
                theme={theme}
                titleText={"Location"}
                value={signUpData.location}
                onChangeValue={(value) => {
                  dispatch(usersReset())
                  updateSignupData({ ...signUpData, location: value });
                }}
                isMandatory={false}
                extraHeaderTxtStyle={{ fontSize: 16, fontFamily: fontsName.NUNITO_MEDIUM, fontWeight: '500' }}
                shouldErrorShow={false}
              /> */}
            </>
          ) : (
            <>
              <View style={styles.subContainer}>
                <Text
                  style={[
                    styles.haveAccountText,
                    {
                      fontSize: 18,
                      marginHorizontal: 20,
                    },
                  ]}
                >
                  Please use any of your Email To sign up
                </Text>
                <SignUpButtons
                  theme={theme}
                  title={"Email"}
                  onPress={() => {
                    setTimeout(() => {
                      setEmailSignUp(true);
                    }, 1500);
                  }}
                  icon={
                    <Image
                      style={{ width: 18, height: 12 }}
                      source={resources.EMAIL}
                    />
                  }
                  containerStyle={{ marginTop: 60 }}
                />
                <SignUpButtons
                  theme={theme}
                  icon={<Image source={resources.GOOGLE_ICON} />}
                  title={"Google"}
                  onPress={() => { onGoogleButtonPress() }}
                />
                <SignUpButtons
                  theme={theme}
                  icon={<Image source={resources.FB_ICON} />}
                  title={"Facebook"}
                  onPress={() => { }}
                />
                {Platform.OS == 'ios' && <SignUpButtons
                  theme={theme}
                  icon={<Image source={resources.APPLE_ICON} />}
                  title={"Apple ID"}
                  onPress={() => { onAppleButtonPress() }}
                />}
              </View>
              <View style={styles.bottomVw}>
                <Text style={styles.haveAccountText} numberOfLines={1}>
                  Already have an account?
                </Text>
                <Text
                  style={styles.login}
                  onPress={() => {
                    navigation.navigate(screenTitle.LOGIN);
                  }}
                >
                  Login
                </Text>
              </View>
            </>
          )}
        </KeyboardAwareScrollView>
        <ConfirmationModal
          theme={theme}
          modalVisible={signUpModal}
          buttonTitle={"Ok"}
          onButtonPress={() => {
            dispatch(usersReset())
            setSignUPModal(false);
            navigation.navigate(screenTitle.OTP, { email: signUpData.email });

          }}
          descipionText={'We have sent \n OTP on your mail please check '}
        />
        {isEmailSignUp && (
          <>
            <NavigationBottomButton
              theme={theme}
              title={"Sign Up"}
              containerStyle={{
                height: insets.bottom > 0 ? 40 : 55,
                paddingTop: insets.bottom > 0 ? 10 : 0,
              }}
              onButtonPress={() => onSignUp()}
            />
            {insets.bottom > 0 && (
              <View
                style={{
                  height: insets.bottom,
                  backgroundColor: theme.PRIMARY_GREEN,
                }}
              />
            )}
          </>
        )}
      </ImageBackground>
      {/* {loading &&
        <LoaderComponent 
          theme={theme}
          modalVisible={loading}
        />
      } */}
    </SafeAreaProvider>
  );
};
export default SignUp;
