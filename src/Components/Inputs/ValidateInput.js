import React from "react";
import { Text, StyleSheet,View } from "react-native";
import { fontsName } from "../../constants";
import TextInputs from "./TextInputs";

const ValidateInput = (props) => {
  const {
    theme,
    titleText = "",
    value,
    onChangeValue,
    errorMessage,
    isMandatory = true,
    maxLength = undefined,
    keyboardType = "default",
    shouldErrorShow = false,
    isFromChangePassword = false,
    placeholderIcon,
    styleType,
    placeHolder,
    containerStyle,
    inputExtraStyle,
    extraHeaderTxtStyle
  } = props;
  const styles = Style(theme);
  return (
    <View style={containerStyle}>
     {Boolean(titleText) && <Text style={[styles.inputTitle, extraHeaderTxtStyle]} numberOfLines={1}>
        {titleText}
        {isMandatory && <Text style={styles.star}>*</Text>}
      </Text>}

        <TextInputs
        theme={theme}
        value={value}
        placeHolder={placeHolder}
        extraStyle={[{ marginTop: 6 }, inputExtraStyle ]}
        onChangeText={(value) => {
          onChangeValue(value);
        }}
        styleType={styleType}
        maxLength={maxLength}
        keyboardType={keyboardType}
      />
    
      {shouldErrorShow && (
        <Text style={styles.errorText} numberOfLines={1}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};
const Style = (theme) => {
  return StyleSheet.create({
    inputTitle: {
      fontSize: 14, //19
      color: theme.FONT_MEDIUM_BLACK,
      marginTop: 17,
      fontFamily: fontsName.NUNITO_REGULAR,
    },
    star: {
      color: "#ff3b30",
    },
    errorText: {
      fontSize: 12,
      color: "#ff3b30",
      marginLeft: 5,
      marginTop: 2,
      fontFamily: fontsName.NUNITO_REGULAR,
    },
  });
};

export default ValidateInput;
