import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, AsyncStorage } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { color } from "react-native-reanimated";
import { Context as AuthContext } from "../context/authContext";

const SignInScreen = () => {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Acceder{"\n"}à votre profil</Text>
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
          label="Mote de passe"
          secureTextEntry={true}
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
      </View>
        <Text style={styles.pwdForget}>Mot de passe oublié ?</Text>
      <Button color="#488EED" onPress={() => signIn({ email, password })}>
        <Text>Se connecter</Text>
      </Button>
      <Text>
        Vous n'avez pas de compte ? <Button>inscrivez vous</Button>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  titre: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 25,
    marginTop: 150,
    color: "#488EED",
    textAlign: "center",
  },
  textInput_container: {
    height: "18%",
    alignItems: "center",
    justifyContent:"space-between"
  },
  textInput: {
    width: "85%",
  },
  pwdForget:{
    backgroundColor:"yellow",
    justifyContent:"flex-end"
  },
});
export default SignInScreen;
