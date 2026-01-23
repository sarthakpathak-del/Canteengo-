import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GoogleIcon from '../assets/svg icon/GoogleIcon';
import { signIn } from '../const/GoogleSign';

export const SocialButtons = () => {
  const navigation = useNavigation();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn();
      if (result.success) {
        navigation.navigate('Main' as never);
      } else {
        Alert.alert('Sign In Failed', result.error?.message || 'Unable to sign in');
      }
    } catch (error) {
      Alert.alert('Sign In Error', 'An unexpected error occurred');
    }
  };



  return (
    <View style={styles.socialContainer}>
      <TouchableOpacity onPress={handleGoogleSignIn}>
        <GoogleIcon width={40} height={40} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  socialContainer: {
    flexDirection: 'row',
    gap: 40,
    marginBottom: 20,
  },
});
