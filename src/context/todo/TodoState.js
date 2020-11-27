import React, { useReducer, useContext } from "react";
import { Alert } from "react-native";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import {
   ADD_TODO,
   REMOVE_TODO,
   UPDATE_TODO,
   SHOW_ERROR,
   SHOW_LOADER,
   HIDE_LOADER,
   CLEAR_ERROR,
   FETCH_TODOS
} from "../types";
import { ScreenContext } from "../screen/screenContext";

export const TodoState = ({ children }) => {
   const initialState = {
      todos: [],
      loading: false,
      error: null
   };
   const { changeScreen } = useContext(ScreenContext);
   const [state, dispatch] = useReducer(todoReducer, initialState);

   const addTodo = async title => {
      const response = await fetch(
         "https://rn-todo-app-aa5b1.firebaseio.com/todos.json",
         {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title })
         }
      );
      const data = await response.json();
      dispatch({ type: ADD_TODO, title, id: data.name });
   };

   const removeTodo = id => {
      const todo = state.todos.find(t => t.id === id);
      Alert.alert(
         "Deleting of element",
         `Are you sure that you want to delete "${todo.title}"?`,
         [
            {
               text: "Cancel",
               style: "cancel"
            },
            {
               text: "Delete",
               style: "destructive",
               onPress: async () => {
                  changeScreen(null);
                  await fetch(
                     `https://rn-todo-app-aa5b1.firebaseio.com/todos/${id}.json`,
                     {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" }
                     }
                  );
                  dispatch({ type: REMOVE_TODO, id });
               }
            }
         ],
         { cancelable: false }
      );
   };

   const fetchTodos = async () => {
      showLoader();
      clearError();
      try {
         const response = await fetch(
            "https://rn-todo-app-aa5b1.firebaseio.com/todos.json",
            {
               method: "GET",
               headers: { "Content-Type": "application/json" }
            }
         );
         const data = await response.json();
         const todos = Object.keys(data).map(key => ({ ...data[key], id: key }));
         dispatch({ type: FETCH_TODOS, todos });
      } catch (e) {
         showError("Something went wrong...");
         console.log(e);
      } finally {
         hideLoader();
      }
   };

   const updateTodo = async (id, title) => {
      clearError();
      try {
         await fetch(`https://rn-todo-app-aa5b1.firebaseio.com/todos/${id}.json`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title })
         });
         dispatch({ type: UPDATE_TODO, id, title });
      } catch (e) {
         showError("Something went wrong...");
         console.log(e);
      }
   };

   const showLoader = () => dispatch({ type: SHOW_LOADER });

   const hideLoader = () => dispatch({ type: HIDE_LOADER });

   const showError = error => dispatch({ type: SHOW_ERROR, error });

   const clearError = () => dispatch({ type: CLEAR_ERROR });

   return (
      <TodoContext.Provider
         value={{
            todos: state.todos,
            loading: state.loading,
            error: state.error,
            fetchTodos,
            addTodo,
            removeTodo,
            updateTodo
         }}
      >
         {children}
      </TodoContext.Provider>
   );
};
