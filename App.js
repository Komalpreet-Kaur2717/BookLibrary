import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BookListScreen from "./src/screens/BookListScreen";
import BookDetailScreen from "./src/screens/BookDetailScreen";
import BorrowedBooksScreen from "./src/screens/BorrowedBooksScreen";

const Stack = createStackNavigator();

export default function App() {
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
