// Import the native module. On web, it will be resolved to ExpoTappayLinePay.web.ts
// and on native platforms to ExpoTappayLinePay.ts
import ExpoTappayLinePayModule from "./ExpoTappayLinePayModule";

export function hello(): string {
  return ExpoTappayLinePayModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoTappayLinePayModule.setValueAsync(value);
}
