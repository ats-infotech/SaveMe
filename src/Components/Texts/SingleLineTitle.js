import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {fontsName} from '../../constants';

const SingleLineTitle = props => {
  const {theme, title, extraStyle} = props;
  const styles = Style(theme);
  return (
      <Text style={[styles.text, extraStyle]} numberOfLines={1}>
        {title}
      </Text>
  );
};
const Style = theme => {
  return StyleSheet.create({
    text: {
      fontSize: 19, //21
      color: theme.black,
      fontFamily: fontsName.NUNITO_REGULAR,
      marginVertical:7  
    },
  });
};

export default SingleLineTitle;
