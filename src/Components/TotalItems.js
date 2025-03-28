import React, { useState } from "react";
import { StyleSheet, Dimensions, Text, Pressable, View, Image } from "react-native";
import resources from "../constants/resources";
import { fontsName } from '../constants';

const { width } = Dimensions.get("window");

const TotalItems = (props) => {
  const { theme, item, isFromBundles=false, index } = props;
  const styles = Style(theme);
  
  return (
    <Pressable
        style={[styles.horizontal, styles.savingItemContainer]}
        onPress={() => {}}
      >
        <View
          style={[
            styles.horizontal,
            {
              backgroundColor: "#f8f9ff",
            },
          ]}
        >
        <Image style={styles.foodImage} source={{ uri: item?.bundle?.picture }} />
        <Image style={styles.tagImage} source={{ uri: item?.bundle?.vendor?.picture }} />
          <View
            style={[
              styles.horizontal,
              {
                flex: 1,
                paddingHorizontal: 10,
              },
            ]}
          >
            <View style={[styles.infoContainer, {width:isFromBundles? '80%' : '74%'}]}>
              <Text numberOfLines={1} style={styles.titleText}>
               {item?.bundle?.title}
              </Text>
              <Text
                numberOfLines={1}
                style={[
                  styles.infoTexts,
                  {
                    marginTop: 5,
                  },
                ]}
              >
                Picked Up on
              </Text>
              <Text numberOfLines={1} style={styles.infoTexts}>
                {item?.bundle?.pickup_date} at {item?.bundle?.pickup_time_from}
              </Text>
            </View>
            {isFromBundles ?
                <View style={{backgroundColor:theme.PRIMARY_GREEN, padding:6, borderRadius:20}}>
                    <Text style={{color:theme.white, fontFamily:fontsName.NUNITO_BOLD, fontSize:16, fontWeight:'800'}}>{item?.count}</Text>
                </View>
            :    
                <View style={{ width: "25%" }}>
              <View style={styles.valueVw}>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.valueTexts,
                    {
                      textDecorationLine: "line-through",
                    },
                  ]}
                >
                  {item?.bundle?.actual_price}
                </Text>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.titleText,
                    {
                      fontSize: 10,
                      marginLeft: 3,
                    },
                  ]}
                >
                  AED
                </Text>
              </View>
              <Text numberOfLines={1} style={styles.valueTexts}>
              {item?.bundle?.saving} <Text style={{ fontSize: 10 }}>AED</Text>
              </Text>
              <Text
                numberOfLines={1}
                style={[
                  styles.titleText,
                  {
                    color: theme.PRIMARY_GREEN,
                  },
                ]}
              >
                {item?.bundle?.discounted_price} <Text style={{ fontSize: 10 }}>AED</Text>
              </Text>
                </View>
            }
          </View>
        </View>
      </Pressable>
  );
};
const Style = (theme) => {
  return StyleSheet.create({
    horizontal: {
        flexDirection: "row",
        alignItems: "center",
    },
    savingItemContainer: {
        marginTop: 20,
    },
    titleText:{
        fontSize: 18,
        fontFamily: fontsName.NUNITO_BOLD,
        color: theme.FONT_DARK_VIOLET,
    },
    valueTexts:{
        fontSize: 17,
        fontFamily: fontsName.NUNITO_REGULAR,
        color: "#6a6a6a",
    },
    valueVw:{ 
        flexDirection: "row", 
        alignItems: "flex-end" 
    },
    infoTexts:{
        fontSize: 13,
        fontFamily: fontsName.NUNITO_REGULAR,
        color: theme.FONT_LIGHT_VIOLET,
    },
    foodImage: { 
        width: 145, 
        height: 110, 
        borderRadius: 10,
    },
    tagImage: { 
        width: 42, 
        height: 42, 
        borderRadius: 21, 
        marginLeft: -21 
    },
    infoContainer:{ 
        marginRight: "1%" 
    },
  });
};

export default TotalItems;
