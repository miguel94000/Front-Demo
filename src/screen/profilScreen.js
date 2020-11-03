
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { TextInput } from 'react-native-paper';
import apiConnectBack from '../../API/apiConnectBack';

const ProfilScreen = ({navigation}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword]= useState("");
  const deconnexion = async () => {
      const token = await AsyncStorage.getItem("token");
      console.log('mon token : ', token);
    await AsyncStorage.removeItem("token");
    navigation.navigate("Home");
  } 

  return (
    <View style={styles.container}>
      <TextInput style={styles.TextInput}
      label="Email"
      value={email}
      onChangeText={(value)=> setEmail(value)}
      />

      <TouchableOpacity onPress={()=> deconnexion()}>
        <Text>
          Deconnexion
        </Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center"
  },

  textInput:{

  }

})
export default ProfilScreen;
