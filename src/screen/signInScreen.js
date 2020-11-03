
import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button, Alert, AsyncStorage } from 'react-native';
import { TextInput } from 'react-native-paper';
import {Context as AuthContext} from "../context/authContext";
import apiConnectBack from '../../API/apiConnectBack';

const SignInScreen = ({navigation}) => {

  const {state, signIn} = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword]= useState("");
    
  // Message d'erreur si le mot de passe n'est pas bon
  const alertSignIn = (erreur) =>
  Alert.alert(
    "Erreur de connexion",
    erreur,
    [
      {
        text: "Annuler",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ],
    { cancelable: false }
  ); 


  
  return (
    <View style={styles.container}>
      <TextInput style={styles.TextInput}
      label="Email"
      value={email}
      onChangeText={(value)=> setEmail(value)}
      />

      <TextInput style={styles.TextInput}
      label="Password"
      secureTextEntry={true}
      value={password}
      onChangeText={(value) => setPassword(value)}
      />
      {/* <TouchableOpacity onPress={()=> signIn({email, password})}> */}
      <TouchableOpacity onPress={async ()=> {
        await signIn({email, password})
        if (state.status == 422) {
          console.log("NEW", state)
          alertSignIn(state.error);
        }
      }}>

        <Text>
          Envoyez
        </Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center"
  },

  textInput:{

  }

})
export default SignInScreen;
