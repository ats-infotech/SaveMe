import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity,Alert, Platform } from "react-native";
import resources from "../../constants/resources";
import SignUpButtons from "../Buttons/SignUpButtons";
import ConfirmationModal from "./ConfirmationModal";
import RateusModal from "./Childrens/RateusModal";
import CardPayment from "./Childrens/CardPayment";
import {
  API_URL,
  API_URL_STR,
  fontsName,
  screenTitle,
  STR_PUBLCI_KEY,
} from "../../constants";
import AlertModal from "./AlertModal";
import {
  StripeProvider,
  CardField,
  initStripe,
  useStripe,
  CardFormView,
  ApplePay,
} from "@stripe/stripe-react-native";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks";
import { homeDashboard, payViaCash } from "../../redux-store/home/homeSlice";
import FullScreenRouteModal from "./FullScreenRouteModal";
import RatingStarModal from "./Childrens/RatingStarModal";
import { useGooglePay, useApplePay, createGooglePayPaymentMethod,ApplePayButton} from '@stripe/stripe-react-native';

export function PaymentScreen() {
  const { confirmPayment } = useStripe();
  console.log("sdmksdmskqq==q=q=q-w-w-w-w--w-e=e=e==-ss");
  return (
    <CardField
      postalCodeEnabled={true}
      placeholders={{
        number: "4242 4242 4242 4242",
      }}
      cardStyle={{
        backgroundColor: "#FFFFFF",
        textColor: "#000000",
      }}
      style={{
        width: "100%",
        height: 50,
        marginVertical: 30,
      }}
      onCardChange={(cardDetails) => {
        console.log("cardDetails", cardDetails);
      }}
      onFocus={(focusedField) => {
        console.log("focusField", focusedField);
      }}
    />
  );
}

