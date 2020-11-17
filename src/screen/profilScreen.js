import React, { useContext, useState } from "react";
import { Avatar } from "react-native-elements";
import { Text, View, StyleSheet, AsyncStorage } from "react-native";
import { Context as AuthContext } from "../context/authContext";
import { Button, RadioButton, TextInput, Modal } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import UploadPics from "../tools/ajoutImage";

const ProfilScreen = ({ navigation }) => {
  // Appel du state pour remplir le profil
  const { state, saveChangesProfil } = useContext(AuthContext);
  const token = state.token;

  // Permet de gerer l'affichage des boutons de modification profil "annuler / enregistrer"
  const [showUpdateButton, setshowUpdateButton] = React.useState(false);

  // Permet d'afficher la popup de selection de l'image a importer
  const [showUploadPicsButton, setShowUploadPicsButton] = React.useState(false);

  // Alimentation des champs
  const [avatar, setAvatar] = React.useState(state.profil.avatar);
  const [pseudo, setPseudo] = React.useState(state.profil.pseudo);
  const [sexe, setSexe] = React.useState(state.profil.sexe);
  const [facebook, setFacebook] = React.useState(state.profil.facebook);
  const [instagram, setInstagram] = React.useState(state.profil.instagram);
  const [twitter, setTwitter] = React.useState(state.profil.twitter);
  const [website, setWebsite] = React.useState(state.profil.website);
  const [description, setDescription] = React.useState(
    state.profil.description
  );
  
  function loadAvatar () {
    setAvatar(state.profil.avatar);
  }


  //Cinématique de déconnexion
  const deconnexion = async () => {
    await AsyncStorage.removeItem("token");
    navigation.navigate("Home");
  };

  // Cinématique d'annulation
  const annuler = () => {
    setshowUpdateButton(!showUpdateButton);
    setPseudo(state.profil.pseudo);
    setSexe(state.profil.sexe);
    setFacebook(state.profil.facebook);
    setInstagram(state.profil.instagram);
    setTwitter(state.profil.twitter);
    setWebsite(state.profil.website);
    setDescription(state.profil.description);
  };

  // Verifie si le champ a été modifié
  const checkTextInput = (aText, idText) => {
    aText != state.profil[idText]
      ? setshowUpdateButton(true)
      : setshowUpdateButton(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.identity_container}>
        <View style={styles.avatar_container}>
          <Avatar
            rounded
            source={{
              uri: "data:image/png;base64," + avatar,
            }}
            style={styles.avatar_pics}
          />

          <Button
            style={styles.avatar_button}
            onPress={() => setShowUploadPicsButton(true)}
            
          >
            <Icon name="pencil" size={13} color="#fff" />
          </Button>
        </View>
        <View style={styles.infos_container}>
          <TextInput
            style={styles.pseudo_text}
            value={pseudo}
            onChangeText={(pseudo) => {
              setPseudo(pseudo);
              checkTextInput(pseudo, "pseudo");
            }}
          />
          <View>
            <RadioButton.Item
              color="red"
              label="Femme"
              value="Femme"
              status={sexe === "Femme" ? "checked" : "unchecked"}
              onPress={() => {
                setSexe("Femme");
                checkTextInput("Femme", "sexe");
              }}
            />
            <RadioButton.Item
              color="red"
              label="Homme"
              value="Homme"
              status={sexe === "Homme" ? "checked" : "unchecked"}
              onPress={() => {
                setSexe("Homme");
                checkTextInput("Homme", "sexe");
              }}
            />
          </View>
        </View>
      </View>
      <TextInput
        value={description}
        mode="outlined"
        label="Bio"
        style={styles.description_text}
        multiline={true}
        numberOfLines={2}
        maxLength={70}
        onChangeText={(description) => {
          setDescription(description);
          checkTextInput(description, "description");
        }}
      ></TextInput>
      <View style={styles.network_container}>
        <TextInput
          style={styles.network_text}
          label="Facebook"
          value={facebook}
          onChangeText={(facebook) => {
            setFacebook(facebook);
            checkTextInput(facebook, "facebook");
          }}
        />
        <TextInput
          style={styles.network_text}
          label="Instagram"
          value={instagram}
          onChangeText={(instagram) => {
            setInstagram(instagram);
            checkTextInput(instagram, "instagram");
          }}
        />
        <TextInput
          style={styles.network_text}
          label="Twitter"
          value={twitter}
          onChangeText={(twitter) => {
            setTwitter(twitter);
            checkTextInput(twitter, "twitter");
          }}
        />
        <TextInput
          style={styles.network_text}
          label="Site Web"
          value={website}
          onChangeText={(website) => {
            setWebsite(website);
            checkTextInput(website, "website");
          }}
        />
      </View>
      {showUpdateButton || state.status != 200 ? (
        <View style={styles.validationButton_container}>
          <Button style={styles.annuler_button} onPress={() => annuler()}>
            <Text>annuler</Text>
          </Button>
          <Button
            style={styles.sauvegarder_button}
            onPress={() => {
              saveChangesProfil({
                pseudo,
                sexe,
                facebook,
                instagram,
                twitter,
                website,
                description,
                token,
              });
              setshowUpdateButton(false);
            }}
          >
            <Text>sauvegarder</Text>
          </Button>
        </View>
      ) : null}
      <Button style={styles.deconnexion_button} onPress={() => deconnexion()}>
        <Text>Deconnexion</Text>
      </Button>
      <Modal
        visible={showUploadPicsButton}
        onDismiss={() => {
          setAvatar(state.profil.avatar);
          setShowUploadPicsButton(false);
        }}
        contentContainerStyle={styles.avatar_modal}
      >
        <UploadPics loadAvatar={loadAvatar} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "grey",
    justifyContent: "space-between",
  },
  identity_container: {
    backgroundColor: "pink",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  avatar_container: {
    width: "30%",
    height: 190,
    padding: 10,
  },
  avatar_pics: {
    height: "100%",
  },
  avatar_button: {
    position: "absolute",
    backgroundColor: "blue",
    left: -20,
  },
  avatar_modal: {
    backgroundColor: "white",
    padding: 20,
  },
  infos_container: {
    backgroundColor: "blue",
    width: "67%",
  },
  pseudo_text: {
    fontWeight: "bold",
    fontSize: 20,
    margin: 10,
  },
  sexe_button: {
    fontWeight: "bold",
    fontSize: 20,
    margin: 10,
    backgroundColor: "red",
  },
  description_text: {
    color: "#666666",
    backgroundColor: "grey",
  },
  network_container: {},
  network_text: {
    margin: 10,
  },
  deconnexion_button: {
    backgroundColor: "white",
    bottom: 0,
    width: "100%",
    padding: 10,
    alignItems: "center",
  },
  validationButton_container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  sauvegarder_button: {
    backgroundColor: "white",
    padding: 10,
    width: "60%",
  },
  annuler_button: {
    backgroundColor: "white",
    padding: 10,
    width: "35%",
  },
});
export default ProfilScreen;
