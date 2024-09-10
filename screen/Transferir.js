import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, Pressable, View } from "react-native";
import React, { useState } from "react";

export default Transferir = ({ navigation }) => {
  const url =
    "https://ofqx4zxgcf.execute-api.us-east-1.amazonaws.com/default/transfer";

  const [cbu, setCBU] = useState("");
  const [valor, setValor] = useState(0);
  const [currency, setCurrency] = useState("");
  const [payeerDocument, setPayeerDocument] = useState("");
  const [transferDate, setTransferDate] = useState("2024-09-10");
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);

  const bearer = "Bearer fake-jwt-token";

  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return response.json();
  }

  const onSubmit = async () => {
    var number = parseFloat(valor);

    postData(url, {
      value: number,
      currency: currency,
      payeerDocument: payeerDocument,
      transferDate: transferDate,
    }).then((data) => {
      setData(data);
      console.log(data);
    });

    if (data) {
      console.log(data.message);
    }
  };

  return (
    <View style={styles.mainContainer}>
        <StatusBar style="auto" />
        <Text style={styles.titulo}> Transferir a la cuenta:</Text>

      <View  style={styles.table} >

      <Text style={styles.subTitle}>Número Documento:</Text>
      <View style={styles.container}>
        <TextInput
          testID="tiNroDoc"
          onChangeText={(value) => setPayeerDocument(value)}
          style={styles.textInput}
          placeholder="12345678"
        />
      </View>
      <Text style={styles.subTitle}>Alias o CBU:</Text>

      <View style={styles.container}>
        <TextInput
          testID="tiCBU"
          onChangeText={(value) => setCBU(value)}
          style={styles.textInput}
          placeholder="Ingrese el Alias/CBU"
        />
      </View>
      <Text style={styles.subTitle}>Valor a transferir:</Text>
      <View style={styles.container}>
        <TextInput
          testID="tiValor"
          onChangeText={(value) => setValor(value)}
          style={styles.textInput}
          placeholder=" $ 999.00"
        />
      </View>
      <Text style={styles.subTitle}>Moneda a transferir:</Text>
      <View style={styles.container}>
        <TextInput
          testID="tiMoneda"
          onChangeText={(value) => setCurrency(value)}
          style={styles.textInput}
          placeholder="USD/ARS/REAL"
        />
      </View>
      <View style={styles.container}>
        <Pressable
          testID="tionSubmit"
          onPress={onSubmit}
          style={styles.buttons}
        >
          <Text style={styles.buttonsText}>Transferir</Text>
        </Pressable>
      </View>

      </View>
      {data.message ? (
        <View style={{ padding:20 }}>
          <Text style={styles.message}> {data.message}</Text>
        </View>
      ) : null}

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 20,
    //flex: 1,
    backgroundColor: "#f1f1f1",
    alignItems: "center",
    justifyContent: "center",

  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  titulo: {
    fontSize: 30,
    color: "#0F4761",
    fontWeight: "bold",
  },
  subTitle: {
    paddingTop: 10,
    paddingStart: 40,
    fontSize: 16,
    color: "gray",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  table: {
    width: "90%",
    height: 500,
    padding: 10,
    marginTop: 20,
    borderStyle: "solid",
    borderBottomWidth: 4,
    borderTopWidth: 1,
    borderStartWidth: 1,
    borderEndWidth: 1,
    borderRadius: 8,
    borderColor: "#0F4761",
  },
  textInput: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    paddingStart: 30,
    width: "80%",
    height: 40,
    marginTop: 20,
    borderRadius: 8,
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
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    color: "#f1f1f1",
    backgroundColor: "#0F4761",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  buttonsText: {
    fontSize: 14,
    height: 20,
    color: "#f1f1f1",
  },
});
