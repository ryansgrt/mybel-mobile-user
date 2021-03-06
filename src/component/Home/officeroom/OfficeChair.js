import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableHighlight, Dimensions, StyleSheet } from 'react-native';
import * as Services from '../services/UnitServices'
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { baseURL } from '../../../baseUrl/baseURL';


const OfficeChair = props => {

    const [unit, setUnit] = useState([]);
    console.log('UNITS', unit);

    const groupingOfficeChair = () => {
        Services.getAllType().then(response => {
            setUnit(response[7].units);
        })
    }

    const save = async (unit) => {
        // const units = JSON.stringify(unit);
        // AsyncStorage.setItem('cart', JSON.stringify(units));

    }

    useEffect(() => {
        groupingOfficeChair();
    }, [])

    return (
        <View>
            <ScrollView>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {
                        unit.map((unit, index) => {
                            return (
                                <View style={{ flexWrap: 'wrap' }} key={index}>
                                    <View style={styles.container}>
                                        <TouchableHighlight onPress={() => props.navigation.navigate('DetailProduct', { unit })}>
                                            <Card>
                                                <Image style={styles.photo} source={{ uri: `${baseURL}/unit/photo/${unit.id}` }} />
                                                <Text style={styles.title}>{unit.name}</Text>
                                                <Text style={styles.price}>{unit.price}</Text>
                                            </Card>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>

            </ScrollView>
        </View>
    )
}
export default OfficeChair;

const { width, height } = Dimensions.get('window')

// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const productNumColums = 2;
// item size
const PRODUCT_ITEM_HEIGHT = 80;
const PRODUCT_ITEM_MARGIN = 20;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: PRODUCT_ITEM_MARGIN,
        marginTop: 20,
        width: (SCREEN_WIDTH - (productNumColums + 1) * PRODUCT_ITEM_MARGIN) / productNumColums,
        height: PRODUCT_ITEM_HEIGHT + 75,
        borderColor: '#cccccc',
        borderWidth: 0.5,
        borderRadius: 15,
        // flexDirection: 'row'
    },
    photo: {
        width: (SCREEN_WIDTH - (productNumColums + 1) * PRODUCT_ITEM_MARGIN) / productNumColums,
        height: PRODUCT_ITEM_HEIGHT,
        borderRadius: 15,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,

    },
    title: {
        flex: 1,
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#444444',
        marginTop: 10,
        marginRight: 5,
        marginLeft: 5,
    },
    price: {
        flex: 1,
        fontSize: 12,
        textAlign: 'center',
        color: 'gray',
        marginTop: 10,
        marginRight: 5,
        marginLeft: 5,
    },
    cardStyle: {
        justifyContent: 'space-between',

    }
})
