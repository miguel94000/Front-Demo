import { Alert } from "react-native";

export default (erreur) => {
 Alert.alert(
   "Erreur de connexion",
   erreur,
   [
     {
       text: "Annuler",
       onPress: () => console.log("Cancel Pressed"),
       style: "cancel",
     },
     { text: "OK", onPress: () => console.log("OK Pressed") },
   ],
   { cancelable: false }
 )};