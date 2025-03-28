import React from "react";
import {
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { fontsName } from "../../constants";

const ConfirmButton = (props) => {
  const { theme, buttonText, onButtonPress, buttonTextStyle } = props;
  const styles = Style(theme);
  return (
    <Pressable style={styles.buttonContainer} onPress={() => onButtonPress()}>
      <Text numberOfLines={1} style={[styles.buttonText,buttonTextStyle]}>
        {buttonText}
      </Text>
    </Pressable>
  );
};
const Style = (theme) => {
  return StyleSheet.create({
    buttonContainer: {
      alignItems: "center",
      justifyContent: "center",
      height: 55,
      width: "50%",
    },
    buttonText: {
      fontFamily: fontsName.NUNITO_BOLD,
      fontSize: 18,
      color: theme.FONT_MEDIUM_BLACK,
    },
  });
};

export default ConfirmButton;
