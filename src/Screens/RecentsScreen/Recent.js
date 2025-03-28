import React, { useState, useCallback, useEffect } from "react";
import {
  useColorScheme,
  View,
  ImageBackground,
  Dimensions,
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
import { recentDashboard, addFavourite } from "../../redux-store/recent/recentSlice";
const { width } = Dimensions.get("window");
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks";
import { useIsFocused } from '@react-navigation/native';
import RateusModal from "../../Components/Modals/Childrens/RateusModal";
import RatingStarModal from "../../Components/Modals/Childrens/RatingStarModal";

const Recent = ({ navigation, route }) => {
  const dispatch = useAppDispatch();
  const theme = useColorScheme() === "dark" ? LightTheme : DarkTheme;
  const styles = Style(theme);
  const insets = useSafeAreaInsets();
  const [searchValue, setSearchValue] = useState("");
  const { recentData } = useAppSelector((state) => state.recent);
  const [reservedData, setReservedData] = useState([]);
  const [isRateusShow, setRateusStatus] = useState(false);
  const [shouldRate, setYourRate] = useState(false);
  const isFocused = useIsFocused();
  let foodItem = route?.params?.foodItem
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(recentDashboard({}));
    if (route?.params?.isFromDetails) {
      console.log("sdkmskdmskdmkdmksd-----", route?.params?.isFromDetails);
      setRateusStatus(true)
    }
  }, [isFocused]);

  useEffect(() => {
    if (recentData != undefined) {
      console.log("smkflmkfdkmdkfm--s-d-s-d-sd-s-", recentData.result);
      setReservedData(recentData?.result?.orders);
    }
  }, [recentData]);

  // RecentFood RenderItem
  const renderRecentFoodDataItem = ({ item, index }) => {
    return (
      <FoodItem
        theme={theme}
        item={item?.bundle}
        status={item?.status}
        isShowRightArraw={false}
        isShowLeftArraw={false}
        extraStyle={{
          marginTop: 20,
          width: width,
        }}
        itemStyle={{ width: width - 45 }}
        isFavourite={item?.bundle?.is_favourite}
        isFromRecent={true}
        onSelectItem={() => {
          // navigation.navigate(screenTitle.FOODDETAIL, { foodItem: item.bundle });
        }}
        onPressFav={() => {
          // setReservedData([]);
          item.bundle.is_favourite = item.bundle.is_favourite == 0 ? 1 : 0;
          dispatch(addFavourite(item?.bundle_id))
          dispatch(recentDashboard({}));
        }}
        imageBackgroundStyle={{
          backgroundColor:
            item?.status === "Collect in"
              ? "rgba(0, 0, 0, 0.40)"
              : "rgba(0, 0, 0, 0.75)",
        }}
      />
    );
  };

  // Pull to Refresh Method
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(recentDashboard({}));
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
            placeHolder={"Search Recent"}
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
            data={reservedData}
            renderItem={renderRecentFoodDataItem}
            bounces={false}
            keyExtractor={(item) => item.key}
          />
        </ScrollView>
      </ImageBackground>

      {isRateusShow && (
        <RateusModal
          theme={theme}
          modalVisible={isRateusShow}
          setModalStatus={setRateusStatus}
          setYourRate={setYourRate}
          navigation={navigation}
        />
      )}

      {shouldRate && (
        <RatingStarModal
          theme={theme}
          modalVisible={shouldRate}
          setModalStatus={setYourRate}
          foodItem={foodItem}
        />
      )}
    </SafeAreaProvider>
  );
};
export default Recent;
