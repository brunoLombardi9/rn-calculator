import React from "react";
import { useTheme } from "../ThemeContext";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function CalcHeader() {
  const { theme, changeTheme, options, selectedOption } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.title, color: theme.topText }}>calc</Text>

      <View style={styles.themeContainer}>
        <Text style={{ ...styles.themeText, color: theme.topText }}>THEME</Text>

        <View style={styles.themeBox}>
          <View style={styles.optionsContainer}>
            {options.map((opt) => (
              <Text
                key={opt}
                style={{ ...styles.optNumber, color: theme.topText }}
              >
                {opt + 1}
              </Text>
            ))}
          </View>

          <View
            style={{ ...styles.optionsBox, backgroundColor: theme.keyPadBg }}
          >
            {options.map((opt) => (
              <Pressable
                key={opt}
                onPressIn={() => changeTheme(opt)}
                hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                style={{
                  ...styles.optionBtn,
                  backgroundColor:
                    selectedOption === opt
                      ? theme.equalToggleBtnColor
                      : "transparent",
                }}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    height: 50,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "bold",
    marginStart: 5
  },
  themeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  themeText: {
    marginTop: "auto",
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 16,
    width: 60,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80,
  },
  optNumber: {
    marginLeft: 7,
    marginRight: 7,
    marginBottom: 5,
    fontWeight: "bold",
  },
  optionsBox: {
    flexDirection: "row",
    padding: 4,
    borderRadius: 9999,
    justifyContent: "space-between",
  },
  optionBtn: {
    borderRadius: 9999,
    width: 15,
    height: 15,
  },
});
