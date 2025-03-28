import React, { useDebugValue, useEffect, useState } from "react";
import {
    SafeAreaView,
    useColorScheme,
} from "react-native";
import Style from "./Style";
import { LightTheme, DarkTheme } from "../../constants/theme";
import Lottie from 'lottie-react-native';
import { useAppSelector } from "../../redux-store/hooks";
import { screenTitle } from "../../constants";
import {
    SafeAreaProvider,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
  
const Splash = ({ navigation, route }) => {
    const theme = useColorScheme() === "dark" ? LightTheme : DarkTheme;
    const insets = useSafeAreaInsets();
    const styles = Style(theme, insets);
    
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Tab")
        }, 3000)
    })


    return (
        <SafeAreaView style={styles.container}>
            <Lottie source={require('../../assets/images/saveMeIcon.json')} autoPlay loop />
        </SafeAreaView>
    );
};
export default Splash;
