import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  DeviceEventEmitter,
} from 'react-native';
import {NativeModules} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

const {StopWatchModule} = NativeModules;
const WIDGET_ID_KEY = 'appWidgetId';

export default function WidgetTestAndroid() {
  const [widgetData, setWidgetData] = useState<number | null>(null);
  const [appWidgetId, setAppWidgetId] = useState<number | null>(null);

  useEffect(() => {
    const init = async () => {
      const storedId = await EncryptedStorage.getItem(WIDGET_ID_KEY);
      if (storedId) setAppWidgetId(parseInt(storedId, 10));
    };
    init();

    const sub = DeviceEventEmitter.addListener(
      'onAppWidgetUpdate',
      async ({appWidgetId}) => {
        setAppWidgetId(appWidgetId);
        await EncryptedStorage.setItem(WIDGET_ID_KEY, appWidgetId.toString());
      },
    );

    return () => sub.remove();
  }, []);

  useEffect(() => {
    if (appWidgetId) fetchWidgetData();
  }, [appWidgetId]);

  const fetchWidgetData = async () => {
    if (!appWidgetId) return;
    const value = await StopWatchModule.getNumber(appWidgetId);
    setWidgetData(typeof value === 'number' ? value : 0);
  };

  const updateValue = async (delta: number) => {
    if (!appWidgetId || widgetData === null) return;
    const newValue = widgetData + delta;
    await StopWatchModule.setNumber(appWidgetId, newValue);
    setWidgetData(newValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🤖 Android 위젯 테스트</Text>
      <Text style={styles.value}>{widgetData ?? '로딩 중...'}</Text>
      <TouchableOpacity style={styles.plus} onPress={() => updateValue(+1)}>
        <Text style={styles.buttonText}>+1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.minus} onPress={() => updateValue(-1)}>
        <Text style={styles.buttonText}>-1</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: {fontSize: 22, fontWeight: '600', marginBottom: 20},
  value: {fontSize: 32, marginBottom: 20},
  plus: {backgroundColor: '#2196f3', padding: 12, borderRadius: 6, margin: 8},
  minus: {backgroundColor: '#f44336', padding: 12, borderRadius: 6, margin: 8},
  buttonText: {color: '#fff', fontSize: 18},
});
