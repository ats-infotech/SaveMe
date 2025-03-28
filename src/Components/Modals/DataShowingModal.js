import React from "react";
import { View, Text, StyleSheet,  Dimensions } from "react-native";
import { fontsName } from "../../constants";
import { NavigationButton } from "../Buttons/NavigationButton";
import Modal from "react-native-modal";
const { width } = Dimensions.get("window");

const DataShowingModal = (props) => {
  const {
    theme,
    modalVisible,
    headerTitle,
    buttonTitle,
    onButtonPress,
    totalValue,
    isFromAccountDetail = false,
    subTitle1,
    subTitle2 = '',
    extraTxtStyle,
    containerStyle
  } = props;
  const styles = Style(theme);

  let prefixText;
  if (headerTitle === "Saving") {
    prefixText = "AED";
  } else if (headerTitle === "Bundles") {
    prefixText = "";
  } else if (headerTitle === "Footprints") {
    prefixText = "TONS";
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
        <View style={[styles.descriptionVw, containerStyle]}>
          {isFromAccountDetail ? 
            <>
              <Text style={[styles.subTitleTxt, extraTxtStyle]}>{subTitle1}</Text> 
              {subTitle2 != '' && <Text style={[styles.subTitleTxt, extraTxtStyle]}>{subTitle2}</Text> }
            </>
          :
            <>
            <Text numberOfLines={1} style={styles.descriptionText}>
            {`Total ${headerTitle}`}
          </Text>
          <View style={{flexDirection:"row", alignItems:'center' }}>
            <Text numberOfLines={1} style={[styles.descriptionText, {fontWeight:'800'}]}>
              {totalValue}
            </Text>
            <Text style={[styles.descriptionText,{ fontSize: 10, marginLeft:5 }]}>{prefixText}</Text>
          </View>
          </>
          }
        </View>
        <NavigationButton
          theme={theme}
          title={buttonTitle}
          extraTitleStyle={{fontSize:22}}
          onButtonPress={() => onButtonPress()}
          containerStyle={{ borderRadius: 0, height:55 }}
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
      borderRadius: 25,
      backgroundColor: theme.white,
      overflow: "hidden",
      width: width - 60,
    },
    descriptionVw: {
      alignItems: "center",
      margin: 15,
    },
    logoImage: {
      width: 150,
      alignSelf: "center",
      height: 150,
      resizeMode: "contain",
    },
    descriptionText: {
      color: theme.PRIMARY_GREEN,
      fontSize: 30,
      textAlign: "center",
      fontFamily: fontsName.NUNITO_BOLD,
    },
    subTitleTxt: {
      fontSize:20,
      textAlign: "center",
      fontFamily:fontsName.NUNITO_MEDIUM,
      color:theme.FONT_DARK_VIOLET
    }
  });
};

export default DataShowingModal;
