import React, { useState } from 'react';
import { View, Image, Text, Dimensions, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import NumberFormat from 'react-number-format';
import { baseURL } from '../../../baseUrl/baseURL';

const Description = props => {

    const { design } = props.route.params;
    const [width, setWidth] = useState(Dimensions.get('window').width)
    const [height, setHeight] = useState(Dimensions.get('window').height / 3)

    return (
        <View>
            <ScrollView>
                <Image style={[styles.imageDetail, { width: width, height: height, }]} source={{ uri: `${baseURL}/design/photo/${design.id}` }} />
                <Text style={{ textAlign: 'center', fontSize: 28, fontWeight: 'bold' }}>{design.theme}</Text>
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <NumberFormat value={design.price} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value => <Text>{value}</Text>} />
                </View>
                <View style={{ alignItems: 'center', marginTop: 20, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity style={styles.orderModal} onPress={() => props.navigation.navigate('DesignTransaksi', { design })}>
                        <Text style={{ textAlign: 'center', marginTop: 14 }}>ORDER</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.orderBack} onPress={() => props.navigation.goBack()}>
                        <Text style={{ textAlign: 'center', marginTop: 14 }}>BACK</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 10, fontWeight: 'bold' }}>Duration: {design.duration} day</Text>
                <Text style={{ textAlign: 'center', fontSize: 13, marginTop: 20, }}>{design.description}</Text>
            </ScrollView>
        </View>
    )
}

export default Description;

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
