import React, { useState, useEffect, useReducer } from 'react';
import { View, Text, Dimensions, TouchableOpacity, ToastAndroid, StyleSheet, TextInput } from 'react-native';
import { Image } from 'react-native';
import { Button, Modal, Card } from 'react-native-paper';
import NumberFormat from 'react-number-format';
import AsyncStorage from '@react-native-community/async-storage';
import * as Services from '../Profile/services/UserService'
import * as Servis from './transaction/TransactionService'
import { transactionReducer, initialState } from './transaction/reducer/TransactionReducer';
import { useForm } from 'react-hook-form';
import { INCREMENT, DECREMENT } from './transaction/reducer/TransactionAction';
import { baseURL } from '../../baseUrl/baseURL';


const DetailProduct = props => {
    const { unit } = props.route.params;
    const [state, dispatch] = useReducer(transactionReducer, initialState)
    const [width, setWidth] = useState(Dimensions.get('window').width);
    const [height, setHeight] = useState(Dimensions.get('window').height / 3)
    const [profile, setProfile] = useState([])
    const [editable, setEditable] = useState(true);
    const [localState, setLocalState] = useState({ action: 'list' });

    // const order = async () => {
    //     const user = await AsyncStorage.getItem('userToken')
    //     if (user != null) {
    //         props.navigation.navigate('UnitTransaksi')
    //     } else {
    //         alert('Please Login First')
    //     }
    // }


    // const back = async () => {
    //     await AsyncStorage.removeItem('cart')
    //     props.navigation.goBack();
    // }

    return (
        <View>
            <Image style={[styles.imageDetail, { width: width, height: height, }]} source={{ uri: `${baseURL}/unit/photo/${unit.id}` }} />
            <View style={{ marginTop: 10 }}>
                <Text style={{ textAlign: 'center', fontSize: 28, fontWeight: 'bold' }}>{unit.name}</Text>
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <NumberFormat value={unit.price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value => <Text>{value}</Text>} />
                </View>
                <View style={{ alignItems: 'center', marginTop: 20, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity style={styles.orderModal} onPress={() => props.navigation.navigate('UnitTransaksi', { unit })}>
                        <Text style={{ textAlign: 'center', marginTop: 14 }}>ORDER</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.orderBack} onPress={() => props.navigation.goBack()}>
                        <Text style={{ textAlign: 'center', marginTop: 14 }}>BACK</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ textAlign: 'center', fontSize: 13, marginTop: 30 }}>{unit.description}</Text>
            </View>
        </View>
    )
}

export default DetailProduct;

const styles = StyleSheet.create({
    modalView: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        alignItems: "center",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingVertical: 16,
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    centerModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageDetail: {
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'blue'
    },
    orderModal: {
        borderRadius: 30,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'blue',
        borderColor: 'blue',
        width: 100,
        height: 50
    },
    orderBack: {
        borderRadius: 30,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'red',

        width: 100,
        height: 50
    }
})
