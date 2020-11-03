import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import apiConnectBack from '../../API/apiConnectBack';

// Bouton d'acceuil
const BoutonMenuAccueil = ({ children, linkValue }) => {
  return (<TouchableOpacity style={styles.BoutonMenuAccueil} onPress={linkValue} >
    {children}
  </TouchableOpacity>
)};

  const ChoiceAuthScreen = ({ navigation }) => {

    return (
      <View style={styles.container}>
        <BoutonMenuAccueil linkValue={() => navigation.navigate("SignIn")}> 
          <Text>
            Connexion
          </Text>
          </BoutonMenuAccueil>
          <BoutonMenuAccueil linkValue={() => navigation.navigate("SignUp")}>
          <Text>
            Inscription
          </Text>
        </BoutonMenuAccueil>
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

    BoutonMenuAccueil: {
backgroundColor: "green",
marginVertical: 10,
    }

  })
  export default ChoiceAuthScreen;
