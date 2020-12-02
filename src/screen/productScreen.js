import React, { useState, useContext } from "react";
import {  View, Image, StyleSheet } from "react-native";
import { Context as AuthContext } from "../context/authContext";

// Scan du code barre
const scannerScreen = ({ navigation }) => {
  const { state } = useContext(AuthContext);
  // const [productImage, setProductImage] = useState(null);
  console.log("PRODUCT :",state.product.product.image_url);
  // console.log("PRODUCT :",state.product);

  return (
    <View style={styles.container}>
      <Image
        style={styles.code_barre_image}
        source={{uri: state.product.product.image_url}}
      ></Image>
    </View>
  );
};

// CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  code_barre_image:{
    width: 300,
    height: 500,
  },

 
});

export default scannerScreen;
