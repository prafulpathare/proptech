import { useFonts } from 'expo-font';
import { useCallback, useState } from 'react';
import { Dimensions, FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import MapView from 'react-native-maps';
import { useEffect } from 'react';
import Icon from '../util/Icon';

SplashScreen.preventAutoHideAsync();

export default function Room({ navigation, route }) {

    const [room, setRoom] = useState(route.params.room);
    const [properties, setProperties] = useState(route.params.properties);

    useEffect(() => {
        console.log(route.params)
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
        <ScrollView>
            <View style={styles.container} onLayout={onLayoutRootView}>

                <View style={{
                    margin: 10
                }}>
                    <Image source={{ uri: room.image }} style={{
                        height: Dimensions.get('window').height * 0.45,
                        borderRadius: 20,
                    }} />

                    <View style={{
                        marginLeft: 20,
                        marginTop: -30
                    }}>
                        <Text style={{ ...styles.textBold, fontSize: 20, color: '#fff' }}>
                            {formatCurrency(room.rent)}
                        </Text>
                    </View>
                </View>
                <View style={{
                    marginLeft: 20,
                    marginTop: 20
                }}>
                    <Text style={{ ...styles.textXBold, fontSize: 26 }}>
                        {room.title}
                    </Text>
                    <Text style={{ ...styles.textBold, fontSize: 16, color: '#0007' }}>
                        {room.location}
                    </Text>
                </View>

                <Text style={{ ...styles.textXBold, fontSize: 22, marginLeft: 20, marginTop: 20 }}>Photos</Text>
                <FlatList
                    data={properties}
                    horizontal={true}
                    renderItem={({ item, index, separators }) => (
                        <View style={{
                            margin: 10,
                            marginLeft: index == 0 ? 20 : 0,
                            elevation: 3
                        }}>
                            <Image source={{ uri: item.image }} style={{
                                width: 100,
                                height: 100,
                                borderRadius: 10,
                            }} />
                        </View>
                    )}
                />


                <Text style={{ ...styles.textXBold, fontSize: 22, marginLeft: 20, marginTop: 30 }}>Property Details</Text>

                <View style={{
                    flexDirection: 'row',
                    gap: 2,
                    margin: 20,
                    marginRight: 0,
                    marginTop: 10,
                    marginBottom: 10
                }}>
                    <Icon url={require('../assets/bathtub.png')} urlType={'in'} label={'2'} orientation={'hz'} width={20} description={'Bathroom'} />
                    <Icon url={require('../assets/car.png')} urlType={'in'} label={'1'} orientation={'hz'} width={24} description={'Parking'} />
                    <Icon url={require('../assets/sofa.png')} urlType={'in'} label={'3'} orientation={'hz'} width={20} description={'Living room'} />
                </View>
                <View style={{
                    flexDirection: 'row',
                    gap: 2,
                    margin: 20,
                    marginRight: 0,
                    marginTop: 0
                }}>
                    <Icon url={require('../assets/clock.png')} urlType={'in'} label={'2019'} orientation={'hz'} width={18} description={'Built year'} />
                </View>

                <Text style={{ ...styles.textXBold, fontSize: 22, marginLeft: 20, marginTop: 10 }}>Public Facilities</Text>

                <View style={{
                    flexDirection: 'row',
                    gap: 2,
                    margin: 20,
                    marginRight: 0,
                    marginTop: 10,
                    marginBottom: 10
                }}>
                    <Icon url={require('../assets/hindu.png')} urlType={'in'} label={'2'} orientation={'hz'} width={20} description={'Temple'} />
                    <Icon url={require('../assets/railway-station.png')} urlType={'in'} label={'1'} orientation={'hz'} width={24} description={'Railway Station'} />
                    <Icon url={require('../assets/dinner.png')} urlType={'in'} label={'3'} orientation={'hz'} width={20} description={'Restaurant'} />
                </View>
                <View style={{
                    flexDirection: 'row',
                    gap: 2,
                    margin: 20,
                    marginRight: 0,
                    marginTop: 0
                }}>
                    <Icon url={require('../assets/graduation-hat.png')} urlType={'in'} label={'2'} orientation={'hz'} width={18} description={'School'} />
                    <Icon url={require('../assets/pharmacy.png')} urlType={'in'} label={'2'} orientation={'hz'} width={18} description={'Hospital'} />
                    <Icon url={require('../assets/pharmacy.png')} urlType={'in'} label={'2'} orientation={'hz'} width={18} description={'Hospital'} />
                </View>


                <Text style={{ ...styles.textXBold, fontSize: 22, marginLeft: 20, marginTop: 20 }}>Location</Text>

                <View style={{ borderRadius: 20, margin: 20, overflow: 'hidden' }}>
                    <MapView style={{ width: Dimensions.get('window').width - 40, height: Dimensions.get('window').width * 0.8, borderRadius: 20, overflow: 'hidden' }} />
                </View>

                <View style={{
                    marginTop: 40,
                    marginHorizontal: 20,
                    flexDirection: 'row',
                    gap: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image source={{ uri: 'https://assets.techcircle.in/uploads/article-image/2022/08/images/30263-zak-murad-photo.png' }} style={{
                        width: 50,
                        height: 50,
                        borderRadius: 10
                    }} />
                    <View style={{
                        flex: 3,
                        marginLeft: 10
                    }}>
                        <Text style={{ ...styles.textXBold, fontSize: 22 }}>Zak Murad</Text>
                        <Text style={{ ...styles.textBold, fontSize: 16, color: '#0006' }}>Real Estate Agent</Text>
                    </View>
                    <Image source={require('../assets/telephone.png')} style={{
                        width: 30, height: 30
                    }} />
                    <Image source={require('../assets/message.png')} style={{
                        width: 30, height: 30
                    }} />
                </View>

                <TouchableOpacity onPress={() => {}} style={{
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#000',
                    padding: 20,
                    paddingVertical: 15,
                    elevation: 3,
                    margin: 20
                }} >
                    <Text style={{
                        ...styles.textXBold, color: '#FFF', fontSize: 20
                    }}>Book now</Text>
                </TouchableOpacity>


            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        paddingTop: 40,
        paddingBottom: 0
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
