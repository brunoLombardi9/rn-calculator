import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";

const Button = ({
  button,
  fontColor,
  bgColor,
  shadowColor,
  hover,
  handleButton,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isResetDel = button === "RESET" || button === "DEL"
  const buttonWidth = button === "RESET" || button === "=" ? "45%" : "20%";
  const buttonFontSize = isResetDel ? 24 : 30;
  const buttonLineHeight = isResetDel ? 32 : 36;

  return (
    <View
      style={{
        ...styles.container,
        width: buttonWidth,
      }}
    >
      <Pressable
        style={{
          ...styles.button,
          backgroundColor: isHovered ? hover : bgColor,
        }}
        onPressIn={() => {
          setIsHovered(true), handleButton(button);
        }}
        onPressOut={() => setIsHovered(false)}
      >
        <Text
          style={{
            ...styles.buttonText,
            color: fontColor,
            fontSize: buttonFontSize,
            lineHeight: buttonLineHeight,
          }}
        >
          {button}
        </Text>
      </Pressable>
      <View style={{ ...styles.buttonShadow, backgroundColor: shadowColor }} />
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: { margin: "2.5%" },
  button: {
    borderRadius: 4,
    zIndex: 20,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonShadow: {
    paddingBottom: 7,
    zIndex: 10,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    position: "relative",
    bottom: 4,
  },
});
