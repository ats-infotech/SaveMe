import React, { useEffect, useState } from "react";
import {
  Text,
  useColorScheme,
  View,
  Image,
  ImageBackground,
  ScrollView,
  FlatList,
  Pressable,
  Dimensions,
  Animated,
  Platform,
} from "react-native";
import Style from "./Style";
import { LightTheme, DarkTheme } from "../../constants/theme";
import Header from "../../Components/Header";
import resources from "../../constants/resources";
import SingleLineTitle from "../../Components/Texts/SingleLineTitle";
import Slider from "@react-native-community/slider";
import { fontsName, screenTitle } from "../../constants";
import { NavigationBottomButton } from "../../Components/Buttons/NavigationButton";
import { searchData } from "../../redux-store/recent/recentSlice";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks";
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { useIsFocused } from '@react-navigation/native';

const { width } = Dimensions.get("window");

const CategoryFilter = ({ navigation, route }) => {
  const theme = useColorScheme() === "dark" ? LightTheme : DarkTheme;
  const styles = Style(theme);
  const insets = useSafeAreaInsets();
  const [distaceValue, setDistanceValue] = useState(15);
  const [array, setArray] = useState([0]);
  const [categoryArray, setCategoryArray] = useState([]);
  const [nearMePlaceIndex, selectNearMePlaceIndex] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useAppDispatch();
  const { homeData } = useAppSelector((state) => state.home);
  const left = distaceValue * (width - 60) / 100 - 175;
  const isFocused = useIsFocused();
  const [position, setPosition] = useState({
    // latitude: 22.654086,
    latitude: 0,
    // longitude: 72.796528,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0
  });
  var arrayData = array
  var categoryDataArray = categoryArray


  useEffect(() => {
    setCategoryArray([]);
    setArray([0]);
  }, [isFocused])

  useEffect(() => {
    Geolocation.getCurrentPosition((pos) => {
      const crd = pos.coords;
      setTimeout(() => {
        setPosition({
          latitude: crd.latitude,
          longitude: crd.longitude,
        });
      }, 500);
    })    
  }, []);

  // Category RenderItem
  const renderCategoryListItem = ({ item, index }) => {
    return (
      <View
        style={{
          width: index === homeData?.result?.length - 1 ? '100%' : "33%",
          marginTop:12
        }}
      >
        <Pressable
          style={styles.categoryContainer}
          onPress={() => {
            setRefresh(!refresh)
            if (arrayData.indexOf(index) > -1) {
              arrayData.splice(arrayData.indexOf(index),1);
            } else {
              arrayData.push(index);
            }
            setArray(arrayData);
            selectNearMePlaceIndex(index);
          }}
        >
          <ImageBackground style={{ flex: 1 }} source={resources.FOOD_IMAGE}>
            <View
              style={[
                styles.itemInnerView,
                {
                  backgroundColor:
                    array.includes(index)
                      ? "rgba(74, 108, 0, 0.94)"
                      : "rgba(74, 108, 0, 0.61)",
                },
              ]}
            >
              <Text
                style={[
                  styles.itemText,
                  {
                    color:
                      array.includes(index)
                        ? theme.PRIMARY_GREEN
                        : theme.white,
                  },
                ]}
                numberOfLines={1}
              >
                {item?.name}
              </Text>
            </View>
          </ImageBackground>
        </Pressable>
      </View>
    );
  };

  // Search Method
  const onPressSearch = () => {
    let key = ''
    arrayData.map((item,index) => {
      console.log("d,lf,dlf,dlf,d---", item,index);
      key = 'category_ids[' + index + ']=' + item
      categoryDataArray.push(key);
      setCategoryArray(categoryDataArray);
    })
    const categoryArrayWithAND = categoryDataArray.map(item => item).join('&');
    console.log("0-1-101-1-110-111",categoryArrayWithAND);


    let data = {}
    data.id = categoryArrayWithAND
    data.radius = distaceValue
    data.lat = position?.latitude
    data.lng = position?.longitude
    dispatch(searchData(data))
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <ImageBackground style={{ flex: 1 }} source={resources.BG_IMAGE}>
        <Header
          theme={theme}
          title={"Filter & Category"}
          headerStyle={{ marginTop: insets.top }}
          isLeftIconShow={
            nearMePlaceIndex != -1
              // navigation.getState().routes[0].name === screenTitle.FOODHOME
              ? true
              : false
          }
          onBackPress={() => {
            navigation.goBack();
          }}

        />
        <ScrollView
          bounces={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingVertical: 15 }}
          showsVerticalScrollIndicator={false}
        >
          <FlatList
            data={homeData?.result}
            renderItem={renderCategoryListItem}
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: 25, marginHorizontal: 15 }}
            numColumns={3}
            key={3}
          // contentContainerStyle={styles.contentContainerStyle}
          />
          <SingleLineTitle
            theme={theme}
            title={"Distance (in KM)"}
            extraStyle={{ textAlign: "center", marginBottom: 15, fontWeight: '600', color: theme.FONT_MEDIUM_BLACK, fontSize: 20 }}
          />
          <View style={{ marginHorizontal: 15 }}>
            <Slider
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor={theme.PRIMARY_GREEN}
              step={1}
              value={distaceValue}
              onValueChange={(value) => {
                setDistanceValue(value);
              }}
              thumbImage={resources.LOGO_LEAF}
              maximumTrackTintColor={theme.FONT_LIGHT_VIOLET}
            />
            <View style={styles.distanceValueView}>
              <Text>0</Text>
              {/* <Animated.View>
              <Text>{distaceValue}</Text>
            </Animated.View> */}

             {distaceValue > 0 && distaceValue < 100 &&
                <Text style={ { width: 50, textAlign: 'center', left: left } }>
                  {Math.floor(distaceValue)}
                </Text>
              }
              <Text>100</Text>
            </View>
          </View>

          {/* <View style={{ height: 300,  marginTop: 40, justifyContent: "center", alignItems: "center" }}> */}
            <MapView 
              provider={PROVIDER_GOOGLE}
              region={{
                latitude: position.latitude,
                longitude: position.longitude,
                latitudeDelta: distaceValue > 15 ? 0.5 : 0.3,
                longitudeDelta: distaceValue > 15 ? 0.5 : 0.3
               }}
            style={{ height: 300, width: '100%', marginTop: 20,}}
              onRegionChangeComplete={(region) => {
                  setPosition({
                    latitude: region?.latitude,
                    longitude: region?.longitude,
                    latitudeDelta: region?.latitudeDelta,
                    longitudeDelta: region?.longitudeDelta
                  });
              }}
            >
              <Marker
                coordinate={{
                  latitude: position.latitude,
                  longitude: position.longitude,
              }}
              
              >
                {/* <View style={{ backgroundColor:'rgba(0, 0, 0, 0.4)', height:  100 , width:  100, borderRadius: distaceValue > 15 ? distaceValue + 85 : 70, alignItems: "center", justifyContent: "center" }}> */}
                <View style={{ 
                    backgroundColor:'rgba(0, 0, 0, 0.4)', 
                    alignItems: "center", 
                    justifyContent: "center",
                    height: distaceValue > 15 ? Platform.OS == 'android' ? 80 : 110 : Platform.OS == 'android' ? 60 : 90 , 
                    width: distaceValue > 15 ? Platform.OS == 'android' ? 80 : 110 : Platform.OS == 'android' ? 60 : 90 , 
                    borderRadius: distaceValue > 15 ? distaceValue + 85 : 70, 
                    // height: distaceValue > 15 ? Platform.OS == 'ios' ? 100 + distaceValue + 20 : 80 + distaceValue : Platform.OS == 'ios' ? 100 : 80 , 
                    // width: distaceValue > 15 ?  Platform.OS == 'ios' ? 100 + distaceValue + 20 : 80 + distaceValue : Platform.OS == 'ios' ? 100 : 80, 
                    // borderRadius: distaceValue > 15 ? distaceValue + 85 : 70, 
                }}>
                <Image
                  source={resources.LOGO_LEAF}
                  style={{width: 35, height: 35}}
                  resizeMode="contain"
                />
                </View>
              </Marker>
            </MapView>
            
            {/* <View style={{ backgroundColor: theme.white, height: 130, width: 130, borderRadius: 70, alignItems: "center", justifyContent: "center" }}> */}
              {/* <Image
                source={resources.LOGO_LEAF}
                style={{ width: 35, height: 48 }}
              /> */}
            {/* </View> */}
          {/* </View> */}

        </ScrollView>
        {nearMePlaceIndex != -1 &&
          <NavigationBottomButton
            theme={theme}
            title={"Search"}
            containerStyle={{
              height:
                navigation.getState().routes[0].name !==
                  screenTitle.CATEGORYFILTER && insets.bottom > 0
                  ? 40
                  : 55,
              paddingTop:
                navigation.getState().routes[0].name !==
                  screenTitle.CATEGORYFILTER && insets.bottom > 0
                  ? 10
                  : 0,
            }}
            onButtonPress={() => {
              onPressSearch()
              setTimeout(() => {
                navigation.navigate(screenTitle.SEARCHRESULT);
              },1000)
            }}
          />}
        {navigation.getState().routes[0].name !== screenTitle.CATEGORYFILTER &&
          insets.bottom > 0 && (
            <View
              style={{
                height: insets.bottom,
                backgroundColor: theme.PRIMARY_GREEN,
              }}
            />
          )}
      </ImageBackground>
    </SafeAreaProvider>
  );
};
export default CategoryFilter;
