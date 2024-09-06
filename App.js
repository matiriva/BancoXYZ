import React from 'react'
import LogOut from './screen/LogOut';
import Login from './screen/Login';
import Home from './screen/Home';
import TransferenciasLista from './screen/Transferencias';
import Transferir from './screen/Transferir';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons";

export default function App() {

  const TabNav = createBottomTabNavigator();

  return (
    <NavigationContainer>
        <TabNav.Navigator        
          screenOptions={{        
          tabBarActiveTintColor: "#0163d2",        
          tabBarInactiveTintColor: "black",        
          tabBarLabelStyle: {        
            fontSize: 14,        
            paddingBottom: 5,          
            fontWeight: 600,
          },
          
        }}
        >
        
        {/* https://oblador.github.io/react-native-vector-icons/#Ionicons */}
        <TabNav.Screen name="Login" component={Login}
            options={{
                tabBarIcon:({focused}) =>(
                  <Icon name='log-in' size={24} color={focused? '#0163d2' : 'black' } />
                ) 
            }} /> 
        <TabNav.Screen name="Home" component={Home} 
            options={{
                tabBarIcon:({focused}) =>(
                  <Icon name='home' size={24} color={focused? '#0163d2' : '#0F4761' } />
                ) 
            }}
        />       
        <TabNav.Screen name="Transferir" component={Transferir} 
            options={{
                tabBarIcon:({focused}) =>(
                  <Icon name='arrow-redo-sharp' size={24} color={focused? '#0163d2' : '#0F4761' } />
                ) 
            }}/>  
        <TabNav.Screen name="Transferencias" component={TransferenciasLista} 
            options={{
                tabBarIcon:({focused}) =>(
                  <Icon name='list' size={24} color={focused? '#0163d2' : '#0F4761' } />
                ) 
            }}/>  
            <TabNav.Screen name="LogOut" component={LogOut} 
                options={{
                    tabBarIcon:({focused}) =>(
                      <Icon name='log-out' size={24} color={focused? '#0163d2' : '#0F4761' } />
                    ) 
                }}/> 
        
      </TabNav.Navigator>
    </NavigationContainer>

  );
}

