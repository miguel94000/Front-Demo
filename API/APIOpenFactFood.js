import axios from "axios";

// Recoit en parametre un code barre et retourne en .json une fiche produit
  export default axios.create({
    baseURL: "https://world.openfoodfacts.org/api/v0/product/"
})
    
