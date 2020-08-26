import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ToastAndroid, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { userReducer, initialState } from './reducer/UserReducer';
import { AuthContext } from './context/AuthContext';
import { useForm } from 'react-hook-form';
import * as Services from './services/UserService'
import { Avatar } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign'
import VectorIcon from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-community/async-storage';
import { SET_LOADING, FETCH_COMPLETE } from './reducer/UserAction';
import ImagePicker from "react-native-image-picker";
import UpdateScreen from './UpdateScreen'
import { baseURL } from '../../baseUrl/baseURL';

const ProfileScreen = () => {
    const { signOut } = useContext(AuthContext)
    const [profile, setProfile] = useState({})
    const [openModal, setOpenModal] = useState(false)
    
    console.log('FORM PROFILE', profile);
    
    useEffect(() => {
        getProfileUser();
    }, [])

    const getProfileUser = async () => {
        try {
            const user = await AsyncStorage.getItem('userToken')
            console.log('USER GET SERVICE', user);

            Services.getUserId(user).then(response => {
                console.log('PROFILE RESPONSE', response);
                setProfile(response)                
            })

        } catch (error) {
            console.log('ERROR RESPONSE', error);
        }
    }


    const handleDelete = () => {
        alert('Under Maintenance')
    }

    const handleModal=()=>{
        setOpenModal(true)
    }

    return (
        <View>
            <View style={styles.profileView}>
              
                    <Avatar.Image source={{ uri: `${baseURL}/user/photo/${profile.id}` }} size={130} />
            </View>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <TouchableOpacity style={{ backgroundColor: 'white', width: 70, height: 40, borderRadius: 40, borderColor: 'blue', borderWidth: 1 }} onPress={handleModal}>
                    <Text style={{ textAlign: 'center', marginTop: 9, fontWeight: 'bold' }} >EDIT</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.textInputView}>
                <View style={styles.formStyle}>
                    <Text style={{ marginTop: 15, marginLeft: 10 }}>Name</Text>
                    <Text style={styles.textInput, { marginRight: 10 }}>{profile.name}</Text>       
                </View>
                <View style={styles.formStyle}>
                    <Text style={{ marginTop: 15, marginLeft: 10 }}>Username</Text>
                    <Text style={styles.textInput, { marginRight: 10 }}>{profile.username}</Text>                    
                </View>
                <View style={styles.formStyle}>
                    <Text style={{ marginTop: 15, marginLeft: 10 }}>Email</Text>
                    <Text style={styles.textInput}  >{profile.email}</Text>                                          
                    
                </View>
                <View style={styles.formStyle}>
                    <Text style={{ marginTop: 15, marginLeft: 10 }}>Phone</Text>
                    <Text style={styles.textInput}>{profile.phone}</Text>                    
                   
                </View>
                <View style={styles.formStyle}>
                    <Text style={{ paddingTop: 15, marginLeft: 10 }}>Password</Text>
                    <Text style={styles.textInput}>{profile.password}</Text>        
                </View>
                <View style={styles.formStyle}>
                    <Text style={{ paddingTop: 15, marginLeft: 10 }}>Address</Text>
                    <Text style={styles.textInput, { marginRight: 10 }}>{profile.address}</Text>                 
                    
                </View>
            </View >
            <View >
                <View style={styles.buttonStyle}>
                    <TouchableOpacity onPress={signOut}>
                        <Text style={{ marginTop: 20, color: 'blue' }}><AntDesign name="logout" style={styles.signOut} size={20} />  SIGN OUT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDelete}>
                        <Text style={{ marginTop: 20, color: 'red' }}><AntDesign name="delete" style={styles.signOut} size={20} />  DELETE</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal visible={openModal} animationType="fade">
                <View>
                    <UpdateScreen 
                        setOpenModal = {setOpenModal}
                        profile = {profile}
                    />
                </View>
            </Modal>

        </View >
    )
}

export default ProfileScreen;

const styles = StyleSheet.create({
    background: {
        width: 400,
        height: 200,
        alignItems: 'center'
    },
    profileView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 25,

    },
    photoProfile: {
        paddingTop: 20
    },
    textInput: {
        fontSize: 15,

    },
    textInputView: {
        paddingTop: 10,
    },
    formStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    signOut: {
        width: 100,
        height: 30,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 10,
        justifyContent: 'center',
        marginTop: 10,
        paddingLeft: 20,
        // backgroundColor: '#ebe236'
    },
    buttonStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop:25
    }
})
