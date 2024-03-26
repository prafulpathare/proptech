import { useFonts } from 'expo-font';
import { useCallback, useState } from 'react';
import { Dimensions, FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function Home({ navigation }) {

    const [tagId, setTagId] = useState(houseTypes[0].id);

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

            <View style={{ paddingHorizontal: 30 }}>
                <View style={{
                    flexDirection: 'row-reverse',
                }}>
                    <Image source={{ uri: 'https://goldenglobes.com/wp-content/uploads/2023/10/17-tomcruiseag.jpg' }} style={{
                        ...styles.headerIcons,
                        borderRadius: 15,
                        width: 40,
                        height: 40,

                        elevation: 3
                    }} />

                    <Image source={require('../assets/notf.png')} style={styles.headerIcons} />
                </View>

                <View style={{
                }}>
                    <Text style={{ ...styles.headLine }}>Discover</Text>
                    <Text style={{ ...styles.headLine }}>your new house!</Text>
                </View>


                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20,
                }}>

                    <View style={{
                        flex: 6,
                        flexDirection: 'row',
                        alignItems: 'center',
                        height: 50,
                        borderWidth: 0,
                        borderColor: '#eee',
                        borderRadius: 10,
                        backgroundColor: '#fff',
                        elevation: 5,
                    }}>
                        <ImageBackground source={require('../assets/search.png')} style={{ flex: 1, height: 20 }} tintColor={'#999'} resizeMode={'contain'} />
                        <TextInput placeholder={'Search Places'} style={{ flex: 5 }} cursorColor={'#666'} />
                    </View>
                    <TouchableOpacity style={{ elevation: 5, width: 40, height: 40, marginLeft: 10, backgroundColor: '#000', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }} onPress={() => { }}  >
                        <ImageBackground source={require('../assets/filter.png')} style={{ width: 25, height: 25, }} tintColor={'#999'} resizeMode={'contain'} />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                style={{ marginVertical: 20, height: 40, }}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={houseTypes}
                renderItem={({ item, index, separators }) => (
                    <Text style={{ ...styles.houseTypeItem, elevation: 3, marginLeft: index == 0 ? 20 : 10, backgroundColor: item.id === tagId ? '#222' : '#eee', color: item.id === tagId ? '#fff' : '#777' }}>{item.label}</Text>
                )}
            />

            <FlatList
                style={{ height: 270 }}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={properties}
                renderItem={({ item, index, separators }) => (
                    <TouchableOpacity style={{
                        width: 250,
                        height: 250,
                        borderRadius: 30,
                        overflow: 'hidden',
                        marginRight: 20,
                        elevation: 10,
                        marginLeft: index == 0 ? 20 : 0
                    }} onPress={() =>         navigation.navigate('Room', { room: item, properties: properties }) } >
                        <Image
                            source={{ uri: item.image }} style={{
                                width: 250,
                                height: 250,
                                borderRadius: 10,
                                overflow: 'hidden'
                            }} />

                        <View style={{
                            marginTop: -50,
                            marginLeft: 20,
                            marginBottom: 0,
                            flexDirection: 'column-reverse'
                        }}>
                            <View style={{

                            }} >
                                <Text style={{ ...styles.textBold, color: '#fff', fontSize: 20, textShadowColor: '#000', textShadowOffset: { width: 3, height: 3 } }}>{item.title}</Text>
                                <Text style={{ ...styles.textBold, color: '#fff' }}>{item.location}</Text>
                            </View>
                        </View>

                        <Text style={{
                            marginTop: -230,
                            marginLeft: 250 - 110,
                            textAlign: 'center',
                            width: 100,
                            backgroundColor: '#0009',
                            color: '#fff',
                            fontFamily: 'DM Sans',
                            fontSize: 12,
                            borderRadius: 10,
                            padding: 7
                        }}>
                            {formatCurrency(item.rent)} / month
                        </Text>
                    </TouchableOpacity>
                )}
            />

            <Text style={{
                fontFamily: 'DM Sans Bold', fontSize: 20, marginTop: 0, marginLeft: 30
            }}>
                Properties nearby
            </Text>

            <FlatList
                style={{ marginTop: 10, height: 100 }}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={shuffle(properties)}
                renderItem={({ item, index, separators }) => (
                    <View style={{
                        flexDirection: 'row',
                        borderRadius: 10,
                        maxHeight: 70,
                        backgroundColor: '#fff',
                        marginRight: 10,
                        marginLeft: index == 0 ? 20 : 0,
                        padding: 7,
                        elevation: 3,
                        shadowOffset: {
                            width: -10,
                            height: 0
                        }
                    }} >
                        <Image source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 5, }} />
                        <View style={{
                            marginLeft: 10,
                            justifyContent: 'center'
                        }}>
                            <Text style={{ ...styles.textSemiBold, color: '#0006', paddingBottom: 7 }} >{item.title}</Text>
                            <Text style={{ ...styles.textXBold, fontSize: 17 }} >{formatCurrency(item.rent)}</Text>
                        </View>
                    </View>
                )}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        paddingTop: 70,
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
    headLine: {
        fontSize: 30, fontFamily: 'DM Sans Bold'
    },
    headerIcons: {
        width: 30,
        height: 30,
        borderRadius: 10,
        margin: 10
    },

    houseTypeItem: {
        color: '#fff',
        fontFamily: 'DM Sans Bold',
        backgroundColor: '#222',
        padding: 20,
        paddingVertical: 10,
        borderRadius: 10,
        height: 35,
        marginLeft: 20
    }
});


const houseTypes = [
    {
        id: 82,
        label: 'Home'
    },
    {
        id: 93,
        label: 'Office'
    },
    {
        id: 394,
        label: 'Apartment'
    },
    {
        id: 89687,
        label: 'Home'
    },
    {
        id: 839,
        label: 'Home'
    },
    {
        id: 46,
        label: 'Office'
    },
    {
        id: 90809,
        label: 'Apartment'
    },
    {
        id: 988978,
        label: 'Home'
    },
]

const properties = [
    {
        id: 9834834,
        image: 'https://media.designcafe.com/wp-content/uploads/2022/07/15170350/luxury-home-design-on-budget.jpg',
        title: 'Park Avenue',
        location: 'Bandra West, Mumbai',
        rent: 11499
    },

    {
        id: 76675,
        image: 'https://5.imimg.com/data5/SELLER/Default/2020/11/VA/PT/WD/63934041/whatsapp-image-2020-11-27-at-15-37-27-2--500x500.jpeg',
        title: 'Kohinoor Park',
        location: 'Dadar E, Mumbai',
        rent: 7899
    },

    {
        id: 93494,
        image: 'https://media.designcafe.com/wp-content/uploads/2020/01/21004228/mumbaikars-mumbai-homes-decor-trends-2020.jpg',
        title: 'Soho House',
        location: 'Andheri, Mumbai',
        rent: 8999
    }
]