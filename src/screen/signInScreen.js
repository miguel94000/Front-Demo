import React, { useState, useContext } from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Context as AuthContext } from "../context/authContext";

const SignInScreen = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadButton, setLoadButton] = useState(false);
  const [activedButton, setActivedButton] = useState(false);

  const goSignIn = () => {
    setTimeout(() => {
      signIn({ email, password });
      setLoadButton(false);
      setActivedButton(false);
    }, 3000);
  };
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
        <TouchableOpacity style={styles.pwd_Forget_Button}>
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
        onPress={() => {
          setActivedButton(true)
          setLoadButton(true);
          goSignIn()
        }}
      >
        <Text>Se connecter</Text>
      </Button>
      <View style={styles.go_signUp_container}>
        <Text>Pas de compte ? </Text>
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
    backgroundColor:"white",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  titre: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 25,
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
  textInput: {
  },
  pwd_Forget_Button: {
    width: "50%",
    alignSelf: "flex-end",
  },
  pwd_Forget_Text_Button: {
    fontWeight: "bold",
    color: "#488EED",
  },
  connexion_Button: {
    backgroundColor: "#488EED",
    paddingTop: 10,
    alignSelf: "center",
    height: 70,
    width: 300,
  },
  go_signUp_container: {
    flexDirection: "row",
    alignSelf: "center",
  },
  go_SignUp_Button: {
    width: "35%",
  },
  go_SignUp_Button_Text: {
    fontWeight: "bold",
    color: "#488EED",
  },
});

export default SignInScreen;
