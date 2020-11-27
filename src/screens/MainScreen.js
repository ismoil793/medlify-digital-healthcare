import React, { useState, useEffect, useContext, useCallback } from "react";
import {
   StyleSheet,
   View,
   FlatList,
   Image,
   Dimensions,
   Platform
} from "react-native";
import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";
import { THEME } from "../theme";
import { TodoContext } from "../context/todo/todoContext";
import { ScreenContext } from "../context/screen/screenContext";
import { AppLoader } from "../components/ui/AppLoader";
import { AppText } from "../components/ui/AppText";
import { AppButton } from "../components/ui/AppButton";

export const MainScreen = () => {
   const { addTodo, todos, removeTodo, fetchTodos, loading, error } = useContext(
      TodoContext
   );
   const { changeScreen } = useContext(ScreenContext);
   const [deviceWidth, setDeviceWidth] = useState(
      Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2
   );

   const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);

   useEffect(() => {
      loadTodos();
   }, []);

   useEffect(() => {
      const update = () => {
         const width =
            Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2;
         setDeviceWidth(width);
      };

      Dimensions.addEventListener("change", update);

      return () => {
         Dimensions.removeEventListener("change", update);
      };
   });

   if (loading) {
      return <AppLoader />;
   }

   if (error) {
      return (
         <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <AppText
               style={{ color: THEME.GREY_COLOR, fontSize: 20, marginBottom: 20 }}
            >
               {error.error}
            </AppText>
            <AppButton onPress={loadTodos} color={THEME.DANGER_COLOR}>
               Try again
        </AppButton>
         </View>
      );
   }

   let content = (
      <View style={{ width: deviceWidth }}>
         <FlatList
            style={{ maxHeight: '93%' }}
            keyExtractor={item => item.id.toString()}
            data={todos}
            renderItem={({ item }) => (
               <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />
            )}
         />
      </View>
   );

   if (todos.length === 0) {
      content = (
         <View style={styles.imgWrap}>
            <Image
               style={styles.image}
               source={require("../../assets/no-items.png")}
            />
         </View>
      );
   }

   return (
      <View>
         <AddTodo onSubmit={addTodo} />
         {content}
      </View>
   );
};

const styles = StyleSheet.create({
   imgWrap: {
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      height: 300
   },
   image: {
      width: "100%",
      height: "100%",
      resizeMode: "contain"
   }
});
