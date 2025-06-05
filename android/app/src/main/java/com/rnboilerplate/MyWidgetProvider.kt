package com.rnboilerplate

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.content.Intent
import android.widget.RemoteViews
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.rnboilerplate.MainActivity
import com.rnboilerplate.R
import android.util.Log
import com.rnboilerplate.StopWatchModule // NativeModule에서 emit 사용

class MyWidgetProvider : AppWidgetProvider() {

    companion object {
        fun updateAppWidget(context: Context, appWidgetManager: AppWidgetManager, appWidgetId: Int) {
            // 1. SharedPreferences에서 값 가져오기
            val prefs = context.getSharedPreferences("widget_prefs", Context.MODE_PRIVATE)
            val number = prefs.getInt("widget_value_$appWidgetId", 0)

            // 2. 위젯 UI 설정
            val views = RemoteViews(context.packageName, R.layout.widget_layout)
            views.setTextViewText(R.id.widget_text, number.toString())

            // 3. 클릭 시 앱 열기 PendingIntent 설정
            val intent = Intent(context, MainActivity::class.java).apply {
                action = Intent.ACTION_MAIN
                addCategory(Intent.CATEGORY_LAUNCHER)
                flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
            }

            val pendingIntent = PendingIntent.getActivity(
                context,
                appWidgetId,
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
            )
            views.setOnClickPendingIntent(R.id.widget_root_layout, pendingIntent)

            // 4. 위젯 업데이트 적용
            appWidgetManager.updateAppWidget(appWidgetId, views)

            // 5. JS로 이벤트 전달 (앱 실행 중일 때만)
            val map: WritableMap = Arguments.createMap()
            map.putInt("appWidgetId", appWidgetId)
            Log.d("MyWidgetProvider", "📣 emit JS event with id: $appWidgetId")
            StopWatchModule.emitDeviceEvent("onAppWidgetUpdate", map)
        }
    }

    override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray) {
        appWidgetIds.forEach { appWidgetId ->
            updateAppWidget(context, appWidgetManager, appWidgetId)
        }
    }

    override fun onReceive(context: Context, intent: Intent) {
        super.onReceive(context, intent)
        val appWidgetId = intent.getIntExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, AppWidgetManager.INVALID_APPWIDGET_ID)
        if (appWidgetId != AppWidgetManager.INVALID_APPWIDGET_ID) {
            updateAppWidget(context, AppWidgetManager.getInstance(context), appWidgetId)
        }
    }
}