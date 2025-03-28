import React, {useRef} from 'react';
import {screenTitle} from '../constants/index';
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import Login from '../Screens/LoginScreen/Login';
import ForgotPassword from '../Screens/ForgotPasswordScreen/ForgotPassword';
import NewPassword from '../Screens/NewPasswordScreen/NewPassword';
import SignUp from '../Screens/SignUpScreen/SignUp';
import OTP from '../Screens/OTPScreen/OTP';
import BecomeVendor from '../Screens/BecomeVendorScreen/BecomeVendor';
import Splash from '../Screens/SplashScreen/Splash';
import { useAppSelector } from "../redux-store/hooks";


const LoginStack = createStackNavigator();
const screenOptions = { headerShown: false, ...TransitionPresets.SlideFromRightIOS }

export default function LoginStackScreen() {
  const { isUserLoggedIn } = useAppSelector((state) => state.auth);

  return (
    <LoginStack.Navigator initialRouteName={screenTitle.LOGIN}>
      <LoginStack.Screen
        name={screenTitle.LOGIN}
        component={Login}
        options={screenOptions}
      />
      <LoginStack.Screen
        name={screenTitle.FORGOTPASSWORD}
        component={ForgotPassword}
        options={screenOptions}
      />
      <LoginStack.Screen
        name={screenTitle.SIGNUP}
        component={SignUp}
        options={screenOptions}
      />
      <LoginStack.Screen
        name={screenTitle.OTP}
        component={OTP}
        options={screenOptions}
      />
      <LoginStack.Screen
        name={screenTitle.NEWPASSWORD}
        component={NewPassword}
        options={screenOptions}
      />
      <LoginStack.Screen
        name={screenTitle.BECOMEVENDOR}
        component={BecomeVendor}
        options={screenOptions}
      />
    </LoginStack.Navigator>
  );
}
