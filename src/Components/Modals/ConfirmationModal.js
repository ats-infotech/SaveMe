import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import resources from "../../constants/resources";
import { fontsName } from "../../constants";
import { NavigationButton } from "../Buttons/NavigationButton";
import Modal from "react-native-modal";
const { width } = Dimensions.get("window");

const ConfirmationModal = (props) => {
  const {
    theme,
    modalVisible,
    descipionText,
    buttonTitle,
    onButtonPress,
    showImage = false,
    showBottomText = false,
    bottomHeader,
    bottomInfoText,
  } = props;
  const styles = Style(theme);

  let desciptionTextStyle;
  if (!showBottomText) {
    desciptionTextStyle = [styles.descriptiontext, {width:'88%'}];
  } else {
    desciptionTextStyle = [
      styles.commonTexts,
      { fontFamily: fontsName.NUNITO_BOLD, paddingTop:10 },
    ];
  }
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
        <View style={styles.descriptionVw}>
          {showImage && (
            <Image style={styles.logoImage} source={resources.LOGO_BIG_LEAF} />
          )}
          <Text style={desciptionTextStyle}>{descipionText}</Text>
          {showBottomText && (
            <>
              <Text
                numberOfLines={1}
                style={[styles.commonTexts, { marginTop: 10 }]}
              >
                {bottomHeader}
              </Text>
              <Text
                numberOfLines={2}
                style={[
                  styles.commonTexts,
                  { color: theme.PRIMARY_LIGHT_GREEN },
                ]}
              >
               {bottomInfoText}
              </Text>
            </>
          )}
        </View>
        <NavigationButton
          theme={theme}
          title={buttonTitle}
          onButtonPress={onButtonPress}
          containerStyle={{ borderRadius: 0, height:55, marginTop:1 }}
        />
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
      borderRadius: 30,
      backgroundColor: theme.white,
      overflow: "hidden",
      width: width - 70,
    },
    descriptionVw: {
      alignItems: "center",
      margin: 18,
    },
    logoImage: {
      width: 164,
      alignSelf: "center",
      height: 227,
      resizeMode: "contain",
    },
    descriptiontext: {
      color: theme.FONT_DARK_VIOLET,
      fontSize: 20,
      textAlign: "center",
      fontFamily: fontsName.NUNITO_MEDIUM,
      marginHorizontal: 30,
      paddingVertical: 12,
    },
    commonTexts: {
      fontSize: 20,
      fontFamily: fontsName.NUNITO_REGULAR,
      color: theme.FONT_DARK_VIOLET,
      textAlign: "center",
    },
  });
};

export default ConfirmationModal;
