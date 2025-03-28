import React, { useState } from "react";
import {
  Text,
  useColorScheme,
  View,
  Image,
  ImageBackground,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Style from "./Style";
import { LightTheme, DarkTheme } from "../../constants/theme";
import { NavigationBottomButton } from "../../Components/Buttons/NavigationButton";
import Header from "../../Components/Header";
import { fontsName } from "../../constants";
import resources from "../../constants/resources";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import FoodItemInfo from "../../Components/FoodItemInfo";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks";
import ConfirmationModal from "../../Components/Modals/ConfirmationModal";
import DataShowingModal from "../../Components/Modals/DataShowingModal";
import PaymentOptionModal from "../../Components/Modals/PaymentOptionModal";
import {
  homeSlice,
} from "../../redux-store/home/homeSlice";
const { usersReset } = homeSlice.actions

const FoodDetail = ({ navigation, route }) => {
  const theme = useColorScheme() === "dark" ? LightTheme : DarkTheme;
  const styles = Style(theme);
  const insets = useSafeAreaInsets();
  const [isAllergicModalShow, setAllergicModalStatus] = useState(false);
  const { detailData } = useAppSelector((state) => state.home);
  const foodItem = detailData?.result ? detailData?.result[0] : {};
  const [isMailSentConfirm, setMailSentStatus] = useState(false);
  const [isUpdatePasswordSuccess, setPasswordUpdateStatus] = useState(false);
  const [isVendorDataSubmit, setVendorDataSubmitionStatus] = useState(false);
  const [showTotalSaving, setTotalSavingStatus] = useState(false);
  const [isMakeReserve, setReserve] = useState(false);
  const dispatch = useAppDispatch();



  return (
    <SafeAreaProvider style={styles.container}>
      <ImageBackground style={{ flex: 1 }} source={resources.BG_IMAGE}>
        <ScrollView
          bounces={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 15 }}
          showsVerticalScrollIndicator={false}
        >
          <ImageBackground
            source={{ uri: foodItem?.vendor?.picture }}
            // source={{ uri: foodItem?.picture }}
            style={styles.foodImage}
          >
            <Header
              theme={theme}
              isShowTitle={false}
              onBackPress={() => {
                navigation.goBack();
              }}
              headerStyle={{ marginTop: insets.bottom > 0 ? insets.top : 40 }}
              isRightIconShow={true}
              onRightIconPress={() => {
                navigation.goBack();
              }}
              showButtonColor={true}
            />
            <Text style={styles.totalLeft} numberOfLines={1}>
              { foodItem?.quantity + ' Left'}
            </Text>
          </ImageBackground>
          <FoodItemInfo theme={theme} foodItem={foodItem} />
          <View style={[styles.addressContainer, styles.commonBorderView]}>
            <Image style={{ marginRight: 5 }} source={resources.LOCATION} />
            <Text style={styles.addressText}>
              Center Point, Street 02, Dubai, UAE
            </Text>
          </View>
          <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
            <Text
              style={{
                fontFamily: fontsName.NUNITO_MEDIUM,
                fontSize: 15,
                color: theme.FONT_DARK_VIOLET,
              }}
            >
              Package Details
            </Text>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <View style={{ alignItems: "center", width: "38%" }}>
                <Image source={resources.LOGO_LEAF} />
                <View style={styles.packageNameVw}>
                  <Text
                    style={{ color: theme.FONT_DARK_VIOLET, fontSize: 10 }}
                    numberOfLines={1}
                  >
                    Arabic Barbecue
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontFamily: fontsName.NUNITO_REGULAR,
                  color: "#6a6a6a",
                  fontSize: 14,
                  marginLeft: 15,
                  width: "62%",
                }}
              >
               {foodItem?.details}
              </Text>
            </View>
          </View>
          {/* <View style={[styles.commonBorderView, { borderBottomWidth: 0 }]}>
            <View
              style={{
                backgroundColor: "rgba(0,0,0,0.22)",
                borderRadius: 15,
                paddingTop: Platform.OS === "ios" ? 12 : 8,
                paddingBottom: Platform.OS === "ios" ? 12 : 13,
                paddingHorizontal: 13,
              }}
            >
              <TextInputs
                theme={theme}
                styleType={"none"}
                placeHolder={"Please type package ingredient here..."}
                value={ingredientValue}
                onChangeText={(value) => {
                  setIngredientValue(value);
                }}
              />
              <Text
                style={{
                  fontFamily: fontsName.NUNITO_MEDIUM,
                  color: "#ff3b30",
                  fontSize: 8,
                  marginTop: Platform.OS === "ios" ? 7 : 0,
                  marginLeft: Platform.OS === "ios" ? 0 : 3,
                }}
                numberOfLines={1}
              >
                Note:{" "}
                <Text style={{ color: "#3e3f68" }}>
                  This textbox is only enabled for Vendros
                </Text>
              </Text>
            </View>
          </View> */}
          <TouchableOpacity style={styles.commonBorderView} onPress={() => {setAllergicModalStatus(true)}}>
              <Text
                style={[
                  styles.addressText,
                  { color: theme.FONT_DARK_VIOLET, flex: 1 },
                ]}
                numberOfLines={1}
              >
                Ingredient + Important to know
              </Text>
              <Image source={resources.RIGHTARRAW} />
          </TouchableOpacity>
          {/* <View
            style={[
              styles.horizontalCenter,
              {
                marginVertical: 30,
                backgroundColor: "#ff3b30",
                paddingVertical: 3,
              },
            ]}
          >
            <Image style={{ marginRight: 5 }} source={resources.WATCH} />
            <Text
              style={{
                fontSize: 13,
                fontFamily: fontsName.NUNITO_BOLD,
                color: theme.black,
              }}
              numberOfLines={1}
            >
              30:21 minutes left to reserve
            </Text>
          </View> */}
          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              marginTop:15,
              fontFamily: fontsName.NUNITO_MEDIUM,
              color: theme.FONT_DARK_VIOLET,
            }}
            numberOfLines={1}
          >
            What other thinks
          </Text>
          <View style={styles.ratingVw}>
            <Image style={{ marginRight: 7 }} source={resources.RATESTAR} />
            <Text
              style={{
                fontSize: 11,
                fontFamily: fontsName.NUNITO_REGULAR,
                color: theme.FONT_MEDIUM_BLACK,
              }}
            >
              {foodItem?.vendor?.rate.toFixed(1)} / 5.0
            </Text>
          </View>
          <Text
            style={{
              fontSize: 12,
              textAlign: "center",
              marginVertical: 10,
              fontFamily: fontsName.NUNITO_REGULAR,
              color: theme.FONT_GREEN,
            }}
            numberOfLines={1}
          >
            affordable | delicious | easy pickup
          </Text>
          <View style={[styles.horizontalCenter, { marginTop: 5 }]}>
            <Image source={resources.DOWN_PRICE} />
            <Image
              style={{ marginHorizontal: 50 }}
              source={resources.DELICIOUS_EMOJI}
            />
            <Image source={resources.HAND_SNAP} />
          </View>
          <Pressable style={styles.shareIconVw} onPress={() => {}}>
            <Image style={styles.shareIcon} source={resources.SHARE_ICON} />
          </Pressable>
        </ScrollView>
        <NavigationBottomButton
          theme={theme}
          title={"Reserve"}
          containerStyle={{
            height: insets.bottom > 0 ? 40 : 55,
            paddingTop: insets.bottom > 0 ? 10 : 0,
          }}
          onButtonPress={() => {
            dispatch(usersReset())
            setReserve(true);
            // setMailSentStatus(true);
            // setPasswordUpdateStatus(true);
            // setVendorDataSubmitionStatus(true);
            // setTotalSavingStatus(true);
          }}
        />
        {insets.bottom > 0 && (
          <View
            style={{
              height: insets.bottom,
              backgroundColor: theme.PRIMARY_GREEN,
            }}
          />
        )}
        {isMakeReserve && (
          <PaymentOptionModal
            theme={theme}
            modalVisible={isMakeReserve}
            setModalStatus={setReserve}
            foodItem={foodItem}
            navigation={navigation}
          />
        )}
        {isAllergicModalShow && (
          <ConfirmationModal
            theme={theme}
            modalVisible={isAllergicModalShow}
            buttonTitle={"Got it"}
            showImage={true}
            descipionText={
              "Please ask the store if you are allergic to specific ingredient while pick up"
            }
            onButtonPress={() => {
              setAllergicModalStatus(false);
            }}
          />
        )}
        {isMailSentConfirm && (
          <ConfirmationModal
            theme={theme}
            modalVisible={isMailSentConfirm}
            buttonTitle={"OK"}
            descipionText={
              "We have sent you a confirmation Email Please click on that link"
            }
            onButtonPress={() => {
              setMailSentStatus(false);
            }}
          />
        )}
        {isUpdatePasswordSuccess && (
          <ConfirmationModal
            theme={theme}
            modalVisible={isUpdatePasswordSuccess}
            buttonTitle={"OK"}
            descipionText={"Successfully Changed"}
            onButtonPress={() => {
              setPasswordUpdateStatus(false);
            }}
          />
        )}
        {isVendorDataSubmit && (
          <ConfirmationModal
            theme={theme}
            modalVisible={isVendorDataSubmit}
            buttonTitle={"OK"}
            descipionText={`Thank You!\nOur team will contact you for further information!`}
            onButtonPress={() => {
              setVendorDataSubmitionStatus(false);
            }}
          />
        )}
        {showTotalSaving && (
          <DataShowingModal
            theme={theme}
            modalVisible={showTotalSaving}
            headerTitle={"Saving"}
            totalValue={"120"}
            onButtonPress={() => {
              setTotalSavingStatus(false);
            }}
            buttonTitle={"OK"}
          />
        )}
      </ImageBackground>
    </SafeAreaProvider>
  );
};
export default FoodDetail;
