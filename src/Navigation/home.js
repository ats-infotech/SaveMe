import React, { useContext, createContext, useState } from "react";
import { Image, Platform, useColorScheme, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import { DarkTheme, LightTheme } from "../constants/theme";
import resources from "../constants/resources";
import { screenTitle } from "../constants";
import Home from "../Screens/HomeScreen/Home";
import FoodDetail from "../Screens/FoodDetailScreen/FoodDetail";
import CategoryFilter from "../Screens/CategoryFilterScreen/CategoryFilter";
import SearchResult from "../Screens/SearchResultScreen/SearchResult";
import MyProfile from "../Screens/MyProfileScreen/MyProfile";
import Settings from "../Screens/SettingsScreen/Settings";
import Favourite from "../Screens/FavouriteScreen/Favourite";
import Recent from "../Screens/RecentsScreen/Recent";
import TotalSaving from "../Screens/TotalSavingScreen/TotalSaving";
import TotalBundles from "../Screens/TotalBundlesScreen/TotalBundles";
import BecomeVendor from "../Screens/BecomeVendorScreen/BecomeVendor";
import ChangeEmail from "../Screens/ChangeEmailScreen/ChangeEmail";
import ChangePassword from "../Screens/ChangePasswordScreen/ChangePassword";
import { useSafeAreaInsets } from "react-native-safe-area-context";



const Tab = createBottomTabNavigator();

const HomeScreenStack = createStackNavigator();
const FilterScreenStack = createStackNavigator();
const FavouriteScreenStack = createStackNavigator();
const SettingsScreenStack = createStackNavigator();
const RecentScreenStack = createStackNavigator();

const screenOptions = { headerShown: false, ...TransitionPresets.SlideFromRightIOS }

function HomeScreen({ navigation, route }) {
  return (
    <HomeScreenStack.Navigator initialRouteName={screenTitle.FOODHOME}>
      <HomeScreenStack.Screen
        name={screenTitle.FOODHOME}
        component={Home}
        options={screenOptions}
      />
      <HomeScreenStack.Screen
        name={screenTitle.FOODDETAIL}
        component={FoodDetail}
        options={screenOptions}
      />
      <HomeScreenStack.Screen
        name={screenTitle.CATEGORYFILTER}
        component={CategoryFilter}
        options={screenOptions}
      />
      <HomeScreenStack.Screen
        name={screenTitle.SEARCHRESULT}
        component={SearchResult}
        options={screenOptions}
      />
    </HomeScreenStack.Navigator>
  );
}

function FavouriteScreen({ navigation }) {
  return (
    <FavouriteScreenStack.Navigator initialRouteName={screenTitle.FAVOURITE}>
      <FavouriteScreenStack.Screen
        name={screenTitle.FAVOURITE}
        component={Favourite}
        options={screenOptions}
      />
    </FavouriteScreenStack.Navigator>
  );
}

function RecentsScreen({ navigation }) {
  return (
    <RecentScreenStack.Navigator initialRouteName={screenTitle.RECENT}>
      <RecentScreenStack.Screen
        name={screenTitle.RECENT}
        component={Recent}
        options={screenOptions}
      />
    </RecentScreenStack.Navigator>
  );
}

function FilterScreen({ navigation }) {
  return (
    <FilterScreenStack.Navigator initialRouteName={screenTitle.CATEGORYFILTER}>
      <FilterScreenStack.Screen
        name={screenTitle.CATEGORYFILTER}
        component={CategoryFilter}
        options={screenOptions}
      />
      <FilterScreenStack.Screen
        name={screenTitle.SEARCHRESULT}
        component={SearchResult}
        options={screenOptions}
      />
    </FilterScreenStack.Navigator>
  );
}
function MyAccountScreen({ navigation }) {
  return (
    <SettingsScreenStack.Navigator initialRouteName={screenTitle.MYPROFILE}>
      <SettingsScreenStack.Screen
        name={screenTitle.MYPROFILE}
        component={MyProfile}
        options={screenOptions}
      />
      <SettingsScreenStack.Screen
        name={screenTitle.SETTINGS}
        component={Settings}
        options={screenOptions}
      />
      <SettingsScreenStack.Screen
        name={screenTitle.TOTALSAVING}
        component={TotalSaving}
        options={screenOptions}
      />
      <SettingsScreenStack.Screen
        name={screenTitle.TOTALBUNDLES}
        component={TotalBundles}
        options={screenOptions}
      />
      <SettingsScreenStack.Screen
        name={screenTitle.BECOMEVENDOR}
        component={BecomeVendor}
        options={screenOptions}
      />
      <SettingsScreenStack.Screen
        name={screenTitle.CHANGEEMAIL}
        component={ChangeEmail}
        options={screenOptions}
      />
      <SettingsScreenStack.Screen
        name={screenTitle.CHANGEPASSWORD}
        component={ChangePassword}
        options={screenOptions}
      />
    </SettingsScreenStack.Navigator>
  );
}


export default function HomeStack() {
  const theme = useColorScheme() === "dark" ? LightTheme : DarkTheme;
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: theme.white,
          paddingHorizontal: 10,
          borderTopLeftRadius: 30,
          height: Platform.OS === "android" ? 70 : insets.bottom > 0 ? 90 : 70,
          justifyContent: "center",
          borderTopRightRadius: 30,
        },
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === screenTitle.HOME) {
            iconName = focused ? resources.ACTIVE_HOME : resources.HOME;
          } else if (route.name === screenTitle.FAVOURITESCREEN) {
            iconName = focused ? resources.ACTIVE_BOOKMARK : resources.BOOKMARK;
          } else if (route.name === screenTitle.RECENTSCREEN) {
            iconName = focused ? resources.ACTIVE_RECENT : resources.RECENT;
          } else if (route.name === screenTitle.FILTER) {
            iconName = focused ? resources.ACTIVE_SEARCH : resources.SEARCH;
          } else if (route.name === screenTitle.MYACCOUNT) {
            iconName = focused
              ? resources.ACTIVE_MYACCOUNT
              : resources.MYACCOUNT;
          }
          return (
            <Image
              style={{ width: 23, height: 23, resizeMode: "contain" }}
              source={iconName}
            />
          );
        },
      })}
      initialRouteName={screenTitle.HOME}
    >

      <Tab.Screen
        name={screenTitle.HOME}
        component={HomeScreen}
        options={({ route }) => ({
          tabBarStyle: ((route) => {
            const routeName =
              getFocusedRouteNameFromRoute(route) ?? screenTitle.FOODHOME;
            if (routeName !== screenTitle.FOODHOME) {
              return { display: "none" };
            } else {
              return {
                borderTopWidth: 0,
                backgroundColor: theme.white,
                paddingHorizontal: 10,
                borderTopLeftRadius: 30,
                height:
                  Platform.OS === "android" ? 70 : insets.bottom > 0 ? 90 : 70,
                justifyContent: "center",
                borderTopRightRadius: 30,
                display: "flex",
              };
            }
          })(route),
        })}
      />
      <Tab.Screen
        name={screenTitle.FAVOURITESCREEN}
        component={FavouriteScreen}
        options={({ route }) => ({
          tabBarStyle: ((route) => {
            const routeName =
              getFocusedRouteNameFromRoute(route) ?? screenTitle.FAVOURITE;
            if (routeName !== screenTitle.FAVOURITE) {
              return { display: "none" };
            } else {
              return {
                borderTopWidth: 0,
                backgroundColor: theme.white,
                paddingHorizontal: 10,
                borderTopLeftRadius: 30,
                height:
                  Platform.OS === "android" ? 70 : insets.bottom > 0 ? 90 : 70,
                justifyContent: "center",
                borderTopRightRadius: 30,
                display: "flex",
              };
            }
          })(route),
        })}
      />
      <Tab.Screen
        name={screenTitle.RECENTSCREEN}
        component={RecentsScreen}
        options={({ route }) => ({
          tabBarStyle: ((route) => {
            const routeName =
              getFocusedRouteNameFromRoute(route) ?? screenTitle.RECENT;
            if (routeName !== screenTitle.RECENT) {
              return { display: "none" };
            } else {
              return {
                borderTopWidth: 0,
                backgroundColor: theme.white,
                paddingHorizontal: 10,
                borderTopLeftRadius: 30,
                height:
                  Platform.OS === "android" ? 70 : insets.bottom > 0 ? 90 : 70,
                justifyContent: "center",
                borderTopRightRadius: 30,
                display: "flex",
              };
            }
          })(route),
        })}
      />
      <Tab.Screen
        name={screenTitle.FILTER}
        component={FilterScreen}
        options={({ route }) => ({
          tabBarStyle: ((route) => {
            const routeName =
              getFocusedRouteNameFromRoute(route) ?? screenTitle.CATEGORYFILTER;
            if (routeName !== screenTitle.CATEGORYFILTER) {
              return { display: "none" };
            } else {
              return {
                borderTopWidth: 0,
                backgroundColor: theme.white,
                paddingHorizontal: 10,
                borderTopLeftRadius: 30,
                height:
                  Platform.OS === "android" ? 70 : insets.bottom > 0 ? 90 : 70,
                justifyContent: "center",
                borderTopRightRadius: 30,
                display: "flex",
              };
            }
          })(route),
        })}
      />
      <Tab.Screen
        name={screenTitle.MYACCOUNT}
        component={MyAccountScreen}
        options={({ route }) => ({
          tabBarStyle: ((route) => {
            const routeName =
              getFocusedRouteNameFromRoute(route) ?? screenTitle.MYPROFILE;
            if (routeName !== screenTitle.MYPROFILE) {
              return { display: "none" };
            } else {
              return {
                borderTopWidth: 0,
                backgroundColor: theme.white,
                paddingHorizontal: 10,
                borderTopLeftRadius: 30,
                height:
                  Platform.OS === "android" ? 70 : insets.bottom > 0 ? 90 : 70,
                justifyContent: "center",
                borderTopRightRadius: 30,
                display: "flex",
              };
            }
          })(route),
        })}
      />
    </Tab.Navigator>
  );
}
