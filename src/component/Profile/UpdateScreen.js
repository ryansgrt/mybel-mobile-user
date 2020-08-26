import React, { useReducer, useContext, useState, useEffect } from 'react';
import { View, Text, ToastAndroid, ImageBackground, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { userReducer, initialState } from './reducer/UserReducer';
import { AuthContext } from './context/AuthContext';
import { useForm } from 'react-hook-form';
import * as Services from './services/UserService'
import { Avatar, Button } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign'
import VectorIcon from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-community/async-storage';
import { SET_LOADING, FETCH_COMPLETE } from './reducer/UserAction';
import ImagePicker from "react-native-image-picker";
import { baseURL } from '../../baseUrl/baseURL';

const UpdateScreen = props => {
    const {profile,setOpenModal}=props
    const [avatar,setAvatar]=useState(null)

    console.log('FORM PROFILE', profile);

    const { register, setValue, handleSubmit, watch } = useForm({ 
        defaultValues:{
            id: profile.id,
            name: profile.name,
            username: profile.username,
            email: profile.email,
            address: profile.address,
            phone: profile.phone,
            password: profile.password,
            photo: {},
        } 
    })

    useEffect(() => {
        register('id')
        register('name',{required:true})
        register('username',{required:true})
        register('email', { pattern: /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i ,required:true})
        register('address',{required:true})
        register('phone',{required:true})
        register('password',{required:true})
        register('photo')
    }, [register])


    const value = watch();
    console.log('VALUE PROFILE', value);
    
    const showToast = message => {
        ToastAndroid.show(message, ToastAndroid.SHORT)
    };

    const onSubmit = (data) => {
        const { photo, ...body } = data;
        console.log('BODY HANDLE', body);
        console.log('EDIT HANDLE', photo);
        Services.updateUser(photo, body).then(response => {
            console.log('UPDATE USER', response);
            showToast('DATA UPDATED')
            setOpenModal(false)
        })
    }

    const selectPhotoTapped = () => {
        const options = {
            title: 'Select Photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const uri = response.uri;
                const type = response.type;
                const fileName = response.fileName;
                const source = {
                    uri,
                    type,
                    fileName,
                }
                console.log('SOURCE', source);
                setValue('photo', source)
                setAvatar({uri: uri})
            }
        });
        return options;
    }

    const closeModal = ()=>{
        setOpenModal(false)
    }

    return (
        <View>            
             <View style={styles.profileView}>
                <TouchableOpacity onPress={selectPhotoTapped}>
                    {
                    avatar?
                    <Avatar.Image source={avatar} size={130} />
                    :
                    <Avatar.Image source={{ uri: `${baseURL}/user/photo/${value.id}` }} size={130} />
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.textInputView}>
                <View style={styles.formStyle}>
                    <Text style={{ paddingTop: 12, marginLeft: 10 }}>Name</Text>
                    <TextInput
                        style={styles.textInput, { marginRight: 10 }}
                        value={value.name}
                        onChangeText={(text) => setValue('name',text)}
                    />

                </View>
                <View style={styles.formStyle}>
                    <Text style={{ paddingTop: 12, marginLeft: 10 }}>Username</Text>
                    <TextInput
                        style={styles.textInput, { marginRight: 10 }}
                        value={value.username}
                        onChangeText={text => { setValue('username',text)}}
                    />
                </View>
                <View style={styles.formStyle}>
                    <Text style={{ paddingTop: 12, marginLeft: 10 }}>Email</Text>
                    <TextInput
                        style={styles.textInput}
                        value={value.email}
                        onChangeText={text => { setValue('email',text) }}
                    />
                </View>
                <View style={styles.formStyle}>
                    <Text style={{ paddingTop: 12, marginLeft: 10 }}>Phone</Text>
                    <TextInput
                        style={styles.textInput}
                        value={value.phone}
                        onChangeText={text => { setValue('phone',text) }}
                    />
                </View>
                <View style={styles.formStyle}>
                    <Text style={{ paddingTop: 12, marginLeft: 10 }}>Password</Text>

                    <TextInput
                        style={styles.textInput}
                        value={value.password}
                        onChangeText={text => { setValue('password',text) }}
                    />
                </View>
                <View style={styles.formStyle}>
                    <Text style={{ paddingTop: 12, marginLeft: 10 }}>Address</Text>
                    <TextInput
                        style={styles.textInput, { marginRight: 10 }}
                        value={value.address}
                        onChangeText={text => setValue('address',text) }
                    />
                </View>
            </View >
            <View >
                <View style={styles.buttonStyle}>
                    
                    <Button color='red' onPress={closeModal}>CANCEL</Button>
                  
                    <Button color='blue' onPress={handleSubmit(onSubmit)}>Submit</Button>
                  
                </View>
            </View>

        </View >
    )
}

export default UpdateScreen;

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
        justifyContent: 'space-between'
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
        justifyContent: 'space-around'
    }
})
