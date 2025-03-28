import React, { useState } from "react";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { fontsName } from "../../../constants";
import Modal from "react-native-modal";
import resources from "../../../constants/resources";
import { NavigationBottomButton } from "../../Buttons/NavigationButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../../../redux-store/hooks";
import { rating } from "../../../redux-store/recent/recentSlice";

const RatingStarModal = (props) => {
  const { theme, modalVisible, setModalStatus,foodItem } = props;
  const styles = Style(theme);
  const insets = useSafeAreaInsets();
  const ratingLimit = [1, 2, 3, 4, 5];
  const [ratingValue, setRatingValue] = useState(0);
  const dispatch = useAppDispatch();

  // Rating Method
  const onPressRate = () => {
    let data = {}
    data.vendor_id = foodItem?.vendor_id
    data.rate = ratingValue
    dispatch(rating(data))
  }

  return (
      <Modal
        isVisible={modalVisible}
        animationIn={"fadeInUp"}
        animationOut={"fadeInDown"}
        onBackButtonPress={() => {}}
        onBackdropPress={() => {}}
        style={{ margin: 0, flex: 1, marginTop: insets.top + 5 }}
      >
        <View style={styles.modalContainer}>
          <Pressable
            style={styles.closeImageVw}
            onPress={() => {
              setModalStatus(false);
            }}
          >
            <Image source={resources.CLOSE} style={styles.closeImage} />
          </Pressable>
          <View style={styles.ratingContainer}>
            {ratingLimit.map((item) => {
              return (
                <Pressable onPress={() => setRatingValue(item)}>
                  <Image
                    source={
                      ratingValue >= item
                        ? resources.FILL_RATESTAR
                        : resources.STAR_LINE
                    }
                    style={styles.starImage}
                  />
                </Pressable>
              );
            })}
          </View>
          <Text style={styles.rateText}>Rate your experience</Text>
        </View>
        <NavigationBottomButton
          theme={theme}
          title={"Done"}
        onButtonPress={() => {
            onPressRate()
            setModalStatus(false);
          }}
          containerStyle={{
            height: insets.bottom > 0 ? 40 : 55,
            paddingTop: insets.bottom > 0 ? 10 : 0,
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
      </Modal>
      
  );
};
const Style = (theme) => {
  return StyleSheet.create({
   
    modalContainer: {
      flex: 1,
      justifyContent:'center'
    },
    ratingContainer: {
      backgroundColor: theme.white,
      borderRadius: 15,
      paddingVertical: 15,
      paddingHorizontal: 12,
      flexDirection: "row",
      alignSelf: "center",
    },
    rateText: {
      color: theme.white,
      textAlign: "center",
      fontSize: 16,
      fontFamily: fontsName.NUNITO_REGULAR,
      marginTop: 10,
    },
    closeImageVw: {
      position: "absolute",
      right: 15,
      top: 0,
    },
    closeImage: {
      width: 15,
      height: 20,
      tintColor: theme.white,
    },
    starImage: {
      width: 40,
      height: 40,
      resizeMode: "contain",
      marginHorizontal: 8,
    },
  });
};

export default RatingStarModal;
