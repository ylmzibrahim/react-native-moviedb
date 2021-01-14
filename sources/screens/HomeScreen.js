import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StatusBar, StyleSheet, FlatList, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Var from '../routes/Variables';
import Color from '../theme/Colors';
import { perfectSize } from '../theme/AppScreen';

function HomeScreen({ navigation }) {

    const [genres, setGenres] = useState([]);
    const [nowPlaying, setNowPlaying] = useState([]);
    const [popular, setPopular] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [upComing, setUpComing] = useState([]);

    // const getGenres = async () => {try{} catch{}};
    useEffect(() => {
        async function getGenres() {
            try {
              let response = await fetch(
                Var.host + 'genre/movie/list?api_key=' + Var.api_key_tmdb
              );
              let json = await response.json();
              setGenres(json.genres);
            } catch (error) {
              console.error(error);
            }
        }
        getGenres();
        // console.log(genres); // it's for check if genres are getting or not

        // Getting now playing movies from API
        async function getNowPlaying() {
            try {
              let response = await fetch(
                Var.host + 'movie/now_playing?api_key=' + Var.api_key_tmdb
              );
              let json = await response.json();
              setNowPlaying(json.results);
            } catch (error) {
              console.error(error);
            }
        }
        getNowPlaying();

        // Getting popular movies from API
        async function getPopular() {
            try {
              let response = await fetch(
                Var.host + 'movie/popular?api_key=' + Var.api_key_tmdb
              );
              let json = await response.json();
              setPopular(json.results);
            } catch (error) {
              console.error(error);
            }
        }
        getPopular();

        // Getting top rated movies from API
        async function getTopRated() {
            try {
              let response = await fetch(
                Var.host + 'movie/top_rated?api_key=' + Var.api_key_tmdb
              );
              let json = await response.json();
              setTopRated(json.results);
            } catch (error) {
              console.error(error);
            }
        }
        getTopRated();

        // Getting up comming movies from API
        async function getUpComing() {
            try {
              let response = await fetch(
                Var.host + 'movie/upcoming?api_key=' + Var.api_key_tmdb
              );
              let json = await response.json();
              setUpComing(json.results);
            } catch (error) {
              console.error(error);
            }
        }
        getUpComing();

    }, [])

    // Here is Home Screen
    return(
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={Color.appBackgroundColor} barStyle='light-content' />

            <View style={styles.header}>
                <Ionicons name='menu' color={Color.whiteColor} size={30} style={styles.headerIcons} />
                <Text style={styles.title}>Movie DB</Text>
                <FontAwesome name='user-circle' color={Color.whiteColor} size={30} style={styles.headerIcons} />
            </View>

            <View style={styles.genresView}>
                <FlatList
                    style={{maxHeight: 50}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={genres}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item, index}) => <RenderItemGenres item={item} />}
                />
            </View>

            <ScrollView>
                <Text style={styles.movieClass}>NOW PLAYING</Text>
                <FlatList
                    contentContainerStyle={{paddingHorizontal: 10}}
                    style={{maxHeight: 250}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={nowPlaying}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item, index}) => (
                        <TouchableOpacity onPress={() => navigation.navigate('DetailsScreen', item)} >
                            <RenderItemMovies item={item} /> 
                        </TouchableOpacity>
                    )}
                />

                <Text style={styles.movieClass}>POPULAR</Text>
                <FlatList
                    contentContainerStyle={{paddingHorizontal: 10}}
                    style={{maxHeight: 250}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={popular}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item, index}) => (
                        <TouchableOpacity onPress={() => navigation.navigate('DetailsScreen', item)} >
                            <RenderItemMovies item={item} /> 
                        </TouchableOpacity>
                    )}
                />

                <Text style={styles.movieClass}>TOP RATED</Text>
                <FlatList
                    contentContainerStyle={{paddingHorizontal: 10}}
                    style={{maxHeight: 250}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={topRated}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({item, index}) => (
                        <TouchableOpacity onPress={() => navigation.navigate('DetailsScreen', item)} >
                            <RenderItemMovies item={item} /> 
                        </TouchableOpacity>
                    )}
                />

                <Text style={styles.movieClass}>UP COMING</Text>
                <FlatList
                    contentContainerStyle={{paddingHorizontal: 10}}
                    style={{maxHeight: 250}}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={upComing}
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
        let year = item.release_date.split('-');
        return (
            <ImageBackground source={{uri: Var.posterHost + item.poster_path}} style={styles.postView} resizeMode={'cover'}>
                <Text style={styles.movieTitle} numberOfLines={2} ellipsizeMode={'tail'}>{ item.title }</Text>
                <Text style={styles.movieVoteAverage}>{ item.vote_average }</Text>
                <Text style={styles.movieReleaseDate}>{ year[0] }</Text>
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