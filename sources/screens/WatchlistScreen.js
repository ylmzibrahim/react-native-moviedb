import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StatusBar, StyleSheet, FlatList, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../theme/Colors';
import { perfectSize } from '../theme/AppScreen';
import { getUserToken } from '../utils/handleTokens';
import { createUserWatchlist, getUserLists, fetchUserWatchlistDetails } from '../utils/apiRequests';

function WatchlistScreen({navigation, route}) {
    
    const [watchlistMovies, setWatchlistMovies] = useState();

    useEffect(() => {
        const getUserWatchlistDetails = async () => {
            const user_token = await getUserToken();
            let response = await getUserLists(user_token);
            console.log(response);
            let watchlist = await response.filter(item => item.name == 'Watchlist');
            if(watchlist.length == 0) {
                await createUserWatchlist(user_token);
                response = await getUserLists(user_token);
                watchlist = await response.filter(item => item.name == 'Watchlist');
            }
            watchlist = watchlist[0];
            const movies = await fetchUserWatchlistDetails(watchlist.id, user_token);
            setWatchlistMovies(movies);
        }
        getUserWatchlistDetails();
    } , [])

    return(
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={Color.appBackgroundColor} barStyle='light-content' />

            <View style={styles.header}>
                <Ionicons name='menu' color={Color.whiteColor} size={30} style={styles.headerIcons} onPress={() => navigation.navigate('SignUpScreen')}/>
                <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                <Text style={styles.title}>Movie DB</Text>
                </TouchableOpacity>
                <FontAwesome name='user-circle' color={Color.whiteColor} size={30} style={styles.headerIcons} onPress={() => navigation.navigate('ProfileScreen')} />
            </View>

            <Text style={styles.movieClass}>MY WATCHLIST</Text>
            <FlatList
                    contentContainerStyle={{paddingHorizontal: 10}}
                    data={watchlistMovies}
                    numColumns={2}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item, index}) => (
                        <TouchableOpacity onPress={() => navigation.navigate('DetailsScreen', item)} >
                            <RenderItemMovies item={item} /> 
                        </TouchableOpacity>
                    )}
            />
            
        </SafeAreaView>
    )
}

export default WatchlistScreen;



function RenderItemMovies({item}) {
    const dateObj = new Date(Date.parse(item.air));
    const fullReleaseDate = dateObj.getFullYear() + ' ' + (parseInt(dateObj.getMonth()) + 1) + ' ' + dateObj.getDate();
    const releaseYear = dateObj.getFullYear();
    return (
        <ImageBackground source={{uri: item.photo_url}} style={styles.postView} resizeMode={'cover'}>
            <Text style={styles.movieTitle} numberOfLines={2} ellipsizeMode={'tail'}>{ item.title }</Text>
            <Text style={styles.movieReleaseDate}>{ releaseYear }</Text>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.appBackgroundColor,
        flex: 1
    },
    title: {
        color: Color.whiteColor,
        fontSize: perfectSize(25),
        fontWeight: 'bold',
        textAlign: 'center',

    },
    header: {
        height: perfectSize(55),
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: Color.shadowColor,
        shadowOffset: {
            width: 0,
            height: perfectSize(12),
        },
        shadowOpacity: 0.50,
        shadowRadius: 16,
        elevation: 4,
        backgroundColor: '#0000' // invisible color
    },
    headerView: {
        flex: 0.5,
        margin: 10
    },
    headerText: {
        color: Color.whiteColor,
        fontSize: 25
    },
    headerIcons: {
        margin: 10,
    },
    genresText: {
        // #0f102b
        color: Color.whiteColor,
        fontWeight: 'bold'
    },
    genresView: {
        //borderBottomWidth: 0.5,
        //borderBottomColor: Color.whiteColor
    },
    genresBorder: {
        // '#f09631'
        backgroundColor: Color.buttonBackground,
        alignSelf: 'flex-start',
        margin: 5,
        padding: 10,
        borderRadius: 5,
    },
    movieClass: {
        color: Color.whiteColor,
        fontSize: 20,
        margin: 10,
    },
    postView: {
        width: 180,
        height: 220,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        flex: 1,
        justifyContent: 'flex-end'
    },
    movieTitle: {
        color: Color.whiteColor,
        padding: 5,
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    movieVoteAverage: {
        backgroundColor: Color.orangeColor,
        alignSelf: 'flex-start',
        padding: 5,
        position: 'absolute',
        top: 2,
        right: 2,
        borderRadius: 10
    },
    movieReleaseDate: {
        color: Color.orangeColor,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignSelf: 'flex-start',
        padding: 5,
        position: 'absolute',
        top: 2,
        left: 2,
        borderRadius: 10
    }
});