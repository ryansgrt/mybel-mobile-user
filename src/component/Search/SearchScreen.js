import React, { Component, useEffect, useState } from 'react';

import {
  StyleSheet,
  Text,
  Linking,
  TouchableOpacity,
  View,
  Modal,
  Image,
  ImageBackground,
  Button
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import * as Service from '../Home/services/UnitServices'
import { SearchBar } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import pict1 from '../../picture/mejamakan.jpeg'
import pict2 from '../../picture/DiningRoom.jpg'

const SearchScreen = props =>{
  const [modal , setModal] = useState(false);
    return (
      <View style={{flexDirection:'row'}}>
        <SearchBar 
        containerStyle={{
          backgroundColor: 'transparent',
          borderBottomColor: 'transparent',
          borderTopColor: 'transparent',
          flex: 1
        }}
        inputContainerStyle={{
          backgroundColor: '#EDEDED'
        }}
        inputStyle={{
          backgroundColor: '#EDEDED',
          borderRadius: 10,
          color: 'black'
        }}
        searchIcond
        clearIcon
        //lightTheme
        round
        onChangeText={text => params.handleSearch(text)}
        //onClear={() => params.handleSearch('')}
        placeholder="Search"
        onChangeText
        />
        <TouchableOpacity style={{marginTop:15, marginRight:5}} onPress={() => setModal(true)}>
            <AntDesign size={35} name='scan1'  />
        </TouchableOpacity>
        <Modal animationType="fade"
              transparent={true} 
              visible={modal}
              presentationStyle="overFullScreen">
          <View style={{flex: 1, backgroundColor: '#000000aa'}}>
            <View style={{marginVertical: '50%', marginHorizontal: 20, height: 200, borderRadius: 10}}>
              <Button title="Close" onPress={() => setModal(false)} />
              <View style={{flexDirection:'row', justifyContent: 'space-between', marginTop: 10}}>
                <View>
                  <TouchableOpacity onPress={() => props.navigation.navigate('SearchQrDesign')}>
                    <ImageBackground style={{width: 157, height:200, borderRadius: 10}} source={pict1} >
                <View style={styles.blurImage}>
                        <Text style={styles.textDesign}>DESIGN</Text>
                  </View>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
                <View style={{borderRadius: 10}}>
                  <TouchableOpacity onPress={()=> props.navigation.navigate('SearchQrUnit')}>
                    <ImageBackground style={{width: 157, height:200, borderRadius: 10}} source={pict2} >
                    <View style={styles.blurImage}>
                        <Text style={styles.textDesign}>UNIT</Text>
                  </View>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>

    );
  
}
export default SearchScreen;
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  },
  blurImage: {
    flex: 1,
    justifyContent: 'center',
    fontWeight: 'bold',
    alignItems: 'center',
    backgroundColor: 'rgba( 0, 0, 0, 0.6 )',
    color: 'white',
    fontSize: 16,
},
textDesign: {
    color: 'white',
}
});
