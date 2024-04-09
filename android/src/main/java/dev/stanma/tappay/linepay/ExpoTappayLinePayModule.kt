package dev.stanma.tappay.linepay

import expo.modules.kotlin.Promise
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import tech.cherri.tpdirect.api.TPDLinePay
import tech.cherri.tpdirect.api.TPDLinePayResult
import tech.cherri.tpdirect.api.TPDServerType
import tech.cherri.tpdirect.api.TPDSetup
import tech.cherri.tpdirect.callback.TPDGetPrimeFailureCallback
import tech.cherri.tpdirect.callback.TPDLinePayGetPrimeSuccessCallback
import tech.cherri.tpdirect.callback.TPDLinePayResultListener

class ExpoTappayLinePayModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  private var linePay: TPDLinePay? = null
  private var paymentPromise: Promise? = null;

  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoTappayLinePay')` in JavaScript.
    Name("ExpoTappayLinePay")

    OnNewIntent {
      if (paymentPromise == null) {
        println("paymentPromise is null.")
        return@OnNewIntent
      }

      if (linePay != null) {
        linePay!!.parseToLinePayResult(appContext.reactContext, it.data, object : TPDLinePayResultListener {
          override fun onParseSuccess(result: TPDLinePayResult?) {
            if (result == null) {
              paymentPromise?.reject("PAYMENT_FAILED", "NO_RESULT", Exception("NO_RESULT"))
              paymentPromise = null
              return
            }
            paymentPromise?.resolve(mapOf(
              "status" to result.status,
              "recTradeId" to result.recTradeId,
              "orderNumber" to result.orderNumber,
              "bankTransactionId" to result.bankTransactionId,
            ))
            paymentPromise = null
          }

          override fun onParseFail(statusCode: Int, msg: String?) {
            paymentPromise?.reject("PAYMENT_FAILED", msg, Exception(msg))
            paymentPromise = null
          }
        })
      } else {
        paymentPromise?.reject("NOT_READY", "PLEASE SETUP LINE PAY FIRST.", Exception("PLEASE SETUP LINE PAY FIRST."))
        paymentPromise = null
      }
    }

    Function("isLinePayAvailable") {
      return@Function TPDLinePay.isLinePayAvailable(appContext.reactContext)
    }

    Function("setup") { appId: Int, appKey: String, env: String ->
      val serverType = when (env) {
        "sandbox" -> TPDServerType.Sandbox
        "production" -> TPDServerType.Production
        else -> TPDServerType.Sandbox
      }

      TPDSetup.initInstance(
        appContext.reactContext,
        appId,
        appKey,
        serverType,
      )
    }

    Function("setupLine") { callbackUrl: String ->
      linePay = TPDLinePay(appContext.reactContext, callbackUrl)
    }

    AsyncFunction("getPrime") { promise: Promise ->
      if (linePay != null) {
        linePay!!.getPrime(object : TPDLinePayGetPrimeSuccessCallback {
          override fun onSuccess(prime: String) {
            promise.resolve(prime)
          }
        }, object: TPDGetPrimeFailureCallback {
          override fun onFailure(statusCode: Int, statusMessage: String) {
            promise.reject("GET_PRIME_FAILED", statusMessage, Exception(statusMessage))
          }
        })
      } else {
        promise.reject("NOT_READY", "PLEASE SETUP LINE PAY FIRST.", Exception("PLEASE SETUP LINE PAY FIRST."));
      }
    }

    AsyncFunction("redirect") { paymentUrl: String, promise: Promise ->
        if (linePay != null) {
          paymentPromise = promise
          linePay!!.redirectWithUrl(paymentUrl)
        } else {
            promise.reject("NOT_READY", "PLEASE SETUP LINE PAY FIRST.", Exception("PLEASE SETUP LINE PAY FIRST."));
        }
    }
  }
}
