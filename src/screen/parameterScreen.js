import { createBottomTabNavigator } from 'react-navigation-tabs';
import LoginScreen from "../screen/signInScreen";
import LoginSuivant from "../screen/signUpScreen";

// Le stack utilise le bouton "Précédent" du téléphone
export default createBottomTabNavigator({
    Login: {screen: LoginScreen},
    Suivant: {screen: LoginSuivant}
  })