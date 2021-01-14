import React from 'react'
import { ScrollView, ImageBackground, TouchableOpacity, FlatList, Image, View, Text , StyleSheet} from 'react-native'
import Color from '../theme/Colors'
import { perfectSize } from '../theme/AppScreen'
import Var from '../routes/Variables'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable'

export default function DetailsScreen({ navigation, route }) {

    const title = route.params.title
    const poster_path = route.params.poster_path
    const overview = route.params.overview
    const genre_ids = route.params.genre_ids
    let year = route.params.release_date.split('-');

    return (
        <ScrollView style={styles.container}>

            <ImageBackground source={{uri: Var.posterHost + poster_path}} style={styles.poster}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Ionicons name='arrow-back' size={perfectSize(50)} color={Color.whiteColor}/>
                </TouchableOpacity>
            </ImageBackground>
                <Animatable.View animation='fadeInUp' style={styles.detailsContainer}>
                    <View style={styles.marker} />
                    <Text style={styles.title}>{ title }</Text>
                    <Text style={styles.stats}>{ year[0] }</Text>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={styles.buttonTitle}>Add to watchlist</Text>
                    </TouchableOpacity>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headline}>Storyline</Text>
                    </View>
                    <Text style={styles.details}>{ overview }</Text>
                
                    <View style={styles.headerContainer}>
                        <Text style={styles.headline}>Genres</Text>
                        <FlatList 
                            data={ genre_ids }
                            style={styles.list}
                            keyExtractor={(item,index) => index.toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item}) => (
                                <TouchableOpacity style={styles.genreContainer}>
                                    <Text style={styles.genre}>{item}</Text>
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