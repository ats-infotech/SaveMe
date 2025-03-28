import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import resources from "../constants/resources";
import { fontsName } from "../constants";
import FoodItemInfo from "./FoodItemInfo";
const { width } = Dimensions.get("window");

const FoodItem = (props) => {
  const {
    theme,
    item,
    mainItem,
    extraStyle,
    itemStyle,
    status,
    imageBackgroundStyle,
    isShowLeftArraw = false,
    isShowRightArraw = false,
    onSelectItem,
    isFavourite = 0,
    isFromFavourite = false,
    isFromRecent = false,
    showLastChance = false,
    onPressFav,
  } = props;
  const styles = Style(theme);

  return (
    <View
      style={[
        { flexDirection: "row", alignItems: "center", width: width },
        extraStyle,
      ]}
    >
      <Pressable style={{ padding: 5 }}>
        {isShowLeftArraw ? (
          <Image
            style={[styles.rightNavigationArraw]}
            source={resources.BACK}
          />
        ) : (
          <View style={{ height: 12, width: 12 }} />
        )}
      </Pressable>
      
      <Pressable
        style={[styles.itemContainer, itemStyle]}
        onPress={onSelectItem}
      >
        <ImageBackground
          style={{ width: "100%", height: 180, resizeMode: "contain" }}
          source={{ uri: mainItem?.picture }}
          // source={{ uri: item?.picture }}
        >
          <View
            style={[
              {
                flex: 1,
                justifyContent: "space-between",
                paddingVertical: 12,
                backgroundColor: "rgba(0, 0, 0, 0.22)",
              },
              imageBackgroundStyle,
            ]}
          >
            {status !== "Not Collected" && (
              <Text
                style={styles.totalLeft}
                numberOfLines={1}
              >{`${item?.quantity} Left`}</Text>
            )}
            {!isFromRecent && !isFromFavourite && showLastChance && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: theme.white,
                  paddingHorizontal: 5,
                  paddingVertical: 3,
                  borderRadius: 3,
                  position: "absolute",
                  right: 12,
                  top: 12,
                }}
              >
                <Image
                  style={{ height: 12, width: 12, resizeMode: "contain" }}
                  source={resources.WATCH}
                />
                <Text
                  style={{
                    marginLeft: 5,
                    color: "#ff3b30",
                    fontSize: 13,
                    fontFamily: fontsName.NUNITO_BOLD,
                  }}
                  numberOfLines={1}
                >
                  Last chance
                </Text>
              </View>
            )}
            {isFromRecent && (
              <View style={{ flex: 1, justifyContent: "center" }}>
                <View
                  style={{
                    backgroundColor:
                      status === "Collect In"
                        ? "rgba(0, 0, 0, 0.50)"
                        : "transparent",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        color:
                          status === "Collect In" ||
                          status === "Collected"
                            ? theme.PRIMARY_LIGHT_GREEN
                            : "#ff3b30",
                        fontFamily: fontsName.NUNITO_BOLD,
                        fontSize: status === "Collect In" ? 18 : 24,
                      }}
                    >
                      {status === "Collect In"
                        ? "Collect In"
                        : status === "Collected"
                        ? "Collected"
                        : "Not Collected"}
                    </Text>
                    {status === "Collect In" && (
                      <Text
                        style={{
                          color: theme.PRIMARY_LIGHT_GREEN,
                          fontFamily: fontsName.NUNITO_BOLD,
                          fontSize: 14,
                          marginTop: -3,
                        }}
                      >
                        13 minutes
                      </Text>
                    )}
                  </View>
                  <Image
                    style={{
                      height: 24,
                      width: 24,
                      resizeMode: "contain",
                      marginLeft: 5,
                    }}
                    source={
                      status === "Collect In"
                        ? resources.PENDING
                        : status === "Collected"
                        ? resources.COLLECTED
                        : resources.NOCOLLECTED
                    }
                  />
                </View>
              </View>
            )}
            {status !== "Not Collected" && (
              <View style={[styles.whiteRound, { left: 12 }]}>
                <Image
                  style={{ width: 40, height: 45, resizeMode: "contain" }}
                  source={{uri: mainItem?.logo}}
                  // source={resources.SAVEMETEXT}
                />
              </View>
            )}
            {(isFromFavourite || isFromRecent) && (
              <TouchableOpacity
                style={[
                  styles.whiteRound,
                  {
                    right: 12,
                    backgroundColor: item.isFav ? theme.white : "transparent",
                  },
                ]}
                onPress={() => {onPressFav()}}
              >
                <Image
                  style={[
                    styles.bookMarkIcon,
                    !isFromFavourite && isFavourite == 0 && { tintColor: theme.white },
                    // !isFromFavourite && { tintColor: theme.white },
                  ]}
                  source={
                    isFavourite == 0 && ! isFromFavourite
                      ? resources.BOOKMARK
                      : resources.ACTIVE_BOOKMARK
                  }
                />
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>
        <FoodItemInfo theme={theme} foodItem={item} />
      </Pressable>
      <Pressable style={{ padding: 5 }}>
        {isShowRightArraw ? (
          <Image
            style={[styles.rightNavigationArraw]}
            source={resources.RIGHTARRAW}
          />
        ) : (
          <View style={{ height: 12, width: 12 }} />
        )}
      </Pressable>
    </View>
  );
};
const Style = (theme) => {
  return StyleSheet.create({
    itemContainer: {
      // width: "90%",
      borderRadius: 7,
      // marginHorizontal:20,
      overflow: "hidden",
      backgroundColor: theme.white,
    },
    bottomContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 17,
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
    },
    commonText: {
      fontSize: 17,
      fontFamily: fontsName.NUNITO_REGULAR,
      color: theme.FONT_DARK_VIOLET,
    },
    pickupText: {
      color: theme.FONT_LIGHT_VIOLET,
      fontSize: 12,
      fontFamily: fontsName.NUNITO_REGULAR,
      marginTop: 3,
    },
    totalLeft: {
      color: theme.PRIMARY_GREEN,
      backgroundColor: theme.white,
      paddingHorizontal: 15,
      paddingVertical: 3,
      borderRadius: 3,
      overflow: "hidden",
      fontFamily: fontsName.NUNITO_REGULAR,
      fontSize: 12,
      position: "absolute",
      top: 12,
      left: 12,
    },
    rightNavigationArraw: {
      height: 12,
      width: 12,
      resizeMode: "contain",
    },
    whiteRound: {
      width: 50,
      backgroundColor: theme.white,
      alignItems: "center",
      overflow: "hidden",
      justifyContent: "center",
      height: 50,
      borderRadius: 25,
      position: "absolute",
      bottom: 12,
    },
    bookMarkIcon: { width: 15, height: 20, resizeMode:"contain" },
  });
};

export default FoodItem;
