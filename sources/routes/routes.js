import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './splashScreen';
import Home from './home';

const Stack = new createStackNavigator();

function Routes() {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='SplashScreen' component={SplashScreen} />
                <Stack.Screen name='Home' component={Home} />
            </Stack.Navigator> 
        </NavigationContainer>
    )
}

export default Routes;