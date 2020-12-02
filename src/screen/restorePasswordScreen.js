import React, { useState, useContext } from "react";
import { Text, Image, View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { Context as AuthContext } from "../context/authContext";

const restorePasswordScreen = ({ navigation }) => {
  const { restorePwd } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [loadButton, setLoadButton] = useState(false);
  const [activedButton, setActivedButton] = useState(false);

  const goRestorePwd = async () => {
    await restorePwd({ email });
    setLoadButton(false);
    setActivedButton(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Réinitialiser{"\n"}votre mot de passe</Text>
      <Image
        style={styles.logo_app}
        source={require("../../assets/logo.png")}
      />
        <TextInput
          mode="outlined"
          style={styles.textInput}
          label="Entrer votre email"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
      <Button
        style={styles.confirmed_Button}
        color="white"
        disabled={activedButton}
        loading={loadButton}
        onPress={() => {
          setActivedButton(true);
          setLoadButton(true);
          goRestorePwd();
        }}
      >
        <Text style={styles.confirmed_Text_Button}>Réinitialiser</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingBottom: 100,
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

  textInput: {},
  confirmed_Button: {
    backgroundColor: "#488EED",
    paddingTop: 12,
    alignSelf: "center",
    height: 70,
    width: 300,
    marginBottom: 100,
  },
  confirmed_Text_Button: {
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default restorePasswordScreen;
