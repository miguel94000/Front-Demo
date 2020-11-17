import React, { useContext, useEffect } from "react";
import { Text, View, StyleSheet, AsyncStorage } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import IconFont from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-paper";
import { Context as AuthContext } from "../context/authContext";

// Choix des fenetres de connexion en fonction du token
const isToken = async ({ navigation, buttonName }) => {
  const token = await AsyncStorage.getItem("token");
  token == null
    ? navigation.navigate("SignIn")
    : navigation.navigate({ buttonName });
};

// Bouton d'acceuil
const BoutonMenuAccueil = ({ children, linkValue }) => {
  return (
    <Button
      color="white"
      style={styles.bouton_menu_accueil}
      onPress={linkValue}
    >
      {children}
    </Button>
  );
};

const HomeScreen = ({ navigation }) => {
  const { getUserProfil } = useContext(AuthContext);

  // Vérification du token pour recontruire le State
  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("token");
      token === null ? null : getUserProfil({ token });
    };
    getToken();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.param_button_container}>
        <Button
          style={styles.param_button}
          onPress={() => navigation.navigate("Parameter")}
        >
          <Icon name="settings" size={20} color="#488EED" />
        </Button>
        <Button
          style={styles.param_button}
          onPress={() => isToken({ navigation }, "Profil")}
        >
          <IconFont name="user" size={20} color="#488EED" />
        </Button>
      </View>
      <Text style={styles.titre_app}>SCAN PRODUIT 2000</Text>
      <View style={styles.menu_button_container}>
        <BoutonMenuAccueil linkValue={() => navigation.navigate("Scanner")}>
          <Text>Scanner un produit</Text>
        </BoutonMenuAccueil>
        <BoutonMenuAccueil linkValue={() => navigation.navigate("Search")}>
          <Text>Rechercher un produit</Text>
        </BoutonMenuAccueil>
        <BoutonMenuAccueil linkValue={() => navigation.navigate("Favorite")}>
          <Text>Produit favoris</Text>
        </BoutonMenuAccueil>
        <BoutonMenuAccueil linkValue={() => navigation.navigate("History")}>
          <Text>Historique un produit</Text>
        </BoutonMenuAccueil>
      </View>
      <View style={styles.menu_bottom_container}>
        <Text>Ver: 0.8</Text>
      </View>
    </View>
  );
};

// CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  param_button_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 70,
  },
  titre_app: {
    flexGrow: 1,
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 30,
  },
  param_button: {
    width: 0,
  },
  menu_button_container: {
    alignItems: "center",
    justifyContent: "space-around",
    flexGrow: 3,
  },
  bouton_menu_accueil: {
    backgroundColor: "#488EED",
    width: 300,
    height: 80,
    paddingTop: 15,
  },
  menu_bottom_container: {
    alignItems: "flex-end",
    paddingRight: 25,
    marginTop: 100,
  },
});
export default HomeScreen;
