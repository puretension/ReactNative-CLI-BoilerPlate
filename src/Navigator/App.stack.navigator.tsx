import React, { useRef } from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import analytics from '@react-native-firebase/analytics';
import { LandingBottomTabNavigator } from './Landing.bottomTab.navigator';

// Screens
// import { SplashScreen } from './screens/SplashScreen';
// import { HomeScreen } from './screens/HomeScreen';
// import { LoginScreen } from './screens/LoginScreen';

// Stack Param 정의
export type AppStackParamList = {
  Splash: undefined;
  Home: undefined;
  Login: undefined;
  LandingBottomTabNavigator: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppStackNavigator = () => {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef<string>();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.getCurrentRoute()?.name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen
          name="LandingBottomTabNavigator"
          component={LandingBottomTabNavigator}
          options={{ animation: 'none' }}
        />
        {/* <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
