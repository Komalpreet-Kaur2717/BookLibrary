import React, { useEffect, useState } from "react";
import { 
  View, FlatList, Text, TouchableOpacity, StyleSheet 
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function BookListScreen({ navigation }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const querySnapshot = await getDocs(collection(db, "books"));
      const bookList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBooks(bookList);
    };
    fetchBooks();
  }, []);

  return (
    <View style={styles.container}>
         <Text style={styles.header}>Komalpreet - Book List</Text>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate("BookDetail", { book: item })}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>by {item.author}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 15,
  },
  header:{
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff0000",
    marginBottom: 5,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5, // For Android shadow
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  author: {
    fontSize: 16,
    color: "#666",
  },
});
