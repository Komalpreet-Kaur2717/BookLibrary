import React, { useState } from "react";
import { 
  View, Text, TouchableOpacity, Alert, StyleSheet 
} from "react-native";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function BookDetailScreen({ route, navigation }) {
  const { book } = route.params;
  const [borrowedCount, setBorrowedCount] = useState(0);

  const borrowBook = async () => {
    const borrowedBooksSnapshot = await getDocs(collection(db, "borrowedBooks"));
    const borrowedBooks = borrowedBooksSnapshot.docs.map(doc => doc.data());

    if (borrowedBooks.length >= 3) {
      Alert.alert("Limit Reached", "You can't borrow more than 3 books at a time.");
      return;
    }

    await addDoc(collection(db, "borrowedBooks"), book);
    setBorrowedCount(borrowedBooks.length + 1);
    Alert.alert("Success", "Book borrowed successfully!");
    navigation.navigate("BorrowedBooks");
  };

  return (
    <View style={styles.container}>
    <Text style={styles.header}>Komalpreet - Book Detail</Text>
      <View style={styles.card}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>by {book.author}</Text>
        <Text style={styles.description}>{book.description}</Text>
        <TouchableOpacity style={styles.button} onPress={borrowBook}>
          <Text style={styles.buttonText}>Borrow Book</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  }, header:{
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff0000",
    marginBottom: 5,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    width: "100%",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  author: {
    fontSize: 18,
    color: "#666",
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#444",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
