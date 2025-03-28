import React, { useState,useEffect } from "react";
import {
  Text,
  useColorScheme,
  View,
  Image,
  ImageBackground,
  FlatList,
  Pressable,
} from "react-native";
import Style from "./Style";
import { LightTheme, DarkTheme } from "../../constants/theme";
import Header from "../../Components/Header";
import resources from "../../constants/resources";
import { screenTitle } from "../../constants";
import { NavigationBottomButton } from "../../Components/Buttons/NavigationButton";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import DataShowingModal from "../../Components/Modals/DataShowingModal";
import TotalItems from "../../Components/TotalItems";
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks";
import { useIsFocused } from '@react-navigation/native';
import { recentDashboard } from "../../redux-store/profile/profileSlice";

const TotalSaving = ({ navigation, route }) => {
  const theme = useColorScheme() === "dark" ? LightTheme : DarkTheme;
  const styles = Style(theme);
  const insets = useSafeAreaInsets();
  const [openModal, setOpenModal] = useState(true);
  const [savingData, setSavingData] = useState();
  const amountSaved = route?.params?.profileDataVal?.amount_saved
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const { recentDashboardData } = useAppSelector((state) => state.profile);

  useEffect(() => {
    if (recentDashboardData != undefined) {
      setSavingData(recentDashboardData?.result?.orders);
    }
  }, [recentDashboardData]);

  // SavingsData RenderItem
  const renderTotalSavingDataItem = ({ item, index }) => {
    return (
      <TotalItems 
        theme={theme}
        item={item}
      />
    );
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <ImageBackground style={{ flex: 1 }} source={resources.BG_IMAGE}>
        <View style={{ height: insets.top, backgroundColor: theme.white }} />
        <Header
          theme={theme}
          title={"Total Saving"}
          headerStyle={{ backgroundColor: theme.white }}
          titleStyle={{fontWeight: '600'}}
          onBackPress={() => {
            navigation.goBack();
          }}
        />

        <FlatList
          data={savingData}
          bounces={false}
          contentContainerStyle={{ paddingBottom: 15 }}
          renderItem={renderTotalSavingDataItem}
          showsVerticalScrollIndicator={false}
        />

        <NavigationBottomButton
          theme={theme}
          title={"OK"}
          containerStyle={{
            height: insets.bottom > 0 ? 40 : 55,
            paddingTop: insets.bottom > 0 ? 10 : 0,
          }}
          onButtonPress={() => {
            navigation.goBack()
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
      </ImageBackground>

      {openModal &&
        <DataShowingModal 
        theme={theme}
        modalVisible={openModal}
        headerTitle={"Saving"}
        totalValue={amountSaved}
        onButtonPress={() => {
          setOpenModal(false);
        }}
        buttonTitle={"OK"}
        />
      }

    </SafeAreaProvider>
  );
};
export default TotalSaving;
