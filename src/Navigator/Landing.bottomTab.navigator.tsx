import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const LandingBottomTab = createBottomTabNavigator();

export function HomeScreen() {
  return <></>;
}

export const LandingBottomTabNavigator = () => {
  return (
    <LandingBottomTab.Navigator>
      <LandingBottomTab.Screen name="Home" component={HomeScreen} />
    </LandingBottomTab.Navigator>
  );
};
