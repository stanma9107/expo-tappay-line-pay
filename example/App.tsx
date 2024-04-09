import * as ExpoTappayLinePay from "expo-tappay-line-pay";
import { useState } from "react";
import {
  Alert,
  Button,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

const setupTappay = async () => {
  const appId = 11340;
  const appKey =
    "app_whdEWBH8e8Lzy4N6BysVRRMILYORF6UxXbiOFsICkz0J9j1C0JUlCHv1tVJC";
  const serverType = "sandbox";
  ExpoTappayLinePay.setupTappay({ appId, appKey, serverType });
};

const setupLine = async () => {
  const callbackUrl = "expotappaylinepayexample://linepay";
  ExpoTappayLinePay.setupLine(callbackUrl);
};

const checkIfLinePayIsAvailable = async () => {
  const isAvailable = ExpoTappayLinePay.isLinePayAvailable();
  Alert.alert("Line Pay is available:", isAvailable ? "Yes" : "No");
};

const getPrime = async () => {
  const prime = await ExpoTappayLinePay.getPrime();
  console.log(prime);
  Alert.alert("Prime:", prime);
};

const redirect = async () => {
  Alert.prompt("Enter payment URL:", undefined, async (url) => {
    const payment = await ExpoTappayLinePay.redirect(url);
    console.log(payment);
  });
};

const redirectWithAndrdoid = async (paymentUrl: string) => {
  const payment = await ExpoTappayLinePay.redirect(paymentUrl);
  console.log(payment);
};

export default function App() {
  const [paymentUrl, setPaymentUrl] = useState("");

  return (
    <View style={styles.container}>
      <Button title="Setup Tappay" onPress={setupTappay} />
      <Button
        title="Check if Line Pay is available"
        onPress={checkIfLinePayIsAvailable}
      />
      <Button title="Setup Line" onPress={setupLine} />
      <Button title="Get Prime" onPress={getPrime} />
      <Button
        title="Redirect"
        onPress={
          Platform.OS === "ios"
            ? redirect
            : () => {
                redirectWithAndrdoid(paymentUrl);
              }
        }
      />
      {Platform.OS !== "ios" && (
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            width: "80%",
          }}
          placeholder="Enter payment URL"
          onChangeText={setPaymentUrl}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
