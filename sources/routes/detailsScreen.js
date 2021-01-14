import React from 'react'
import { ScrollView, ImageBackground, TouchableOpacity, FlatList, Image, View, Text , StyleSheet} from 'react-native'
import Color from '../theme/colors'
import { perfectSize } from '../theme/screen'
export default function Details({ navigation }) {

    return (
        <ScrollView style={styles.container}>
            
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
    }
})