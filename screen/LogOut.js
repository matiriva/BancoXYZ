import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
//import AsyncStorage from '@react-native-async-storage/async-storage';

export default LogOut = ({navigation}) => {

const [data, setData] = useState([]);
const logout = () => {

    //AsyncStorage.clear();
    setData('')
    navigation.navigate('Login', {call: 'Logout'})
}

return (
        <View style={styles.container}>
        <StatusBar style="auto" />
       
        <Text style={styles.texto}>Presione salir para cerrar sessión !!</Text>

        <Pressable onPress={logout} style={styles.buttons} >
          <Text style={styles.buttonsText} >Salir</Text>
        </Pressable>   

        </View>

        );
}

const styles = StyleSheet.create({

    container: {
        flex: 1, 
        backgroundColor: '#fff', 
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    buttons: {
      
      marginTop: 20,
      width: '40%',
      height: 40,      
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center',
      color : '#f1f1f1',
      backgroundColor: '#0F4761',
    },
    buttonsText: {
      fontSize: 14,
      height: 20,   
      color : '#f1f1f1',
    },
    texto: {
      fontSize: 20,
    },

});