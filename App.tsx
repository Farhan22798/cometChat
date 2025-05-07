import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Platform, PermissionsAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CometChat } from '@cometchat/chat-sdk-react-native';
import { CometChatUIKit, CometChatThemeProvider, UIKitSettings } from '@cometchat/chat-uikit-react-native';



import ChattingScreen from './src/screens/ChattingScreen';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import ContactsList from './src/screens/ContactsList';

const APP_ID = "2748663902141719";
const AUTH_KEY = "627b966ffeb3286f816b53ebea5319ab6d825cdb";
const REGION = "in";

const Stack = createNativeStackNavigator();

const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(REGION)
  .build();

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeCometChat = async () => {
      try {
        // Initialize CometChat SDK
        await CometChat.init(APP_ID, appSetting);
        console.log('CometChat initialized successfully');

        // Request permissions if on Android
        if (Platform.OS === 'android') {
          await requestPermissions();
        }

        // Set up UI Kit
        const uiKitSettings: UIKitSettings = {
          appId: APP_ID,
          authKey: AUTH_KEY,
          region: REGION,
          subscriptionType: CometChat.AppSettings.SUBSCRIPTION_TYPE_ALL_USERS as UIKitSettings['subscriptionType'],
        };
        await CometChatUIKit.init(uiKitSettings);

        console.log('[CometChatUIKit] initialized');
      } catch (err) {
        console.error('[CometChatUIKit] init error', err);
      } finally {
        setIsInitialized(true);
        setLoading(false);
      }
    };

    initializeCometChat();
  }, []);

  const requestPermissions = async (): Promise<void> => {
    if (Platform.OS !== 'android') return;

    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      ]);

      const allGranted = Object.values(granted).every(
        (status) => status === PermissionsAndroid.RESULTS.GRANTED
      );

      if (!allGranted) {
        console.warn('[Permissions] Not all permissions granted');
      }
    } catch (err) {
      console.warn('[Permissions] Error requesting Android permissions', err);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <CometChatThemeProvider>
        <Stack.Navigator initialRouteName="Register">
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ContactsList" component={ContactsList} />
          <Stack.Screen name="ChattingScreen" component={ChattingScreen} />
        </Stack.Navigator>
      </CometChatThemeProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
