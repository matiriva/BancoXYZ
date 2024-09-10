import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("fake-jwt-token");
  const [balance, setBalance] = useState([]);
  const [error, setError] = useState(null);

  const url =
    "https://2k0ic4z7s5.execute-api.us-east-1.amazonaws.com/default/balance";

  useEffect(() => {
    setIsLoading(true);
    getUser();
    fetchData();
  }, []);

  const getUser = async () => {
    try {
      AsyncStorage.getItem("email").then((value) => {
        if (value != null) {
          setEmail(value);
        }
      });
      AsyncStorage.getItem("token").then((value) => {
        if (value != null) {
          setToken(value);
        }
      });

      console.log(email);
      console.log(token);
    } catch (error) {
      console.log(error);
    }
  };

  async function fetchData() {
    try {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",        
      });

      const json = await response.json();
      setBalance(json);
      setIsLoading(false);
      console.log(json);
      return json;
    } catch (error) {
      setError(error);
      console.log(error);
      setIsLoading(false);
    }
  }
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>
          Error al obtener datos.. Por favor, revise su conexión a internet.{" "}
        </Text>

        <TouchableOpacity
          testID="tiBtnSalir"
          onPress={() => navigation.navigate("LogOut")}
          style={[
            styles.signIn,
            { borderColor: "#0F4761", borderWidth: 1, marginTop: 15 },
          ]}
        >
          <Text style={[styles.textSign, { color: "#0F4761" }]}>Salir</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <StatusBar style="auto" />

        <View
          style={{
            width: "90%",
            justifyContent: "center",
            alignItems: "flex-start",
            marginBottom: 20,
          }}
        >
          <Text style={styles.subTitle}> Hola {email}!</Text>
        </View>

        {balance ? (
          <TouchableOpacity
            testID="tiBtnTransferencias"
            onPress={() => navigation.navigate("Transferencias")}
          >
            <View style={styles.table}>
              <View style={{ flexDirection: "column" }}>
                <View
                  style={{
                    paddingTop: 10,
                    justifyContent: "space-between",
                    flexDirection: "column",
                    alignItems: "center",
                    height: 100,
                    width: "96%",
                  }}
                >
                  <Animated.View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                      width: "100%",
                      paddingLeft: 10,
                    }}
                  >
                    <Animated.Text style={styles.SaldoDisponble}>
                      SALDO DISPONIBLE:
                    </Animated.Text>
                    <Animated.Text
                      testID="tiBalance"
                      style={{
                        fontSize: 18,
                        textAlign: "right",
                        color:
                          balance.accountBalance > 0 ? "#0F4761" : "#FF4500",
                        fontWeight: "bold",
                      }}
                    >
                      {balance.accountBalance > 0
                        ? ` ${balance.accountBalance} `
                        : `-  ${Math.abs(balance.accountBalance)} `}{" "}
                      {balance.currency}
                    </Animated.Text>
                  </Animated.View>
                  <Animated.View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
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
                      <Text style={[styles.textSign, { color: "#0F4761" }]}>
                        Ver Transferencias
                      </Text>
                    </Animated.Text>
                    <Animated.Text></Animated.Text>
                  </Animated.View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
      <View
        style={[
          styles.container,
          { paddingTop: 50, alignItems: "center", width: "96%" },
        ]}
      >
        <TouchableOpacity
          testID="tiBtnTransferir"
          onPress={() => navigation.navigate("Transferir")}
          style={[
            styles.signIn,
            { borderColor: "#0F4761", borderWidth: 1, marginTop: 15 },
          ]}
        >
          <Text style={[styles.textSign, { color: "#0F4761" }]}>
            Transferir
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="tiBtnSalir"
          onPress={() => navigation.navigate("LogOut")}
          style={[
            styles.signIn,
            { borderColor: "#0F4761", borderWidth: 1, marginTop: 15 },
          ]}
        >
          <Text style={[styles.textSign, { color: "#0F4761" }]}>Salir</Text>
        </TouchableOpacity>
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
    alignItems: "center",
  },
  container: {
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  titulo: {
    fontSize: 10,
    color: "#34434D",
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 22,
    color: "#0F4761",
    fontWeight: "bold",
  },
  SaldoDisponble: {
    flexDirection: "column",
    fontSize: 22,
    textAlign: "left",
    color: "#0F4761",
    fontWeight: "bold",
  },
  table: {
    padding: 10,
    alignItems: "flex-start",
    borderStyle: "solid",
    borderBottomWidth: 4,
    borderTopWidth: 1,
    borderStartWidth: 1,
    borderEndWidth: 1,
    borderRadius: 10,
    borderColor: "#0F4761",
  },
  item: {
    paddingStart: 10,
    fontSize: 14,
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
  forgotpassword: {
    fontSize: 14,
    color: "gray",
    marginTop: 60,
  },
  buttons: {
    marginTop: 20,
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
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
