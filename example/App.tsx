import { StyleSheet, Text, View } from 'react-native';

import * as ExpoTappayLinePay from 'expo-tappay-line-pay';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoTappayLinePay.hello()}</Text>
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
