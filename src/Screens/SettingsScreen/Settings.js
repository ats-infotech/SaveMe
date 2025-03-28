import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  useColorScheme,
  Image,
  ImageBackground,
  Pressable,
  FlatList,
  View
} from "react-native";
import Style from "./Style";
import { LightTheme, DarkTheme } from "../../constants/theme";
import Header from "../../Components/Header";
import resources from "../../constants/resources";
import AlertModal from "../../Components/Modals/AlertModal";
import { deleteAccount, logout } from "../../redux-store/profile/profileSlice";
import { logoutFromApp } from "../../redux-store/auth/authSlice";
import { useAppDispatch } from "../../redux-store/hooks";
import { screenTitle } from "../../constants";
import RequiredModal from "../../Components/Modals/RequiredModal";

const Settings = ({ navigation, route }) => {
  const theme = useColorScheme() === "dark" ? LightTheme : DarkTheme;
  const styles = Style(theme);
  const accountOption = [
    { key: "1", optionTitle: "Change Email" },
    { key: "2", optionTitle: "Change Password" },
    { key: "3", optionTitle: "Change Language" },
    { key: "4", optionTitle: "Become a Vendor" },
    { key: "5", optionTitle: "Delete Account" },
    { key: "6", optionTitle: "Logout" },
  ];
  const [showAlert, setShowAlert] = useState(false)
  const [alertText, setAlertText] = useState(false)
  const [openRequiredModal, setOpenRequiredModal] = useState(false)
  const [currentKey, setCurrentKey] = useState(-1)
  const dispatch = useAppDispatch();

  // Options RenderItem
  const renderAccountOptions = ({ item, index }) => {
    return (
      <Pressable
        style={[
          styles.optionContainer,
          { borderBottomWidth: index === accountOption.length - 1 ? 0 : 1 },
        ]}
        onPress={() => {
          setCurrentKey(item.key)

          if (item.key == "1") {
            setOpenRequiredModal(true)
          } else if (item.key == "2") {
            navigation.navigate(screenTitle.CHANGEPASSWORD, {})            
          } else if (item.key == "4") {
            navigation.navigate(screenTitle.BECOMEVENDOR, {})
          } else if (item.key == "5") {
            setAlertText('Are you sure you want to delete your account?')
            setShowAlert(true)
          } else if (item.key == "6") {
            setAlertText('Are you sure you want to logout?')
            setShowAlert(true)
          }
        }}
      >
        <Text
          style={[
            styles.optionTitleText,
            {
              color:
                index === accountOption.length - 1
                  ? theme.PRIMARY_GREEN
                  : "#3e3f68",
            },
          ]}
          numberOfLines={1}
        >
          {item?.optionTitle}
        </Text>
        {index !== accountOption.length - 1 && (
          <Image style={{ marginRight: 5 }} source={resources.BOLDRIGHTARRAW} />
        )}
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={{ flex: 1 }} source={resources.BG_IMAGE}>
        <Header
          theme={theme}
          title={"Settings"}
          onBackPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.accountTitle} numberOfLines={1}>
          Account
        </Text>
        <FlatList
          data={accountOption}
          bounces={false}
          renderItem={renderAccountOptions}
          showsHorizontalScrollIndicator={false}
        />
       <AlertModal
        theme={theme}
        modalVisible={showAlert}
        leftText={"No"}
        isRateus={false}
        rightText={"Yes"}
        leftTextStyle={{ color: 'black', fontSize:20 }}
        rightTextStyle={{ color: theme.red, fontSize:20 }}
        leftButtonPress={() => {
          setShowAlert(false)}}
          rightButtonPress={() => {
            dispatch(logoutFromApp())
            dispatch(currentKey == '5' ? deleteAccount() : logout())
            setShowAlert(false)
          }}
        >
          <View style={{ paddingHorizontal: 35, paddingVertical: 40, alignItems:'center', justifyContent:'center' }}>
          <Text
            style={[styles.commonText, { textAlign:'center', fontSize:22 }]}
          >
            {alertText}
            </Text>
            </View>
          
      </AlertModal>
      </ImageBackground>
      {openRequiredModal &&
          <RequiredModal 
            theme={theme}
            modalVisible={openRequiredModal}
            title={'Password Require'}
            placeholder={'Password'}
            onConfirm={() => {setOpenRequiredModal(false); navigation.navigate(screenTitle.CHANGEEMAIL, {})}}
            onCancel={() => setOpenRequiredModal(false)}
          />
      }
    </SafeAreaView>
  );
};
export default Settings;
