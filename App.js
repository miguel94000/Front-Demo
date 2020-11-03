import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { setNavigator } from "./src/navigationRef";
import SignUpScreen from "./src/screen/signUpScreen";
import SignInScreen from "./src/screen/signInScreen";
import HomeScreen from "./src/screen/homeScreen";
import ParameterScreen from "./src/screen/parameterScreen";
import ScannerScreen from "./src/screen/scannerScreen";
import SearchScreen from "./src/screen/searchScreen";
import HistoryScreen from "./src/screen/historyScreen";
import FavoriteScreen from "./src/screen/favoriteScreen";
import ChoiceAuthScreen from "./src/screen/choiceAuthScreen";
import ProductScreen from "./src/screen/productScreen";
import ProfilScreen from "./src/screen/profilScreen";
import {Provider as AuthProvider} from "./src/context/authContext"

import BottomBar from "./src/tools/bottonBar";


// Switch est un site map simple "squelette de l'app"
const switchNavigator = createSwitchNavigator(
  {
    // Le stack utilise le bouton "Précédent" du téléphone
    //BottomFlow: BottomBar,

    // Le stack utilise le bouton "Précédent" du téléphone
    LoginFlow: createStackNavigator({
      Home: HomeScreen,
      Parameter: ParameterScreen,
      ChoiceAuth: ChoiceAuthScreen,
      SignUp: SignUpScreen,
      SignIn: SignInScreen,
      Profil: ProfilScreen,
      Scanner: ScannerScreen,
      Search: SearchScreen,
      Favorite: FavoriteScreen,
      History: HistoryScreen,
      Product: ProductScreen
    })
  },
  );

const App = createAppContainer(switchNavigator);

export default () => {
   return (
     <AuthProvider>

     <App
     ref={(navigator) => {
       setNavigator(navigator);
      }}>
        </App>
      </AuthProvider>
  );
};