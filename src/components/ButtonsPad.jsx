import React from "react";
import { numberButtons } from "../constants";
import { useTheme } from "../ThemeContext";
import { StyleSheet, View } from "react-native";
import Button from "./Button";

const ButtonsPad = ({ handleButton }) => {
  const { theme } = useTheme();

  return (
    <View style={{ ...styles.container, backgroundColor: theme.keyPadBg }}>
      {numberButtons.map((button) => {
        let bgColor = "";
        let fontColor = "";
        let shadowColor = "";
        let hover = "";
        if (button === "RESET" || button === "DEL") {
          bgColor = theme.resetDelBtnColor;
          fontColor = theme.resetDelBtnText;
          shadowColor = theme.resetDelBtnShadow;
          hover = theme.resetDelBtnHover;
        } else if (button === "=") {
          bgColor = theme.equalToggleBtnColor;
          fontColor = theme.equalToggleBtnText;
          shadowColor = theme.equalToggleBtnShadow;
          hover = theme.equalToggleBtnHover;
        } else {
          bgColor = theme.normalBtnColor;
          fontColor = theme.normalBtnText;
          shadowColor = theme.normalBtnShadow;
          hover = theme.normalBtnHover;
        }

        return (
          <Button
            key={button}
            button={button}
            fontColor={fontColor}
            bgColor={bgColor}
            shadowColor={shadowColor}
            hover={hover}
            handleButton={handleButton}
          />
        );
      })}
    </View>
  );
};

export default ButtonsPad;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    margin: "auto",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderRadius: 4,
  },
});
