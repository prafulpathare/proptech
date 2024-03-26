import { useFonts } from 'expo-font';
import { useCallback, useState } from 'react';
import { Dimensions, FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function Icon({ url, urlType, width, label, orientation, description }) {


    useEffect(() => {
        
    }, [])

    const [fontsLoaded, fontError] = useFonts({
        'DM Sans': require('../assets/fonts/dm-sans/static/DMSans-Regular.ttf'),
        'DM Sans Bold': require('../assets/fonts/dm-sans/static/DMSans-Bold.ttf'),
        'DM Sans Semi Bold': require('../assets/fonts/dm-sans/static/DMSans-SemiBold.ttf'),
        'DM Sans X Bold': require('../assets/fonts/dm-sans/static/DMSans-ExtraBold.ttf'),
    });

    return (
        <View style={styles.container} >

            <View style={{
                flexDirection: 'row',
                gap: 10,
                marginBottom: 2
            }}>

                <Image source={url} style={{ 
                    width: width, height: width,
                }} />

                <Text style={{ ...styles.textBold, fontSize: 17 }} >{label}</Text>
            </View>

            {
                description === undefined ? <></> : <Text style={{ ...styles.text, ...styles.description }} >{description}</Text>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        fontFamily: 'DM Sans',
    },
    textSemiBold: {
        fontFamily: 'DM Sans Semi Bold',
    },
    textBold: {
        fontFamily: 'DM Sans Bold',
    },
    textXBold: {
        fontFamily: 'DM Sans X Bold',
    },

    description: {
        color: '#000A'
    }

});
