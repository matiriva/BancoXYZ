import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native'


export default function Principal(){

const logout = () => {

}

return (
        <View style={styles.container}>
        <StatusBar style="auto" />
        <Text>Estas logeado</Text>
        <Button onPress={logout} title="desconectar"/>
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

});