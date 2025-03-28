import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { fontsName } from "../../../constants";
import AlertModal from "../AlertModal";
import RatingStarModal from "./RatingStarModal";
import { useAppDispatch, useAppSelector } from "../../../redux-store/hooks";

const RateusModal = (props) => {
  const { theme, modalVisible, setModalStatus, setYourRate, navigation } = props;
  const styles = Style(theme);
  const { loginUserData } = useAppSelector(
    (state) => state.auth
  ); 
  return (
    <>
      <AlertModal
        theme={theme}
        modalVisible={modalVisible}
        leftText={"Rate Us"}
        isRateus={true}
        rightText={"OK"}
        leftTextStyle={{ color: theme.PRIMARY_GREEN }}
        rightTextStyle={{ color: theme.FONT_MEDIUM_BLACK }}
        leftButtonPress={() => {
          navigation.setParams({ isFromDetails: false })
          setModalStatus(false);
          setTimeout(() => {
            setYourRate(true);
          }, 1000)
        }}
        rightButtonPress={() => {
          navigation.setParams({ isFromDetails: false })
          setModalStatus(false);
        }}
      >
        <View style={{ paddingHorizontal: 35, paddingVertical: 27 }}>
          <Text
            style={[styles.commonText, { color: theme.PRIMARY_GREEN }]}
            numberOfLines={1}
          >
            Hi {loginUserData?.user?.name},
          </Text>
          <Text style={[styles.commonText, { marginTop: 3 }]}>
            Thank you for picking up your order
          </Text>
        </View>
      </AlertModal>
      
    </>
  );
};
const Style = (theme) => {
  return StyleSheet.create({
    commonText: {
      fontSize: 18,
      color: theme.FONT_DARK_VIOLET,
      fontFamily: fontsName.NUNITO_MEDIUM,
      textAlign: "center",
    }
  });
};

export default RateusModal;
