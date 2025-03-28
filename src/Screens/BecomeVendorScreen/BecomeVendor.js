import React, { useEffect, useState } from "react";
import {
  Text,
  useColorScheme,
  View,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import Style from "./Style";
import { LightTheme, DarkTheme } from "../../constants/theme";
import { fontsName, screenTitle, RegEx } from "../../constants";
import resources from "../../constants/resources";
import Header from "../../Components/Header";
import { NavigationBottomButton } from "../../Components/Buttons/NavigationButton";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ValidateInput from "../../Components/Inputs/ValidateInput";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks";
import {
  authSlice,
} from "../../redux-store/auth/authSlice";
import DataShowingModal from "../../Components/Modals/DataShowingModal";
const { usersReset } = authSlice.actions

const BecomeVendor = ({ navigation, route }) => {
  const theme = useColorScheme() === "dark" ? LightTheme : DarkTheme;
  const insets = useSafeAreaInsets();
  const styles = Style(theme, insets);
  const dispatch = useAppDispatch();
  const [isShowError, setShowError] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [becomeVendorData, updateBecomeVendorData] = useState({
    userName: "",
    companyname: "",
    contactnumber: "",
    email: "",
    location: "",
  });

  // Validation Method
  const checkValidation = () => {
    if (becomeVendorData.userName.length === 0) {
      setShowError(true);
      return false;
    } else if (becomeVendorData.companyname.length === 0) {
      setShowError(true);
      return false;
    } else if (
      becomeVendorData.contactnumber.length === 0 ||
      becomeVendorData.contactnumber.length < 10
    ) {
      setShowError(true);
      return false;
    } else if (
      becomeVendorData.email.length === 0 ||
      RegEx.EMAIL.test(becomeVendorData.email) === false
    ) {
      setShowError(true);
      return false;
    }
    return true;
  };

  // Submit Method
  const onSubmit = () => {
    if (checkValidation()) {
      setOpenModal(true);
    }
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <ImageBackground style={{ flex: 1 }} source={resources.BG_IMAGE}>
        <Header
          theme={theme}
          title={"Become a Vendor"}
          isLeftIconShow={true}
          onBackPress={() => {
            navigation.goBack();
          }}
        />
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContainer}
        >

          <ValidateInput
            theme={theme}
            titleText={"Name"}
            value={becomeVendorData.userName}
            onChangeValue={(value) => {
              updateBecomeVendorData({ ...becomeVendorData, userName: value });
            }}
            shouldErrorShow={
              isShowError && becomeVendorData.userName === "" ? true : false
            }
            extraHeaderTxtStyle={{fontSize:17, fontFamily:fontsName.NUNITO_MEDIUM}}
            errorMessage={"Please enter a valid Name"}
          />

          <ValidateInput
            theme={theme}
            titleText={"Company Name"}
            value={becomeVendorData.companyname}
            onChangeValue={(value) => {
              dispatch(usersReset())
              updateBecomeVendorData({ ...becomeVendorData, companyname: value });
            }}
            shouldErrorShow={
              isShowError &&
                (becomeVendorData.companyname.length === 0)
                ? true
                : false
            }
            extraHeaderTxtStyle={{fontSize:17, fontFamily:fontsName.NUNITO_MEDIUM}}
            errorMessage={"Please enter a valid Company name"}
          />

          <ValidateInput
            theme={theme}
            titleText={"Contact Number"}
            value={becomeVendorData.contactnumber}
            maxLength={10}
            keyboardType={"number-pad"}
            onChangeValue={(value) => {
              updateBecomeVendorData({ ...becomeVendorData, contactnumber: value });
            }}
            shouldErrorShow={
              isShowError &&
                (becomeVendorData.contactnumber.length === 0 ||
                  becomeVendorData.contactnumber.length < 10)
                ? true
                : false
            }
            extraHeaderTxtStyle={{fontSize:17, fontFamily:fontsName.NUNITO_MEDIUM}}
            errorMessage={"Please enter a valid Phone Number"}
          />

          <ValidateInput
            theme={theme}
            titleText={"Email"}
            value={becomeVendorData.email}
            onChangeValue={(value) => {
              updateBecomeVendorData({ ...becomeVendorData, email: value });
            }}
            keyboardType={"email-address"}
            shouldErrorShow={
              isShowError &&
                (becomeVendorData.email.length === 0 ||
                  RegEx.EMAIL.test(becomeVendorData.email) === false)
                ? true
                : false
            }
            extraHeaderTxtStyle={{fontSize:17, fontFamily:fontsName.NUNITO_MEDIUM}}
            errorMessage={"Please enter a valid Email address"}
          />

          <ValidateInput
            theme={theme}
            titleText={"Location"}
            value={becomeVendorData.location}
            onChangeValue={(value) => {
              updateBecomeVendorData({ ...becomeVendorData, location: value });
            }}
            isMandatory={false}
            extraHeaderTxtStyle={{fontSize:17, fontFamily:fontsName.NUNITO_MEDIUM}}
            shouldErrorShow={false}
          />
        </KeyboardAwareScrollView>

        <NavigationBottomButton
          theme={theme}
          title={"Submit"}
          containerStyle={{
            height: insets.bottom > 0 ? 70 : 60,
            paddingTop: insets.bottom > 0 ? -10 : -5,
          }}
          extraTitleStyle={{fontSize:20}}
          onButtonPress={() => onSubmit()}
        />
      </ImageBackground>

      {openModal &&
        <DataShowingModal
          theme={theme}
          modalVisible={openModal}
          isFromAccountDetail={true}
          containerStyle={{padding:12 }}
          extraTxtStyle={{textAlign:'center', fontSize:20}}
          subTitle1={'Thank you! '}
          subTitle2={'Our team will contact you for \n further information!'}
          onButtonPress={() => {
            setOpenModal(false);
            navigation.goBack()
          }}
          buttonTitle={"OK"}
        />
      }
    </SafeAreaProvider>
  );
};
export default BecomeVendor;
