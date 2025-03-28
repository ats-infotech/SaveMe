/* eslint-disable no-undef */
import React from "react";
import { View, Text, StyleSheet, Pressable, Platform, TouchableOpacity } from "react-native";
import { fontsName } from "../../constants";

export const NavigationButton = (props) => {
  const { theme, title, containerStyle, onButtonPress, extraTitleStyle } = props;
  const styles = Style(theme);
  return (
    <TouchableOpacity
      style={[styles.button, styles.buttonRadius, containerStyle]}
      onPress={onButtonPress}
    >
      <Text style={[styles.buttonText,extraTitleStyle ]} numberOfLines={1}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export const NavigationBottomButton = (props) => {
  const { theme, title, containerStyle, onButtonPress, extraTitleStyle } = props;
  const styles = Style(theme);
  return (
    <Pressable
      style={[styles.button, styles.bottomButtonRadius, containerStyle]}
      onPress={onButtonPress}
    >
      <Text style={[styles.buttonText, extraTitleStyle]} numberOfLines={1}>
        {title}
      </Text>
    </Pressable>
  );
};
const Style = (theme) => {
  return StyleSheet.create({
    button: {
      backgroundColor: theme.PRIMARY_GREEN,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonRadius: {
      borderRadius: 40,
    },
    bottomButtonRadius: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      height: 61,
    },
    buttonText: {
      fontSize: 18, //20
      color: theme.white,
      fontFamily: fontsName.NUNITO_BOLD,
      marginTop: Platform.OS === "ios" ? 0 : -3,
    },
  });
};
