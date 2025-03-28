import React from "react";
import { View, Text, StyleSheet,  Dimensions, Image, Pressable } from "react-native";
import { fontsName } from "../../constants";
import { NavigationButton } from "../Buttons/NavigationButton";
import resources from "../../constants/resources";
import Modal from "react-native-modal";
const { width } = Dimensions.get("window");
import TextInputs from "../Inputs/TextInputs";


const RequiredModal = (props) => {
  const {
    theme,
    modalVisible,
    title,
    placeholder,
    onCancel,
    onConfirm
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
        <View style={{paddingHorizontal:15, paddingTop:15}}>
        <Text style={styles.titleTxt}>{title}</Text> 
        <TextInputs 
            theme={theme}
            // value={changePwdData.currentpassword}
            placeHolder={placeholder}
            leftIcon={
                <Image
                    style={{ width: 15, height: 20 }}
                    source={resources.PASSWORD}
                />
            }
            isShowLeftIcon={true}
            extraStyle={{ marginTop: 20 }}
            onChangeText={(value) => {
            }}
        />
        </View>
        <View style={styles.dividerVw} />
        <View style={{flexDirection:"row", alignItems:"center", height:60}}>
            <Pressable onPress={() => {onCancel()}}
             style={[styles.optionVw, {borderRightWidth:1, borderRightColor:theme.BORDER_3}]}>
                <Text style={styles.optionTxt}>Cancel</Text>
            </Pressable>
            <Pressable onPress={() => {onConfirm()}}
                style={styles.optionVw}>
                <Text style={[styles.optionTxt, {color:theme.red}]}>Confirm</Text>
            </Pressable>
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
      borderRadius: 25,
      backgroundColor: theme.white,
      overflow: "hidden",
      width: width - 60,
    },
    titleTxt: {
      fontSize:20,
      textAlign: "center",
      fontFamily:fontsName.NUNITO_MEDIUM,
      color:theme.FONT_DARK_VIOLET
    },
    dividerVw:{
        height:1, 
        width:'100%', 
        marginTop:25,
        backgroundColor:theme.BORDER_3, 
    },
    optionVw: {
        width:'50%', 
        justifyContent:"center",
        height:'100%',         
    },
    optionTxt: {
        textAlign:"center", 
        color:theme.FONT_DARK_VIOLET, 
        fontSize:20, 
        fontWeight:'800', 
        fontFamily:fontsName.NUNITO_BOLD
    }
  });
};

export default RequiredModal;
