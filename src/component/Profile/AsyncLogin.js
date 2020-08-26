import React, { useReducer, useMemo, useEffect } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-native-paper';
import { AuthContext } from './context/AuthContext';
import { LoginReducer, initialState } from './reducer/LoginReducer';
import AppNavigator from '../../navigators/AppNavigator';
import AppNavigatorOk from '../../navigators/AppNavigatorOk';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const AsyncsLogin = () => {
    const [loginState, dispatch] = useReducer(LoginReducer, initialState);

    const authContext = useMemo(() => ({
        signIn: async (foundUser) => {

            const userToken = String(foundUser[0].userToken);
            console.log('USER TOKEN authContext ', userToken);

            const userName = foundUser[0].userName;
            console.log('USER NAME authContext ', userName);

            try {
                await AsyncStorage.setItem('userToken', userToken);
                console.log('userToken', userToken);

            } catch (error) {
                console.log(error);
            }
            dispatch({ type: 'LOGIN', id: userName, token: userToken });
        },
        signOut: async () => {
            try {
                await AsyncStorage.removeItem('userToken');
            } catch (error) {
                console.log(error)
            }
            dispatch({ type: 'LOGOUT' });
        },
    }), [])

    useEffect(() => {
        setTimeout(async () => {
            let userToken;
            userToken = null;
            try {
                userToken = await AsyncStorage.getItem('userToken');
                console.log('user token use effect', userToken);
            } catch (error) {
                console.log(error);
            }
            dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
        }, 3000);
    }, []);

    return (
        <Provider>
            <AuthContext.Provider value={authContext}>
                {
                    loginState.userToken !== null ? (
                        <AppNavigatorOk />
                    ) :
                        <AppNavigator />
                }
            </AuthContext.Provider>
        </Provider>
    )
}

export default AsyncsLogin;