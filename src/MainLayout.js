import React, { useState, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Navbar } from "./components/Navbar";
import { THEME } from "./theme";
import { MainScreen } from "./screens/MainScreen";
import { TodoScreen } from "./screens/TodoScreen";
import { TodoContext } from "./context/todo/todoContext";
import { ScreenContext } from "./context/screen/screenContext";
import { AppButton } from "./components/ui/AppButton"
import { AnalysisScreen } from "./screens/AnalysisScreen";

export const MainLayout = () => {
  const { todoId, changeScreen } = useContext(ScreenContext);

  return (
    <View style={styles.wrapper}>
      <Navbar title="Medlify" />
      <View style={styles.container}>
        {todoId && todoId === 31 ? <AnalysisScreen /> : todoId ? <TodoScreen /> : <MainScreen />}
      </View>
      {
        todoId ? null :
          <View>
            <AppButton onPress={() => changeScreen(31)} home={true}>Start Analysis</AppButton>
          </View>
      }

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
    flex: 1
  },
  wrapper: {
    flex: 1
  }
});
