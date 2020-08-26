import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableHighlight, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as Services from './services/UnitServices'
import { Card } from 'react-native-elements';
import NumberFormat from 'react-number-format';
import { baseURL } from '../../baseUrl/baseURL';


const AllProduct = props => {

    const [unit, setUnit] = useState([])

    const allUnit = () => {
        Services.getAllUnit().then(response => {
            setUnit(response.content)
        })
    }

    useEffect(() => {
        allUnit();
    }, [])

    return (
        <View>
            <ScrollView>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {
                        unit.map((unit, index) => {
                            return (
                                <View style={{ flexWrap: 'wrap' }}>
                                    <View key={index} style={styles.container}>
                                        <TouchableHighlight onPress={() => props.navigation.navigate('DetailProduct', { unit })}>
                                            <Card>
                                                <Image style={styles.photo} source={{ uri: `${baseURL}/unit/photo/${unit.id}` }} />
                                                <Text style={styles.title}>{unit.name}</Text>
                                                <View style={{ alignItems: 'center' }}>
                                                    <NumberFormat value={unit.price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={value => <Text>{value}</Text>} />
                                                </View>
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
export default AllProduct;

const { width, height } = Dimensions.get('window')

// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const productNumColums = 2;
// item size
const PRODUCT_ITEM_HEIGHT = 80;
const PRODUCT_ITEM_MARGIN = 35;

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
