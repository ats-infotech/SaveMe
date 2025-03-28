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
import SignUpButtons from "../../Components/Buttons/SignUpButtons";
import resources from "../../constants/resources";
import Header from "../../Components/Header";
import { NavigationBottomButton } from "../../Components/Buttons/NavigationButton";
import { NavigationButton } from "../../Components/Buttons/NavigationButton";
import {
    SafeAreaProvider,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import TextInputs from "../../Components/Inputs/TextInputs";
import DataShowingModal from "../../Components/Modals/DataShowingModal";

const ChangePassword = ({ navigation, route }) => {
    const theme = useColorScheme() === "dark" ? LightTheme : DarkTheme;
    const insets = useSafeAreaInsets();
    const styles = Style(theme, insets);
    const [isShowError, setShowError] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [changePwdData, updateChangePwdData] = useState({
        currentpassword: "",
        newpassword: "",
        confirmnewpassword: "",
    });

    // Validation Method
    const checkValidation = () => {
        if (
            changePwdData.currentpassword.length === 0 ||
            changePwdData.currentpassword.length < 6
        ) {
            setShowError(true);
            return false;
        } else if (
            changePwdData.newpassword.length === 0 ||
            changePwdData.newpassword.length < 6 ||
            changePwdData.newpassword.length != changePwdData.confirmnewpassword.length ||
            changePwdData.newpassword != changePwdData.confirmnewpassword ||
            changePwdData.currentpassword == changePwdData.newpassword
        ) {
            setShowError(true);
            return false;
        } else if (
            changePwdData.confirmnewpassword.length === 0 ||
            changePwdData.confirmnewpassword.length < 6 ||
            changePwdData.confirmnewpassword.length != changePwdData.newpassword.length ||
            changePwdData.confirmnewpassword != changePwdData.newpassword 
        ) {
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
                    title={"Change Password"}
                    onBackPress={() => {
                        navigation.goBack();
                    }}
                />
                <KeyboardAwareScrollView
                    style={{ flex: 1, marginHorizontal:20 }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollViewContainer}
                >

                    <TextInputs
                        theme={theme}
                        value={changePwdData.currentpassword}
                        placeHolder={"Current Password"}
                        leftIcon={
                            <Image
                                style={{ width: 15, height: 20 }}
                                source={resources.PASSWORD}
                            />
                        }
                        rightIcon={
                            <Image
                                style={{ width: 18, height: 12 }}
                                source={resources.SHOWPASSWORD}
                            />
                        }
                        isShowRightIcon={false}
                        isShowLeftIcon={true}
                        extraStyle={{ marginTop: 30 }}
                        onChangeText={(value) => {
                            updateChangePwdData({ ...changePwdData, currentpassword: value });
                        }}
                    />
                    {isShowError && (changePwdData.currentpassword === "" || changePwdData.currentpassword.length < 6) && (
                        <Text style={styles.errorText} numberOfLines={1}>
                            {changePwdData.currentpassword === "" ? 
                                "Please enter valid password"
                            :  changePwdData.currentpassword.length < 6 && "Minimum 6 characters required" }
                        </Text>
                    )}
                    <TextInputs
                        theme={theme}
                        value={changePwdData.newpassword}
                        placeHolder={"New Password"}
                        leftIcon={
                            <Image
                                style={{ width: 15, height: 20 }}
                                source={resources.PASSWORD}
                            />
                        }
                        rightIcon={
                            <Image
                                style={{ width: 18, height: 12 }}
                                source={resources.SHOWPASSWORD}
                            />
                        }
                        isShowRightIcon={false}
                        isShowLeftIcon={true}
                        extraStyle={{ marginTop: 100 }}
                        onChangeText={(value) => {
                            updateChangePwdData({ ...changePwdData, newpassword: value });
                        }}
                    />
                    {isShowError && (
                        <Text style={styles.errorText} numberOfLines={1}>
                            {(changePwdData.newpassword === "" || changePwdData.currentpassword === changePwdData.newpassword)? 
                                "Please enter valid password"
                            :  changePwdData.newpassword.length < 6 && "Minimum 6 characters required" }
                        </Text>
                    )}
                    <TextInputs
                        theme={theme}
                        value={changePwdData.confirmnewpassword}
                        placeHolder={"Confirm New Password"}
                        leftIcon={
                            <Image
                                style={{ width: 15, height: 20 }}
                                source={resources.PASSWORD}
                            />
                        }
                        rightIcon={
                            <Image
                                style={{ width: 18, height: 12 }}
                                source={resources.SHOWPASSWORD}
                            />
                        }
                        isShowRightIcon={false}
                        isShowLeftIcon={true}
                        onChangeText={(value) => {
                            updateChangePwdData({ ...changePwdData, confirmnewpassword: value });
                        }}
                    />
                    {isShowError && (
                        <Text style={styles.errorText} numberOfLines={1}>
                            {(changePwdData.confirmnewpassword === "" || changePwdData.confirmnewpassword != changePwdData.newpassword)? 
                                "Please enter valid password"
                            :  changePwdData.confirmnewpassword.length < 6 && "Minimum 6 characters required" }
                        </Text>
                    )}
                </KeyboardAwareScrollView>

                <NavigationButton
                    theme={theme}
                    title={"Update"}
                    extraTitleStyle={{fontSize:20}}
                    containerStyle={{ marginVertical: 30, marginHorizontal: 20 }}
                    onButtonPress={onSubmit}
                />
            </ImageBackground>
            {openModal &&
                <DataShowingModal
                    theme={theme}
                    modalVisible={openModal}
                    containerStyle={{padding:15}}
                    extraTxtStyle={{textAlign:'center', fontSize:22}}
                    subTitle1={"Successfully Changed"}
                    isFromAccountDetail={true}
                    onButtonPress={() => {
                        setOpenModal(false);
                        navigation.goBack();
                    }}
                    buttonTitle={"OK"}
                />
            }
        </SafeAreaProvider>
    );
};
export default ChangePassword;
