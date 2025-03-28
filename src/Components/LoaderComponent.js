import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import resources from "../constants/resources";
import { fontsName } from "../constants";
import Modal from "react-native-modal";

const LoaderComponent = (props) => {
  const {
    theme,
    modalVisible,
  } = props;
  const styles = Style(theme);

  return (
    <Modal
      isVisible={modalVisible}
      animationIn={"fadeInUp"}
      animationOut={"fadeInDown"}
      backdropOpacity={0.5}
      onBackButtonPress={() => {}}
      onBackdropPress={() => {}}
      style={styles.modalStyle}
    >
      <View style={styles.modalContainer}>
      <ActivityIndicator size="large" color={theme.white} />
      </View>
    </Modal>
  );
};
const Style = (theme) => {
  return StyleSheet.create({
    modalStyle: {
        margin: 0,
      },
      modalContainer: {
        height: "100%",
        width: "100%",
        alignItems:"center",
        justifyContent:"center",
      },
  });
};

export default LoaderComponent;
