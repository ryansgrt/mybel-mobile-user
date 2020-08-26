import React, { useState } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { ImageBackground } from 'react-native';
import beranda from '../../picture/profileBackground.jpg';
import noProfile from '../../picture/noProfile.jpg'
import { Avatar } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

const Top = createMaterialTopTabNavigator()

const NoAccount = props => {
    const [width, setWidth] = useState(Dimensions.get('window').width);
    const [height, setHeight] = useState(Dimensions.get('window').height / 3)
    return (
        <View>
            <ImageBackground style={{ width: width, height: height }} source={beranda}>
                <View style={styles.profileView}>
                    <Avatar.Image size={24} source={noProfile} />
                </View>
            </ImageBackground>
            <Top.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: '#296dff',
                    height: 60
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            }} >
                <Top.Screen name='SignIn' component={SignInScreen} options={{
                    title: 'Sign In',
                    headerTitleAlign: 'center'
                }} />
                <Top.Screen name='SignUp' component={SignUpScreen} options={{
                    title: 'Sign Up',
                    headerTitleAlign: 'center'
                }} />
            </Top.Navigator>

        </View>
    )
}

export default NoAccount

const styles = StyleSheet.create({
    profileView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 25,
        paddingRight: 20
    },
})