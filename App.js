import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { FontAwesome5 } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import ContactScreen from './screens/ContactScreen';
import SettingsScreen from './screens/SettingsScreen';
import OrderScreen from './screens/OrderScreen';

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const containerRef = React.useRef();

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome5.font,
          'roboto-slab': require('./assets/fonts/RobotoSlab_Regular.ttf'),
          'roboto-slab-bold': require('./assets/fonts/RobotoSlab_Bold.ttf')
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
        <NavigationContainer ref={containerRef}>
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Contact" component={ContactScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Order" component={OrderScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
