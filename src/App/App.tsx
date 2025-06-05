// // import React, {useEffect} from 'react';
// // import {Platform} from 'react-native';

// // /**
// //  * 앱 최상위 컴포넌트입니다.
// //  *
// //  * 앱이 처음 시작될 때 아래의 기능들을 수행합니다:
// //  *   - iOS 푸시알림 권한 요청
// //  * @author 도형
// //  */

// // export const App = () => {
// //   //  const navigation = useNavigation<NavigationProp<AppStackProps>>();

// //   //* AppsFlyer appTrackingPermission
// //   const appTrackingPermission = async () => {
// //     if (Platform.OS === 'ios') {
// //       await requestTrackingPermission();
// //     }
// //   };

// //   useEffect(() => {
// //     appTrackingPermission();

// //     return () => {};
// //   }, []);

// //   // appsFlyer.startSdk();

// //   return (
// //     <QueryClientProvider client={queryClient}>
// //       <ThemeProvider
// //         theme={{color: themeColors(), size: themeSizes}}>
// //         {/*
// //          * React 버전 18 이후 React 객체 이름이 달라진건지, MenuProvider 가 Typescript 상에서 에러를 일으킵니다.
// //          * 정상작동은 하지만 보기 싫으니 아래 URL을 참고하여 node_modules 코드를 직접 수정해주세요.
// //          * 참고: https://github.com/instea/react-native-popup-menu/issues/248
// //          */}
// //         <MenuProvider>
// //           <Container>
// //             <AppStackNavigator />
// //           </Container>
// //         </MenuProvider>
// //       </ThemeProvider>
// //     </QueryClientProvider>
// //   );
// // };

// // const Container = styled.SafeAreaView`
// //   flex: 1;
// //   background-color: ${({theme}) => theme.color.grey.white};
// // `;

// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @기본 제공 템플릿
//  */

// import React from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   /*
//    * To keep the template simple and small we're adding padding to prevent view
//    * from rendering under the System UI.
//    * For bigger apps the recommendation is to use `react-native-safe-area-context`:
//    * https://github.com/AppAndFlow/react-native-safe-area-context
//    *
//    * You can read more about it here:
//    * https://github.com/react-native-community/discussions-and-proposals/discussions/827
//    */
//   const safePadding = '5%';

//   return (
//     <View style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView style={backgroundStyle}>
//         <View style={{paddingRight: safePadding}}>
//           <Header />
//         </View>
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//             paddingHorizontal: safePadding,
//             paddingBottom: safePadding,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;

// 이하는 android 위젯 구현 코드
// import {useState} from 'react';
// import {NativeModules, View, Text, Button} from 'react-native';
// import WidgetText from './WidgetText';
// const {StopWatchModule} = NativeModules;

// const App = () => {
//   return (
//     <View style={{flex: 1}}>
//       <WidgetText />
//     </View>
//   );
// };

// export default App;

import {Platform} from 'react-native';
import WidgetTestAndroid from './WidgetTest.android';
import WidgetTestIOS from './WidgetTest.ios';

export default function App() {
  return Platform.OS === 'android' ? <WidgetTestAndroid /> : <WidgetTestIOS />;
}

// 이하는 iOS 위젯 구현 코드
// import React, {JSX, useEffect, useState} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   Text,
//   TouchableOpacity,
//   useColorScheme,
//   View,
// } from 'react-native';
// // import {Colors} from 'react-native/Libraries/NewAppScreen';
// import SharedDefaults from './SharedDefaults';

// type Todo = {
//   id: number;
//   isCompleted: boolean;
//   text: string;
// };

// type TodoProps = Todo & {
//   onPress: (id: number) => void;
// };

// function Todo({isCompleted, text, id, onPress}: TodoProps): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <TouchableOpacity onPress={() => onPress(id)}>
//       <View
//         style={{
//           width: '100%',
//           paddingHorizontal: 20,
//           paddingVertical: 12,
//           display: 'flex',
//           flexDirection: 'row',
//           alignItems: 'center',
//         }}>
//         <View
//           style={{
//             width: 20,
//             height: 20,
//             borderWidth: 2,
//             borderColor: 'black',
//             backgroundColor: isCompleted ? 'black' : 'white',
//           }}
//         />

//         <Text
//           style={{
//             color: isDarkMode ? 'white' : 'black',
//             fontSize: 24,
//             fontWeight: '600',
//             marginLeft: 8,
//           }}>
//           {text}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
// }

// function App(): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? 'black' : 'white',
//     paddingTop: 40,
//     flex: 1,
//   };

//   const [todos, setTodos] = useState<Todo[]>([
//     {
//       id: 1,
//       text: '픽플리 iOS 위젯 구현',
//       isCompleted: false,
//     },
//     {
//       id: 2,
//       text: '픽플리 Android 위젯 구현',
//       isCompleted: false,
//     },
//     {
//       id: 3,
//       text: '원링크 공유 로직 변경',
//       isCompleted: false,
//     },
//     {
//       id: 4,
//       text: 'B/G 배포 준비',
//       isCompleted: false,
//     },
//   ]);

//   const handlePress = (id: number) => {
//     setTodos(prev =>
//       prev.map(i => (i.id === id ? {...i, isCompleted: !i.isCompleted} : i)),
//     );
//   };

//   useEffect(() => {
//     console.log('shared defaults', SharedDefaults);
//     SharedDefaults.set(todos);
//   }, [todos]);

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         {todos.map(t => (
//           <Todo key={t.id} {...t} onPress={handlePress} />
//         ))}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// export default App;
