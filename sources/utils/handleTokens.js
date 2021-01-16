import SInfo from 'react-native-sensitive-info'

const saveClientToken = async (token) => {
    return await SInfo.setItem('accessToken' , token , {});
}

const getClientToken = async () => {
    return await SInfo.getItem('accessToken', {});
}

const deleteClientToken = async () => {
    return await SInfo.deleteItem('accessToken', {});
}

const saveUserToken = async (token) => {
    return await SInfo.setItem('userToken' , token , {});
}

const getUserToken = async () => {
    return await SInfo.getItem('userToken', {});
}

const deleteUserToken = async () => {
    return await SInfo.deleteItem('userToken', {});
}

exports.saveClientToken = saveClientToken;
exports.getClientToken = getClientToken;
exports.deleteClientToken = deleteClientToken;
exports.saveUserToken = saveUserToken;
exports.getUserToken = getUserToken;
exports.deleteUserToken = deleteUserToken;