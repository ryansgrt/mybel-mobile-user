import React from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../component/Home/HomeScreen'
import SearchScreen from '../component/Search/SearchScreen'
import LivingRoom from '../component/Home/LivingRoom'
import Chair from '../component/Home/livingroom/Kursi'
import Sofa from '../component/Home/livingroom/Sofa'
import DiningRoom from '../component/Home/DiningRoom'
import DiningTable from '../component/Home/diningroom/DiningTable'
import DiningChair from '../component/Home/diningroom/DiningChair'
import OfficeRoom from '../component/Home/OfficeRoom'
import OfficeChair from '../component/Home/officeroom/OfficeChair'
import OfficeTable from '../component/Home/officeroom/OfficeTable'
import BedRoom from '../component/Home/BedRoom'
import Kasur from '../component/Home/bedroom/Kasur'
import TempatTidur from '../component/Home/bedroom/TempatTidur'
import NoAccount from '../component/Profile/NoAccount'
import Location from '../component/Location/Location';
import ChatScreen from '../component/ChatScreen/ChatScreen';
import AllProduct from '../component/Home/AllProduct'
import DetailProduct from '../component/Home/DetailProduct'
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import SignUpScreen from '../component/Profile/SignUpScreen';
import SignInScreen from '../component/Profile/SignInScreen';
import DesignBed from '../component/Home/designInterior/BedRoom';
import DesignDining from '../component/Home/designInterior/DiningRoom';
import DesignLiving from '../component/Home/designInterior/LivingRoom';
import DesignOffice from '../component/Home/designInterior/OfficeRoom';
import Description from '../component/Home/designInterior/Description';
import TransactionDesignScreen from '../component/Home/transaction/TransactionDesignScreen';
import TransactionUnitScreen from '../component/Home/transaction/TransactionUnitScreen';
import QrDesign from '../component/Search/QrDesign';
import QrUnit from '../component/Search/QrUnit';

const Tab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const NullAccounts = createStackNavigator();
const SearchStack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Tab.Navigator activeColor="yellow">
            <Tab.Screen
                name="Home"
                component={Homes}
                options={{
                    tabBarIcon: ({ color }) => <Icons size={25} name={'ios-home'} color={color} />,

                }}
            />
            <Tab.Screen
                name='Searching'
                component={SearchStackScreen}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color }) => <Icons size={25} name={'ios-search'} color={color} />
                }}
            />
            <Tab.Screen
                name='Profile'
                component={NullAccount}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => <Icons size={25} name={'ios-person'} color={color} />
                }}
            />
        </Tab.Navigator>
    )
}

export default AppNavigator;

const NullAccount = ({ navigation }) => (
    <NullAccounts.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#296dff',
            height: 40,
        },

        headerTitleStyle: {
            fontWeight: 'bold',
            fontColor: '#fff'
        }
    }} initialRouteName='SignIn'>
        <NullAccounts.Screen name="SignIn" component={SignInScreen} options={{
            title: 'Discover',
            headerShown: false,

        }} />
        <NullAccounts.Screen name="SignUp" component={SignUpScreen} options={{
            title: 'Sign Up',
            headerShown: false,

        }} />
    </NullAccounts.Navigator>
)

const Homes = ({ navigation }) => (

    <HomeStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#296dff',
            height: 40,
        },

        headerTitleStyle: {
            fontWeight: 'bold',
            color: '#fff'
        }
    }} initialRouteName="Home">
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
            title: 'Discover',
            headerShown: false,

        }} />
        <HomeStack.Screen name="LivingRoom" component={LivingRoom} options={{
            title: 'Living Room',
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
        }} />
        <HomeStack.Screen name="Chair" component={Chair} options={{
            title: 'Chair',
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
        }} />
        <HomeStack.Screen name="Sofa" component={Sofa} options={{
            title: 'Sofa',
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
        }} />
        <HomeStack.Screen name="DiningRoom" component={DiningRoom} options={{
            title: 'Dining Room',
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
        }} />
        <HomeStack.Screen name="MejaMakan" component={DiningTable} options={{
            title: 'Dining Table',
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
        }} />
        <HomeStack.Screen name="KursiMakan" component={DiningChair} options={{
            title: 'Dining Chair',
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
        }} />
        <HomeStack.Screen name="OfficeRoom" component={OfficeRoom} options={{
            title: 'Office Room',
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
        }} />
        <HomeStack.Screen name="KursiKantor" component={OfficeChair} options={{
            title: 'Office Chair',
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
        }} />
        <HomeStack.Screen name="MejaKantor" component={OfficeTable} options={{
            title: 'Office Table',
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
        }} />
        <HomeStack.Screen name="BedRoom" component={BedRoom} options={{
            title: 'Bed Room',
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
        }} />
        <HomeStack.Screen name="Kasur" component={Kasur} options={{
            title: 'mattress',
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
        }} />
        <HomeStack.Screen name="TempatTidur" component={TempatTidur} options={{
            title: 'Bed',
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
        }} />
        <HomeStack.Screen name="AllProduct" component={AllProduct} options={{
            title: 'Product',
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
        }} />
        <HomeStack.Screen name="DetailProduct" component={DetailProduct} options={{
            title: 'Product',
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerShown: false
        }} />
        <HomeStack.Screen name="BedDesign" component={DesignBed} options={{
            title: 'Product',
            headerTitleAlign: 'center',
            headerTintColor: '#fff',

        }} />
        <HomeStack.Screen name="DiningDesign" component={DesignDining} options={{
            title: 'Product',
            headerTitleAlign: 'center',
            headerTintColor: '#fff',

        }} />
        <HomeStack.Screen name="LivingDesign" component={DesignLiving} options={{
            title: 'Product',
            headerTitleAlign: 'center',
            headerTintColor: '#fff',

        }} />
        <HomeStack.Screen name="OfficeDesign" component={DesignOffice} options={{
            title: 'Product',
            headerTitleAlign: 'center',
            headerTintColor: '#fff',

        }} />
        <HomeStack.Screen name="DesignDeskripsi" component={Description} options={{
            title: 'Product',
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerShown: false
        }} />
        <HomeStack.Screen name="DesignTransaksi" component={TransactionDesignScreen} options={{
            title: 'Design Transaction',
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerShown: false
        }} />
        <HomeStack.Screen name="UnitTransaksi" component={TransactionUnitScreen} options={{
            title: 'Unit Transaction',
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerShown: false
        }} />


    </HomeStack.Navigator>
)

const SearchStackScreen = () => (
    <SearchStack.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#296dff',
            height: 40,
        },

        headerTitleStyle: {
            fontWeight: 'bold',
            color: '#fff'
        }
    }} initialRouteName="SearchHome">
        <SearchStack.Screen name='SearchHome' component={SearchScreen} options={{
            headerShown:false
        }}
        />
          <SearchStack.Screen name='SearchQrDesign' component={QrDesign} options={{
            headerShown:false
        }}
        />
        <SearchStack.Screen name='SearchQrUnit' component={QrUnit} options={{
            headerShown:false
        }}
        /> 
        <SearchStack.Screen name='UnitSearch' component={DetailProduct} options={{
            headerShown:false
        }}
        />        
        <SearchStack.Screen name='DesignSearch' component={Description} options={{
            headerShown:false
        }}
        /> 

</SearchStack.Navigator>

)
