import React, { useEffect, useState } from "react";
import {
  useColorScheme,
  View,
  Image,
  Text,
  TextInput,
  Dimensions,
  Platform,
  Pressable
} from "react-native";
import Style from "./Style";
import { LightTheme, DarkTheme } from "../../constants/theme";
import { fontsName, screenTitle, RegEx, WEB_CLIENT_ID } from "../../constants";
import resources from "../../constants/resources";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import auth from '@react-native-firebase/auth';
import { NavigationBottomButton } from "../../Components/Buttons/NavigationButton";
import SearchInput from "../../Components/Inputs/SearchInput";
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
const height = Dimensions.get('window').height;


const SelectFromMap = ({ navigation, route }) => {
  const theme = useColorScheme() === "dark" ? LightTheme : DarkTheme;
  const insets = useSafeAreaInsets();
  const styles = Style(theme, insets);
  const [searchInput, setSearchInput] = useState('');
  const [position, setPosition] = useState({
    latitude: 22.654086,
    // latitude: 0,
    longitude: 72.796528,
    // longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0
  });

  const onPressLocateMe = () => {
    Geolocation.getCurrentPosition((pos) => {
      const crd = pos.coords;
      setTimeout(() => {
        setPosition({
          latitude: crd.latitude,
          longitude: crd.longitude,
        });
      }, 500);
    })   
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={{ flex: 1 }}>
        <Pressable onPress={() => navigation.goBack()} style={{backgroundColor: 'transparent',top: 35, zIndex: 1, left: 20}}>
          <Image
            style={{ height: 20, width: 20, resizeMode: 'contain', tintColor: theme.white }}
            source={resources.BACK}
          />
        </Pressable>
        <Pressable onPress={() => onPressLocateMe()} style={{
          flexDirection: "row", paddingHorizontal: 12, paddingVertical: 5, alignItems: "center", borderRadius: 15, backgroundColor: theme.white,
          position: 'absolute', bottom: height / 2 - 260, right: 20, zIndex: 1,
        }}>
          <Image
            style={{ height: 14, width: 14, resizeMode: 'contain', tintColor: theme.PRIMARY_GREEN, }}
            source={resources.LOCATION}
          />
          <Text style={{ color: theme.PRIMARY_GREEN, marginLeft: 5 }}>Locate Me</Text>
        </Pressable>
        <MapView
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: position.latitude,
            longitude: position.longitude,
            latitudeDelta: 0.3,
            longitudeDelta: 0.3
          }}
          style={{ height: height / 2 + 130, width: '100%', }}
          onRegionChangeComplete={(region) => {
            setPosition({
              latitude: region?.latitude,
              longitude: region?.longitude,
              latitudeDelta: region?.latitudeDelta,
              longitudeDelta: region?.longitudeDelta
            });
          }}
        >

          <Marker
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
          >
            <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', height: 100, width: 100, borderRadius: 70, alignItems: "center", justifyContent: "center" }}>
              <Image
                source={resources.LOGO_LEAF}
                style={{ width: 35, height: 35 }}
                resizeMode="contain"
              />
            </View>
          </Marker>
        </MapView>

        <View style={styles.searchVw}>
          <Image source={resources.SEARCH} style={styles.searchImage} />
          <TextInput
            value={searchInput}
            placeholder="Enter address manually"
            placeholderTextColor={theme.white}
            style={{color:theme.white, fontSize:14,}}
            onChangeText={(text) => {
              setSearchInput(text);
            }}
          />
        </View>
      </View>

      <NavigationBottomButton
        theme={theme}
        title={"Save"}
        containerStyle={{
          height: insets.bottom > 0 ? 70 : 60,
          paddingTop: insets.bottom > 0 ? -10 : -5,
          marginTop: 40
        }}
        extraTitleStyle={{ fontSize: 20 }}
        onButtonPress={() => { navigation.navigate('SetLocation') }}
      />
    </SafeAreaProvider>
  );
};

export default SelectFromMap;