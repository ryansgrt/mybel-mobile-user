import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Dimensions } from 'react-native';
import * as Services from '../../../Profile/services/UserService'
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import NumberFormat from 'react-number-format';

const HistoryTransaction = props => {

    const [width, setWidth] = useState(Dimensions.get('window').width)
    const [height, setHeight] = useState(Dimensions.get('window').height / 6)

    const [user, setUser] = useState([])
    const getHistory = async () => {
        try {
            const user = await AsyncStorage.getItem('userToken')
            console.log('USER GET SERVICE', user);

            Services.getUserId(user).then(response => {
                console.log('PROFILE RESPONSE', response);
                setUser(response.transactions)
            })

        } catch (error) {
            console.log('ERROR RESPONSE', error);
        }
    }

    useEffect(() => {
        getHistory();
    }, [])

    return (
        <View>
            <ScrollView>
                {
                    user.map((user, index) => {
                        return (
                            <View key={index} style={{ width: width, height: height }}  >
                                <Text>------------------------------------------------------------------------------------------</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontWeight: 'bold' }}>Id Transaction</Text>
                                    <Text>{user.id}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontWeight: 'bold' }}>Quantity</Text>
                                    <Text>{user.quantity}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontWeight: 'bold' }}>Date</Text>
                                    <Text>{user.date}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ fontWeight: 'bold' }}>Location</Text>
                                    <Text>{user.sendLocation}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                    <Text style={{ fontWeight: 'bold' }} >Price</Text>
                                    <NumberFormat value={user.totalPrice} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={value => <Text>{value}</Text>} />
                                </View>
                                <Text>------------------------------------------------------------------------------------------</Text>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}
export default HistoryTransaction

