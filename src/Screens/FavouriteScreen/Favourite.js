import React, { useState, useCallback, useEffect } from "react";
import {
  useColorScheme,
  View,
  ImageBackground,
  Dimensions,
  Text,
  Image,
  FlatList,
  ScrollView,
  RefreshControl
} from "react-native";
import Style from "./Style";
import { LightTheme, DarkTheme } from "../../constants/theme";
import resources from "../../constants/resources";
import SearchInput from "../../Components/Inputs/SearchInput";
import FoodItem from "../../Components/FoodItem";
import { screenTitle } from "../../constants";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
const { width } = Dimensions.get("window");
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks";
import { favouriteDashboard, addFavouriteTab } from "../../redux-store/favourite/favouriteSlice";
import { useIsFocused } from '@react-navigation/native';
import {
  favouriteSlice,
} from "../../redux-store/favourite/favouriteSlice";
const { usersReset } = favouriteSlice.actions

const Favourite = ({ navigation, route }) => {
  const theme = useColorScheme() === "dark" ? LightTheme : DarkTheme;
  const styles = Style(theme);
  const insets = useSafeAreaInsets();
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useAppDispatch();
  const { favouriteData } = useAppSelector((state) => state.favourite);
  const [favData, setFavData] = useState([]);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  

  useEffect(() => {
    dispatch(favouriteDashboard());
  }, [isFocused])

  useEffect(() => {
    if (favouriteData != undefined) {
      console.log("s121212dklfavouriteData----12121", favouriteData.result);
      setFavData(favouriteData.result)
    }
  }, [favouriteData])

  // FoodList RenderItem 
  const renderSaveMeFoodListItem = ({ item, index }) => {

    return (
      <FoodItem
        theme={theme}
        item={item?.bundle}
        isShowRightArraw={false}
        isShowLeftArraw={false}
        extraStyle={{
          marginTop: 20,
          width: width,
        }}
        itemStyle={{ width: width - 45 }}
        isFromFavourite={true}
        onPressFav={() => {
          item.bundle.is_favourite = item.bundle.is_favourite == 0 ? 1 : 0;
          dispatch(usersReset()),
            // setFavData([]);
          dispatch(addFavouriteTab(item?.bundle_id)),
            setTimeout(() => {
              dispatch(favouriteDashboard());
            }, 500)
        }}
        onSelectItem={() => {
          // navigation.navigate(screenTitle.FOODDETAIL, { foodItem: item });
        }}
      />
    );
  };

    // Pull to Refresh Method
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      dispatch(favouriteDashboard());
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);

  return (
    <SafeAreaProvider style={styles.container}>
      <ImageBackground style={{ flex: 1 }} source={resources.BG_IMAGE}>
        <View style={{ height: insets.top, backgroundColor: theme.white }} />
        <View style={{ backgroundColor: theme.white }}>
          <SearchInput
            theme={theme}
            placeHolder={"Search Favourite"}
            searchValue={searchValue}
            isShowRightIcon={false}
            onChangeSearchText={(value) => {
              setSearchValue(value);
            }}
            extraStyle={{ marginHorizontal: 25 }}
          />
        </View>

        <ScrollView
          style={styles.subContainer}
          contentContainerStyle={{ paddingBottom: 15 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <FlatList
            data={favData}
            renderItem={renderSaveMeFoodListItem}
            bounces={false}
            keyExtractor={(item) => item.key}
          />
        </ScrollView>
      </ImageBackground>
    </SafeAreaProvider>
  );
};
export default Favourite;
