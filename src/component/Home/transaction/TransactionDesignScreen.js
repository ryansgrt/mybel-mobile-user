import React, { useEffect, useState, useReducer } from 'react';
import { View, ToastAndroid, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useForm } from 'react-hook-form';
import { Card, Button } from 'react-native-paper';
import { transactionReducer, initialState } from './reducer/TransactionReducer';
import * as Service from './TransactionService'
import { Modal } from 'react-native';

const TransactionDesignScreen = props => {
    const { design } = props.route.params;
    const [state, dispatch] = useReducer(transactionReducer, initialState)
    const { register, setValue, handleSubmit, reset, watch, } = useForm({ defaultValues });
    const value = watch();
    const [localState, setLocalState] = useState({ action: 'list' });
    const [modal, setModal] = useState(false);

    const showToast = message => {
        ToastAndroid.show(message, ToastAndroid.SHORT)
    }

    useEffect(() => {
        register('quantity')
        register('selectUser')
        register('sendLocation')
        register('totalPrice')
        register('design')
        setLocalState({ action: 'list' })
    }, [register])

    const defaultValues = {
        quantity: 1,
        selectUser: '',
        sendLocation: '',
        totalPrice: '',
        design: '',
    }

    const product = design.id;
    const totalPrices = design.price * value.quantity;

    const onSubmits = async (form) => {

        const user = await AsyncStorage.getItem('userToken')
        if (user != null) {
            setValue('selectUser', user)
            setValue('unit', product)
            setValue('totalPrice', totalPrices)
            setModal(true);
            console.log(value, "data on submit");
            Service.saveTransaction(form).then(response => {
                console.log(response, "response");

                showToast('SUCCESS')
            })

        } else {
            alert('Please Login')
        }
    }
    const onSave = async (form) => {

        const user = await AsyncStorage.getItem('userToken')
        if (user != null) {
            setValue('selectUser', user)
            setValue('unit', product)
            setValue('totalPrice', totalPrices)
            console.log(value, "data on submit");
            Service.saveTransaction(form).then(response => {
                console.log(response, "response");
                setModal(false);
                showToast('SUCCESS')
            })

        } else {
            alert('Please Login')
        }
    }


    return (
        <View>
            <Card >
                <Text style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 20 }}>TRANSACTION</Text>
                <View style={{ marginLeft: 10, marginTop: 10, marginBottom: 10, marginRight: 10 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={{ fontWeight: 'bold' }}>Quantity </Text>
                        <TextInput
                            placeholder="Enter quantity"
                            onChangeText={(form) => { setValue('quantity', form) }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={{ fontWeight: 'bold' }}>Location </Text>
                        <TextInput

                            placeholder="Enter location"
                            onChangeText={(form) => { setValue('sendLocation', form) }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 30 }}>
                        <TouchableOpacity style={styles.orderSave} onPress={handleSubmit(onSubmits)}>
                            <Text style={{ textAlign: 'center', marginTop: 13, fontSize: 13 }}>Buy Now</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.orderModal} onPress={() => props.navigation.goBack()}>
                            <Text style={{ textAlign: 'center', marginTop: 13, fontSize: 13 }}>CLOSE</Text>
                        </TouchableOpacity>
                        <Modal animationType="fade"
                            visible={modal}
                            presentationStyle="overFullScreen">
                            <Card>
                                <View style={{ marginTop: 20 }}>
                                    <Text style={{ textAlign: 'center' }}>Are you sure?</Text>
                                </View>
                                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: 20, marginRight: 30 }}>
                                    <Button onPress={handleSubmit(onSave)}>Yes</Button>
                                    <Button onPress={() => setModal(false)}>No</Button>
                                </View>
                            </Card>
                        </Modal>
                    </View>
                </View>

            </Card>
        </View>
    )
}

export default TransactionDesignScreen

const styles = StyleSheet.create({
    orderModal: {
        borderRadius: 30,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'red',
        width: 70,
        height: 50
    },
    orderSave: {
        borderRadius: 30,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'blue',
        width: 70,
        height: 50
    }
})
