import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  TextInput,
  Image,
  Platform,
} from 'react-native';
import {fontsName} from '../../constants';
import resources from '../../constants/resources';

const SearchInput = props => {
  const {
    theme,
    placeHolder,
    searchValue,
    onChangeSearchText,
    rightIcon,
    isShowRightIcon = false,
    extraStyle,
    onRightIconPress
  } = props;
  const styles = Style(theme);
  return (
    <View style={[styles.inputContainer, extraStyle]}>
      <Image source={resources.SEARCH} style={styles.searchImage} />
      <TextInput
        style={styles.searchText}
        value={searchValue}
        selectionColor={theme.black}
        placeholderTextColor={theme.PLACEHOLDER_TEXT}
        placeholder={placeHolder}
        onChangeText={value => onChangeSearchText(value)}
      />
      {isShowRightIcon && (
        <Pressable onPress={onRightIconPress} >
          {rightIcon}
        </Pressable>
      )}
    </View>
  );
};
const Style = theme => {
  return StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 15,
      backgroundColor:theme.white,
      paddingVertical: Platform.OS === 'ios' ? 14 : 0,
      marginVertical:10,
      paddingHorizontal: 15,
      borderWidth: 1,
      borderColor: theme.BORDER_GREY
    },
    searchImage:{
      width:15,
      height:15,
      marginRight: 10,
    },
    searchText: {
      fontSize: 15, //17
      color: theme.black,
      marginRight:5,
      flex: 1,
      fontFamily: fontsName.NUNITO_REGULAR
    },
  });
};

export default SearchInput;
