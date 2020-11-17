import createDataContext from "./createDataContext";
import apiConnectBack from "../../API/apiConnectBack";
import { AsyncStorage } from "react-native";
import alertTool from "../tools/alertTool";
import { navigate } from "../navigationRef";

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

    case "get_user_profil":
      return {
        ...state,
        token: action.token,
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

export const { Provider, Context } = createDataContext(authReducer, {
  signIn,
  getUserProfil,
  saveChangesProfil,
  saveAvatarProfil,
});
