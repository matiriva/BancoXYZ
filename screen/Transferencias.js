import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Animated,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { filter } from "lodash";

export default function TransferenciasLista() {
  const url =
    "https://n0qaa2fx3c.execute-api.us-east-1.amazonaws.com/default/transferList";

  

  const [isLoading, setIsLoading] = useState(false);
  const [Transfers, setTransfers] = useState([]);
  const [error, setError] = useState(null);
  const [fullData, setFullData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

useEffect(() => {
    setIsLoading(true);
    fetchData(url);
  },[]);

  const bearer = "Bearer fake-jwt-token";

   const fetchData = async(url) => {
    try{
      const response = await fetch(url, {
        method: "GET", 
        headers: {
            "Content-Type": "application/json",
            Authorization: bearer,          
          }        
      });
      
      const json = await response.json();

      setTransfers(json.transfers);
      setFullData(json.transfers);
      setIsLoading(false);

      console.log(json.transfers);
    }
    catch(error)
    {   
      setError(error);
      console.log(error);
      setIsLoading(false);
    }
  }

  const textInputChange = (query) => {
    setSearchQuery(query);

    const formattedQuery = query.toLowerCase();
    const filteredData = filter(fullData, (user) => {
      return contains(user, formattedQuery);
    });
    setTransfers(filteredData);
  };
  
  const contains = ({payeer, date}, query) => {
   const {document, name, value} = payeer; 
   //const value = payeer; 
    if(document.includes(query)
      || name.toLowerCase().includes(query)
      || date.includes(query)
      //|| value.toString().includes(query)  
    )
    {
      return true;
    }
    else
    {      
      return false;
    }
  }


  if (isLoading) {
    return   (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <ActivityIndicator size="large"/>
            </View>)
  }

  if (error) {
    return   (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
              <Text>Error in fecth data.. Please check your internet connectión</Text>
            </View>)
  }
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.subTitle}> Lista de Movimientos</Text>

        {Transfers ? (
          <View style={{width: "90%", 
            justifyContent: "center",
            alignItems: "center" }}>

            <View style={{ width: "90%" , 
                          justifyContent: "center",
                          alignItems: "center",marginBottom: 20 }} >
              <TextInput  testID="tiFilter" onChangeText={(query) => { textInputChange(query);}} style={styles.textInputFilter}  
              placeholder="BUSCAR"
              clearButtonMode="always"
              autoCapitalize="none"
              autoCorrect={false}
              value={searchQuery}/>    
            
            </View>
            <View>
              {Transfers.map((transfer) => {
                return (
                  <View key={transfer.payeer.document} style={styles.table}>
                    <Text style={styles.item}> {transfer.date} </Text>
                    <View style={{ flexDirection: "column" }}>
                      <View
                        style={{
                          justifyContent: "space-between",
                          flexDirection: "column",
                          alignItems: "center",
                          height: 50,
                          width: "96%",
                        }}>
                        <Animated.View
                          style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            //height: 20,
                            width: "100%",
                            //padding: 2,
                            paddingLeft: 10,
                          }}
                        >
                          <Animated.Text
                            style={{
                              flexDirection: "column",
                              fontSize: 18,
                              textAlign: "left",
                              color: transfer.value > 0 ? "#0F4761" : "#FF4500",
                            }}
                          >
                            {transfer.payeer.name}
                          </Animated.Text>
                          <Animated.Text
                            style={{
                              fontSize: 18,
                              textAlign: "right",
                              color: transfer.value > 0 ? "#0F4761" : "#FF4500",
                            }}
                          >
                            {transfer.value > 0
                              ? ` ${transfer.value} `
                              : `-  ${Math.abs(transfer.value)} `}{" "}
                            {transfer.currency}
                          </Animated.Text>
                        </Animated.View>
                        <Animated.View
                          style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            //height: 50,
                            width: "100%",
                            padding: 2,
                            paddingBottom: 6,
                            paddingLeft: 16,
                          }}
                        >
                          <Animated.Text
                            style={{
                              flexDirection: "column",
                              fontSize: 14,
                              textAlign: "left",
                              color: "grey",
                            }}
                          >
                            ({transfer.payeer.document})
                          </Animated.Text>
                          <Animated.Text></Animated.Text>
                        </Animated.View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 10,
    width: "100%",
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  container: {
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  table: {
    padding:10,
    alignItems: "flex-start",
    borderStyle: "solid",
    borderBottomWidth: 4,
    borderTopWidth: 1,
    borderStartWidth: 1,
    borderRadius: 10,
    borderColor: "#0F4761",
  },
  item: {
    paddingStart: 10,
    fontSize: 14,
  },
  titulo: {
    fontSize: 20,
    color: "#34434D",
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 20,
    color: "gray",
  },
  textInput: {
    padding: 10,
    paddingStart: 30,
    width: "80%",
    height: 50,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: "#fff",
    width: "100%",
  },
  buttons: {
    marginTop: 40,
    width: "40%",
    height: 40,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    color: "#f1f1f1",
    backgroundColor: "#0F4761",
  },
  buttonsText: {
    fontSize: 14,
    height: 20,
    color: "#f1f1f1",
  },
  textInputFilter: {
    padding: 10,
    paddingStart: 30,
    width: "80%",
    height: 50,
    marginTop: 20,
    borderRadius: 8,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    width: "100%",
  },
});
