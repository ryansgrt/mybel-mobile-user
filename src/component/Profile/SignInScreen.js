import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Text, TextInput } from 'react-native';
import { AuthContext } from './context/AuthContext';
import { login } from './services/UserService';
import * as Animatable from 'react-native-animatable';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import { Card } from 'react-native-paper';


const SignInScreen = ({ navigation }) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
    // const { secureTextEntry, check_textInputChange, isValidUser, isValidPassword, form } = state;
    const { signIn } = useContext(AuthContext);
    console.log('SIGN IN useContext', signIn);


    const handleInputChange = (value) => {
        if (value.trim().length >= 4) {
            setData({
                ...data,
                username: value,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: value,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (value) => {
        if (value.trim().length >= 8) {
            setData({
                ...data,
                password: value,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: value,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (value) => {
        if (value.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle = (userName, password) => {
        if (data.username.length == 0 || data.password.length == 0) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        }
        login(userName, password)
            .then((response) => {
                let foundUser = []

                if (response) {
                    console.log('LOGIN', response);

                    const { username, id } = response
                    foundUser = [{ userName: username, userToken: id }]

                }

                if (foundUser.length == 0) {
                    Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                        { text: 'Okay' }
                    ]);
                    return;
                }
                signIn(foundUser);
            })
    }

    return (

        <View style={styles.header}>

            <Animatable.View
                animation="fadeInUpBig"
            >

                <Text style={styles.text_footer}>USERNAME</Text>

                <View style={styles.action}>
                    <FontAwesomeIcon
                        name="user-circle-o"
                        color="black"
                        size={20}
                        style={{ marginTop: 13 }}
                    />
                    <TextInput
                        placeholder="Enter username"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(value) => handleInputChange(value)}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    />
                    {data.check_textInputChange ?
                        <Feather
                            name="check-circle"
                            color="green"
                            size={20}
                            style={{ marginTop: 13 }}
                        />
                        : null}

                </View>


                <Text style={styles.text_footer, { marginTop: 40 }}>PASSWORD</Text>
                <View style={styles.action}>
                    <FontAwesomeIcon
                        name="lock"
                        color="black"
                        size={20}
                        style={{ marginTop: 13 }}
                    />

                    <TextInput
                        placeholder="Enter password"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(value) => handlePasswordChange(value)}
                    />

                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>
                {data.isValidPassword ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                    </Animatable.View>
                }
                <View style={{ paddingTop: 40 }}>
                    <TouchableOpacity style={styles.buttonsSignUp, { backgroundColor: 'blue', borderRadius: 15, height: 45 }} onPress={() => { loginHandle(data.username, data.password) }}
                    >
                        <Text style={styles.buttonText}>LET'S  GO</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ paddingTop: 20, flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 10 }}>Don't have any account?</Text>
                    <TouchableOpacity style={styles.buttonsSignUp} onPress={() => navigation.navigate('SignUp')} >
                        <Text style={styles.textSignIn}>  Sign Up</Text>
                    </TouchableOpacity>
                </View>

            </Animatable.View>
        </View>

    )
}
export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
    },
    picture: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    },
    header: {
        paddingTop: 200,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    footer: {
        flex: 1.5,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
    },
    text_footer: {
        color: 'black',
        fontSize: 15
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        paddingLeft: 15,
        color: 'black',
    },
    button2: {
        flexDirection: 'column',
        padding: 15,
        justifyContent: 'center',
        marginHorizontal: 10,
        borderRadius: 30,
        alignItems: 'center',
        backgroundColor: 'yellow',
        marginTop: 20
    },
    button: {
        flexDirection: 'column',
        padding: 15,
        justifyContent: 'center',
        marginHorizontal: 10,
        borderRadius: 30,
        alignItems: 'center',
        backgroundColor: 'blue',
        marginTop: 15
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,

    },
    textSignIn: {
        fontSize: 10,
        color: 'blue'
    },
    buttonSignUp: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    buttonText: {
        fontSize: 16,
        paddingTop: 10,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center'
    },
    buttons: {
        borderRadius: 25,
        width: 300,
        marginVertical: 10,
        paddingVertical: 13,
        backgroundColor: "white"
    },
})