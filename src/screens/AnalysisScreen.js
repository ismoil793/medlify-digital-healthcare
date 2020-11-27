import React, { useState, useContext } from "react";
import { StyleSheet, View, Button, Dimensions, Text } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { THEME } from "../theme";
import { ScreenContext } from "../context/screen/screenContext";
import { AppButton } from "../components/ui/AppButton";

export const AnalysisScreen = () => {


    const { changeScreen } = useContext(ScreenContext);

    return (
        <View>
            <Text>Analysis Screen</Text>

            <AppButton
                onPress={() => changeScreen(null)}
                color={THEME.GREY_COLOR}
            >
                <AntDesign name="back" size={20} color="#fff" />
                &nbsp;&nbsp;Go back to home screen
            </AppButton>
        </View>
    );
};

const styles = StyleSheet.create({

});