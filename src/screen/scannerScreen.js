
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { TextInput } from 'react-native-paper';
import apiConnectBack from '../../API/apiConnectBack';

const scannerScreen = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pseudo, setPseudo] = useState("");
  const signupCall = async () => await apiConnectBack.post("/signup", { email, password, pseudo });


  //AsyncStorage.setItem("token", signinCall.data.token) // Stocker dans le local storage

  return (
    <View style={styles.container}>
      <TextInput style={styles.TextInput}
        label="Pseudo"
        value={pseudo}
        onChangeText={(value) => setPseudo(value)}
      />
    </View>
  );
}

scannerScreen.navigationOption = {
  title: "Scanner",
}

const styles = StyleSheet.create({

  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center"
  },

  textInput: {

  }

})
export default scannerScreen;
