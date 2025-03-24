import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function BorrowedBooksScreen() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const fetchBorrowedBooks = async () => {
    const querySnapshot = await getDocs(collection(db, "borrowedBooks"));
    const bookList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setBorrowedBooks(bookList);
  };

  const returnBook = async (id) => {
    await deleteDoc(doc(db, "borrowedBooks", id));
    setBorrowedBooks(borrowedBooks.filter((book) => book.id !== id));
    Alert.alert("Success", "Book returned successfully!");
  };

  const clearBorrowedList = async () => {
    if (borrowedBooks.length === 0) {
      Alert.alert("No Books", "There are no borrowed books to clear.");
      return;
    }

    try {
      const querySnapshot = await getDocs(collection(db, "borrowedBooks"));
      querySnapshot.forEach(async (document) => {
        await deleteDoc(doc(db, "borrowedBooks", document.id));
      });

      setBorrowedBooks([]);
      Alert.alert("Success", "All borrowed books have been cleared.");
    } catch (error) {
      console.error("Error clearing borrowed books:", error);
      Alert.alert("Error", "Failed to clear borrowed books.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Komalpreet - Borrowed Books</Text>
      {borrowedBooks.length > 0 ? (
        <FlatList
          data={borrowedBooks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.title}</Text>
              <TouchableOpacity style={styles.button} onPress={() => returnBook(item.id)}>
                <Text style={styles.buttonText}>Return Book</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noBooks}>No borrowed books</Text>
      )}
      <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearBorrowedList}>
        <Text style={styles.buttonText}>Clear Borrowed List</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", color: "#007bff", marginBottom: 10, textAlign: "center" },
  item: { backgroundColor: "#fff", padding: 15, marginVertical: 5, borderRadius: 8, shadowColor: "#000", elevation: 3, alignItems: "center" },
  title: { fontSize: 18, fontWeight: "bold", color: "#333" },
  button: { backgroundColor: "#dc3545", padding: 10, borderRadius: 8, marginTop: 10, width: "60%", alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  clearButton: { backgroundColor: "#6c757d", marginTop: 20 },
  noBooks: { textAlign: "center", fontSize: 16, color: "#666", marginTop: 20 },
});
