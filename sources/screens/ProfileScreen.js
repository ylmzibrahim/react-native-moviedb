import React from 'react';
import {View, SafeAreaView, StyleSheet, Alert} from 'react-native';
import { Avatar, Title, Caption, Text, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { sendLogoutRequest } from '../utils/apiRequests';
import { getUserToken, deleteUserToken } from '../utils/handleTokens'
//import Share from 'react-native-share';
//import files from '../assets/filesBase64';

export default ProfileScreen;

function ProfileScreen ({ navigation }){
{/*
  const myCustomShare = async() => {
    const shareOptions = {
      //message: '',
      //url: appLogo,
      // urls: [image1, image2]
    }

    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log(JSON.stringify(ShareResponse));
    } catch(error) {
      console.log('Error => ', error);
    }
  };
*/}

  const handleLogout = async () => {
    const user_token = await getUserToken();
    const response = await sendLogoutRequest(user_token);
    if(response == 401) {
      return Alert.alert('Error!', 'An error happened.', 'okay');
    }
    await deleteUserToken();
    return navigation.navigate('SignInScreen');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
            source={{
              uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
            }}
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>İbrahim Yılmaz</Title>
            <Caption style={styles.caption}>@ibrahimylmzzzz</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>Eskisehir, Turkey</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>+90 5368306456</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>ibrahimyilmaz026@gmail.com</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>20</Title>
            <Caption>Movies Watched</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>10</Title>
            <Caption>Movies to Watched</Caption>
          </View>
      </View>

      <View style={styles.menuWrapper}>
     
        <TouchableRipple onPress={() => handleLogout()}>
          <View style={styles.menuItem}>
            <Icon name="logout" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Log Out</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate('HomeScreen')}>
          <View style={styles.menuItem}>
            <Icon name="logout" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Home Screen</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};




const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    userInfoSection: {
      paddingHorizontal: 30,
      marginBottom: 25,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      fontWeight: '500',
    },
    row: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    infoBoxWrapper: {
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1,
      borderTopColor: '#dddddd',
      borderTopWidth: 1,
      flexDirection: 'row',
      height: 100,
    },
    infoBox: {
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuWrapper: {
      marginTop: 10,
    },
    menuItem: {
      flexDirection: 'row',
      paddingVertical: 15,
      paddingHorizontal: 30,
    },
    menuItemText: {
      color: '#777777',
      marginLeft: 20,
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 26,
    },
});


/*
<TouchableRipple onPress={() => navigation.navigate('WatchlistScreen')}>
<View style={styles.menuItem}>
  <Icon name="heart-outline" color="#FF6347" size={25}/>
  <Text style={styles.menuItemText}>Favorites</Text>
</View>
</TouchableRipple>
<TouchableRipple onPress={() => console.log('Pressed')}>
<View style={styles.menuItem}>
  <Icon name="credit-card" color="#FF6347" size={25}/>
  <Text style={styles.menuItemText}>Watched</Text>
</View>
</TouchableRipple>
<TouchableRipple onPress={() => navigation.navigate('EditProfileScreen')}>
<View style={styles.menuItem}>
  <Icon name="account-settings-outline" color="#FF6347" size={25}/>
  <Text style={styles.menuItemText}>Edit Profile</Text>
</View>
</TouchableRipple>
*/