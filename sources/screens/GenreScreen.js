import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StatusBar, StyleSheet, FlatList, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../theme/Colors';
import { perfectSize } from '../theme/AppScreen';
import { getClientToken } from '../utils/handleTokens';
import { fetchMoviesByGenre } from '../utils/apiRequests';
import genreList from '../utils/genreList'

function GenreScreen({navigation, route}) {
    
    const [genreMovies, setGenreMovies] = useState();

    useEffect(() => {
        const getGenreMovies = async () => {
            const client_token = await getClientToken();
            const response = await fetchMoviesByGenre(route.params.id, client_token);
            setGenreMovies(response.data);
        }
        getGenreMovies();
        console.log(genreMovies);
    } , [route.params.id])

    return(
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={Color.appBackgroundColor} barStyle='light-content' />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                <Text style={styles.title}>Movie DB</Text>
                </TouchableOpacity>
                <FontAwesome name='user-circle' color={Color.whiteColor} size={30} style={styles.headerIcons} onPress={() => navigation.navigate('ProfileScreen')} />
            </View>

            <View style={styles.genresView}>
                <FlatList
                    style={{maxHeight: 50}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={genreList}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item, index}) => (
                        <TouchableOpacity onPress={() => {navigation.navigate('GenreScreen' , item)}} >
                            <RenderItemGenres item={item}/>
                        </TouchableOpacity>
                    )
                    }
                />
            </View>

            <Text style={styles.movieClass}>{route.params.name.toUpperCase()} MOVIES</Text>
            <FlatList
                    contentContainerStyle={{paddingHorizontal: 10}}
                    data={genreMovies}
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

export default GenreScreen;

function RenderItemGenres({item}) {
    return (
        <View style={styles.genresBorder}>
            <Text style={styles.genresText}>{item.name}</Text>
        </View>
    )
}

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
        paddingHorizontal: 10,
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