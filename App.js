import React from 'react'
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
//import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator }  from '@react-navigation/stack';
import Icon from "react-native-vector-icons/Ionicons";

import AsyncStorage from '@react-native-async-storage/async-storage';

// SCREENS
import LogOut from './screen/LogOut';
import Login from './screen/Login';
import Home from './screen/Home';
import TransferenciasLista from './screen/Transferencias';
import Transferir from './screen/Transferir';



export default function App() {


  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState('')

  const [isLoggedIn, setIsLoggedIn] = useState('')

  const Stack = createStackNavigator();

   useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      let uToken;
      uToken = null;
      try {
        uToken = await AsyncStorage.getItem('token');
        setUserToken(uToken);
        setIsLoggedIn(false);
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', token);
    }, 1000);
  }, []);

  


  if( isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  return (
    <NavigationContainer>
        <Stack.Navigator      
            initialRouteName="Login"
            screenOptions={{
            headerMode: 'screen',
            headerTintColor: '#0F4761',//'white',
            headerStyle: { backgroundColor: 'white' },
          }}>
  {/* {isLoggedIn ? ( 
    // Screens for logged in users*/}
    <Stack.Group>
            <Stack.Screen name="Home" component={Home} 
              options={{
                headerShown: true,
                tabBarIcon:({focused}) =>(
                  <Icon name='home' size={24} color={focused? '#0163d2' : '#0F4761' } />
                ) 
            }}/>       
            <Stack.Screen name="Transferir" component={Transferir} 
              options={{
                headerShown: true,
                  tabBarIcon:({focused}) =>(
                    <Icon name='arrow-redo-sharp' size={24} color={focused? '#0163d2' : '#0F4761' } />
                  ) 
            }}/>  
            <Stack.Screen name="Transferencias" component={TransferenciasLista} 
              options={{
                headerShown: true,
                  tabBarIcon:({focused}) =>(
                    <Icon name='list' size={24} color={focused? '#0163d2' : '#0F4761' } />
                  ) 
            }}/>  
    </Stack.Group>
  {/* ) : ( 
            // Auth screens*/}
            <Stack.Group screenOptions={{ headerShown: false }}>

            <Stack.Screen name="LogOut" component={LogOut} 
              options={{
                headerShown: true,
                  tabBarIcon:({focused}) =>(
                    <Icon name='log-out' size={24} color={focused? '#0163d2' : '#0F4761' } />
                ) 
              }}/> 
            <Stack.Screen name="Login" component={Login}
              options={{
                headerShown: false
                }} /> 

          </Stack.Group>

        {/* )} */}

      </Stack.Navigator>
    </NavigationContainer>

  );
}

