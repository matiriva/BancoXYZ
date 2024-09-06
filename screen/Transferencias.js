
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { useState } from 'react'

export default function TransferenciasLista(){

  useEffect(() =>{

    getData(url, {email: (email), password: (password)
    })
    .then(data => {
      console.log(data); 
    })
  }
)

    const url = "https://n0qaa2fx3c.execute-api.us-east-1.amazonaws.com/default/transferList"

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //const [data, setData] = useState(undefined);
    const [Transfers, setTransfers] = useState([]);

    const bearer = 'Bearer fake-jwt-token';

  async function getData(url = '') {
  
    // Opciones por defecto estan marcadas con un *
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearer,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      //body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const onSubmit = async() =>{
    getData(url)
    .then(data => {
      setTransfers(data.transfers)
      console.log(data); 
    })

}

return (
  <View style={styles.mainContainer}>
    <View style={styles.container}>
        <StatusBar style="auto" />
          <Text style={styles.subTitle} > Lista de Transferencias</Text>

                  {
          Transfers?

          <View style={{ marginTop: 10 }}> 
            <View style={styles.table}>
                    {Transfers.map((transfer) => {
                        return (
                        <View style={{ flexDirection: 'row' }} >
                            <Text style={styles.item}>{transfer.value} | </Text>  
                            <Text style={styles.item}>{transfer.date}  | </Text>
                            <Text style={styles.item}>{transfer.currency}  | </Text>
                            <Text style={styles.item}>{transfer.payeer.document}  | </Text>
                            <Text style={styles.item}>{transfer.payeer.name}  </Text>
                        </View>
                        );
                    })}
            </View>              
          
          </View>
          : null

        }
         <Pressable onPress={onSubmit} style={styles.buttons} >
          <Text style={styles.buttonsText} >Refrescar </Text>
        </Pressable> 
    </View>  
  </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 10,
    width: '100%',
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  container: {
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  table: {
    alignItems: 'flex-start',

  },
  item: {
    
    fontSize: 12,

  },
  titulo:{
    fontSize: 20,
    color: '#34434D',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 20,
    color: 'gray',      
  },
    textInput: {    
      padding: 10,
      paddingStart: 30,
      width: '80%',
      height: 50,
      marginTop: 20,
      borderRadius: 30,
      backgroundColor: '#fff',

  },
  buttons: {
    
    marginTop: 40,
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
});