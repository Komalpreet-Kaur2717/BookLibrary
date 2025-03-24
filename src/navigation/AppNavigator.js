import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BookListScreen from "../screens/BookListScreen";
import BookDetailScreen from "../screens/BookDetailScreen";
import BorrowedBooksScreen from "../screens/BorrowedBooksScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BookList" component={BookListScreen} options={{ title: "Books" }} />
        <Stack.Screen name="BookDetail" component={BookDetailScreen} options={{ title: "Book Details" }} />
        <Stack.Screen name="BorrowedBooks" component={BorrowedBooksScreen} options={{ title: "Borrowed Books" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
