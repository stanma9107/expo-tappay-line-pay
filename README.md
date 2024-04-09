# Expo Tappay - Line Pay
## Installation
```bash
npx expo install expo-tappay-line-pay
```
## Prerequisites
- Please add the following config in your app.json
```json
{
  "expo": {
    "plugins": [
      [
        "expo-tappay-line-pay"
      ]
    ]
  }
}
```

## Usage
### Check if Line Pay is available
```js
import * as ExpoTappayLinePay from "expo-tappay-line-pay";

const isAvailable = ExpoTappayLinePay.isLinePayAvailable();
console.log(isAvailable);
```

### Setup Tappay (You can get credentials from [Tappay](https://www.tappaysdk.com/))
```js
import * as ExpoTappayLinePay from "expo-tappay-line-pay";

const appId = 11340; // Replace with your own appId
const appKey = "app_whdEWBH8e8Lzy4N6BysVRRMILYORF6UxXbiOFsICkz0J9j1C0JUlCHv1tVJC"; // Replace with your own appKey
const serverType = "sandbox"; // Replace with your own serverType (sandbox or production)
ExpoTappayLinePay.setupTappay({ appId, appKey, serverType });
```

### Setup Line Pay
```js
import * as ExpoTappayLinePay from "expo-tappay-line-pay";

const callbackUrl = "expotappaylinepayexample://linepay"; // Replace with your own callbackUrl (e.g. expotappaylinepayexample://linepay)
ExpoTappayLinePay.setupLine(callbackUrl);
```

### Get Prime
```js
import * as ExpoTappayLinePay from "expo-tappay-line-pay";

const prime = await ExpoTappayLinePay.getPrime();
console.log(prime);
```

### Redirect to Payment
```js
import * as ExpoTappayLinePay from "expo-tappay-line-pay";
const payment = await ExpoTappayLinePay.redirect(paymentUrl); // You will get payment result from this function
```