import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StatusBar, StyleSheet, FlatList, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Var from '../routes/Variables';
import Color from '../theme/Colors';
import { perfectSize } from '../theme/AppScreen';
import { fetchGenres, fetchMoviesByGenre } from '../utils/apiRequests';
import { getClientToken } from '../utils/handleTokens.js'

function HomeScreen({ navigation }) {

    const [genres, setGenres] = useState([]);
    const [actionMovies, setActionMovies] = useState([]);
    const [fantasyMovies, setFantasyMovies] = useState([]);
    const [animationMovies, setAnimationMovies] = useState([]);
    const [dramaMovies, setDramaMovies] = useState([]);

    // const getGenres = async () => {try{} catch{}};
    useEffect(() => {
        async function getGenres() {
            try {
              const client_token = await getClientToken();
              const genres = await fetchGenres(client_token);
              setGenres(genres);
            } catch (error) {
              console.error(error);
            }
        }
        getGenres();
        // console.log(genres); // it's for check if genres are getting or not

        // Getting now playing movies from API
        async function getActionMovies() {
            try {
                const client_token = await getClientToken();
                const movies = await fetchMoviesByGenre(2, client_token);
                setActionMovies(movies.data);
            } catch (error) {
              console.error(error);
            }
        }
        getActionMovies();

        // Getting popular movies from API
        async function getFantasyMovies() {
            try {
                const client_token = await getClientToken();
                const movies = await fetchMoviesByGenre(1, client_token);
                setFantasyMovies(movies.data);
            } catch (error) {
              console.error(error);
            }
        }
        getFantasyMovies();

        // Getting top rated movies from API
        async function getAnimationMovies() {
            try {
                const client_token = await getClientToken();
                const movies = await fetchMoviesByGenre(4, client_token);
                setAnimationMovies(movies.data);
            } catch (error) {
              console.error(error);
            }
        }
        getAnimationMovies();

        // Getting up comming movies from API
        async function getDramaMovies() {
            try {
                const client_token = await getClientToken();
                const movies = await fetchMoviesByGenre(6, client_token);
                setDramaMovies(movies.data);
            } catch (error) {
              console.error(error);
            }
        }
        getDramaMovies();

    }, [])

    // Here is Home Screen
    //<Ionicons name='menu' color={Color.whiteColor} size={30} style={styles.headerIcons} onPress={() => navigation.navigate('SignUpScreen')}/>
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={Color.appBackgroundColor} barStyle='light-content' />

            <View style={styles.header}>
                
                <Text style={styles.title}>Movie DB</Text>
                <FontAwesome name='user-circle' color={Color.whiteColor} size={30} style={styles.headerIcons} onPress={() => navigation.navigate('ProfileScreen')} />
            </View>

            <View style={styles.genresView}>
                <FlatList
                    style={{maxHeight: 50}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={genres}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item, index}) => (
                        <TouchableOpacity onPress={() => navigation.navigate('GenreScreen' , item)} >
                            <RenderItemGenres item={item}/>
                        </TouchableOpacity>
                    )
                    }
                />
            </View>

            <ScrollView>
                <Text style={styles.movieClass}>ACTION MOVIES</Text>
                <FlatList
                    contentContainerStyle={{paddingHorizontal: 10}}
                    style={{maxHeight: 250}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={actionMovies}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item, index}) => (
                        <TouchableOpacity onPress={() => navigation.navigate('DetailsScreen', item)} >
                            <RenderItemMovies item={item} /> 
                        </TouchableOpacity>
                    )}
                />

                <Text style={styles.movieClass}>FANTASY MOVIES</Text>
                <FlatList
                    contentContainerStyle={{paddingHorizontal: 10}}
                    style={{maxHeight: 250}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={fantasyMovies}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item, index}) => (
                        <TouchableOpacity onPress={() => navigation.navigate('DetailsScreen', item)} >
                            <RenderItemMovies item={item} /> 
                        </TouchableOpacity>
                    )}
                />

                <Text style={styles.movieClass}>ANIMATION MOVIES</Text>
                <FlatList
                    contentContainerStyle={{paddingHorizontal: 10}}
                    style={{maxHeight: 250}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={animationMovies}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item, index}) => (
                        <TouchableOpacity onPress={() => navigation.navigate('DetailsScreen', item)} >
                            <RenderItemMovies item={item} /> 
                        </TouchableOpacity>
                    )}
                />

                <Text style={styles.movieClass}>DRAMA MOVIES</Text>
                <FlatList
                    contentContainerStyle={{paddingHorizontal: 10}}
                    style={{maxHeight: 250}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={dramaMovies}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item, index}) => (
                        <TouchableOpacity onPress={() => navigation.navigate('DetailsScreen', item)} >
                            <RenderItemMovies item={item} />
                        </TouchableOpacity>
                    )}
                />
            </ScrollView>
        </SafeAreaView>
    )
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

}

export default HomeScreen;

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
        width: 150,
        height: 220,
        marginRight: 10,
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