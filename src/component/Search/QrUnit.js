import React, { Component, useEffect, useState } from 'react';

import {
  StyleSheet,
  Text,
  Linking,
  TouchableOpacity
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import * as Service from '../Home/services/UnitServices'

const QrUnit = props => {
  const onSuccess = e => {
    Service.getUnitId(e.data).then(response => {
      
      if (response != null) {
        props.navigation.navigate('UnitSearch', {unit:response})
      } else {
        
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
      />

    );
}
export default QrUnit;

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