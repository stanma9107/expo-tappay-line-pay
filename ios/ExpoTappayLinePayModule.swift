import ExpoModulesCore
import TPDirect

var linePay: TPDLinePay? = nil

public class ExpoTappayLinePayModule: Module {
    public func definition() -> ModuleDefinition {
        Name("ExpoTappayLinePay")
        
        Function("isLinePayAvailable") {
            return TPDLinePay.isLinePayAvailable()
        }
        
        Function("installLineApp") {
            TPDLinePay.installLineApp()
        }
        
        Function("setup") {(appId: Int32, appKey: String, serverType: String) -> Void in
            let serverType: TPDServerType = (serverType == "production") ? .production : .sandBox
            TPDSetup.setWithAppId(appId, withAppKey: appKey, with: serverType)
        }
        
        Function("setupLine") {(callbackUrl: String) -> Void in
            linePay = TPDLinePay.setup(withReturnUrl: callbackUrl)
        }
        
        AsyncFunction("getPrime") { (promise: Promise) in
            if (linePay != nil) {
                linePay?
                    .onSuccessCallback{(Prime) in
                        debugPrint("Prime: \(Prime!)")
                        promise.resolve(Prime)
                    }
                    .onFailureCallback{(status, msg) in
                        debugPrint("status : \(status), msg : \(msg)")
                        promise.reject(String(status), msg)
                    }
                    .getPrime()
            }
        }
        
        AsyncFunction("redirect") {(paymentUrl: String, promise: Promise) in
            if (linePay != nil) {
                DispatchQueue.main.async {
                    let viewController = UIViewController()
                    linePay?.redirect(
                        paymentUrl,
                        with: viewController,
                        completion: { (result) in
                            debugPrint("stauts : \(result.status), \(result)")
                            promise.resolve([
                                "status": result.status,
                                "recTradeId": result.recTradeId!,
                                "orderNumber": result.orderNumber!,
                                "bankTransactionId": result.bankTransactionId!
                            ])
                        }
                    )
                }
            } else {
                promise.reject("NOT_READY", "PLEASE SETUP LINE PAY FIRST.")
            }
        }
    }
}
