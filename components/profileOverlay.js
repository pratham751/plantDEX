import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
} from "react-native";
import { updateProfile, signOut } from "firebase/auth";
import { auth, firebaseConfig, db } from "./firebase";
import {
  collection,
  setDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  getDoc,
} from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import AnimatedTextInput from "./animatedTextInput";
import '../screens/translations'
import { useTranslation } from "react-i18next";
import i18n from 'i18next';
import TranslateButton from "./translatebutton";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ProfileOverlay({handleLogout}){
  const [modalVisible, setModalVisible] = useState(false);
  
  const displayName = auth.currentUser.displayName ? auth.currentUser.displayName : "";
  const [userName, setUserName] = useState(displayName);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const { t } = useTranslation();
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const handleUpdate = async () => {
    try {
      if (userName !== auth.currentUser.displayName) {
        updateProfile(auth.currentUser, { displayName: userName });
      }

      alert("Successfully Updated");
    } catch (e) {
      alert("Error Occurred!");
    }
  };


  return (
    <View style={styles.centeredView}>
        
        <View style={styles.accmodal}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
              {image ? (
                  <Image source={{ uri: image }} style={styles.accimg} />
                ) : (
                  <Image source={require("../assets/images/account.png")}  style={styles.accimg} />
                )}
          </TouchableOpacity>
        </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            
            <TouchableOpacity
                onPress={pickImage}
                style={styles.profileImageContainer}
              >
                {image ? (
                  <Image source={{ uri: image }} style={styles.profileImage} />
                ) : (
                  <Image source={require("../assets/images/account.png")} style={styles.profileImage} />
                )}
              </TouchableOpacity>
            <View style={styles.translateButtonContainer}>
              <TranslateButton />
            </View>

            <AnimatedTextInput
              value={userName}
              onChangeText={setUserName}
              placeholder={t("User name")}
            />

            <AnimatedTextInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder={t("Phone number")}
            />
            <AnimatedTextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder={t("Email")}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.Button}
                onPress={handleUpdate}
              >
                <Text style={styles.ButtonText}>{t("Update")}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.ButtonText}>{t("Close")}</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  handleLogout();
                }}
              >
                <Text style={styles.ButtonText}>{t("Logout")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: windowHeight * 0.05,
  },
  translateButtonContainer:{position:'absolute', // position the container absolutely
  top: windowHeight * 0.02, // Adjust the top and right values as needed
  right: windowWidth * 0.05, // to position the button at the top right of the screen
  zIndex: 2,
  },
  accimg: {
    width: windowWidth * 0.11,
    height: windowWidth * 0.11,
    borderRadius: (windowWidth * 0.11) / 2, // make it circle
  },
  accmodal: {
    alignSelf: "flex-end",
    marginTop: windowHeight * -0.05,
    overflow: 'hidden', // hide the overflowing part of the image
  },
  modalView: {
    margin: windowWidth * 0.05,
    backgroundColor: "#f2f2f2",
    borderRadius: windowWidth * 0.04,
    padding: windowWidth * 0.07,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: windowWidth * 0.01,
    },
    shadowOpacity: 0.25,
    shadowRadius: windowWidth * 0.02,
    elevation: 5,
  },
  input: {
    height: windowHeight * 0.065,
    width: windowWidth * 0.75,
    marginVertical: windowHeight * 0.05,
    borderWidth: 1,
    padding: windowWidth * 0.03,
    borderRadius: windowWidth * 0.08,
    borderColor: "#049A10",
    fontFamily: "Poppins_400Regular",
  },
  profileImageContainer: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    borderRadius: windowWidth * 0.1,
    marginBottom: windowHeight * 0.04,
    backgroundColor: "#e0e0e0",
    left: windowWidth * 0.001,
  },
  profileImage: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    borderRadius: windowWidth * 0.1,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  Button: {
    width: windowWidth * 0.001,
    height: windowHeight * 0.06,
    backgroundColor: "#049810",
    padding: windowWidth * 0.03,
    borderRadius: windowWidth * 0.08,
    marginTop: windowHeight * 0.015,
    justifyContent: "center",
    flex: 1,
    marginRight: windowWidth * 0.02,
  },
  ButtonText: {
    fontFamily: "Poppins_700Bold",
    fontSize: windowHeight * 0.017,
    color: "white",
    textAlign: "center",
  },
  closeButton: {
    width: windowWidth * 0.001,
    height: windowHeight * 0.06,
    backgroundColor: "#394648",
    padding: windowWidth * 0.03,
    borderRadius: windowWidth * 0.08,
    marginTop: windowHeight * 0.015,
    justifyContent: "center",
    flex: 1,
    marginRight: windowWidth * 0.02,
  },
  logoutButton: {
    width: windowWidth * 0.001,
    height: windowHeight * 0.06,
    backgroundColor: "#394648",
    padding: windowWidth * 0.03,
    borderRadius: windowWidth * 0.08,
    marginTop: windowHeight * 0.015,
    justifyContent: "center",
    flex: 1,
    marginRight: windowWidth * 0.02,
  },
});