const axios = require('axios');


const apiURL = 'https://bil3007.herokuapp.com';

//Sends login request using client token
//returns response body(access_token) if status code is 200 otherwise returns status code
const sendLoginRequest = async (email , password, clientToken) => {
    const config = {
        method: 'POST',
        url : apiURL + '/api/user/login',
        headers: { 
            'Accept': 'application/json', 
            'Authorization': 'Bearer ' + clientToken
        },
        data: {
            'email': email,
            'password': password
        },
        validateStatus: function (status) {
            return status >= 200 && status <= 409;
        }
    }

    return await axios(config).then( (response) => {
        if(response.status == 200) return response.data;
        return response.status;
    }).catch((error) => {
        console.log(error);
        return -1;
    });
}

//Sends register request using client token
//returns response body(access_token) if status code is 200 otherwise returns status code
const sendRegisterRequest = async (user_name , email, password, password_conf, clientToken) => {
    const config = {
        method: 'POST',
        url : apiURL + '/api/user/register',
        headers: { 
            'Accept': 'application/json', 
            'Authorization': 'Bearer ' + clientToken
        },
        data: {
            'name' : user_name,
            'email': email,
            'password': password,
            'password_confirmation' : password_conf
        },
        validateStatus: function (status) {
            return status >= 200 && status <= 409;
        }
    }

    return await axios(config).then( (response) => {
        if(response.status == 200) return response.data;
        return response.status;
    }).catch((error) => {
        console.log(error);
        return -1;
    });
}


//Sends logout request using user token
//returns response status
const sendLogoutRequest = async (userToken) => {
    const config = {
        method: 'POST',
        url : apiURL + '/api/user/logout',
        headers: { 
            'Accept': 'application/json', 
            'Authorization': 'Bearer ' + userToken
        },
        validateStatus: function (status) {
            return status >= 200 && status <= 409;
        }
    }

    return await axios(config).then( (response) => {
        return response.status;
    }).catch((error) => {
        console.log(error);
        return -1;
    });
}


//Fetches user profile data (Id, name, mail, mail_verified_at, photourl)
//if successful returns response body else returns status code
const getProfile = async (userToken) => {
    const config = {
        method: 'GET',
        url : apiURL + '/api/user/',
        headers: { 
            'Accept': 'application/json', 
            'Authorization': 'Bearer ' + userToken
        },
        validateStatus: function (status) {
            return status >= 200 && status <= 409;
        }
    }

    return await axios(config).then( (response) => {
        if(response.status == 200) return response.data;
        return response.status;
    }).catch((error) => {
        console.log(error);
        return -1;
    });
}

exports.sendLoginRequest = sendLoginRequest;
exports.sendRegisterRequest = sendRegisterRequest;
exports.sendLogoutRequest = sendLogoutRequest;
exports.getProfile = getProfile;