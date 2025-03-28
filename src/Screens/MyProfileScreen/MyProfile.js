import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  useColorScheme,
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import Style from "./Style";
import { LightTheme, DarkTheme } from "../../constants/theme";
import resources from "../../constants/resources";
import { screenTitle } from "../../constants";
import Header from "../../Components/Header";
import SignUpButtons from "../../Components/Buttons/SignUpButtons";
import ImagePicker from "react-native-image-crop-picker";
import Instagram from '../../assets/images/instagram.svg';
import Facebook from '../../assets/images/facebook.svg';
import Linkedin from '../../assets/images/linkedin.svg';
import ContactUs from '../../assets/images/ContactUs.svg';
import About from '../../assets/images/About.svg';
import Privacy from '../../assets/images/Privacy.svg';
import { useAppDispatch, useAppSelector } from "../../redux-store/hooks";
import { profileData, profileSlice, recentDashboard, imageData } from "../../redux-store/profile/profileSlice";
const { usersReset } = profileSlice.actions;
import { useIsFocused } from '@react-navigation/native';
import HowItWorks from "../../Components/HowItWorks";

const MyProfile = ({ navigation, route }) => {
  const theme = useColorScheme() === "dark" ? LightTheme : DarkTheme;
  const styles = Style(theme);
  const [profilePicture, setProfilePicture] = useState(undefined);
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const [profileDataVal, setProfileData] = useState();
  const [openWorkModal, setOpenWorkModal] = useState(false);
  const { profileDataValue } = useAppSelector((state) => state.profile);

  const profileUtilities = [
    {
      key: "1",
      utilityTitle: "Privacy Policy",
      utilityIcon: resources.PRIVACY,
      selectUtility: () => { },
    },
    {
      key: "2",
      utilityTitle: "Terms & Conditions",
      utilityIcon: resources.TERMS_CONDITION,
      selectUtility: () => { },
    },
    {
      key: "3",
      utilityTitle: "About Save Me",
      utilityIcon: resources.ABOUT,
      selectUtility: () => { },
    },
    {
      key: "4",
      utilityTitle: "Contact Us",
      utilityIcon: resources.CONTACT_US,
      selectUtility: () => { },
    },
  ];

  useEffect(() => {
    dispatch(profileData());
    dispatch(recentDashboard({}));
  }, [isFocused]);

  useEffect(() => {
    if (profileDataValue != undefined) {
      setProfileData(profileDataValue.result);
      console.log("sdmlsdmsldmlsdmlsdsd-s-ds-d-sds-do-s", profileDataVal);
    }
  }, [profileDataValue]);

  // OpenGallery Method
  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log("smdksmdksmdksfdf-0f-d0f-d0f-d0fd-0f", image);
      const formData = new FormData();
      formData.append('picture', image?.path);
      dispatch(imageData(formData));
      setProfilePicture(image?.path);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={{ flex: 1 }} source={resources.BG_IMAGE}>
        <Header theme={theme} title={"My Profile"} isLeftIconShow={false} titleStyle={{ fontSize: 22 }} />
        <ScrollView
          bounces={false}
          contentContainerStyle={{ paddingVertical: 30 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ alignItems: "center", marginHorizontal: 30 }}>
            <Pressable onPress={() => openGallery()}>
              <Image
                style={styles.profileImage}
                source={{ uri: profilePicture }}
              />
              {/* <Image
                style={styles.profileImage}
                source={
                  !profileDataVal?.picture
                    ? resources.FOOD_IMAGE
                    : { uri: profileDataVal?.picture }
                    // : { uri: profileDataVal?.picture }
                }
              /> */}
              <Image style={styles.editImage} source={resources.EDITPENCIL} />
            </Pressable>
            <Text style={styles.profilerName} numberOfLines={1}>
              {profileDataVal?.name}
            </Text>
            <Text style={[styles.infoDataText, { fontSize: 13 }]} numberOfLines={1}>
              {profileDataVal?.email}
            </Text>
            <View
              style={[
                styles.horizontalCenter,
                { marginTop: 30, marginBottom: 20 },
              ]}
            >
              <View style={styles.infoVw}>
                <Text style={[styles.infoTitleText, { fontSize: 17, }]} numberOfLines={1}>
                  Contact
                </Text>
                <Text
                  style={[styles.infoDataText, { marginTop: 7 }]}
                  numberOfLines={1}
                >
                  {profileDataVal?.phone}
                </Text>
              </View>
              <View style={styles.line} />
              <View style={styles.infoVw}>
                <Text style={[styles.infoTitleText, { fontSize: 17, }]} numberOfLines={1}>
                  Address
                </Text>
                <Text
                  style={[styles.infoDataText, { marginTop: 7, fontSize: 13 }]}
                  numberOfLines={1}
                >
                  {profileDataVal?.address}
                </Text>
              </View>
            </View>
            <SignUpButtons
              theme={theme}
              containerStyle={styles.buttonView}
              titleStyle={{ fontSize: 16, fontWeight: '600' }}
              title={"Account Details"}
              icon={<Image source={resources.USER_ICON} />}
              isRightIcon={true}
              rightIconStyle={{ tintColor: theme.black }}
              onPress={() => {
                navigation.navigate(screenTitle.SETTINGS);
              }}
            />
          </View>

          <View style={styles.featureMeasurementVw}>
            <Pressable
              style={[styles.horizontalCenter, { marginBottom: 8 }]}
              onPress={() => {
                navigation.navigate(screenTitle.TOTALBUNDLES, { profileDataVal: profileDataVal });
              }}
            >
              <View style={{ width: "10%" }}>
                <Image style={styles.leafIcon} source={resources.LOGO_LEAF} />
              </View>
              <Text
                style={[styles.infoTitleText, { width: "70%" }]}
                numberOfLines={1}
              >
                Number of Bundle bought
              </Text>
              <Text
                style={[styles.infoTitleText, styles.textRightAlign]}
                numberOfLines={1}
              >
                {profileDataVal?.total_orders}
              </Text>
            </Pressable>
            <Text
              style={[styles.infoTitleText, styles.smallAEDText]}
              numberOfLines={1}
            >
              AED
            </Text>
            <Pressable
              style={[styles.horizontalCenter, { marginBottom: 20 }]}
              onPress={() => {
                navigation.navigate(screenTitle.TOTALSAVING, { profileDataVal: profileDataVal });
              }}
            >
              <View style={{ width: "10%" }}>
                <Image source={resources.SAVEMONEY} />
              </View>
              <Text
                style={[styles.infoTitleText, { width: "70%" }]}
                numberOfLines={1}
              >
                Amount Saved
              </Text>
              <Text
                style={[styles.infoTitleText, styles.textRightAlign]}
                numberOfLines={1}
              >
                {profileDataVal?.amount_saved}
              </Text>
            </Pressable>
            {/* <View style={styles.horizontalCenter}>
              <View style={{ width: "10%" }}>
                <Image source={resources.CO2PRINT} />
              </View>
              <Text
                style={[styles.infoTitleText, { width: "70%" }]}
                numberOfLines={1}
              >
                CO2 Footprint
              </Text>
              <Text
                style={[styles.infoTitleText, styles.textRightAlign]}
                numberOfLines={1}
              >
                10 tons
              </Text>
            </View> */}
          </View>
          <View style={{ marginHorizontal: 30 }}>
            {profileUtilities.map((item, index) => {
              return (
                <SignUpButtons
                  theme={theme}
                  containerStyle={[styles.buttonView, { marginTop: index == 0 ? 0 : 20 }]}
                  titleStyle={{ fontSize: 16, fontWeight: '600' }}
                  title={item?.utilityTitle}
                  icon={<Image source={item?.utilityIcon} />}
                  isRightIcon={true}
                  onPress={() => item?.selectUtility()}
                />
              );
            })}
          </View>
          <View style={[styles.featureMeasurementVw, { borderBottomWidth: 0 }]}>
            <SignUpButtons
              theme={theme}
              containerStyle={[styles.buttonView]}
              titleStyle={{ textAlign: 'center', marginLeft: -13, fontWeight: '600' }}
              title={"How it work"}
              onPress={() => { setOpenWorkModal(true) }}
            />
          </View>
          <Text style={styles.followText}>Follow Us</Text>
          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: Platform.OS == 'ios' ? 20 : 30 }}>
            <Pressable onPress={() => {}}>
              <Image source={resources.INSTAGRAM_LOGO} style={{ width: 35, height: 35 }} />
            </Pressable>
            <Pressable onPress={() => {}}>
              <Facebook width={33} height={33} style={styles.mediaIconStyle} />
            </Pressable>
            <Pressable onPress={() => {}}>
              <Linkedin width={33} height={33} style={styles.mediaIconStyle} />
            </Pressable>
          </View>
        </ScrollView>
      </ImageBackground>

      {openWorkModal &&
        <HowItWorks
          theme={theme}
          setOpenWorkModal={setOpenWorkModal}
          navigation={navigation}
        />
      }
    </SafeAreaView>
  );
};
export default MyProfile;
