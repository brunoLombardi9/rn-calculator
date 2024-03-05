import React, { useRef } from "react";
import { useTheme } from "../ThemeContext";
import { StyleSheet, Text, View } from "react-native";
import ScreenRow from "./ScreenRow";

const Screen = ({ topNumber, bottomNumber, operation, mustCalculateObj }) => {
  const { theme } = useTheme();
  const topNumberRef = useRef(null);
  const bottomNumberRef = useRef(null);
  const { mustCalculate, setMustCalculate } = mustCalculateObj;
  const bottomNumSize = !bottomNumber ? 36 : 24;
  const bottomNumHeight = !bottomNumber ? 40 : 32;
  const bottomMargin = !bottomNumber ? 0 : 12;

  function scrollToRight(ref) {
    if (ref.current) {
      ref.current.scrollToEnd({ animated: false });
    }
  }

  function scrollToLeft(ref) {
    if (ref.current) {
      ref.current.scrollTo({ x: 0, animated: false });
    }
  }

  function topNumRowLogic() {
    if (mustCalculate) {
      scrollToLeft(topNumberRef);
      setMustCalculate(false);
    } else {
      scrollToRight(topNumberRef);
    }
  }

  function bottomRowLogic() {
    scrollToRight(bottomNumberRef);
    scrollToLeft(topNumberRef);
  }

  return (
    <View style={{ ...styles.container, backgroundColor: theme.screenBg }}>
      <View style={styles.numbersBox}>
        <ScreenRow
          rowRef={topNumberRef}
          number={topNumber}
          bottomNumber={bottomNumber}
          behaviour={topNumRowLogic}
        />

        {bottomNumber && (
          <ScreenRow
            rowRef={bottomNumberRef}
            number={bottomNumber}
            bottomNumber={bottomNumber}
            behaviour={bottomRowLogic}
          />
        )}
      </View>

      <View style={styles.operationBox}>
        <Text
          style={{
            ...styles.operationText,
            color: theme.topText,
            fontSize: bottomNumSize,
            lineHeight: bottomNumHeight,
            marginBottom: bottomMargin,
          }}
        >
          {operation}
        </Text>
      </View>
    </View>
  );
};
export default Screen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 90,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 16,
    borderRadius: 4,
  },
  numbersBox: {
    width: "90%",
    justifyContent: "center",
  },
  operationBox: {
    width: "10%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginStart: 5,
  },
  operationText: {
    textAlign: "center",
    marginEnd: 10,
    marginHorizontal: "auto",
  },
});
