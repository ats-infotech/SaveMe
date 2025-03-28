import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Pressable,
  Text,
  Image,
  FlatList,
  Alert,
} from "react-native";
import resources from "../../../constants/resources";
import { CLIENT_SECRET, fontsName, RegEx, screenTitle } from "../../../constants";
import Modal from "react-native-modal";
import Header from "../../Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  NavigationBottomButton,
  NavigationButton,
} from "../../Buttons/NavigationButton";
import ValidateInput from "../../Inputs/ValidateInput";
import SingleLineTitle from "../../Texts/SingleLineTitle";
import { Dropdown } from "react-native-element-dropdown";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAppDispatch, useAppSelector } from "../../../redux-store/hooks";
import {
  homeSlice,
  payViaCard,
  stripePayment
} from "../../../redux-store/home/homeSlice";
import ConfirmationModal from "../ConfirmationModal";
const { usersReset } = homeSlice.actions;
import { CardField, useStripe, initStripe } from '@stripe/stripe-react-native';
import { STRIPE_PUBLCI_KEY } from '../../../constants';
import LoaderComponent from "../../LoaderComponent";

const CardPayment = (props) => {
  const { theme, modalVisible, setModalStatus, foodItem,navigation } = props;
  const insets = useSafeAreaInsets();
  const {confirmPayment} = useStripe();
  const dispatch = useAppDispatch();
  const styles = Style(theme, insets);
  const [isShowCardList, setShowCardList] = useState(false);
  const { payViaCardData, reservedData,loading } = useAppSelector(
    (state) => state.home
  );
  const [cardData, updateCardData] = useState({
    cardNumber: "",
    cardHolderName: "",
    expiryMonthValue: "",
    expiryMonthLabel: "",
    expiryYearValue: "",
    expiryYearLabel: "",
    cvvNumber: "",
  });


  console.log("edeer-----",foodItem);
 
  const cardOptions = [
    {
      key: "1",
      cardIcon: resources.PAYPAL_LOGO,
      cardHolderId: "myself@me.com",
      cardDate: "Added 15-02-2017",
    },
    {
      key: "2",
      cardIcon: resources.VISA_LOGO,
      cardHolderId: "**** **** **** 2475",
      cardDate: "Expires 10-19",
    },
    {
      key: "3",
      cardIcon: resources.MASTERCARD_LOGO,
      cardHolderId: "**** **** **** 8956",
      cardDate: "",
    },
  ];

  const [cardSelectedId, selectCardId] = useState(1);
  const [isPickupModalShow, setPickupModalStatus] = useState(false);
  const [cardNumberError, setCardNumberError] = useState(false);
  const [holderNameError, setHolderNameError] = useState(false);
  const [expiryMonthError, setExpiryMonthError] = useState(false);
  const [expiryYearError, setExpirYearError] = useState(false);
  const [cvvNumberError, setCvvNumberError] = useState(false);


  // Validation Method
  const validateInput = () => {
    if (cardData.cardNumber.length < 16) {
      setCardNumberError(true);
    } 

    if (cardData.cardHolderName.length === 0) {
      setHolderNameError(true);
    } 
    
    if (cardData.expiryMonthValue.length === 0) {
      setExpiryMonthError(true);
    } 

    if (cardData.expiryYearValue.length === 0) {
      setExpirYearError(true);
    } 

    if (cardData.cvvNumber.length < 3) {
      setCvvNumberError(true);
    } 
    // if (cardNumberError || holderNameError || expiryMonthError || expiryYearError || cvvNumberError) {
    //   return false;
    // } 
    // return true;
  };

  // BottomButton Method
  const onBottomButtonPress = async () => {
    // if (isShowCardList) {
    //   let data = {};
    //   data.fullName = cardData.cardHolderName;
    //   data.cardNumber = cardData.cardNumber;
    //   data.month = cardData.expiryMonthLabel;
    //   data.year = cardData.expiryYearLabel;
    //   data.cvv = cardData.cvvNumber;
    //   data.reserve_id = foodItem?.id;
    //   dispatch(payViaCard(data));
    // } else {
    //   if (validateInput()) {
    //     setShowCardList(true);
    //   }
    //   // setPickupModalStatus(true);
    // }
    const billingDetails = {
      amount: foodItem?.discounted_price,
      // automatic_payment_methods : {
      //   enabled: "true"
      // },
      // currency: 'USD',
      // customer: 'cus_MyRD2FiXz6olfX'
    };
    const billingStripe = {
      email: 'test@test.com'
      // automatic_payment_methods : {
      //   enabled: "true"
      // },
      // currency: 'USD',
      // customer: 'cus_MyRD2FiXz6olfX'
    };

    // Fetch the intent client secret from the backend
    const payementResponse = await dispatch(stripePayment(billingDetails));

    console.log("sdmksmksa-a-a-a-a-a-aa---v-v-v-v-", payementResponse.payload.data.paymentIntent);
    if (payementResponse?.payload?.data) {
         // Confirm the payment with the card details
    const {paymentIntent, error} = await confirmPayment(payementResponse.payload.data?.paymentIntent, {
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingStripe,
      },
    });

    if (error) {
      console.log('Payment confirmation error', error.message);
      Alert.alert("",error)
    } else if (paymentIntent) {
      let data = {
        bundle_id: foodItem?.id,
        payment_method: 'Pay Via Card'
      }
      setTimeout(() => {
        setPickupModalStatus(true);
      },500)
      dispatch(payViaCard(data));
      console.log('Success from promise', paymentIntent);
    } 
    }
  };

  // useEffect(() => {
  //   async function initialize() {
  //     await initStripe({
  //       publishableKey: STRIPE_PUBLCI_KEY,
  //     });
  //   }
  //   initialize().catch(console.error);
  // }, [])

  useEffect(() => {
    if (payViaCardData != undefined) {
      if (payViaCardData.status) {
        console.log("msdksmlslowoko------", payViaCardData);
        let data = {};
        data.bundle_id = "1";
        setPickupModalStatus(true);
      }
    }
  }, [payViaCardData]);

  // Close Method
  const onBackorClose = () => {
    if (isShowCardList) {
      setShowCardList(false);
    } else {
      setModalStatus(false);
    }
  };

  // CardOptions RenderItem
  const renderCardOptions = ({ item, index }) => {
    return (
      <View style={styles.cardOptionsContainer}>
        <View style={[styles.rowCommonVw]}>
          <Image source={item?.cardIcon} />
          <Pressable
            style={{ position: "absolute", right: 0 }}
            onPress={() => {
              selectCardId(index);
            }}
          >
            <Image
              style={{ width: 27, height: 27 }}
              source={
                cardSelectedId === index
                  ? resources.COLLECTED
                  : resources.BORDER_CIRCLE
              }
            />
          </Pressable>
        </View>
        <Text
          style={{
            color: "#a7adb4",
            fontSize: 16,
            fontFamily: fontsName.NUNITO_REGULAR,
            marginVertical: 30,
          }}
          numberOfLines={1}
        >
          {item?.cardHolderId}
        </Text>
        <Text
          style={{
            color: "#c8cfd6",
            fontSize: 10,
            fontFamily: fontsName.NUNITO_REGULAR,
            marginBottom: 15,
          }}
          numberOfLines={1}
        >
          {item?.cardDate}
        </Text>
      </View>
    );
  };

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
          <Header
            theme={theme}
            isShowTitle={false}
            isRightIconShow={true}
            onRightIconPress={() => onBackorClose()}
            onBackPress={() => onBackorClose()}
            headerStyle={styles.headerStyle}
          />
          {isShowCardList ? (
            <FlatList
              data={cardOptions}
              contentContainerStyle={{
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
              showsVerticalScrollIndicator={false}
              renderItem={renderCardOptions}
            />
          ) : (
            // <KeyboardAwareScrollView
            //   style={styles.subContainer}
            //   showsVerticalScrollIndicator={false}
            //   bounces={false}
            //   enableOnAndroid
            // >
            //   <Pressable style={[styles.rowCommonVw, styles.cardVw]}>
            //     <Image source={resources.VISA_LOGO} />
            //     <Image
            //       style={{ width: 25, height: 25, resizeMode: "cover" }}
            //       source={resources.COLLECTED}
            //     />
            //   </Pressable>
            //   <NavigationButton
            //     theme={theme}
            //     title="Scan Card"
            //     onButtonPress={() => {}}
            //     containerStyle={{ borderRadius: 10, marginTop: 50 }}
            //   />
            //   <SingleLineTitle
            //     theme={theme}
            //     title="OR"
            //     extraStyle={{
            //       fontSize: 16,
            //       textAlign: "center",
            //       marginVertical: 10,
            //     }}
            //   />
            //   <ValidateInput
            //     theme={theme}
            //     styleType="secondary"
            //     value={cardData.cardData}
            //     placeHolder="CARD NUMBER"
            //     onChangeValue={(value) => {
            //       setCardNumberError(false);
            //       updateCardData({ ...cardData, cardNumber: value });
            //     }}
            //     containerStyle={{ marginTop: 5 }}
            //     maxLength={16}
            //     keyboardType={"number-pad"}
            //     isMandatory={false}
            //     shouldErrorShow={cardNumberError}
            //     errorMessage={"Please enter valid Card Number"}
            //   />
            //   <ValidateInput
            //     theme={theme}
            //     styleType="secondary"
            //     value={cardData.cardHolderName}
            //     placeHolder={"CARDHOLDER'S NAME"}
            //     onChangeValue={(value) => {
            //       setHolderNameError(false);
            //       updateCardData({ ...cardData, cardHolderName: value });
            //     }}
            //     containerStyle={{ marginVertical: 30 }}
            //     isMandatory={false}
            //     shouldErrorShow={holderNameError}
            //     errorMessage={"Please enter valid Card Holder Name"}
            //   />
            //   <View style={styles.rowCommonVw}>
            //     <Dropdown
            //       data={cardMonthData}
            //       labelField="label"
            //       valueField="value"
            //       placeholder="MM"
            //       placeholderStyle={styles.dropDownPlaceHolderText}
            //       selectedTextStyle={styles.dropDownPlaceHolderText}
            //       itemTextStyle={styles.dropDownPlaceHolderText}
            //       value={cardData.expiryMonthValue}
            //       onChange={(item) => {
            //         setExpiryMonthError(false);
            //         updateCardData({
            //           ...cardData,
            //           expiryMonthLabel: item.label,
            //           expiryMonthValue: item.value,
            //         });
            //       }}
            //       showsVerticalScrollIndicator={false}
            //       style={[styles.dropdownStyle, { width: "30%" }]}
            //     />
            //     <Dropdown
            //       data={cardYearData}
            //       labelField="label"
            //       valueField="value"
            //       placeholder="YYYY"
            //       placeholderStyle={styles.dropDownPlaceHolderText}
            //       selectedTextStyle={styles.dropDownPlaceHolderText}
            //       itemTextStyle={styles.dropDownPlaceHolderText}
            //       value={cardData.expiryYearValue}
            //       onChange={(item) => {
            //         setExpirYearError(false);
            //         updateCardData({
            //           ...cardData,
            //           expiryYearLabel: item.label,
            //           expiryYearValue: item.value,
            //         });
            //       }}
            //       showsVerticalScrollIndicator={false}
            //       style={[
            //         styles.dropdownStyle,
            //         { width: "33%", marginLeft: "2%" },
            //       ]}
            //     />
            //     <ValidateInput
            //       theme={theme}
            //       styleType="secondary"
            //       value={cardData.cvvNumber}
            //       placeHolder="CVV"
            //       onChangeValue={(value) => {
            //         setCvvNumberError(false);
            //         updateCardData({ ...cardData, cvvNumber: value });
            //       }}
            //       keyboardType={"number-pad"}
            //       maxLength={3}
            //       containerStyle={{ width: "32%", marginLeft: "3%" }}
            //       inputExtraStyle={{ marginTop: 0 }}
            //       isMandatory={false}
            //     />
            //   </View>
            //   <View
            //     style={[
            //       styles.rowCommonVw,
            //       { marginTop: 50, marginHorizontal: 10 },
            //     ]}
            //   >
            //     <Pressable
            //       style={[
            //         styles.checkBox,
            //         {
            //           borderColor: shouldSaveCardInfo
            //             ? theme.PRIMARY_LIGHT_GREEN
            //             : "#c3cfe2",
            //         },
            //       ]}
            //       onPress={() => setSaveCardInfo(!shouldSaveCardInfo)}
            //     >
            //       {shouldSaveCardInfo && (
            //         <Image
            //           style={styles.tickRightImage}
            //           source={resources.TICK_RIGHT}
            //         />
            //       )}
            //     </Pressable>
            //     <Text
            //       style={[styles.dropDownPlaceHolderText, styles.rememberMe]}
            //       numberOfLines={1}
            //     >
            //       Save credit card information
            //     </Text>
            //   </View>
            // </KeyboardAwareScrollView>
            <CardField
                postalCodeEnabled={false}
            placeholders={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={{
              backgroundColor: '#FFFFFF',
              textColor: '#000000',
            }}
            style={{
              width: '100%',
              height: 50,
              marginTop:230,
              marginVertical: 30,
            }}
            onCardChange={(cardDetails) => {
              console.log('cardDetails', cardDetails);
            }}
            onFocus={(focusedField) => {
              console.log('focusField', focusedField);
            }}
          />
          )}
          {expiryMonthError && (
            <Text style={styles.errorText} numberOfLines={1}>
              {"Please Select Month"}
            </Text>
          )}
          {expiryYearError && (
            <Text style={styles.errorText} numberOfLines={1}>
              {"Please Select Year"}
            </Text>
          )}
          {cvvNumberError && (
            <Text style={styles.errorText} numberOfLines={1}>
              {"Please enter valid CVV Number"}
            </Text>
          )}
          <NavigationBottomButton
            theme={theme}
            title={isShowCardList ? "Choose" : "Add Payment Method"}
            onButtonPress={() => onBottomButtonPress()}
            containerStyle={{
              height: isShowCardList && insets.bottom > 0 ? 40 : 55,
              paddingTop: isShowCardList && insets.bottom > 0 ? 10 : 0,
              borderRadius: isShowCardList ? 0 : 20,
              marginHorizontal: isShowCardList ? 0 : 10
            }}
          />
          {isShowCardList && insets.bottom > 0 && (
            <View
              style={{
                height: insets.bottom,
                backgroundColor: theme.PRIMARY_GREEN,
              }}
            />
          )}
        </ImageBackground>
        {isPickupModalShow && (
          <ConfirmationModal
            theme={theme}
            modalVisible={isPickupModalShow}
            buttonTitle={"OK"}
            onButtonPress={() => {
              dispatch(usersReset());
              setPickupModalStatus(false);
              // navigation.navigate(screenTitle.RECENTSCREEN, { screen: screenTitle.RECENT, params: { isFromDetails: true,foodItem:foodItem } });
              navigation.navigate(screenTitle.RECENTSCREEN, { screen: screenTitle.RECENT, params: {foodItem:foodItem } });
              setTimeout(() => {
                navigation.pop(2)
              }, 3000)
            }}
            descipionText={'Thank you for saving the Earth!'}
            showBottomText={true}
            bottomHeader={'Pickup time'}
            bottomInfoText={`Tommorrow ${foodItem?.pickup_time_from} - ${foodItem?.pickup_time_to}`}
          />
        )}
      </View>
      {loading &&
        <LoaderComponent 
          theme={theme}
          modalVisible={loading}
        />
      }
    </Modal>
  );
};
const Style = (theme, insets) => {
  return StyleSheet.create({
    modalStyle: {
      margin: 0,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: theme.white,
    },
    bgImage: { flex: 1 },
    subContainer: { flex: 1, paddingHorizontal: 32 },
    headerStyle: {
      marginTop: insets.top + 5,
    },
    rowCommonVw: {
      flexDirection: "row",
      alignItems: "center",
    },
    checkBox: {
      width: 20,
      height: 20,
      borderWidth: 1,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 4,
    },
    tickRightImage: {
      width: 10,
      height: 10,
      resizeMode: "contain",
    },
    rememberMe: {
      marginLeft: 7,
      fontSize: 16,
    },
    dropdownStyle: {
      borderRadius: 15,
      backgroundColor: theme.white,
      height: 55,
      paddingHorizontal: 15,
      borderColor: "#c3cfe2",
      borderWidth: 1,
    },
    dropDownPlaceHolderText: {
      color: theme.black,
      fontSize: 12,
      fontFamily: fontsName.NUNITO_REGULAR,
    },
    cardVw: {
      borderRadius: 15,
      backgroundColor: theme.white,
      paddingHorizontal: 15,
      borderColor: theme.FONT_LIGHT_VIOLET,
      borderWidth: 1,
      paddingVertical: Platform.OS === "ios" ? 20 : 19,
      justifyContent: "space-between",
      marginTop: 30,
    },
    cardOptionsContainer: {
      backgroundColor: theme.white,
      borderRadius: 15,
      ...Platform.select({
        ios: {
          shadowColor: "grey",
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.4,
        },
        android: {
          elevation: 3,
        },
      }),
      padding: 20,
      marginTop: 15,
    },
    commonTexts: {
      fontSize: 20,
      fontFamily: fontsName.NUNITO_REGULAR,
      color: theme.FONT_DARK_VIOLET,
      textAlign: "center",
    },
    errorText: {
      fontSize: 12,
      color: "#ff3b30",
      textAlign: "center",
      fontFamily: fontsName.NUNITO_REGULAR,
    },
  });
};

export default CardPayment;
