export interface SetupConfig {
  appId: number;
  appKey: string;
  serverType: "sandbox" | "production";
}

export interface PaymentResult {
  status: number;
  recTradeId: string;
  orderNumber: string;
  bankTransactionId: string;
}
