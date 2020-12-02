import createDataContext from "./createDataContext";
import apiConnectBack from "../../API/apiConnectBack";
import { AsyncStorage } from "react-native";
import alertTool from "../tools/alertTool";
import { navigate } from "../navigationRef";
import apiOpenFact from "../../API/APIOpenFactFood";

/*
Etat du state dans cette ordre: Avatar, UseridProfil, UserIdUser, Sexe, Facebook, Instagram, Twitter, Website, Description

*/
export const authReducer = (state, action) => {
  switch (action.type) {
    case "signIn":
      return {
        token: action.token,
        status: action.status,
        user: action.user,
        profil: action.profil,
      };
    case "signUp":
      return {
        token: action.token,
        status: action.status,
        user: action.user,
        profil: action.profil,
      };
    case "changePwd":
      return {
        ...state,
        token: action.token,
        status: action.status,
      };
    case "get_user_profil":
      return {
        ...state,
        token: action.token,
        status: action.status,
        profil: action.profil,
      };
    case "save_avatar_profil":
      return {
        ...state,
        token: action.token,
        status: action.status,
        profil: action.profil,
      };
    case "save_changes_profil":
      return {
        ...state,
        token: action.token,
        status: action.status,
        profil: action.profil,
      };
    case "restore_password":
      return {
        ...state,
      };

    // Partie: Produit
    case "search_product":
      return {
        ...state,
        product: action.product,
      };
    default:
      return state;
  }
};

// Authentification
const signIn = (dispatch) => async ({ email, password }) => {
  // Appel Back en utilisant une Promise
  // apiConnectBack.post("/signin", {email, password}).then(
  // response =>{
  //   AsyncStorage.setItem('token', response.data.token);
  //   }
  // ).catch(error => console.log(error.response.data.error))

  // Appel Back en utilisant l'asyn await
  try {
    const response = await apiConnectBack.post("/signin", { email, password });
    await AsyncStorage.setItem("token", response.data.token); // possibilité de le stoker en interne
    dispatch({
      type: "signIn",
      token: response.data.token,
      user: response.data.user,
      status: response.status,
      profil: response.data.userProfil,
    });
    navigate("Home");
  } catch (erreur) {
    alertTool(erreur.response.data.error);
  }
};

// Inscription
const signUp = (dispatch) => async ({ pseudo, email, password }) => {
  // Appel Back en utilisant l'asyn await
  try {
    const response = await apiConnectBack.post("/signup", {
      pseudo,
      email,
      password,
    });
    await AsyncStorage.setItem("token", response.data.token); // possibilité de le stoker en interne
    dispatch({
      type: "signUp",
      token: response.data.token,
      user: response.data.user,
      status: response.status,
      profil: response.data.userProfil,
    });
  } catch (erreur) {
    alertTool(erreur.response.data.error);
  }
};

// Sauvegarde des modification du profil
const saveChangesProfil = (dispatch) => async ({
  pseudo,
  sexe,
  facebook,
  instagram,
  twitter,
  website,
  description,
  token,
}) => {
  // Appel Back en utilisant l'asyn await
  try {
    const response = await apiConnectBack.post("/savechangesprofil", {
      pseudo,
      sexe,
      facebook,
      instagram,
      twitter,
      website,
      description,
      token,
    });
    dispatch({
      type: "save_changes_profil",
      token: response.data.token,
      user: response.data.user,
      status: response.status,
      profil: response.data.userProfil,
    });
  } catch (erreur) {
    alertTool(erreur.response.data.error);
  }
};

// Sauvegarde l'avatar du profil
const saveAvatarProfil = (dispatch) => async ({ avatar, token }) => {
  // Appel Back en utilisant l'asyn await
  try {
    const response = await apiConnectBack.post("/saveavatarprofil", {
      avatar,
      token,
    });
    dispatch({
      type: "save_avatar_profil",
      token: response.data.token,
      user: response.data.user,
      status: response.status,
      profil: response.data.userProfil,
    });
    navigate("Profil");
  } catch (erreur) {
    alertTool(erreur.response.data.error);
  }
};

// Mettre à jour le mot de passe
const changePwd = (dispatch) => async ({ oldPassword, newPassword, token }) => {
  // Appel Back en utilisant l'asyn await
  try {
    const response = await apiConnectBack.post("/passwordupdate", {
      oldPassword,
      newPassword,
      token,
    });
    dispatch({
      type: "changePwd",
      token: response.data.token,
      status: response.status,
    });
  } catch (erreur) {
    alertTool(erreur.response.data.error);
  }
  console.log("OUIII");
  return true;
};

// Récupérer Information profil car si app fermer state détruit via un GET avec AXIOS
const getUserProfil = (dispatch) => async ({ token }) => {
  try {
    const response = await apiConnectBack.get("/get_user_profil", {
      params: { token },
    });
    dispatch({
      type: "get_user_profil",
      token: response.data.token,
      user: response.data.user,
      status: response.status,
      profil: response.data.userProfil,
    });
  } catch (erreur) {
    alertTool(erreur.response.data.error);
  }
};

// Réinitialise le mot de passe
const restorePwd = (dispatch) => async ({ email }) => {
  try {
    const response = await apiConnectBack.post("/restore_password", {
      token,
    });
    dispatch({
      type: "restore_password",
      status: response.status,
    });
  } catch (erreur) {
    alertTool(erreur.response.data.error);
  }
};

// Recherche un produit via l'API
const searchProduct = (dispatch) => async ( data ) => {
  try {
    const response = await apiOpenFact.post(data,".json");
    if(response.data.status == "0"){
      return false;
    }

    dispatch({
      type: "search_product",
      product: response.data,
    });
    return true
  } catch (erreur) {
    alertTool(erreur.response.data.error);
    return false
  }
};

export const { Provider, Context } = createDataContext(authReducer, {
  signIn,
  signUp,
  getUserProfil,
  saveChangesProfil,
  saveAvatarProfil,
  changePwd,
  restorePwd,
  searchProduct,
});
