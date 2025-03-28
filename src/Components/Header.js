import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import resources from "../constants/resources";
import { fontsName } from "../constants";

const Header = (props) => {
  const {
    theme,
    title,
    isLeftIconShow = true,
    onBackPress,
    isRightTextShow = false,
    isShowTitle = true,
    headerStyle,
    rightText,
    onRightIconPress,
    onRightTextPress,
    isRightIconShow = false,
    titleStyle,
    showButtonColor = false,
  } = props;
  const styles = Style(theme);
  return (
    <View style={[styles.headerContainer, headerStyle]}>
      {isLeftIconShow && (
        <Pressable
          style={[
            styles.backImageView,
            { left: showButtonColor ? 10 : 5 },
            showButtonColor && styles.buttonColor,
          ]}
          onPress={() => onBackPress()}
        >
          <Image
            style={[showButtonColor ? [styles.iconWithColor, { marginLeft: -3 }] : styles.backImage]}
            source={resources.BACK}
          />
        </Pressable>
      )}
      {isShowTitle && (
        <Text style={[styles.headerText, titleStyle]} numberOfLines={1}>
          {title}
        </Text>
      )}
      {isRightIconShow ? (
        <Pressable
          style={[
            styles.backImageView,
            { right: 10 },
            showButtonColor && styles.buttonColor,
          ]}
          onPress={() => onRightIconPress()}
        >
          <Image
            style={[showButtonColor ? styles.iconWithColor : styles.backImage, { resizeMode: 'contain' }]}
            source={resources.CLOSE}
          />
        </Pressable>
      )
        : isRightTextShow && (
          <Pressable
          style={[
            styles.rightTxtVw,
          ]}
          onPress={() => onRightTextPress()}
        >
          <Text style={styles.rightTextStyle}>{rightText}</Text>
        </Pressable>
        )
      }
    </View>
  );
};
const Style = (theme) => {
  return StyleSheet.create({
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    headerText: {
      fontSize: 20, //22
      color: theme.FONT_GREEN,
      fontFamily: fontsName.NUNITO_REGULAR,
      marginHorizontal: 10,
      fontWeight:'700'
    },
    backImageView: {
      position: "absolute",
      width: 38,
      alignItems: "center",
      justifyContent: "center",
      height: 38,
      borderRadius: 19,
    },
    buttonColor: { backgroundColor: theme.BORDER_3 },
    backImage: {
      width: 15,
      height: 20,
      tintColor: theme.FONT_GREEN,
    },
    iconWithColor: {
      width: 13,
      height: 17,
      tintColor: theme.FONT_GREEN,
    },
    rightTxtVw: {
      position: "absolute",
      width: 55,
      alignItems: "center",
      justifyContent: "center",
      height: 38,
      right: 17,
    },
    rightTextStyle: {
      fontSize: 17,
      fontFamily:fontsName.NUNITO_BOLD,
      color:theme.primary_gray
    }
  });
};

export default Header;
