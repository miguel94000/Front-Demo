import React, { useState, useContext } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Context as AuthContext } from "../context/authContext";

// Partie inscription
const SignUpScreen = ({ navigation }) => {
  const { signUp } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [loadButton, setLoadButton] = useState(false);
  const [activedButton, setActivedButton] = useState(false);

  // Cinématique d'inscription
  const signupCall = async () => {
    signUp({ pseudo, email, password });
    setTimeout(() => {
      setLoadButton(false);
      setActivedButton(false);
      navigation.navigate("Home");
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Créer{"\n"}un compte</Text>
      <Image
        style={styles.logo_app}
        source={require("../../assets/logo.png")}
      />
      <View style={styles.textInput_container}>
        <TextInput
          mode="outlined"
          style={styles.TextInput}
          label="Pseudo"
          value={pseudo}
          onChangeText={(value) => setPseudo(value)}
        />

        <TextInput
          mode="outlined"
          style={styles.TextInput}
          label="Email"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />

        <TextInput
          mode="outlined"
          style={styles.TextInput}
          label="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
      </View>
      <Button
        style={styles.connexion_Button}
        color="white"
        disabled={activedButton}
        loading={loadButton}
        onPress={() => {
          setActivedButton(true);
          setLoadButton(true);
          signupCall();
        }}
      >
        <Text>S'inscrire</Text>
      </Button>
      <View style={styles.go_SignIn_Container}>
        <Text>Vous avez déjà un compte ? </Text>
        <TouchableOpacity
          style={styles.go_Signin_Button}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.go_SignIn_Button_Text}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  titre: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 35,
    marginTop: 10,
    color: "#488EED",
    textAlign: "center",
  },
  logo_app: {
    alignSelf: "center",
    width: "20%",
    height: "9%",
    resizeMode: "stretch",
  },
  textInput_container: {
    justifyContent: "space-between",
    height: "27%",
  },
  textInput: {},
  connexion_Button: {
    backgroundColor: "#488EED",
    paddingTop: 15,
    alignSelf: "center",
    height: 70,
    width: 300,
  },
  go_SignIn_Container: {
    flexDirection: "row",
    alignSelf: "center",
  },
  go_SignIn_Button: {
  },
  go_SignIn_Button_Text: {
    fontWeight: "bold",
    color: "#488EED",
  },
});
export default SignUpScreen;
