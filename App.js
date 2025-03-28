import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigator } from './src/Navigation/MainNavigator';
import SplashScreen from "react-native-splash-screen";
import { store } from "./src/redux-store/store";
import { Provider } from "react-redux";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { setAuthorization } from './src/networking/utils';
import { StripeProvider } from '@stripe/stripe-react-native';
import { STRIPE_PUBLCI_KEY } from './src/constants';
import messaging from "@react-native-firebase/messaging";
import {enableLatestRenderer} from 'react-native-maps';

let persistor = persistStore(store);

export default function App() {
  setAuthorization()
  enableLatestRenderer();
  const navigationRef = useRef();

  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 100)
  }, [])

  async function askForPermission() {
    const enabled = await messaging().hasPermission();
    if (enabled !== -1) {
      // user has permissions
      messaging().getToken().then(token =>{
        ///
      })
      return;
    }
    // user doesn't have permission
    messaging()
      .requestPermission({
        alert: true,
        announcement: false,
        badge: true,
        carPlay: false,
        provisional: false,
        sound: true,
      })
      .then(() => {
        // User has authorised
      })
      .catch(error => {
        // User has rejected permissions
      });
  }

  useEffect(() => {
    messaging().setAutoInitEnabled(true)
    askForPermission()
  },[])

  return (
    // <NavigationContainer>
    //   {/* Rest of your app code */}
    //   <MainNavigator />
    // </NavigationContainer>
    <StripeProvider publishableKey={STRIPE_PUBLCI_KEY}
      merchantIdentifier="merchant.com.saveme" // required for Apple Pay
      urlScheme="your-url-scheme" >
      <NavigationContainer ref={navigationRef}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <MainNavigator />
          </PersistGate>
        </Provider>
      </NavigationContainer>
    </StripeProvider>
  );
}