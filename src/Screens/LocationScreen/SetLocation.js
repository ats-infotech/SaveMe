import React, { useState, useCallback,useEffect } from "react";
import {
  SafeAreaView,
  useColorScheme,
  View,
  Alert,
  Linking,
  Text,
  ImageBackground,
  Image,
  PermissionsAndroid,
} from "react-native";
import Style from "./Style";
import { LightTheme, DarkTheme } from "../../constants/theme";
import resources from "../../constants/resources";
import { screenTitle } from "../../constants";
import { NavigationButton } from "../../Components/Buttons/NavigationButton";
import LoaderComponent from "../../Components/LoaderComponent";
import { StackActions } from "@react-navigation/native";
import Geolocation from '@react-native-community/geolocation';
import * as C from '../../constants/index';
import { saveData } from "../../utils/network/commonFunction";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks";
import { setLocationValue } from "../../redux-store/home/homeSlice";
import Lottie from 'lottie-react-native';

const SetLocation = ({ navigation, route }) => {
  const theme = useColorScheme() === "dark" ? LightTheme : DarkTheme;
  const styles = Style(theme);
  const [splash, setSplash] = useState(true);
  const dispatch = useAppDispatch();
  const { loginUserData } = useAppSelector(
    (state) => state.auth
  ); 
  // GetLocation Method
  function getLocation() {
    return new Promise(async (resolve, reject) => {
        if (Platform.OS === 'android') {
            // https://github.com/facebook/react-native/issues/22535
            const permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)

            if (permission === PermissionsAndroid.RESULTS.GRANTED) {
                return Geolocation.getCurrentPosition(resolve, reject)
            } else {
              _openAppSetting()
                // reject(new Error('Refused the permission ACCESS_FINE_LOCATION'))
            }
        } else {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        }
    })
  }

  useEffect(() => {
    setTimeout(() => {
       setSplash(false)
    }, 3000)
})
  
  // Navigation Method
  const sucessNavigate = (info) => {
    let data = {}
    data.lat = info?.coords?.latitude
    data.lng = info?.coords?.longitude
    dispatch(setLocationValue(data))
    navigation.reset({
      index: 0,
      routes: [{name: 'Tab'}],
      });
  }

  // OpenSettings Method
  const _openAppSetting = useCallback(async () => {
    Alert.alert(
      "Please allow app to access your location",
      "",
      [
        {
          text: "Setting",
          onPress: () => Linking.openSettings()
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
      ]
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {splash ? <Lottie source={require('../../assets/images/saveMeIcon.json')} autoPlay loop /> :
        <ImageBackground
          style={{ flex: 1, justifyContent: "flex-end" }}
          source={resources.BG_IMAGE}
        >
          <View style={styles.subContainer}>
            <Text style={styles.welcomeText} numberOfLines={1}>
              Hi {loginUserData?.user[0]?.name},
            </Text>
            <Text style={styles.welcomeText} numberOfLines={1}>
              Welcome to
            </Text>
            <Image source={resources.SAVEMETEXT} />
            <Text style={styles.suggestionText}>
              For better restaurant suggestions Please turn on your GPS.
            </Text>
            <NavigationButton
              theme={theme}
              title={"Current Location"}
              containerStyle={{ marginTop: 40 }}
              onButtonPress={() => {
                // getLocation()
                Geolocation.getCurrentPosition(info => {
                  sucessNavigate(info)
                },
                  error => {
                    _openAppSetting()
                    // Alert.alert('Error', JSON.stringify(error))
                  },
                  { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
                );
              }}
            />
            <NavigationButton
              theme={theme}
              title={"Select from Map"}
              containerStyle={{ marginTop: 20, marginBottom: 40 }}
              onButtonPress={() => {
                navigation.navigate('SelectFromMap')
              }}
            />
          </View>
        </ImageBackground>}

    </SafeAreaView>
  );
};
export default SetLocation;
