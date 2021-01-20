import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import GenreScreen from '../screens/GenreScreen';
import WatchlistScreen from '../screens/WatchlistScreen'

const Stack = new createStackNavigator();

function RootStack() {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='SplashScreen' component={SplashScreen} />
                <Stack.Screen name='HomeScreen' component={HomeScreen} />
                <Stack.Screen name='GenreScreen' component={GenreScreen} />
                <Stack.Screen name='DetailsScreen' component={DetailsScreen} />
                <Stack.Screen name='SignInScreen' component={SignInScreen} />
                <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
                <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
                <Stack.Screen name='WatchlistScreen' component={WatchlistScreen} />
                <Stack.Screen name='EditProfileScreen' component={EditProfileScreen} />
                
            </Stack.Navigator> 
        </NavigationContainer>
    )
}

export default RootStack;