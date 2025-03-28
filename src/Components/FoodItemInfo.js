import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { fontsName } from "../constants";

const FoodItemInfo = (props) => {
  const { theme, foodItem } = props;
  const styles = Style(theme);
  return (
    <View style={styles.bottomContainer}>
      <View style={{ width: "85%" }}>
        <Text style={styles.commonText} numberOfLines={1}>
          {foodItem?.title}
        </Text>
        <Text
          style={styles.pickupText}
          numberOfLines={1}
        >{`Pickup ${foodItem?.pickup_day} ${foodItem?.pickup_time_from} - ${foodItem?.pickup_time_to}`}</Text>
      </View>
      <View style={{ alignItems: "flex-end"}}>
        <View style={{ flexDirection: "row",  }}>
          <Text style={[styles.commonText, styles.aedText, {fontWeight:'700'}]} numberOfLines={1}>
          {foodItem?.actual_price}
          </Text>
          <Text style={[styles.commonText, { fontSize: 11 }]} numberOfLines={1}>
            {' '}AED
          </Text>
        </View>
        <View style={{ flexDirection: "row",  }}>
        <Text
          style={[styles.commonText
            ,
            { color: theme.PRIMARY_GREEN, fontWeight:'700'},
          ]}
          numberOfLines={1}
        >
          {foodItem?.discounted_price} </Text>
          <Text style={[styles.commonText, { fontSize: 11, color: theme.PRIMARY_GREEN }]}>
            AED
        </Text>
        </View>
      </View>
    </View>
  );
};
const Style = (theme) => {
  return StyleSheet.create({
    bottomContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 17,
      backgroundColor: theme.white
    },
    commonText: {
      fontSize: 17,
      fontFamily: fontsName.NUNITO_MEDIUM,
      color: theme.FONT_DARK_VIOLET,
      // fontWeight : Platform.OS === 'ios' ? 'normal' :'700'
    },
    pickupText: {
      color: theme.FONT_LIGHT_VIOLET,
      fontSize: 13,
      fontFamily: fontsName.NUNITO_REGULAR,
      marginTop: 7,
    },
    aedText: { textDecorationLine: "line-through" },
  });
};

export default FoodItemInfo;
