import React, { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
const { width } = Dimensions.get("window");

const ImageCarousel = (props) => {
  const { theme, data, renderComponent, onSnapToItem } = props;
  const styles = Style(theme);

  return (
    <Carousel
      loop={false}
      width={width}
      data={data}
      height={257}
      autoPlay={false}
      renderItem={({ item, index }) => renderComponent(item, index)}
      mode={"parallax"}
      modeConfig={{
        parallaxScrollingScale:0.93,
        parallaxScrollingOffset: 43,
      }}
      pagingEnabled={true}
      snapEnabled={true}
      vertical={false}
      style={styles.slide}
      onSnapToItem={index => onSnapToItem(index)}
    />
  );
};
const Style = (theme) => {
  return StyleSheet.create({
    slide: {},
  });
};

export default ImageCarousel;
