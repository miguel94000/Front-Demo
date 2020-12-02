import React, { useContext, useState } from "react";
import { Avatar, Accessory } from "react-native-elements";
import {
  Text,
  TextInput as TextInput2,
  View,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import { Context as AuthContext } from "../context/authContext";
import { Button, RadioButton, TextInput, Modal } from "react-native-paper";
import UploadPics from "../tools/ajoutImage";
import { TouchableOpacity } from "react-native-gesture-handler";

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
  const [loadButton, setLoadButton] = useState(false);
  const [activedButton, setActivedButton] = useState(false);

  const [description, setDescription] = React.useState(
    state.profil.description
  );

  function loadAvatar() {
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

  // Cinématique lors de sauvegarde du profil
  const saveButton = () => {
    setLoadButton(true);
    setActivedButton(true);
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
    setTimeout(() => {
      setshowUpdateButton(false);
      setLoadButton(false);
      setActivedButton(false);
    }, 3000);
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
          <Accessory
            onPress={() => setShowUploadPicsButton(true)}
            style={styles.avatar_button}
            color="white"
            size={30}
          />
        </View>
        <View style={styles.infos_container}>
          <TextInput2
            style={styles.pseudo_text}
            value={pseudo}
            onChangeText={(pseudo) => {
              setPseudo(pseudo);
              checkTextInput(pseudo, "pseudo");
            }}
          />
          <TouchableOpacity style={styles.change_Pwd_Button}
           onPress={() => { navigation.navigate("ChangePwd");}}
          >
            <Text style={styles.change_Pwd_Text_Button}>Changer de mot de passe</Text>
          </TouchableOpacity>
          <View style={styles.sexe_button_container}>
            <RadioButton.Item
              color="#488EED"
              label="Femme"
              value="Femme"
              status={sexe === "Femme" ? "checked" : "unchecked"}
              onPress={() => {
                setSexe("Femme");
                checkTextInput("Femme", "sexe");
              }}
            />
            <RadioButton.Item
              color="#488EED"
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
      {showUpdateButton ? (
        <View style={styles.validationButton_container}>
          <Button
            style={styles.annuler_button}
            disabled={activedButton}
            onPress={() => annuler()}
          >
            <Text>annuler</Text>
          </Button>
          <Button
            style={styles.sauvegarder_button}
            color="white"
            loading={loadButton}
            disabled={activedButton}
            onPress={() => saveButton()}
          >
            <Text>sauvegarder</Text>
          </Button>
        </View>
      ) : (
        <Button
          color="white"
          style={styles.deconnexion_button}
          onPress={() => deconnexion()}
        >
          <Text>Deconnexion</Text>
        </Button>
      )}

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
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  identity_container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatar_container: {
    width: "30%",
    height: 190,
  },
  avatar_pics: {
    height: "100%",
    borderWidth: 4,
    padding: 1,
    borderRadius: 20,
    borderColor: "#488EED",
  },
  avatar_button: {
    backgroundColor: "#488EED",
  },
  avatar_modal: {},
  infos_container: {
    width: "67%",
    justifyContent: "space-between",
  },
  pseudo_text: {
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
    fontSize: 20,
    paddingBottom: 10,
    margin: 10,
    borderBottomWidth: 1,
    borderColor: "#488EED",
  },
  change_Pwd_Button:{
    alignSelf:"center",
  },
  change_Pwd_Text_Button:{
    fontWeight:"bold",
    color:"#488EED",
    fontSize:10,
    textTransform:"uppercase",
  },
  sexe_button_container: {},
  description_text: {
    marginTop: 5,
  },
  network_container: {
    justifyContent: "space-between",
    height: "40%",
  },
  network_text: {
    backgroundColor: "white",
  },
  validationButton_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    height: 60,
    paddingHorizontal: 20,
  },
  annuler_button: {
    borderColor: "#488EED",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "white",
    paddingTop: 10,
  },
  sauvegarder_button: {
    backgroundColor: "#488EED",
    paddingTop: 10,
  },
  deconnexion_button: {
    backgroundColor: "#488EED",
    marginBottom: 40,
    paddingTop: 10,
    height: 60,
    marginHorizontal: 40,
  },
});
export default ProfilScreen;
