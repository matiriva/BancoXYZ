import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  Animated,
  Box,
} from "react-native";
import { useState } from "react";

export default function TransferenciasLista() {
  const url =
    "https://n0qaa2fx3c.execute-api.us-east-1.amazonaws.com/default/transferList";

  useEffect(() => {
    getData(url).then((data) => {
      console.log(data);
    });
  });

  const [Transfers, setTransfers] = useState([]);
  const [filtro, setFiltro] = useState([]);
  const bearer = "Bearer fake-jwt-token";

  async function getData(url = "") {
    // Opciones por defecto estan marcadas con un *
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      //body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const onSubmit = async () => {
    getData(url).then((data) => {
      setTransfers(data.transfers);

      console.log(data);
    });
  };
  const textInputChange = (val) => {};

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.subTitle}> Lista de Transferencias</Text>

        {Transfers ? (
          <View style={{ marginTop: 10 }}>
            <TextInput
              placeholder="BUSCAR"
              placeholderTextColor="#666666"
              style={[styles.textInputFilter, { color: "#0F4761" }]}
              autoCapitalize="none"
              onChangeText={(val) => {
                setFiltro;
                textInputChange(val);
              }}
              //onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
              testID="tiFilter"
            />

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
                        }}
                      >
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
        <Pressable     testID='tionSubmit' onPress={onSubmit} style={styles.buttons}>
          <Text style={styles.buttonsText}>Refrescar </Text>
        </Pressable>
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
  },
  table: {
    alignItems: "flex-start",
    borderStyle: "solid",
    borderBottomWidth: 4,
    borderTopWidth: 1,
    borderStartWidth: 1,
    borderRadius: 10,
    borderColor: "#0F4761",
  },
  item: {
    //padding: 10,
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
    fontSize: 14,
    height: 50,
    //flex: 1,
    //marginTop:  -12,
    paddingLeft: 10,
    color: "#05375a",
  },
});
