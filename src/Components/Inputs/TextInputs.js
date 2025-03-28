import React from "react";
import { View, Pressable, StyleSheet, TextInput, Platform } from "react-native";
import { fontsName } from "../../constants";
const TextInputs = (props) => {
  const {
    theme,
    placeHolder,
    value,
    onChangeText,
    leftIcon,
    rightIcon,
    isShowRightIcon = false,
    isShowLeftIcon = false,
    isEdit = true,
    extraStyle,
    keyboardType = "default",
    maxLength = undefined,
    styleType,
    secureText = false,
    rightIconPress,
    returnKeyType = '',
    onSubmitEditing,
    ref,
  } = props;
  const styles = Style(theme);

  let inputContainerStyle;
  let inputTextStyle;
  if (styleType === "none") {
    inputContainerStyle = styles.noneInputContainer;
    inputTextStyle = styles.noneTypeText;
  } else if (styleType === "secondary") {
    inputContainerStyle = styles.secondaryInputContainer;
    inputTextStyle = styles.secondaryText;
  } else {
    inputContainerStyle = styles.inputContainer;
    inputTextStyle = styles.text;
  }

  return (
    <View style={[inputContainerStyle, extraStyle]}>
      {isShowLeftIcon && <View style={styles.leftImage}>{leftIcon}</View>}
      <TextInput
        ref={ref}
        style={[inputTextStyle, styles.commonText]}
        value={value}
        keyboardType={keyboardType}
        placeholderTextColor={theme.black}
        placeholder={placeHolder}
        onChangeText={(value) => onChangeText(value)}
        maxLength={maxLength}
        editable={isEdit}
        secureTextEntry={secureText}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={false}
      />
      {isShowRightIcon && (
        <Pressable style={{ padding: 5 }} onPress={() => rightIconPress()}>
          {rightIcon}
        </Pressable>
      )}
    </View>
  );
};
const Style = (theme) => {
  return StyleSheet.create({
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 15,
      backgroundColor: "rgba(0, 0, 0, 0.22)",
      paddingVertical: Platform.OS === "ios" ? 17 : 5,
      marginTop: 18,
      paddingLeft: 15,
      paddingRight: 10,
    },
    secondaryInputContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 15,
      backgroundColor: theme.white,
      height: 55,
      marginTop: 18,
      paddingLeft: 15,
      paddingRight: 10,
      borderColor: "#c3cfe2",
      borderWidth: 1,
    },
    noneInputContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    text: {
      fontSize: 16,
    },
    noneTypeText: {
      fontSize: 12,
      paddingVertical: 0,
    },
    secondaryText: {
      fontSize: 12,
    },
    commonText: {
      color: theme.black,
      flex: 1,
      fontFamily: fontsName.NUNITO_REGULAR,
    },
    leftImage: {
      width: 25,
      height: 25,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
    },
  });
};

export default TextInputs;
