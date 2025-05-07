
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Pressable, Alert } from 'react-native';
import { CometChat } from '@cometchat/chat-sdk-react-native';

const Register = ({ navigation }: any) => {
  const [uid, setUid] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!uid.trim() || !name.trim()) {
      Alert.alert('Please enter both UID and Name');
      return;
    }

    setIsLoading(true);
    
    try {
      const user = new CometChat.User(uid);
      user.setName(name);
      
      // Using AUTH_KEY from your constants
      const createdUser = await CometChat.createUser(user, '627b966ffeb3286f816b53ebea5319ab6d825cdb');
      
      console.log('User created:', createdUser);
      Alert.alert('Registration successful! Please login');
      navigation.navigate('Login');
    } catch (error) {
      console.log('Registration failed:', error);
      Alert.alert(`Registration failed: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter User ID (UID)"
        value={uid}
        onChangeText={setUid}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Your Name"
        value={name}
        onChangeText={setName}
      />
      
      <Button 
        title={isLoading ? "Creating..." : "Register"} 
        onPress={handleRegister} 
        disabled={isLoading}
      />
      
      <Pressable 
        style={styles.loginLink} 
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </Pressable>
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
  loginLink: {
    marginTop: 20,
    alignSelf: 'center'
  },
  loginText: {
    color: 'blue',
    textDecorationLine: 'underline'
  }
});

export default Register;