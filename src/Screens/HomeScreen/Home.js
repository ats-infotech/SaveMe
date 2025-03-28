import React, { useEffect, useState } from "react";
import {
  useColorScheme,
  View,
  ImageBackground,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
  RefreshControl
} from "react-native";
import Style from "./Style";
import { LightTheme, DarkTheme } from "../../constants/theme";
import resources from "../../constants/resources";
import SingleLineTitle from "../../Components/Texts/SingleLineTitle";
import SearchInput from "../../Components/Inputs/SearchInput";
import FoodItem from "../../Components/FoodItem";
import { screenTitle } from "../../constants";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import ImageCarousel from "../../Components/ImageCarousel";
import { NavigationButton } from "../../Components/Buttons/NavigationButton";
const { width } = Dimensions.get("window");
import { homeDashboard, getAllTypes, getLastHourtypes, getDetailsBundle, onGlobalSearch } from "../../redux-store/home/homeSlice";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks";
import { useIsFocused } from '@react-navigation/native';
import HowItWorks from "../../Components/HowItWorks";
import LoaderComponent from "../../Components/LoaderComponent";

const Home = ({ navigation, route }) => {
  const theme = useColorScheme() === "dark" ? LightTheme : DarkTheme;
  const styles = Style(theme);
  const insets = useSafeAreaInsets();
  const [searchValue, setSearchValue] = useState("");
  const [saveMeActiveIndex, setSaveMeActiveIndex] = useState(0);
  const [homeAllData, setHomeData] = useState([]);
  const [allTypesData, setAllTypesData] = useState([]);
  const [lastTypesData, setLastTypesData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [openWorkModal, setOpenworkModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loader, setLoader] = useState(true);
  const dispatch = useAppDispatch();
  const { homeData, alltypesData, lasttypesData, globalSearchData } = useAppSelector((state) => state.home);
  const isFocused = useIsFocused();
  const { loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    setTimeout(() => {
      dispatch(homeDashboard({}));
      dispatch(getAllTypes({}));
      dispatch(getLastHourtypes({}));
    }, 1500)
  }, [isFocused]);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1500);
  }, [])

  useEffect(() => {
    if (homeData != undefined) {
      setHomeData(homeData.result);
    }
  }, [homeData]);

  useEffect(() => {
    if (globalSearchData != undefined && searchValue.length > 0) {
      // console.log("sdknskdnksd-s-ds--ds-ds-d-sd-s-d-fd",globalSearchData?.data?.result);
      setSearchedData(globalSearchData?.data?.result);
    }
  }, [globalSearchData]);

  useEffect(() => {
    if (alltypesData != undefined) {
      setAllTypesData(alltypesData.result)
    }
  }, [alltypesData]);

  useEffect(() => {
    if (lasttypesData != undefined) {
      setLastTypesData(lasttypesData.result)
    }
  }, [lasttypesData]);

  // Pull to Refresh Method
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    homeAllData
    allTypesData
    lastTypesData
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  // allHomeData RenderItem 
  const handleCarousel = (item) => {
    let mainItem = item.vendors[0];
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
                mainItem={mainItem}
                extraStyle={{ justifyContent: "center" }}
                itemStyle={styles.carouselItemStyle}
                showLastChance={false}
                onSelectItem={() => {
                  dispatch(getDetailsBundle(item))
                  navigation.navigate(screenTitle.FOODDETAIL, {});
                }}
                isShowRightArraw={
                  homeAllData?.length > 1 &&
                    saveMeActiveIndex === index &&
                    index !== homeAllData?.length - 1
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
        />
      </>
    )
  }

  // lastTypesData RenderItem
  const handleLastCarousel = (item) => {
    return (
      <>
        <SingleLineTitle
          theme={theme}
          title={'Save me before its too late'}
          extraStyle={[styles.titleText, { marginTop: 15 }]}
        />
        <ImageCarousel
          theme={theme}
          data={item}
          renderComponent={(item, index) => {
            return (
              <FoodItem
                theme={theme}
                item={item}
                extraStyle={{ justifyContent: "center" }}
                itemStyle={styles.carouselItemStyle}
                showLastChance={true}
                onSelectItem={() => {
                  dispatch(getDetailsBundle(item))
                  navigation.navigate(screenTitle.FOODDETAIL, {});
                }}
                isShowRightArraw={
                  homeAllData?.length > 1 &&
                    saveMeActiveIndex === index &&
                    index !== homeAllData?.length - 1
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
        />
      </>
    );
  };

  // allTypesData RenderItem
  const handleCarouselTypes = (item) => {
    return item?.available_bundles?.length > 0 && (
      <>
        <SingleLineTitle
          theme={theme}
          title={item.title}
          extraStyle={[styles.titleText, { marginTop: 15 }]}
        />
        <ImageCarousel
          theme={theme}
          data={item?.available_bundles}
          renderComponent={(item, index) => {
            return (
              <FoodItem
                theme={theme}
                item={item}
                extraStyle={{ justifyContent: "center" }}
                itemStyle={styles.carouselItemStyle}
                showLastChance={false}
                onSelectItem={() => {
                  dispatch(getDetailsBundle(item))
                  navigation.navigate(screenTitle.FOODDETAIL, {});
                }}
                isShowRightArraw={
                  homeAllData?.length > 1 &&
                    saveMeActiveIndex === index &&
                    index !== homeAllData?.length - 1
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
        />
      </>
    )
  }

  //Search Method
  const onSeachValue = (searchText) => {
    dispatch(onGlobalSearch(searchText));
  }


  return (
    <SafeAreaProvider style={styles.container}>
      {loader ?
        <LoaderComponent
          theme={theme}
          modalVisible={loader}
        />
        :
        <ImageBackground style={{ flex: 1 }} source={resources.BG_IMAGE}>
          <View style={{ height: insets.top, backgroundColor: theme.white }} />
          <View style={{ backgroundColor: theme.white }}>
            <SearchInput
              theme={theme}
              placeHolder={"Search"}
              searchValue={searchValue}
              isShowRightIcon={true}
              rightIcon={
                <Image
                  source={resources.FILTER_SEARCH}
                  style={styles.filterIcon}
                />
              }
              onChangeSearchText={(value) => {
                onSeachValue(value)
                setSearchValue(value);
              }}
              onRightIconPress={() => {
                navigation.navigate(screenTitle.CATEGORYFILTER);
              }}
              extraStyle={{ marginHorizontal: 25 }}
            />
          </View>

          <ScrollView
            style={styles.subContainer}
            contentContainerStyle={{ paddingVertical: 15 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {searchValue.length > 0 ?
              <FlatList
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
                contentContainerStyle={{ paddingBottom: 30 }}
                data={searchedData}
                renderItem={({ item, index }) => {
                  return (
                    <>
                      <SingleLineTitle
                        theme={theme}
                        title={item.name}
                        extraStyle={[styles.titleText, { marginTop: 15 }]}
                      />
                      <FlatList
                        theme={theme}
                        data={item?.vendors[0]?.available_bundles}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                          return (
                            <FoodItem
                              theme={theme}
                              item={item}
                              extraStyle={{ justifyContent: "center" }}
                              itemStyle={[styles.carouselItemStyle, { marginTop: 15 }]}
                              showLastChance={false}
                              onSelectItem={() => {
                                dispatch(getDetailsBundle(item))
                                navigation.navigate(screenTitle.FOODDETAIL, {});
                              }}
                              isShowRightArraw={
                                homeAllData?.length > 1 &&
                                  saveMeActiveIndex === index &&
                                  index !== searchedData?.length - 1
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
                      />
                    </>
                  );
                }}
              />
              :
              <>
                {lastTypesData?.length > 0 && handleLastCarousel(lastTypesData)}


                {allTypesData?.map(item => { return handleCarouselTypes(item) }
                )}

                <NavigationButton
                  theme={theme}
                  title={"How its work"}
                  containerStyle={{ marginHorizontal: 40, marginVertical: 20 }}
                  onButtonPress={() => {
                    setOpenworkModal(true)
                  }}
                />
                {homeAllData?.map(item => { return handleCarousel(item) })}
              </>}
          </ScrollView>
        </ImageBackground>
      }

      {openWorkModal &&
        <HowItWorks
          theme={theme}
          navigation={navigation}
          isFromHome={true}
          setOpenWorkModal={setOpenworkModal}
        />
      }
    </SafeAreaProvider>
  );
};
export default Home;