const PaymentOptionModal = (props) => {
  const { theme, modalVisible, setModalStatus, foodItem, navigation} = props;
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const styles = Style(theme);
  const [isPickupModalShow, setPickupModalStatus] = useState(false);
  const [isRateusShow, setRateusStatus] = useState(false);
  const [isCardPayment, setCardPaymentStatus] = useState(false);
  const [shouldRate, setYourRate] = useState(false);
  const dispatch = useAppDispatch();
  const { payViaCashData } = useAppSelector((state) => state.home);
  const {
    isGooglePaySupported,
    initGooglePay,
  } = useGooglePay();
  const {
    presentApplePay,
    confirmApplePayPayment,
    isApplePaySupported,
  } = useApplePay();
  
  const paymetOptions = [
    {
      key: "1",
      optionName: "Pay via Card Online",
      optionIcon: <Image source={resources.CREDITCARD} />,
      onOptionSelect: () => {
        cardMethod();
      },
    },
    {
      key: "2",
      optionName: Platform.OS == 'ios' ? "Apple Pay" : "Google Pay",
      optionIcon: <Image source={Platform.OS == 'ios' ? resources.APPLEPAY : resources.GOOGLE_ICON} />,
      onOptionSelect: () => {Platform.OS == 'ios' ? pay() : checkGoogleAPI()},
    },
    {
      key: "3",
      optionName: "Pay Cash upon Pickup",
      optionIcon: <Image source={resources.CASH_MONEY} />,
      onOptionSelect: () => {
        cashMethod();
        // setPickupModalStatus(true);
      },
    },
  ];

  useEffect( async() => {
    const { error } = await initGooglePay({
      testEnv: true,
      merchantName: 'merchant.com.saveme',
      countryCode: 'US',
      billingAddressConfig: {
        format: 'FULL',
        isPhoneNumberRequired: true,
        isRequired: false,
      },
      existingPaymentMethodRequired: false,
      isEmailRequired: true,
    });

    if (error) {
      console.log("Init-----",error.message);
      // Alert.alert(error.code, error.message);
      return;
    }
  }, []);

  const pay = async () => {
    if (!isApplePaySupported) {
      Alert.alert('Apple Pay is not supported.');
    }
    const { error } = await presentApplePay({
      cartItems: [{ label: foodItem?.title, amount: foodItem?.discounted_price+ '.00', paymentType: 'Immediate' }],
      country: 'US',
      currency: 'aed',
      // shippingMethods: [
      //   {
      //     amount: '20.00',
      //     identifier: 'DPS',
      //     label: 'Courier',
      //     detail: 'Delivery',
      //   },
      // ],
      // requiredShippingAddressFields: ['emailAddress', 'phoneNumber'],
      // requiredBillingContactFields: ['phoneNumber', 'name'],
    });
    if (error) {
      console.log("kdskmsdksmdks----a-d--f-f-g-f",error);
      // handle error
    }
    // ...
  };


  const checkGoogleAPI = async () => {
    if (!(await isGooglePaySupported({ testEnv: false }))) {
      Alert.alert('Google Pay is not supported.');
      return;
    }

    console.log("skdjksdjsk-----");
    
    const { error, paymentMethod } = await createGooglePayPaymentMethod({
      amount: 12,
      currencyCode: 'USD',
    });

    if (error) {
      // Alert.alert(error.code, error.message);
      console.log("googlePay----",error.message);
      return;
    } else if (paymentMethod) {
      Alert.alert(
        'Success',
        `The payment method was created successfully. paymentMethodId: ${paymentMethod.id}`
      );
    }
    
  }

  // Card Method
  const cardMethod = () => {
    setCardPaymentStatus(true);
  };

  // Cash Method
  const cashMethod = () => {
    console.log("sdksmdksmdksmd---",foodItem);
    let data = {};
    data.bundle_id = foodItem?.id;
    dispatch(payViaCash(data));
  };

  useEffect(() => {
    if (payViaCashData != undefined) {
      if (payViaCashData?.status) {
        setPickupModalStatus(true);
      }
    }
  }, [payViaCashData]);

  // PaymentSheetParams Method
  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/payment-sheet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  // InitializePayment Method
  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer, publishableKey } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      // merchantDisplayName: "SaveMe",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: "Jane Doe",
      },
      applePay: {
        merchantCountryCode: 'US',
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  // OpenPayment Method 
  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "Your order is confirmed!");
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  // const fetchPaymentIntentClientSecret = async () => {
  //   const response = await fetch(`${API_URL_STR}/create-payment-intent`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       currency: 'AED',
  //     }),
  //   });

  //   console.log("1111sdmsdsmdks----",response);
  //   const {clientSecret} = await response.json();

  //   return clientSecret;
  // };

  // const handlePayPress = async () => {
  //   // if (!card) {
  //   //   return;
  //   // }

  //   // Fetch the intent client secret from the backend.
  //   const clientSecret = await fetchPaymentIntentClientSecret();
  //   console.log("smdlsdmsldm=====",clientSecret);
  // };
  const payAPPLE = async () => {
    if (!isApplePaySupported) return;
    // ...
    const { paymentMethod, error } = await presentApplePay({
      cartItems: [{ label: 'Example item name', amount: '14.00', paymentType: 'Immediate' }],
      country: 'US',
      currency: 'USD',
      shippingMethods: [
        {
          amount: '20.00',
          identifier: 'DPS',
          label: 'Courier',
          detail: 'Delivery',
        },
      ],
      requiredShippingAddressFields: ['emailAddress', 'phoneNumber'],
      requiredBillingContactFields: ['phoneNumber', 'name'],
    });
    console.log("response----", paymentMethod, error)
    if (error) {
      // handle error
    }
    // ...
  };

  return (
    <FullScreenRouteModal
      theme={theme}
      modalVisible={modalVisible}
      setModalStatus={setModalStatus}
      headerTitle={""}
      // headerTitle={"Select payment"}
      navigation={navigation}
    >
      <View style={{ marginTop: "45%" }}>
        {paymetOptions.map((item, index) => {
          return (
            <SignUpButtons
              theme={theme}
              title={item.optionName}
              icon={item.optionIcon}
              containerStyle={{
                marginHorizontal: 32,
                marginTop: index === 0 ? 0 : 35,
              }}
              titleStyle={{ textAlign: "center", marginLeft:0 }}
              onPress={() => {
                item?.onOptionSelect();
              }}
            />
          );
        })}
        {/* <ApplePayButton
          onPress={payAPPLE}
          type="plain"
          buttonStyle="black"
          borderRadius={4}
          style={{
            width: '100%',
            height: 50,
          }}
        /> */}
        {/* <CardField
              postalCodeEnabled={true}
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
                marginVertical: 30,
              }}
              onCardChange={(cardDetails) => {
                console.log('cardDetails', cardDetails);
              }}
              onFocus={(focusedField) => {
                console.log('focusField', focusedField);
              }}
            />
            <TouchableOpacity onPress={() => {openPaymentSheet()}}>
              <Text>Buy now </Text>
            </TouchableOpacity> */}
      </View>
      {isPickupModalShow && (
        <ConfirmationModal
          theme={theme}
          modalVisible={isPickupModalShow}
          buttonTitle={"OK"}
          onButtonPress={() => {
            // setRateusStatus(true);
            setPickupModalStatus(false);
            navigation.navigate(screenTitle.RECENTSCREEN, { screen: screenTitle.RECENT, params: { isFromDetails: true,foodItem:foodItem } });
            setTimeout(() => {
              navigation.pop(2)
            },2000)
          }}
          descipionText={"Thank you for saving the Earth!"}
          showBottomText={true}
          bottomHeader={"Pickup time"}
          bottomInfoText={`${foodItem.pickup_day} ${foodItem?.pickup_time_from} - ${foodItem?.pickup_time_to}`}
        />
      )}
      {/* {isRateusShow && (
        <RateusModal
          theme={theme}
          modalVisible={isRateusShow}
          setModalStatus={setRateusStatus}
          setYourRate={setYourRate}
        />
      )}
      {shouldRate && (
        <RatingStarModal
          theme={theme}
          modalVisible={shouldRate}
          setModalStatus={setYourRate}
        />
      )} */}
      {isCardPayment && (
        <CardPayment
          theme={theme}
          modalVisible={isCardPayment}
          setModalStatus={setCardPaymentStatus}
          foodItem={foodItem}
          navigation={navigation}
        />
      )}
    </FullScreenRouteModal>
  );
};
const Style = (theme) => {
  return StyleSheet.create({
    commonTexts: {
      fontSize: 20,
      fontFamily: fontsName.NUNITO_REGULAR,
      color: theme.FONT_DARK_VIOLET,
      textAlign: "center",
    },
  });
};

export default PaymentOptionModal;
