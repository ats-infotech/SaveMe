import React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import Modal from "react-native-modal";
import resources from "../../constants/resources";
import ConfirmButton from "../Buttons/ConfirmButton";
const { width } = Dimensions.get("window");

const AlertModal = (props) => {
  const {
    theme,
    modalVisible,
    leftText,
    rightText,
    leftTextStyle,
    rightTextStyle,
    leftButtonPress,
    rightButtonPress,
    children,
    isRateus = false,
  } = props;
  const styles = Style(theme);
  return (
    <Modal
      isVisible={modalVisible}
      animationIn={"fadeInUp"}
      animationOut={"fadeInDown"}
      onBackButtonPress={() => {}}
      onBackdropPress={() => {}}
      style={styles.modalStyle}
    >
      <View style={styles.modalContainer}>
        {isRateus && (
          <Image style={styles.itemLogo} source={resources.FOOD_IMAGE} />
        )}
        <View style={styles.descriptionVw}>{children}</View>
        <View style={styles.bottomButtonContainer}>
          <ConfirmButton
            theme={theme}
            buttonText={leftText}
            onButtonPress={() => leftButtonPress()}
            buttonTextStyle={leftTextStyle}
          />
          <View style={styles.line} />
          <ConfirmButton
            theme={theme}
            buttonText={rightText}
            onButtonPress={() => rightButtonPress()}
            buttonTextStyle={[styles.rightText, rightTextStyle]}
          />
        </View>
      </View>
    </Modal>
  );
};
const Style = (theme) => {
  return StyleSheet.create({
    modalStyle: {
      alignItems: "center",
    },
    modalContainer: {
      borderRadius: 20,
      backgroundColor: theme.white,
      // overflow: "hidden",
      width: width - 60,
    },
    descriptionVw: {
      // paddingHorizontal: 15,
      // paddingVertical: 15,
    },
    bottomButtonContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderTopWidth: 1.5,
      borderTopColor: theme.BORDER_3,
    },
    line: { backgroundColor: theme.BORDER_3, width: 1.5, height: "100%" },
    rightText: {
      color: theme.THEME_RED,
    },
    itemLogo: {
      width: 42,
      height: 42,
      borderRadius: 21,
      position: "absolute",
      top: -10,
      left: -10,
    },
  });
};

export default AlertModal;
