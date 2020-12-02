import React, { useState, useContext } from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Context as AuthContext } from "../context/authContext";

// Partie Authentification
const SignInScreen = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadButton, setLoadButton] = useState(false);
  const [activedButton, setActivedButton] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Acceder{"\n"}à votre profil</Text>
      <Image
        style={styles.logo_app}
        source={require("../../assets/logo.png")}
      />
      <View style={styles.textInput_container}>
        <TextInput
          mode="outlined"
          style={styles.textInput}
          label="Email"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          mode="outlined"
          style={styles.textInput}
          label="Mot de passe"
          secureTextEntry={true}
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
        <TouchableOpacity
          style={styles.pwd_Forget_Button}
          onPress={() => navigation.navigate("RestorePassword")}
        >
          <Text style={styles.pwd_Forget_Text_Button}>
            Mot de passe oublié ?
          </Text>
        </TouchableOpacity>
      </View>
      <Button
        style={styles.connexion_Button}
        color="white"
        disabled={activedButton}
        loading={loadButton}
        onPress={async () => {
          setActivedButton(true);
          setLoadButton(true);
          await signIn({ email, password });
          setLoadButton(false);
          setActivedButton(false);
        }}
      >
        <Text>Se connecter</Text>
      </Button>
      <View style={styles.go_signUp_container}>
        <Text>Vous n'avez pas de compte ? </Text>
        <TouchableOpacity
          style={styles.go_SignUp_Button}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.go_SignUp_Button_Text}>inscrivez vous</Text>
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
  pwd_Forget_Button: {
    alignSelf: "flex-end",
  },
  pwd_Forget_Text_Button: {
    fontWeight: "bold",
    color: "#488EED",
  },
  connexion_Button: {
    backgroundColor: "#488EED",
    paddingTop: 15,
    alignSelf: "center",
    height: 70,
    width: 300,
  },
  go_signUp_container: {
    flexDirection: "row",
    alignSelf: "center",
  },
  go_SignUp_Button: {},
  go_SignUp_Button_Text: {
    alignSelf: "center",
    fontWeight: "bold",
    color: "#488EED",
  },
});

export default SignInScreen;
