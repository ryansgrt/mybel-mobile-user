import React from 'react';
import AppNavigator from './src/navigators/AppNavigator'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Image } from 'react-native';
import bg from './src/picture/SPASHSCREEN.gif'
import AsyncsLogin from './src/component/Profile/AsyncLogin';


const Stack = createStackNavigator();

const App = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Splash"
                    component={SplashScreens}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="Home"
                    component={AsyncsLogin}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default App;

const SplashScreens = props => {
    setTimeout(() => {
        props.navigation.navigate('Home')
    }, 3000)
    return (
        <Image style={styles.picture} source={bg} />
    )
}

const styles = StyleSheet.create({
    picture: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    }
})


