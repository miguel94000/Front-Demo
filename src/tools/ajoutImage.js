import React, { useContext, useState } from "react";
import { Button, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Context as AuthContext } from "../context/authContext";

const UploadPics = (loadAvatar) => {
  const { state, saveAvatarProfil } = useContext(AuthContext);

  function pickLoad() {
    loadAvatar.loadAvatar();
  }
  // Recherche à partir de la gallerie

  const pickGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 3],
      base64: true,
      quality: 0,
    });
    if (!result.cancelled) {
      const avatar = await result.base64;
      const token = state.token;
      saveAvatarProfil({ avatar, token });
    }
  };

  // Recherche à partir de l'appareil photo
  const pickCam = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 3],
      base64: true,
      quality: 0,
    });
    if (!result.cancelled) {
      const avatar = await result.base64;
      const token = state.token;
      saveAvatarProfil({ avatar, token });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titre_text}>Ajouter une photo</Text>
      <View
        style={{
          alignItems: "stretch",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Button
          icon="camera"
          color="white"
          style={styles.pick_button}
          onPress={pickCam}
        >
          Appareil Photo
        </Button>
        <Button
          icon="upload"
          color="white"
          style={styles.pick_button}
          onPress={pickGallery}
        >
          Galerie
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: 10,
  },
  titre_text: {
    color: "white",
    fontSize: 25,
    marginBottom: 15,
    fontWeight: "bold",
    textTransform: "uppercase",
    alignSelf: "center",
  },
  pick_button: {
    backgroundColor: "#488EED",
    marginVertical: 10,
    marginHorizontal:50,
    height:70,
    paddingTop:15

  },
});

export default UploadPics;
