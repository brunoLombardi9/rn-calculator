import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useTheme } from "./ThemeContext";
import CalcHeader from "./components/CalcHeader";
import Screen from "./components/Screen";
import ButtonsPad from "./components/ButtonsPad";
import { StatusBar } from "expo-status-bar";

export default function Main() {
  const [operation, setOperation] = useState(null);
  const [topNumber, setTopNumber] = useState("0");
  const [bottomNumber, setBottomNumber] = useState("");
  const [mustCalculate, setMustCalculate] = useState(false);
  const { theme, selectedOption } = useTheme();

  function writeNumber(button) {
    const number = button.toString();

    if (!operation) {
      topNumber === "0"
        ? setTopNumber(number)
        : setTopNumber(topNumber + number);
      return;
    }

    if (operation) {
      bottomNumber === "0"
        ? setBottomNumber(number)
        : setBottomNumber(bottomNumber + number);
    }
  }

  function handleDecimal() {
    if (!operation) {
      if (topNumber.includes(".")) {
        return;
      }
      setTopNumber(topNumber + ".");
      return;
    }

    if (operation) {
      if (bottomNumber.includes(".")) {
        return;
      }
      setBottomNumber(bottomNumber + ".");
    }
  }

  function selectOperation(button) {
    if (operation) {
      calculate();
      setOperation(button);
      return;
    }
    setOperation(button);
  }

  function deleteNumber() {
    if (operation) {
      bottomNumber.length === 1
        ? setBottomNumber("0")
        : setBottomNumber(bottomNumber.slice(0, -1));
      return;
    }

    if (!operation) {
      topNumber.length === 1
        ? setTopNumber("0")
        : setTopNumber(topNumber.slice(0, -1));
    }
  }

  function reset() {
    setOperation("");
    setBottomNumber("");
    setTopNumber("0");
  }

  function calculate() {
    if (!bottomNumber) {
      return;
    }
    const number1 = Number(topNumber);
    const number2 = Number(bottomNumber);
    let mathOperation = "";

    switch (operation) {
      case "+":
        mathOperation = number1 + number2;
        break;
      case "-":
        mathOperation = number1 - number2;
        break;
      case "x":
        mathOperation = number1 * number2;
        break;
      case "÷":
        mathOperation = number1 / number2;
        break;
    }

    setOperation("");
    setTopNumber(mathOperation.toString());
    setBottomNumber("");
    setMustCalculate(true);
  }

  function handleButton(button) {
    if (typeof button === "number") {
      writeNumber(button);
      return;
    }

    if (button === ".") {
      handleDecimal(button);
      return;
    }

    if (button === "+" || button === "-" || button === "x" || button === "÷") {
      selectOperation(button);
      return;
    }

    if (button === "RESET") {
      reset();
      return;
    }

    if (button === "DEL") {
      deleteNumber();
      return;
    }

    if (button === "=") {
      calculate();
      return;
    }
  }

  return (
    <View style={{ ...styles.appBackground, backgroundColor: theme.mainBg }}>
      <StatusBar style={selectedOption === 1 ? "dark" : "light"} />
      <View style={styles.calcContainer}>
        <CalcHeader />
        <Screen
          topNumber={topNumber}
          bottomNumber={bottomNumber}
          operation={operation}
          mustCalculateObj={{ mustCalculate, setMustCalculate }}
        />
        <ButtonsPad handleButton={handleButton} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  calcContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "85%",
  },
});
