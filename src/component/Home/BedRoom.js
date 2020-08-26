import React from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, TouchableHighlight } from 'react-native';
import { Card } from 'react-native-elements';
import Kasur from '../../picture/kasur.jpg';
import TempatTidur from '../../picture/tempatTidur.jpg';
import * as Animatable from 'react-native-animatable';


const DiningRoom = ({ navigation }) => {
    return (
        <View>
            <Animatable.View animation='zoomInDown'>
                <View style={{ marginLeft: 15, marginTop: 80 }}>
                    <TouchableHighlight onPress={() => navigation.navigate('Kasur')}>
                        <ImageBackground source={Kasur} style={styles.photo}>
                            <View style={styles.blurImage}>
                                <Text style={styles.title}> Mattress</Text>
                            </View>
                        </ImageBackground>
                    </TouchableHighlight>
                </View>

                <View style={{ marginLeft: 15, marginTop: 40 }} >
                    <TouchableHighlight onPress={() => navigation.navigate('TempatTidur')}>
                        <ImageBackground source={TempatTidur} style={styles.photo}>
                            <View style={styles.blurImage}>
                                <Text style={styles.title}> Bed</Text>
                            </View>
                        </ImageBackground>
                    </TouchableHighlight>
                </View>
            </Animatable.View>
        </View>

    )
}
export default DiningRoom;

const { width, height } = Dimensions.get('window')

// orientation must fixed
const SCREEN_WIDTH = width > height ? width : height;

const productNumColums = 2;
// item size
const PRODUCT_ITEM_HEIGHT = 200;
const PRODUCT_ITEM_MARGIN = 20;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: PRODUCT_ITEM_MARGIN,
        marginTop: 20,
        // width: (SCREEN_WIDTH - (productNumColums + 1) * PRODUCT_ITEM_MARGIN) / productNumColums,
        // height: PRODUCT_ITEM_HEIGHT + 75,
        borderColor: '#cccccc',
        borderWidth: 0.5,
        borderRadius: 15,


    },
    photo: {
        width: (SCREEN_WIDTH - (productNumColums + 1) * PRODUCT_ITEM_MARGIN) / productNumColums,
        height: PRODUCT_ITEM_HEIGHT,
        borderRadius: 15,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        marginRight: 15,

    },
    title: {
        flex: 1,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        marginTop: 90,
        marginRight: 5,
        marginLeft: 5,

    },
    price: {
        flex: 1,
        fontSize: 20,
        textAlign: 'center',
        color: '#444444',
        marginTop: 10,
        marginRight: 5,
        marginLeft: 5,
    },
    cardStyle: {
        justifyContent: 'space-between',
    },
    blurImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba( 0, 0, 0, 0.6 )',

    }
})