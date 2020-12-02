import React, { useState, useEffect, useContext } from "react";
import { Image, View, Text, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Context as AuthContext } from "../context/authContext";
import { Modal, ActivityIndicator, Colors } from "react-native-paper";

// Scan du code barre
const scannerScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loadind, setLoading] = useState(false);
  const { searchProduct } = useContext(AuthContext);

  useEffect(() => {
    // Demande la permission pour accéder à la camera dès le chargement de la vue
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Affichage du scan code barre si il y a une permission
  if (hasPermission === null) {
    return <Text>Requière une perssion pour accéder à la camera</Text>;
  }
  if (hasPermission === false) {
    return <Text>Pas d'accès à la camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        style={styles.code_barre}
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={
          scanned
            ? undefined
            : async ({data}) => {
                setLoading(true);
                setScanned(true);
                // Cinématique de gestion du code barre une fois scanné
                console.log("Scanner :", data);
                const continued = await searchProduct(data);
                setTimeout(() => {
                  setScanned(false);
                  setLoading(false);
                  continued ? navigation.navigate("Product") : null;
                }, 1000);
              }
        }
      >
        <Image
          style={styles.code_barre_image}
          source={require("../../assets/cb.png")}
        />
      </BarCodeScanner>
      <Modal
        visible={loadind}
        onDismiss={() => {
          setAvatar(state.profil.avatar);
          setShowUploadPicsButton(false);
        }}
        contentContainerStyle={styles.load_modal}
      >
        <ActivityIndicator animating={true} color="#488EED" />
      </Modal>
    </View>
  );
};

// CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  code_barre: {
    flex: 1,
  },

  code_barre_image: {
    alignSelf: "center",
    marginTop: 300,
  },

  load_modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default scannerScreen;
