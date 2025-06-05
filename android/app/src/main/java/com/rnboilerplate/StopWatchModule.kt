package com.rnboilerplate

import android.appwidget.AppWidgetManager
import android.content.Context
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

class StopWatchModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        private lateinit var context: ReactApplicationContext

        fun emitDeviceEvent(eventName: String, eventData: WritableMap?) {
            if (::context.isInitialized) {
                context
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                    .emit(eventName, eventData)
            }
        }
    }

    init {
        context = reactContext
    }

    override fun getName(): String = "StopWatchModule"

    @ReactMethod
    fun getNumber(appWidgetId: Int, promise: Promise) {
        val prefs = context.getSharedPreferences("widget_prefs", Context.MODE_PRIVATE)
        val value = prefs.getInt("widget_value_$appWidgetId", 0)
        promise.resolve(value)
    }

    @ReactMethod
fun setNumber(appWidgetId: Int, value: Int, promise: Promise) {
    val prefs = context.getSharedPreferences("widget_prefs", Context.MODE_PRIVATE)
    prefs.edit().putInt("widget_value_$appWidgetId", value).apply()

    // 🔥 여기서 위젯 업데이트 직접 수행
    val appWidgetManager = AppWidgetManager.getInstance(context)
    MyWidgetProvider.updateAppWidget(context, appWidgetManager, appWidgetId)

    promise.resolve(null)
}
}