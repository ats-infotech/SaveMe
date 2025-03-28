import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import resources from "../constants/resources";
import { fontsName } from "../constants";
import TextInputs from "./Inputs/TextInputs";

const OTPinput = (props) => {
  const { theme,otpCode, seconds , onChangeOTPCode, onResend, inputStyle } = props;
  const styles = Style(theme);
  return (
    <View style={{height:185}}>
      <TextInputs
        theme={theme}
        value={otpCode}
        placeHolder={"OTP Code"}
        onChangeText={(value) => {
          onChangeOTPCode(value);
        }}
        extraStyle={inputStyle}
        isShowLeftIcon={true}
        leftIcon={
          <Image
            style={{ width: 15, height: 21, resizeMode:'contain' }}
            source={resources.OTP_LOCK}
          />
        }
        keyboardType={"number-pad"}
      />
      <Text
        style={{
          color: theme.black,
          fontSize: 15,
          textAlign: "center",
          fontFamily: fontsName.NUNITO_REGULAR,
          paddingVertical: 15,
        }}
        numberOfLines={1}
      >
        {`Enter OTP code ${seconds} seconds`}
      </Text>
      {seconds == 0 && <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 60,
        }}
      >
        <Text
          style={{
            color: theme.black,
            fontSize: 15,
            textAlign: "center",
            fontFamily: fontsName.NUNITO_REGULAR,
          }}
          numberOfLines={1}
        >
          Didn't received ?
        </Text>
        <Text style={styles.resendText} onPress={() => onResend()}>
          Resend
        </Text>
      </View>}
    </View>
  );
};
const Style = (theme) => {
  return StyleSheet.create({
    resendText: {
      color: theme.PRIMARY_GREEN,
      fontSize: 15,
      fontFamily: fontsName.NUNITO_BOLD,
      marginLeft: 5,
    },
  });
};

export default OTPinput;
