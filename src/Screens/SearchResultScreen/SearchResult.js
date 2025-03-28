import React, { useState } from "react";
import {
  useColorScheme,
  ImageBackground,
  Dimensions,
  ScrollView,
  FlatList,
  RefreshControl
} from "react-native";
import Style from "./Style";
import { LightTheme, DarkTheme } from "../../constants/theme";
import resources from "../../constants/resources";
import SingleLineTitle from "../../Components/Texts/SingleLineTitle";
import Header from "../../Components/Header";
import FoodItem from "../../Components/FoodItem";
import { screenTitle } from "../../constants";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import ImageCarousel from "../../Components/ImageCarousel";
const { width } = Dimensions.get("window");
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks";

const SearchResult = ({ navigation, route }) => {
  const theme = useColorScheme() === "dark" ? LightTheme : DarkTheme;
  const styles = Style(theme);
  const insets = useSafeAreaInsets();
  const [saveMeActiveIndex, setSaveMeActiveIndex] = useState(0);
  const [nearbyActiveIndex, setNearbyActiveIndex] = useState(0);
  const { searchDataValue } = useAppSelector((state) => state.recent);
  const [refreshing, setRefreshing] = useState(false);

  // allHomeData RenderItem 
  const handleCarousel = (item) => {
    return item?.vendors?.length > 0 && (
      <>
        <SingleLineTitle
          theme={theme}
          title={item.name}
          extraStyle={[styles.titleText, { marginTop: 15 }]}
        />
        <ImageCarousel
          theme={theme}
          data={item?.vendors[0]?.available_bundles}
          renderComponent={(item, index) => {
            return (
              <FoodItem
                theme={theme}
                item={item}
                extraStyle={{ justifyContent: "center"}}
                itemStyle={styles.carouselItemStyle}
                showLastChance={false}
                onSelectItem={() => {
                  navigation.navigate(screenTitle.FOODDETAIL, {
                    foodItem: item,
                  });
                }}
                isShowRightArraw={
                  nearbyActiveIndex === index &&
                  index !== searchDataValue?.result[0]?.vendors[0]?.available_bundles.length - 1
                    ? true
                    : false
                }
                isShowLeftArraw={
                  nearbyActiveIndex === index && index !== 0 ? true : false
                }
              />
            );
          }}
          onSnapToItem={(index) => {
            setSaveMeActiveIndex(index);
          }}
        />
      </>
    )
  }
    // Pull to Refresh Method
  const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
  }, []);

  return (
    <SafeAreaProvider style={styles.container}>
      <ImageBackground style={{ flex: 1 }} source={resources.BG_IMAGE}>
        <Header
          theme={theme}
          title={"Search Result"}
          headerStyle={{ marginTop: insets.top }}
          onBackPress={() => {
            navigation.goBack();
          }}
          isRightIconShow={true}
          onRightIconPress={() => {
            navigation.goBack();
          }}
        />
        <ScrollView
          style={styles.subContainer}
          contentContainerStyle={{ paddingVertical: 15 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {searchDataValue?.result.map(item => { return handleCarousel(item) })}
        </ScrollView>
        {/* <ScrollView
          style={styles.subContainer}
          contentContainerStyle={{ paddingVertical: 15 }}
          showsVerticalScrollIndicator={false}
        > */}
          {/* <SingleLineTitle
            theme={theme}
            title={"Save me before it's too late"}
            extraStyle={[styles.titleText,{marginTop:15}]}
          /> */}
          {/* <ImageCarousel
            theme={theme}
            data={foodListSaveMe}
            renderComponent={(item, index) => {
              return (
                <FoodItem
                  theme={theme}
                  item={item}
                  extraStyle={{ justifyContent: "center" }}
                  itemStyle={styles.carouselItemStyle}
                  showLastChance={true}
                  onSelectItem={() => {
                    navigation.navigate(screenTitle.FOODDETAIL, {
                      foodItem: item,
                    });
                  }}
                  isShowRightArraw={
                    saveMeActiveIndex === index &&
                    index !== foodListSaveMe.length - 1
                      ? true
                      : false
                  }
                  isShowLeftArraw={
                    saveMeActiveIndex === index && index !== 0 ? true : false
                  }
                />
              );
            }}
            onSnapToItem={(index) => {
              setSaveMeActiveIndex(index);
            }}
          /> */}

          {/* <SingleLineTitle
            theme={theme}
            title={"Nearby Restaurants"}
            extraStyle={styles.titleText}
          /> */}

          {/* <ImageCarousel
            theme={theme}
            data={searchDataValue.result[0].vendors[0]?.available_bundles}
            // data={foodNearRestaurants}
            renderComponent={(item, index) => {
              return (
                <FoodItem
                  theme={theme}
                  item={item}
                  extraStyle={{ justifyContent: "center" }}
                  itemStyle={styles.carouselItemStyle}
                  onSelectItem={() => {
                    navigation.navigate(screenTitle.FOODDETAIL, {
                      foodItem: item,
                    });
                  }}
                  isShowRightArraw={
                    nearbyActiveIndex === index &&
                    index !== foodNearRestaurants.length - 1
                      ? true
                      : false
                  }
                  isShowLeftArraw={
                    nearbyActiveIndex === index && index !== 0 ? true : false
                  }
                />
              );
            }}
            onSnapToItem={(index) => {
              setNearbyActiveIndex(index);
            }}
          /> */}

          {/* <FlatList 
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
            contentContainerStyle={{paddingBottom:30}}
            data={searchDataValue?.result[0]?.vendors[0]?.available_bundles}
            renderItem={({item, index}) => {
              return (
                <FoodItem
                  theme={theme}
                  item={item}
                  extraStyle={{ justifyContent: "center", marginTop:15 }}
                  itemStyle={styles.carouselItemStyle}
                  onSelectItem={() => {
                    navigation.navigate(screenTitle.FOODDETAIL, {
                      foodItem: item,
                    });
                  }}
                  isShowRightArraw={
                    nearbyActiveIndex === index &&
                    index !== searchDataValue?.result[0]?.vendors[0]?.available_bundles.length - 1
                      ? true
                      : false
                  }
                  isShowLeftArraw={
                    nearbyActiveIndex === index && index !== 0 ? true : false
                  }
                />
              );
            }}
          /> */}

        {/* </ScrollView> */}
      </ImageBackground>
    </SafeAreaProvider>
  );
};
export default SearchResult;
