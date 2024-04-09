// Import the native module. On web, it will be resolved to ExpoTappayLinePay.web.ts
// and on native platforms to ExpoTappayLinePay.ts
import ExpoTappayLinePayModule from "./ExpoTappayLinePayModule";
import * as ExpoTappayLinePayTypes from "./ExpoTappayLinePayModule.types";

export function setupTappay({
  appId,
  appKey,
  serverType,
}: ExpoTappayLinePayTypes.SetupConfig): void {
  return ExpoTappayLinePayModule.setup(appId, appKey, serverType);
}

export function isLinePayAvailable(): boolean {
  console.log(ExpoTappayLinePayModule.isLinePayAvailable());
  return ExpoTappayLinePayModule.isLinePayAvailable();
}

export function setupLine(callbackUrl: string): void {
  ExpoTappayLinePayModule.setupLine(callbackUrl);
}

export function getPrime(): Promise<string> {
  return ExpoTappayLinePayModule.getPrime();
}

export function redirect(paymentUrl: string): Promise<PaymentResult> {
  return ExpoTappayLinePayModule.redirect(paymentUrl);
}
