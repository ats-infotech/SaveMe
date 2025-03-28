import React, { useState } from "react";
import { StyleSheet, Dimensions, Text, Pressable, View, Image, ScrollView, Platform } from "react-native";
import resources from "../constants/resources";
import { fontsName, screenTitle } from '../constants';
import { NavigationButton } from "./Buttons/NavigationButton";
import Header from "./Header";

const { width } = Dimensions.get("window");

const HowItWorks = (props) => {
  const { theme, setOpenWorkModal, navigation, isFromHome=false } = props;
  const styles = Style(theme);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={[styles.containerStyle,{marginTop: isFromHome && Platform .OS == 'ios' ? 35 : 0}]}>
      <Header
          theme={theme}
          title={"How it work"}
          headerStyle={{ backgroundColor: theme.white }}
          titleStyle={{fontWeight: '600'}}
          isRightIconShow={true}
          onRightIconPress={() => {setOpenWorkModal(false)}}
          onBackPress={() => {
            setOpenWorkModal(false);
          }}
        />
        <View style={{alignItems:"center", marginTop:10}}>
          <Image 
            source={require('../assets/images/bg.png')}
            style={{ width:400, height:2000}}
          />
        </View>
        {/* <Image 
          source={require('../assets/images/appWorkingImg.jpg')}
          style={{resizeMode:'contain',width:'100%'}}
        /> */}
        <NavigationButton
            theme={theme}
            title={"Get yours"}
            containerStyle={{ marginHorizontal: 40, marginBottom: 20 }}
            onButtonPress={() => { 
              isFromHome == true ?
                setOpenWorkModal(false)
              : navigation.navigate(screenTitle.HOME);
            }}
          />
    </ScrollView>
  );
};
const Style = (theme) => {
  return StyleSheet.create({
    containerStyle: {
      height:'100%', 
      width:"100%", 
      backgroundColor:"white"
    },
    buttonView: { 
      borderRadius: 30, 
      paddingVertical: 18, 
      backgroundColor:theme.PRIMARY_GREEN, 
      marginHorizontal:18 
    },   
  });
};

export default HowItWorks;
