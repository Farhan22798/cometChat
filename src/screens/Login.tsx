

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { CometChat } from '@cometchat/chat-sdk-react-native';

const Login = ({ navigation }: any) => {

const AUTH_KEY = "627b966ffeb3286f816b53ebea5319ab6d825cdb";

  const [uid, setUid] = useState('');

  const handleLogin = async () => {
    try {
      const user = await CometChat.login(uid, AUTH_KEY);
      console.log('Login successful:', user);
      navigation.navigate('ContactsList');
    } catch (error) {
      console.log('Login failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter User ID"
        value={uid}
        onChangeText={setUid}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default Login;