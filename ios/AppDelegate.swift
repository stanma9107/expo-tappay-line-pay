import ExpoModulesCore
import TPDirect

public class AppLifecycleDelegate: ExpoAppDelegateSubscriber {
    public func application(_ application: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
        let tapPayHandled = TPDLinePay.handle(url)
        if (tapPayHandled) {
            return true
        }
        return false
    }
}
