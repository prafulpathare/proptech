import { useFonts } from 'expo-font';
import { useCallback, useState } from 'react';
import { Dimensions, FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function Temp({navigation, route}) {

    const [room, setRoom] = useState(route.params);

    useEffect(() => {

    }, [])

    const shuffle = (arr) => {
        return arr.map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-INR', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
        }).format(amount);
    }

    const [fontsLoaded, fontError] = useFonts({
        'DM Sans': require('../assets/fonts/dm-sans/static/DMSans-Regular.ttf'),
        'DM Sans Bold': require('../assets/fonts/dm-sans/static/DMSans-Bold.ttf'),
        'DM Sans Semi Bold': require('../assets/fonts/dm-sans/static/DMSans-SemiBold.ttf'),
        'DM Sans X Bold': require('../assets/fonts/dm-sans/static/DMSans-ExtraBold.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>

            <Image source={{ uri: room.image }} style={{
                height: Dimensions.get('window').height * 0.4,
                borderRadius: 20,
                margin: 10
            }} />
          
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingBottom: 300
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
    
});
