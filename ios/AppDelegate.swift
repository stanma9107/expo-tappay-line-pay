import ExpoModulesCore
import TPDirect

public class ExpoTappayLinePayLifecycleDelegate: ExpoAppDelegateSubscriber {
    public func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
        let tapPayHandled = TPDLinePay.handle(url)
        if (tapPayHandled) {
            return true
        }
        return false
    }
}
