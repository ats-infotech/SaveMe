import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import resources from "../../constants/resources";
import Modal from "react-native-modal";
import Header from "../Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { fontsName, screenTitle } from "../../constants";

const FullScreenRouteModal = (props) => {
  const { theme, modalVisible, setModalStatus, headerTitle, children,navigation } = props;
  const insets = useSafeAreaInsets();
  const styles = Style(theme, insets);

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
        <ImageBackground style={styles.bgImage} source={resources.BG_IMAGE}>
          <View style={styles.bgImage}>
            <Header
              theme={theme}
              title={headerTitle}
              titleStyle={{ fontFamily: fontsName.NUNITO_BOLD }}
              isRightIconShow={true}
              onRightIconPress={() => {
                setModalStatus(false);
                navigation.navigate(screenTitle.FOODHOME);
              }}
              onBackPress={() => {
                setModalStatus(false);
              }}
              headerStyle={styles.headerStyle}
            />
            {children}
          </View>
        </ImageBackground>
      </View>
    </Modal>
  );
};
const Style = (theme, insets) => {
  return StyleSheet.create({
    modalStyle: {
      margin: 0,
    },
    modalContainer: {
      height: "100%",
      width: "100%",
      backgroundColor: theme.white,
    },
    bgImage: {
      flex: 1,
    },
    headerStyle: {
      marginTop: insets.top + 5,
    },
  });
};

export default FullScreenRouteModal;
