import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "../ThemeContext";

const ScreenRow = ({ rowRef, number, bottomNumber, behaviour }) => {
  const { theme } = useTheme();
  const NumSize = !bottomNumber ? 36 : 24;
  const NumLineHeight = !bottomNumber ? 40 : 32;

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ref={rowRef}
        onContentSizeChange={behaviour}
      >
        <Text
          style={{
            ...styles.text,
            fontSize: NumSize,
            lineHeight: NumLineHeight,
            color: theme.topText,
          }}
        >
          {number}
        </Text>
      </ScrollView>
    </View>
  );
};

export default ScreenRow;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignItems: "flex-end",
    marginLeft: "auto",
  },
  text: {
    fontWeight: "bold",
  },
});
