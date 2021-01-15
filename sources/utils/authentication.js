const axios = require('axios');

const config = {
    method: 'GET',
    url: 'https://us-central1-react-native-mdb.cloudfunctions.net/getAccessToken',
    headers: { 
        'Accept': 'application/json', 
    },
};

module.exports = async () => {
    const response = await axios(config).then( (response) => {
        if(response.status == 200) return response.data;
        return false;
    }).catch((error) => {
        console.log(error);
        return false;
    })
    return response;
}