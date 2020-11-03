import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { TextInput } from 'react-native-paper';
import apiConnectBack from '../../API/apiConnectBack';

// Bouton d'acceuil
const BoutonMenuAccueil = ({ children, linkValue }) => {
  return (<TouchableOpacity style={styles.BoutonMenuAccueil} onPress={linkValue} >
    {children}
  </TouchableOpacity>
)};

// Choix des fenetres de connexion en fonction du token
const isToken = async ({navigation}) => {
  const token = await AsyncStorage.getItem("token");
  token == null ? navigation.navigate("ChoiceAuth"): navigation.navigate("Profil");
} 

  const HomeScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <BoutonMenuAccueil linkValue={() => navigation.navigate("Parameter")}> 
          <Text>
            Parametre
          </Text>
          </BoutonMenuAccueil>
          <BoutonMenuAccueil linkValue={() =>  isToken({navigation}) }>
          <Text>
            Profil
          </Text>
        </BoutonMenuAccueil>
        <BoutonMenuAccueil linkValue={() => navigation.navigate("Scanner")}>
          <Text>
            Scanner un produit
        </Text>
        </BoutonMenuAccueil>
        <BoutonMenuAccueil linkValue={() => navigation.navigate("Search")}>
          <Text>
            Rechercher un produit
        </Text>
        </BoutonMenuAccueil>
        <BoutonMenuAccueil linkValue={() => navigation.navigate("Favorite")}>
          <Text>
            Produit favoris
        </Text>
        </BoutonMenuAccueil>
        <BoutonMenuAccueil linkValue={() => navigation.navigate("History")}>
          <Text>
            Historique un produit
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
  export default HomeScreen;
