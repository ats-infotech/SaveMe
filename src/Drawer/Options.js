import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {fontsName} from '../constants/index';
export default function Options({ButtonText, onPress, theme, borderWidth, backgroundColor, textColor}) {

  const Style = theme => {
    return StyleSheet.create({
      buttonStyle: {
        backgroundColor: backgroundColor,
        borderRadius: 10,
        paddingVertical: 5,
        width:105,
        alignItems:'center',
        borderWidth:borderWidth,
        borderColor:theme.primary
      },
      textStyle: {
        color: textColor,
        fontFamily: fontsName.NUNITO_REGULAR,
        fontWeight : '400'
      },
    });
  };

  const styles = Style(theme);
  return (
      <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
        <Text style={styles.textStyle}>{ButtonText}</Text>
      </TouchableOpacity>
  );
}