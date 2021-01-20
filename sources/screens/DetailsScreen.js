import React, {useEffect, useState} from 'react'
import { ScrollView, ImageBackground, TouchableOpacity, FlatList, Image, View, Text , StyleSheet} from 'react-native'
import Color from '../theme/Colors'
import { perfectSize } from '../theme/AppScreen'
import genreList from '../utils/genreList'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable'
import { fetchMovieDetails, getUserLists, createUserWatchlist } from '../utils/apiRequests'
import { getClientToken, getUserToken } from '../utils/handleTokens'

export default function DetailsScreen({ navigation, route }) {

    const movieId = route.params.id;
    const title = route.params.title;
    const posterUrl = route.params.photo_url;
    const description = route.params.description;
    const dateObj = new Date(Date.parse(route.params.air));
    const releaseYear = dateObj.getFullYear();
    const [genre, setGenre] = useState([genreList[parseInt(route.params.pivot.genre_id)]]);
    const [watchlistId, setWatchlistId] = useState()

    useEffect(() => {
        const getGenres = async () => {
            const client_token = await getClientToken();
            const response = await fetchMovieDetails(movieId, client_token);
            if(response != 401) setGenre(response.genres);
        }
        getGenres();

        /*const getUserWatchlistDetails = async () => {
            const user_token = await getUserToken();
            let response = await getUserLists(user_token);
            console.log(response);
            let watchlist = response.filter(item => item.name == 'Watchlist');
            if(watchlist.length == 0) {
                await createUserWatchlist(user_token);
                response = await getUserLists(user_token);
                watchlist = response.filter(item => item.name == 'Watchlist');
            }
            watchlist = watchlist[0];
            setWatchlistId(watchlist.id);
        }
        getUserWatchlistDetails();*/
    } , [])

    return (
        <ScrollView style={styles.container}>

            <ImageBackground source={{uri: posterUrl}} style={styles.poster}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicons name='arrow-back' size={perfectSize(50)} color={Color.whiteColor}/>
                </TouchableOpacity>
            </ImageBackground>
                <Animatable.View animation='fadeInUp' style={styles.detailsContainer}>
                    <View style={styles.marker} />
                    <Text style={styles.title}>{ title }</Text>
                    <Text style={styles.stats}>{ releaseYear }</Text>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonTitle}>Add to watchlist</Text>
                    </TouchableOpacity>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headline}>Storyline</Text>
                    </View>
                    <Text style={styles.details}>{ description }</Text>
                
                    <View style={styles.headerContainer}>
                        <Text style={styles.headline}>Genres</Text>
                        <FlatList 
                            data={ genre }
                            style={styles.list}
                            keyExtractor={(item) => item.id.toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={ ( {item} ) => (
                                <TouchableOpacity style={styles.genreContainer}>
                                    <Text style={styles.genre}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </Animatable.View>
        </ScrollView>
    )
}

//Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: Color.appBackgroundColor
    },
    poster: {
        height: perfectSize(790),
        width: '100%',
    },
    backArrowButton: {
        height: '5%',
        width: '5%',
        marginTop: perfectSize(56),
        marginLeft: perfectSize(18),
    },
    detailsContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: Color.appBackgroundColor,
        borderTopLeftRadius: perfectSize(40),
        borderTopRightRadius: perfectSize(40),
        bottom: '5%',
        alignItems: 'center'
    },
    marker: {
        backgroundColor: Color.blackColor,
        height: perfectSize(12),
        width: perfectSize(200),
        marginTop: perfectSize(18),
        borderRadius: perfectSize(23)
    },
    title: {
        fontSize: perfectSize(30),
        marginTop: perfectSize(18),
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: 1,
        color: Color.whiteColor,
        margin: 5
    },
    stats: {
        fontSize: perfectSize(18),
        marginTop: perfectSize(18),
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: 1,
        color: Color.whiteColor,
        opacity: 0.5
    },
    buttonContainer: {
        height: perfectSize(40),
        width: perfectSize(318),
        backgroundColor: Color.buttonBackground,
        borderRadius: perfectSize(23),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: perfectSize(23),
        shadowColor: Color.shadowColor,
        shadowOffset: {
            width: 0,
            height: perfectSize(12),
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    buttonTitle: {
        fontSize: perfectSize(23),
        fontWeight: 'bold',
        color: Color.whiteColor,
        shadowColor: Color.shadowColor,
        shadowOffset: {
            width: 0,
            height: perfectSize(12),
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    headerContainer: {
        width: '100%'
    },
    headline: {
        marginTop: perfectSize(23),
        marginLeft: perfectSize(23),
        fontWeight: 'bold',
        fontSize: perfectSize(23),
        letterSpacing: 1,
        color: Color.whiteColor
    },
    details: {
        marginTop: perfectSize(23),
        marginLeft: perfectSize(23),
        marginRight: perfectSize(23),
        textAlign: 'justify',
        fontSize: perfectSize(18),
        opacity: 0.7,
        color: Color.whiteColor
    },
    list: {
        marginTop: perfectSize(5),
        marginLeft: perfectSize(18),
    },
    genreContainer: {
        marginTop: perfectSize(5),
        marginHorizontal: perfectSize(5),
        height: perfectSize(40),
        width: perfectSize(100),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 23,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    genre: {
        fontSize: perfectSize(18),
        fontWeight: 'bold',
        color: Color.whiteColor
    }
})