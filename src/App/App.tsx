// import React, {useEffect} from 'react';
// import {Platform} from 'react-native';

// /**
//  * 앱 최상위 컴포넌트입니다.
//  *
//  * 앱이 처음 시작될 때 아래의 기능들을 수행합니다:
//  *   - iOS 푸시알림 권한 요청
//  * @author 도형
//  */

// export const App = () => {
//   //  const navigation = useNavigation<NavigationProp<AppStackProps>>();

//   //* AppsFlyer appTrackingPermission
//   const appTrackingPermission = async () => {
//     if (Platform.OS === 'ios') {
//       await requestTrackingPermission();
//     }
//   };

//   useEffect(() => {
//     appTrackingPermission();

//     return () => {};
//   }, []);

//   // appsFlyer.startSdk();

//   return (
//     <QueryClientProvider client={queryClient}>
//       <ThemeProvider
//         theme={{color: themeColors(), size: themeSizes}}>
//         {/*
//          * React 버전 18 이후 React 객체 이름이 달라진건지, MenuProvider 가 Typescript 상에서 에러를 일으킵니다.
//          * 정상작동은 하지만 보기 싫으니 아래 URL을 참고하여 node_modules 코드를 직접 수정해주세요.
//          * 참고: https://github.com/instea/react-native-popup-menu/issues/248
//          */}
//         <MenuProvider>
//           <Container>
//             <AppStackNavigator />
//           </Container>
//         </MenuProvider>
//       </ThemeProvider>
//     </QueryClientProvider>
//   );
// };

// const Container = styled.SafeAreaView`
//   flex: 1;
//   background-color: ${({theme}) => theme.color.grey.white};
// `;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @기본 제공 템플릿
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  /*
   * To keep the template simple and small we're adding padding to prevent view
   * from rendering under the System UI.
   * For bigger apps the recommendation is to use `react-native-safe-area-context`:
   * https://github.com/AppAndFlow/react-native-safe-area-context
   *
   * You can read more about it here:
   * https://github.com/react-native-community/discussions-and-proposals/discussions/827
   */
  const safePadding = '5%';

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView style={backgroundStyle}>
        <View style={{paddingRight: safePadding}}>
          <Header />
        </View>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            paddingHorizontal: safePadding,
            paddingBottom: safePadding,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
