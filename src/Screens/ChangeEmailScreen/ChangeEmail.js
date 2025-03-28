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
import { NavigationButton } from "../../Components/Buttons/NavigationButton";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import TextInputs from "../../Components/Inputs/TextInputs";
import DataShowingModal from '../../Components/Modals/DataShowingModal';

const ChangeEmail = ({ navigation, route }) => {
  const theme = useColorScheme() === "dark" ? LightTheme : DarkTheme;
  const insets = useSafeAreaInsets();
  const styles = Style(theme, insets);
  const [email, setEmail] = useState('');
  const [isShowError, setShowError] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // Validation Method
  const checkValidation = () => {
    if ( email.length === 0 || RegEx.EMAIL.test(email) === false ) {
      setShowError(true);
      return false;
    }
    return true;
  };

  // Submit Method
  const onSubmit = () => {
    if (checkValidation()) {
      setOpenModal(true)
    }
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <ImageBackground style={{ flex: 1 }} source={resources.BG_IMAGE}>
        <Header
          theme={theme}
          title={"Change Email"}
          onBackPress={() => {
            navigation.goBack();
          }}
        />
        <KeyboardAwareScrollView
          style={{ flex: 1, paddingTop: 30, }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContainer}
        >

          <Text style={styles.textStyle}> Please enter your new Email </Text>
          <Text style={[styles.textStyle, { width: '95%' }]}> We will be sending a confirmation link </Text>

          <TextInputs
            theme={theme}
            value={email}
            placeHolder={'New Email'}
            leftIcon={
              <Image
                style={{ width: 18, height: 12 }}
                source={resources.EMAIL}
              />
            }
            isShowLeftIcon={true}
            extraStyle={{ marginTop: 100 }}
            onChangeText={(value) => {
              setEmail(value)
            }}
          />

          {isShowError && (
            <Text style={styles.errorText} numberOfLines={1}>
              {"Please enter valid email address"}
            </Text>
          )}
        </KeyboardAwareScrollView>

        <NavigationButton
          theme={theme}
          title={'Done'}
          onButtonPress={() => { onSubmit() }}
          extraTitleStyle={{fontSize:20}}
          containerStyle={{ marginVertical: 25, marginHorizontal: 20 }}
        />
      </ImageBackground>

      {openModal &&
        <DataShowingModal
          theme={theme}
          modalVisible={openModal}
          isFromAccountDetail={true}
          containerStyle={{padding:10 }}
          extraTxtStyle={{textAlign:'center', width:'80%', fontSize:22}}
          subTitle1={'We have sent you a confirmation Email Please click on that link '}
          onButtonPress={() => {
            setOpenModal(false);
            // navigation.navigate(screenTitle.LOGIN, {});
            navigation.goBack
          }}
          buttonTitle={"OK"}
        />
      }

    </SafeAreaProvider>
  );
};
export default ChangeEmail;
