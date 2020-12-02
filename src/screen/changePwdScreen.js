import React, { useState, useContext, useEffect } from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { set } from "react-native-reanimated";
import Icon from "react-native-vector-icons/FontAwesome";
import { Context as AuthContext } from "../context/authContext";

const changePwdScreen = ({ navigation }) => {
  const { state, changePwd } = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [secureIcon, setSecureIcon] = useState("eye-slash");
  const [loadButton, setLoadButton] = useState(false);
  const [activedButton, setActivedButton] = useState(false);
  const [suivant, setSuivant] = useState(false);
  const token = state.token;

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Changer{"\n"}votre mot de passe</Text>
      <Image
        style={styles.logo_app}
        source={require("../../assets/logo.png")}
      />
      <View style={styles.textInput_container}>
        <View>
          <TextInput
            mode="outlined"
            style={styles.textInput}
            secureTextEntry={secure}
            label="Ancien mot de passe"
            value={oldPassword}
            onChangeText={(value) => setOldPassword(value)}
          />
          <Button
            style={styles.button_Eye_Old_Pwd}
            onPress={() => {
              setSecure(!secure);
              secureIcon == "eye-slash"
                ? setSecureIcon("eye")
                : setSecureIcon("eye-slash");
            }}
          >
            <Icon name={secureIcon} size={30} color="#488EED" />
          </Button>
        </View>
        <View>
          <TextInput
            mode="outlined"
            style={styles.textInput}
            label="Nouveau mot de passe"
            secureTextEntry={secure}
            value={newPassword}
            onChangeText={(value) => setnewPassword(value)}
          ></TextInput>
          <Button
            style={styles.button_Eye_New_Pwd}
            onPress={() => {
              setSecure(!secure);
              secureIcon == "eye-slash"
                ? setSecureIcon("eye")
                : setSecureIcon("eye-slash");
            }}
          >
            <Icon name={secureIcon} size={30} color="#488EED" />
          </Button>
        </View>
      </View>
      <Button
        style={styles.confirmed_Button}
        color="white"
        disabled={activedButton}
        loading={loadButton}
        onPress={async () => {
          setActivedButton(true);
          setLoadButton(true);
          await changePwd({ oldPassword, newPassword, token });
          setLoadButton(false);
          setActivedButton(false);
        }}
      >
        <Text style={styles.confirmed_Text_Button}>Valider</Text>
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
  textInput_container: {
    justifyContent: "space-between",
    height: "25%",
  },
  textInput: {},
  pwd_Forget_Button: {
    width: "50%",
    alignSelf: "flex-end",
  },
  button_Eye_Old_Pwd: {
    marginTop: 9,
    position: "absolute",
    zIndex: 1,
    alignSelf: "flex-end",
  },
  button_Eye_New_Pwd: {
    marginTop: 9,
    position: "absolute",
    zIndex: 1,
    alignSelf: "flex-end",
  },
  confirmed_Button: {
    backgroundColor: "#488EED",
    paddingTop: 15,
    alignSelf: "center",
    height: 70,
    width: 300,
  },
});

export default changePwdScreen;
