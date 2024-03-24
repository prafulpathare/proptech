import { useFonts } from 'expo-font';
import { useCallback, useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, Linking, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';


const news = {
    title: 'PM Modi\'s jibe at Rahul Gandhi for \‘nashedi yuva\’ remark: \‘I was shocked',
    cover: 'https://www.hindustantimes.com/ht-img/img/2024/02/23/550x309/PM_Modi_Lucknow_1708339816889_1708672428035.jfif',
    id: 92848394,
    link: 'https://www.hindustantimes.com/india-news/afternoon-briefing-pm-on-kashis-renewed-capability-jaishankar-cautions-against-chinas-mind-game-all-latest-news-101708669687454.html'
}


export default function News({ navigation, route }) {

    const [news, setNews] = useState({});
    const [result, setResult] = useState(null);

    useEffect(() => {
        setNews(route.params);
    }, [news]);

    const [fontsLoaded, fontError] = useFonts({
        'pt-sans': require('../assets/fonts/pt-sans/PTS55F.ttf'),
        'open-sans-b': require('../assets/fonts/open-sans/bold.ttf'),
        'open-sans': require('../assets/fonts/open-sans/regular.ttf'),
    });

    const _handlePressButtonAsync = async (link) => {
        let result = await WebBrowser.openBrowserAsync(link);
        setResult(result);
    };

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

            <View style={{
                flex: 1
            }}>
                <Image source={{ uri: news.cover }} style={{
                    height: Dimensions.get('screen').height * 0.4,
                    borderBottomLeftRadius: 40,
                    borderBottomRightRadius: 40,
                }} />

                <Text style={{
                    fontFamily: 'open-sans-b',
                    fontSize: 20,
                    lineHeight: 30,
                    padding: 20,
                    paddingHorizontal: 25
                }}>
                    {news.title}
                </Text>
            </View>

            <Text>{result && JSON.stringify(result)}</Text>


            <TouchableOpacity style={{
                position: 'absolute',
                bottom: 50,
                alignSelf: 'center',
                backgroundColor: '#3b5998',
                padding: 15,
                paddingHorizontal: 35,
                borderRadius: 30,

                display: "flex",
                position: "relative",
        
                shadowColor: "#000",
                shadowOffset: {
                    width: 3,
                    height: 4,
                },
                shadowOpacity: 1,
                shadowRadius: 5,
        
                elevation: 6,
            }} onPress={() => {
                // Linking.openURL(news.link).catch(err => console.error(err)) 
                _handlePressButtonAsync(news.link);
            }}>
                <Text style={{
                    fontFamily: 'open-sans-b',
                    color: '#fff'
                }}>
                    Read more
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});
