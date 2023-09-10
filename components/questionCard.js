import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

export default function QuestionCard({ username, date, question, answer }) {
  return (
    <View style={styles.card}>
      <View style={styles.profile}>
        <Image
          style={styles.profilepic}
          source={require("../assets/images/account.png")}
        />
        <View style={styles.userDetails}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
      <Text style={styles.question}>{question}</Text>
      <Text style={styles.answer}>{answer}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#E6E7E8",
    borderRadius: 25,
    width: "85%",
    padding: 20,
    shadowColor: "#00000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
  },
  profilepic: {
    height: 40,
    width: 40,
  },
  userDetails: {
    paddingLeft: 10,
  },
  username: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
  },
  date: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
  },
  question: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#049A10",
    paddingBottom: 10,
  },
  answer: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
  },
  profile: {
    flexDirection: "row",
    paddingBottom: 10,
  },
});
