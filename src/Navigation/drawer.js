import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { useColorScheme } from "react-native";
import { DarkTheme, LightTheme } from "../constants/theme";
import TabStack from "./home";
import { screenTitle } from '../constants/index';

import Options from "../Drawer/Options";
import SetLocation from "../Screens/LocationScreen/SetLocation";
import { getData } from "../utils/network/commonFunction";
import * as C from '../constants/index';
import { useAppDispatch, useAppSelector } from "../redux-store/hooks";
import Splash from "../Screens/SplashScreen/Splash";
import SelectFromMap from "../Screens/SelectFromMap/SelectFromMap";

const Drawer = createDrawerNavigator();

export default function DrawerStack() {
  const theme = useColorScheme() === "dark" ? LightTheme : DarkTheme;
  const { loctaionStatus } = useAppSelector((state) => state.home);
  console.log("10101010100------");
  return (
    <Drawer.Navigator
      initialRouteName={ !loctaionStatus ? screenTitle.SETLOCATION : screenTitle.SPALSH}
      drawerContent={(props) => <Options {...props} theme={theme} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: "right",
        drawerType: "back",
      }}
    >
     <Drawer.Screen
        name={screenTitle.SPALSH}
        component={Splash}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={screenTitle.SETLOCATION}
        component={SetLocation}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name={screenTitle.SELECTFROMMAP}
        component={SelectFromMap}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Tab"
        component={TabStack}
        options={{ swipeEnabled: false }}
      />
    </Drawer.Navigator>
  );
}
