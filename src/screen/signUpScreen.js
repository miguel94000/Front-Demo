
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { TextInput } from 'react-native-paper';
import apiConnectBack from '../../API/apiConnectBack';

// Partie inscription
const SignUpScreen = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pseudo, setPseudo] = useState("");
  const signupCall = async () => {
    const response = await apiConnectBack.post("/signup", { email, password, pseudo })
    await AsyncStorage.setItem('token', response.data.token)
  };


  //AsyncStorage.setItem("token", signinCall.data.token) // Stocker dans le local storage

  return (
    <View style={styles.container}>
      <TextInput style={styles.TextInput}
        label="Pseudo"
        value={pseudo}
        onChangeText={(value) => setPseudo(value)}
      />

      <TextInput style={styles.TextInput}
        label="Email"
        value={email}
        onChangeText={(value) => setEmail(value)}
      />

      <TextInput style={styles.TextInput}
        label="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(value) => setPassword(value)}
      />
      <TouchableOpacity onPress={() => signupCall()}>
        <Text>
          Envoyez
        </Text>
      </TouchableOpacity>
    </View>
  );
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
export default SignUpScreen;
