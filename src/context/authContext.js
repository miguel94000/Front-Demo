import createDataContext from "./createDataContext"
import apiConnectBack from "../../API/apiConnectBack"

export const authReducer = (state, action) => {
    switch (action.type) {
        case "signIn":
            return {
                token: action.token,
                status: action.status,
                profil: action.user
                    }

        case "add_error":
            return{
                ...state, 
                status: action.status,
                error: action.errorMessage
            }
        default:
            return state;
    }
}

// Authentification
const signIn = (dispatch) => async ({
    email, 
    password,
}) =>{

   // Appel Back en utilisant une Promise
    // apiConnectBack.post("/signin", {email, password}).then(
    // response =>{
    //   AsyncStorage.setItem('token', response.data.token);
    //   }
    // ).catch(error => console.log(error.response.data.error))

    // Appel Back en utilisant l'asyn await
    try {
        const response =  await apiConnectBack.post("/signin", {email, password})
        // await AsyncStorage.setItem('token', response.data.token); // possibilité de le stoker en interne
        dispatch({
            type: "signIn", 
            token: response.data.token,
            profil: response.data.user,
            status: response.status
        })
        navigation.navigate("Home");
        
      } catch (erreur) {
        dispatch({
            type: "add_error", 
            status: erreur.response.status,
            errorMessage: erreur.response.data.error,
        })
      }
}

export const{Provider, Context} = createDataContext(authReducer, {signIn})