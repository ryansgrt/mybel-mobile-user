import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView, TouchableHighlight, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { SearchBar, Card } from 'react-native-elements';
import * as Services from './services/UnitServices';
import bg from '../../picture/pictprofile.jpg';
import office from '../../picture/OfficeRoom.jpg';
import bedRoom from '../../picture/bedRoom.jpg';
import DiningRoom from '../../picture/DiningRoom.jpg'
import Carousel from 'react-native-carousel-loop';
import promo from '../../picture/promo.jpg'
import promo2 from '../../picture/promo2.jpg'
import promo3 from '../../picture/promo3.jpg'
import NumberFormat from 'react-number-format';
import { baseURL } from '../../baseUrl/baseURL';

const HomeScreen = props => {

  const [unit, setUnit] = useState([]);

  const getUnits = () => {
    Services.getAllUnit().then(response => {
      console.log('UNIT', response.content);
      setUnit(response.content)
    })
  }

  useEffect(() => {
    getUnits();
  }, [])

  const [width, setWidth] = useState(Dimensions.get('window').width);
  const [height, setHeight] = useState(Dimensions.get('window').height / 5)


  return (
    <View >
      <ScrollView>
        <View style={styles.cardPadding}>
          <View>
            <Carousel delay={2000} style={{ width: width, height: height }} autoplay  >
              <View style={{ width: width, height: height }} >
                <Image style={{ width: 400, height: 100 }} resizeMode='stretch' source={promo} />
              </View>
              <View style={{ width: width, height: height }}>
                <Image style={{ width: 400, height: 100 }} source={promo2} />
              </View>
              <View style={{ width: width, height: height }}>
                <Image style={{ width: 400, height: 100 }} source={promo3} />
              </View>
            </Carousel>
          </View>

          <View>
            <Text style={{ fontWeight: 'bold', color: 'blue', textAlign: 'center', fontFamily: 'Roboto' }}>MYBEL UNIT</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: 50, marginTop: 20 }}>
              <View style={{ flexWrap: 'wrap' }}>
                <View style={{ marginRight: 10, marginBottom: 10 }}>
                  <TouchableOpacity onPress={() => props.navigation.navigate('LivingRoom')}>
                    <ImageBackground style={styles.photoRoom} source={bg} >
                      <Text style={styles.blurImage}> Living Room</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flexWrap: 'wrap' }}>
                <View  >
                  <TouchableOpacity onPress={() => props.navigation.navigate('DiningRoom')}>
                    <ImageBackground style={styles.photoRoom} source={DiningRoom} >
                      <Text style={styles.blurImage}> Dining Room</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ marginRight: 10 }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('OfficeRoom')}>

                  <ImageBackground style={styles.photoRoom} source={office} >
                    <Text style={styles.blurImage}> Office Room</Text>
                  </ImageBackground>

                </TouchableOpacity>
              </View>
              <View >
                <TouchableOpacity onPress={() => props.navigation.navigate('BedRoom')}>
                  <ImageBackground style={styles.photoRoom} source={bedRoom} >
                    <Text style={styles.blurImage}> Bed Room</Text>
                  </ImageBackground>

                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 30 }} >
            <Text style={{ fontWeight: 'bold', color: 'blue', textAlign: 'center', fontFamily: 'Roboto' }}>MYBEL INTERIOR DESIGN</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: 50, marginTop: 20 }}>
              <View style={{ flexWrap: 'wrap' }}>
                <View style={{ marginRight: 10, marginBottom: 10 }}>
                  <TouchableOpacity onPress={() => props.navigation.navigate('LivingDesign')}>
                    <ImageBackground style={styles.photoRoom} source={bg} >
                      <Text style={styles.blurImage}> Living Room</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flexWrap: 'wrap' }}>
                <View  >
                  <TouchableOpacity onPress={() => props.navigation.navigate('DiningDesign')}>
                    <ImageBackground style={styles.photoRoom} source={DiningRoom} >
                      <Text style={styles.blurImage}> Dining Room</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ marginRight: 10 }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('OfficeDesign')}>
                  <ImageBackground style={styles.photoRoom} source={office} >
                    <Text style={styles.blurImage}> Office Room</Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={() => props.navigation.navigate('BedDesign')}>
                  <ImageBackground style={styles.photoRoom} source={bedRoom} >
                    <Text style={styles.blurImage}> Bed Room</Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 40 }} >
            <Card>
              <TouchableOpacity onPress={() => props.navigation.navigate('AllProduct')}>
                <Text style={{ left: 180, color: 'blue' }}>Let's see all unit ></Text>
              </TouchableOpacity>
              <View>
                <ScrollView horizontal={true} >
                  {unit.slice(0, 5).map((unit, index) => {
                    return (
                      <View key={index} >
                        <TouchableHighlight onPress={() => props.navigation.navigate('DetailProduct', { unit })}>
                          <Card>
                            <Image style={styles.photo} source={{ uri: `${baseURL}/unit/photo/${unit.id}` }} />
                            <Text style={{ textAlign: 'center' }}>{unit.name}</Text>
                            <NumberFormat value={unit.price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} renderText={value => <Text>{value}</Text>} />
                          </Card>
                        </TouchableHighlight>
                      </View>
                    );
                  })
                  }
                </ScrollView>
              </View>
            </Card>
          </View>
        </View>
      </ScrollView >
    </View >
  )
}

export default HomeScreen;

const { width, height } = Dimensions.get('window')

// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
const SCREEN_WIDTH_ROOM = width < height ? width : height;

const productNumColums = 2;
const productNumColumsRoom = 10;
// item size
const PRODUCT_ITEM_HEIGHT = 100;
const PRODUCT_ITEM_MARGIN = 78;
const PRODUCT_ITEM_HEIGHT_ROOM = 120;
const PRODUCT_ITEM_MARGIN_ROOM = 10;
const PRODUCT_ITEM_HEIGHT_CAROUSEL = 50;
const PRODUCT_ITEM_MARGIN_CAROUSEL = 20;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  cardPadding: {
    paddingTop: 15,
  },
  card: {
    borderRadius: 15,
  },
  cardStyle: {
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: PRODUCT_ITEM_MARGIN,
    marginTop: 40,
    width: (SCREEN_WIDTH - (productNumColums + 1) * PRODUCT_ITEM_MARGIN) / productNumColums,
    height: PRODUCT_ITEM_HEIGHT + 75,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 15,
  },
  containerRoom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: PRODUCT_ITEM_MARGIN_ROOM,
    marginTop: 40,
    width: (SCREEN_WIDTH - (productNumColumsRoom + 1) * PRODUCT_ITEM_MARGIN_ROOM) / productNumColumsRoom,
    height: PRODUCT_ITEM_HEIGHT_ROOM + 75,
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

  },
  photoRoom: {
    width: (SCREEN_WIDTH_ROOM - (productNumColumsRoom + 1) * PRODUCT_ITEM_MARGIN_ROOM) / productNumColums,
    height: PRODUCT_ITEM_HEIGHT_ROOM,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  photoCarousel: {
    width: (SCREEN_WIDTH_ROOM - (productNumColums + 1) * PRODUCT_ITEM_MARGIN_CAROUSEL) / productNumColums,
    height: PRODUCT_ITEM_HEIGHT_CAROUSEL,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: '#fff'
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

})





