import React, { useState, useEffect } from 'react';
import * as Services from '../services/UnitServices'
import { View, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { baseURL } from '../../../baseUrl/baseURL';

const Kursi = props => {

    const [unit, setUnit] = useState([])

    const groupingChair = async () => {
        Services.getAllType().then(response => {
            console.log(response[1].units);
            setUnit(response[1].units)
        })
    }

    useEffect(() => {
        groupingChair();
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
                                            <Card style={styles.cardStyle}>
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

export default Kursi;

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
