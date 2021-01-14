import React from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import Color from '../theme/Colors'
import { perfectSize } from '../theme/AppScreen'

const SplashScreen = ({ navigation }) => {

    const { colors } = useTheme();

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor={Color.mangoColor} barStyle="light-content"/>
        <View style={styles.header}>
            {/*<Animatable.Image 
                animation="bounceIn"
                duraton="1500"
                source={require('../assets/moviedb_logo.png')}
                style={styles.logo}
                resizeMode="stretch"
            />*/}
            <Text style={styles.headerText}>Movie DB</Text>
        </View>
        <Animatable.View style={styles.footer} animation="fadeInUpBig">
            <Text style={styles.title}>All Your Movies&Series in One Place</Text>
            <Text style={styles.text}>Sign in with account</Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={()=>navigation.navigate('SignInScreen')}>
                <LinearGradient
                    colors={['#ffe259', '#ffa751']}
                    style={styles.signIn}
                >
                <Text style={styles.textSign}>Get Started</Text>
                <MaterialIcons 
                    name="navigate-next"
                    color="#fff"
                    size={20}
                />
                </LinearGradient>
            </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: Color.mangoColor
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 50,
        color: Color.whiteColor,
        fontFamily: 'FredokaOne-Regular'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {

    },
    marker: {
        backgroundColor: Color.blackColor,
        height: perfectSize(12),
        width: perfectSize(200),
        marginTop: perfectSize(18),
        borderRadius: perfectSize(23),
    },
    title: {
        color: Color.blackColor,
        fontSize: 25,
        fontFamily: 'FredokaOne-Regular',
        textAlign: 'center',
        marginHorizontal: 20
    },
    text: {
        color: 'grey',
        marginTop:5,
        textAlign: 'center',
        fontFamily: 'FredokaOne-Regular'
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: Color.whiteColor,
        fontFamily: 'FredokaOne-Regular'
    }
});