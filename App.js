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
import { Provider as AuthProvider } from "./src/context/authContext";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

// Custom theme pour react nativ paper
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#488EED",
  },
};

// Custom header pour la home
let naviguationOptionHome = {
  title: "",
  headerTransparent: "true",
};

// Custom header des autres pages pour n'afficher que le boutton de naviguation
let naviguationOptionScreen = {
  title: "",
  headerTransparent: "true",
};

// Switch est un site map simple "squelette de l'app"
const switchNavigator = createSwitchNavigator({
  // Le stack utilise le bouton "Précédent" du téléphone
  LoginFlow: createStackNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: () => naviguationOptionHome,
    },
    Parameter: {
      screen: ParameterScreen,
      navigationOptions: () => naviguationOptionScreen,
    },
    ChoiceAuth: ChoiceAuthScreen,
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: () => naviguationOptionScreen,
    },
    SignIn: {
      screen: SignInScreen,
      navigationOptions: () => naviguationOptionScreen,
    },
    Profil: ProfilScreen,
    Scanner: ScannerScreen,
    Search: SearchScreen,
    Favorite: FavoriteScreen,
    History: HistoryScreen,
    Product: ProductScreen,
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <App
          ref={(navigator) => {
            setNavigator(navigator);
          }}
        ></App>
      </PaperProvider>
    </AuthProvider>
  );
};
