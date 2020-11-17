import React, { useContext, useState } from "react";
import { Button, Text } from "react-native-paper";
import { View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Context as AuthContext } from "../context/authContext";

const UploadPics = (loadAvatar) => {
  const { state, saveAvatarProfil} = useContext(AuthContext);
  
  function pickLoad(){
    loadAvatar.loadAvatar()
  }
  // Recherche à partir de la gallerie

  const pickGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 3],
      base64: true,
      quality:0
    });
    if (!result.cancelled) {
      const avatar = await result.base64;
      const token =  state.token
      saveAvatarProfil({avatar, token});
    }
  };

  // Recherche à partir de l'appareil photo
  const pickCam = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 3],
      base64: true,
      quality: 0
    });
    if (!result.cancelled) {
      const avatar = await result.base64;
      const token =  state.token
      saveAvatarProfil({avatar, token});
    }
  };

  return (
    <View>
      <Text
        style={{
          marginBottom: 25,
          fontWeight: "bold",
          textTransform: "uppercase",
          alignSelf: "center",
        }}
      >
        Ajouter une photo
      </Text>
      <View
        style={{
          alignItems: "stretch",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Button
          icon="camera"
          mode="contained"
          title="Appareil Photo"
          onPress={pickCam}
        >
          Appareil Photo
        </Button>
        <Button
          icon="upload"
          mode="contained"
          title="Galerie"
          onPress={pickGallery}
        >
          Galerie
        </Button>
        <Button
          icon="circle"
          mode="contained"
          title="Galerie"
          onPress={() =>pickLoad()}
        >
          Galerie
        </Button>
      </View>
    </View>
  );
};

export default UploadPics;
