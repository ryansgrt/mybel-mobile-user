import React, { Component, useEffect } from 'react';

import {
  StyleSheet,
  Text,
  Linking,
  TouchableOpacity
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import * as Service from '../Home/services/UnitServices'

const QrDesign = props => {
  const onSuccess = e => {
    Service.getDesignId(e.data).then(response => {
      if (response != null) {
        props.navigation.navigate('DesignSearch', {design:response})
      } else {
        alert('Not Found')
      }
    }).catch(e =>{});
  }


    return (
      <QRCodeScanner
        onRead={onSuccess}
        // flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            <Text style={styles.textBold}>Point The Camera At The QR Code For Scanning</Text> on
          </Text>
        }
        bottomContent={
            <TouchableOpacity>
                <Text>Ok, Got It</Text>
            </TouchableOpacity>
        }
        
      />

    );
}
export default QrDesign;

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
  }
});