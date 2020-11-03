const axios = require('axios');
const API_CODE_BARRE = "737628064502";

export default function getProduit () {
  const url = 'https://world.openfoodfacts.org/api/v0/product/' + API_CODE_BARRE + '.json'

  return axios.get(url)
  
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  
}