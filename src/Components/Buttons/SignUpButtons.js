import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Platform } from 'react-native';
import { fontsName } from '../../constants';
import resources from '../../constants/resources';
import RightArrow from '../../assets/images/RightArrow.svg';

const SignUpButtons = props => {
  const { theme, title, containerStyle, onPress, icon, isRightIcon = false, titleStyle, rightIconStyle = {} } = props;
  const styles = Style(theme);
  return (
    <Pressable
      style={[styles.inputContainer, containerStyle]}
      onPress={onPress}>
      <View style={styles.imageContainer}>
        {icon}
      </View>
      <Text style={[styles.text, titleStyle]} numberOfLines={1}>
        {title}
      </Text>
      {isRightIcon &&
        // <RightArrow width={9} height={15} />
        <Image source={resources.RIGHTARRAW} style={rightIconStyle} />
      }
    </Pressable>
  );
};
const Style = theme => {
  return StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 15,
      backgroundColor: "rgba(0, 0, 0, 0.22)",
      paddingVertical: 18,
      marginTop: 15,
      paddingHorizontal: 20,
    },
    text: {
      fontSize: 16, //20
      color: theme.black,
      flex: 1,
      marginLeft: 13,
      fontFamily: fontsName.NUNITO_REGULAR
    },
    imageContainer: {
      width: 25,
      height: 25,
      justifyContent: 'center',
      alignItems: 'center'
    },
  });
};

export default SignUpButtons;
