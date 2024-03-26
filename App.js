import React, { useEffect, useRef, useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Home';
import Room from './components/Room';
import Temp from './components/Temp';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const colors = {
  primary: '#fff',
  secondary: '#555'
}

function MyTabs() {

  const [fontsLoaded, fontError] = useFonts({
    'DM Sans': require('./assets/fonts/dm-sans/static/DMSans-Regular.ttf'),
    'DM Sans Bold': require('./assets/fonts/dm-sans/static/DMSans-Bold.ttf'),
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
    <View style={{
      flex: 1,
      backgroundColor: '#fff',
    }} onLayout={onLayoutRootView}>

      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            elevation: 3,
            height: 60,
            borderTopColor: '#ffff',
            backgroundColor: '#000',

            marginBottom: 15,
            marginHorizontal: 30,
            borderRadius: 10,
            paddingTop: 5,
            paddingBottom: 10
          }
        }}
      >
        <Tab.Screen
          options={{
            tabBarHideOnKeyboard: true,
            tabBarShowLabel: true,
            tabBarLabel: ({ focused }) => {
              return (
                <View style={{ ...styles.tabContainer, }}>
                  <Text style={{ ...styles.tabLabel, color: focused ? colors.primary : colors.secondary }}>
                    Home
                  </Text>
                </View>
              )
            },
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{ ...styles.tabLabelContainer }}>
                  <Image
                    source={require("./assets/home.png")}
                    resizeMode="contain"
                    style={{ ...styles.bottomNav.icon, tintColor: focused ? colors.primary : '#555' }}
                  />
                </View>
              );
            },
          }}
          name="Home" component={Home} />



        <Tab.Screen
          options={{
            tabBarHideOnKeyboard: true,
            tabBarShowLabel: true,
            tabBarLabel: ({ focused }) => {
              return (
                <View style={{ ...styles.tabContainer, }}>
                  <Text style={{ ...styles.tabLabel, color: focused ? colors.primary : colors.secondary }}>
                    Explore
                  </Text>
                </View>
              )
            },
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{ ...styles.tabLabelContainer }}>
                  <Image
                    source={require("./assets/explore.png")}
                    resizeMode="contain"
                    style={{ ...styles.bottomNav.icon, tintColor: focused ? colors.primary : '#555' }}
                  />
                </View>
              );
            },
          }}
          name="Temp" component={Temp} />


        <Tab.Screen
          options={{
            tabBarHideOnKeyboard: true,
            tabBarShowLabel: true,
            tabBarLabel: ({ focused }) => {
              return (
                <View style={{ ...styles.tabContainer, }}>
                  <Text style={{ ...styles.tabLabel, color: focused ? colors.primary : colors.secondary }}>
                    Favourites
                    </Text>
                </View>
              )
            },
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{ ...styles.tabLabelContainer }}>
                  <Image
                    source={require("./assets/love.png")}
                    resizeMode="contain"
                    style={{ ...styles.bottomNav.icon, tintColor: focused ? colors.primary : '#555' }}
                  />
                </View>
              );
            },
          }}
          name="Temp2" component={Temp} />


        <Tab.Screen
          options={{
            tabBarHideOnKeyboard: true,
            tabBarShowLabel: true,
            tabBarLabel: ({ focused }) => {
              return (
                <View style={{ ...styles.tabContainer, }}>
                  <Text style={{ ...styles.tabLabel, color: focused ? colors.primary : colors.secondary }}>
                    Explore
                      </Text>
                </View>
              )
            },
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{ ...styles.tabLabelContainer }}>
                  <Image
                    source={require("./assets/message.png")}
                    resizeMode="contain"
                    style={{ ...styles.bottomNav.icon, tintColor: focused ? colors.primary : '#555' }}
                  />
                </View>
              );
            },
          }}
          name="Temp3" component={Temp} />



      </Tab.Navigator>

    </View>
  );
}


export default function App() {

  useEffect(() => {

  }, []);

  return (
    <NavigationContainer >
      <StatusBar style="auto" />
      <Stack.Navigator >
        <Stack.Screen
          name="Tabs"
          component={MyTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Room"
          component={Room}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    header: {
      fontWeight: 'bold',
      fontSize: 17
    }
  },
  bottomNav: {
    icon: {
      height: 25
    }
  },
  tabContainer: {
  },
  tabLabelContainer: {

  },
  tabLabel: {
    fontSize: 10,
    fontFamily: 'DM Sans Bold'
  },
});