// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   DeviceEventEmitter,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import {NativeModules} from 'react-native';
// import EncryptedStorage from 'react-native-encrypted-storage';

// const {StopWatchModule} = NativeModules;
// const WIDGET_ID_KEY = 'appWidgetId';

// /**
//  * @author 도형
//  * android 위젯 연동 테스트 컴포넌트
//  */

// const WidgetText = () => {
//   const [widgetData, setWidgetData] = useState<number | null>(null);
//   const [appWidgetId, setAppWidgetId] = useState<number | null>(null);

//   // 🔹 위젯 ID 로드 및 리스너
//   useEffect(() => {
//     const init = async () => {
//       try {
//         const storedId = await EncryptedStorage.getItem(WIDGET_ID_KEY);
//         Alert.alert('🔹 storedId: ', storedId ?? '없음');
//         if (storedId) {
//           const id = parseInt(storedId, 10);
//           setAppWidgetId(id);
//         }
//       } catch (e) {
//         console.error('🔴 appWidgetId 불러오기 실패:', e);
//       }
//     };

//     init();

//     const sub = DeviceEventEmitter.addListener(
//       'onAppWidgetUpdate',
//       async (data: {appWidgetId: number}) => {
//         try {
//           setAppWidgetId(data.appWidgetId);
//           await EncryptedStorage.setItem(
//             WIDGET_ID_KEY,
//             data.appWidgetId.toString(),
//           );
//         } catch (e) {
//           console.error('🔴 appWidgetId 저장 실패:', e);
//         }
//       },
//     );

//     return () => sub.remove();
//   }, []);

//   // 🔹 값 불러오기
//   const fetchWidgetData = async () => {
//     Alert.alert('🔹 fetchWidgetData 호출');
//     if (!appWidgetId) {
//       Alert.alert('⚠️ AppWidgetId 없음');
//       console.warn('⚠️ AppWidgetId 없음');
//       return;
//     }

//     console.warn('📥 getNumber 호출: ', appWidgetId);
//     try {
//       const value = await StopWatchModule.getNumber(appWidgetId);
//       Alert.alert('✅ getNumber 결과:', value.toString());
//       console.warn('✅ getNumber 결과:', value);
//       setWidgetData(typeof value === 'number' ? value : 0);
//     } catch (e) {
//       Alert.alert('❌ 값 불러오기 실패:', e.toString());
//       console.error('❌ 값 불러오기 실패:', e);
//       setWidgetData(null);
//     }
//   };
//   // 🔹 값 설정
//   const updateValue = async (delta: number) => {
//     if (!appWidgetId || widgetData === null) return;

//     const newValue = widgetData + delta;
//     try {
//       await StopWatchModule.setNumber(appWidgetId, newValue);
//       setWidgetData(newValue);
//     } catch (e) {
//       console.error('🔴 값 설정 실패:', e);
//     }
//   };

//   // 🔹 최초 데이터 로딩
//   useEffect(() => {
//     if (appWidgetId) fetchWidgetData();
//   }, [appWidgetId]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>📱 Android 위젯 연동 테스트</Text>

//       <Text style={styles.label}>📦 현재 값</Text>
//       <Text style={styles.value}>
//         {widgetData !== null ? widgetData : '로딩 실패'}
//       </Text>

//       <TouchableOpacity
//         style={[styles.button, styles.plus]}
//         onPress={() => updateValue(+1)}>
//         <Text style={styles.buttonText}>+ 1</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={[styles.button, styles.minus]}
//         onPress={() => updateValue(-1)}>
//         <Text style={styles.buttonText}>- 1</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={[
//           styles.button,
//           {backgroundColor: appWidgetId ? '#4caf50' : '#aaa'},
//         ]}
//         onPress={fetchWidgetData}
//         // disabled={!appWidgetId}
//       >
//         <Text style={styles.buttonText}>🔄 새로고침</Text>
//       </TouchableOpacity>

//       <Text style={styles.label}>🆔 AppWidget ID</Text>
//       <Text style={styles.value}>
//         {appWidgetId !== null ? appWidgetId : '없음'}
//       </Text>
//     </View>
//   );
// };

// export default WidgetText;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f7f9fb',
//     padding: 24,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: '700',
//     marginBottom: 24,
//     textAlign: 'center',
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginTop: 20,
//     textAlign: 'center',
//     color: '#555',
//   },
//   value: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 8,
//     textAlign: 'center',
//   },
//   button: {
//     paddingVertical: 14,
//     marginVertical: 8,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buttonText: {
//     fontSize: 16,
//     color: '#fff',
//     fontWeight: '600',
//   },
//   plus: {
//     backgroundColor: '#2196f3',
//   },
//   minus: {
//     backgroundColor: '#f44336',
//   },
// });
