import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';
import Colors from '../config/Colors';

export default function Login({ navigation }) {
  const [selectedInput, setSelectedInput] = useState(null);
  const [socialIcons] = useState([
    {
      name: 'twitch',
      icon: require('../../assets/icons/twitch.png'),
    },
    {
      name: 'discord',
      icon: require('../../assets/icons/discord.png'),
    },
    {
      name: 'google',
      icon: require('../../assets/icons/google.png'),
    },
    {
      name: 'apple',
      icon: require('../../assets/icons/apple.png'),
    },
    {
      name: 'facebook',
      icon: require('../../assets/icons/facebook.png'),
    },
  ]);
  const [inputFields] = useState([
    {
      name: 'Username',
      id: 0,
    },
    {
      name: 'Password',
      id: 1,
    },
  ]);
  return (
    <ImageBackground
      style={{ ...styles.container, ...styles.backgroundImage }}
      source={require('../../assets/background.png')}
      resizeMode="stretch"
    >
      <View style={{ ...styles.header, ...styles.contentContainer }}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image source={require('../../assets/icons/back.png')} />
        </TouchableOpacity>
        <Image source={require('../../assets/logo.png')} />
        <View></View>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.socialLoginContainer}>
          {socialIcons.map((icon, key) => (
            <TouchableOpacity
              style={{
                ...styles.iconButton,
                width: 57.4,
                height: 48,
                borderRadius: 8,
                paddingVertical: 14,
                paddingHorizontal: 20,
              }}
              key={key}
            >
              <Image source={icon.icon} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.dividerContainer}>
          <View style={styles.divider}></View>
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.divider}></View>
        </View>
        <View>
          {inputFields.map((field, key) => (
            <TextInput
              key={key}
              placeholder={field.name}
              placeholderTextColor={Colors.lightGrey}
              onFocus={() => {
                setSelectedInput(field.id);
              }}
              onBlur={() => {
                setSelectedInput(null);
              }}
              onf
              style={{
                ...styles.inputText,
                backgroundColor:
                  selectedInput === key
                    ? Colors.blackShade2
                    : Colors.blackShade3,
                borderWidth: selectedInput === key ? 2 : 0,
              }}
              selectionColor={Colors.primary}
              secureTextEntry={field.name === 'Password'}
            ></TextInput>
          ))}
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 67,
  },
  backgroundImage: {
    height: 456,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 68,
  },
  contentContainer: {
    padding: 20,
  },
  iconButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blackShade3,
    borderRadius: 4,
    padding: 8,
  },
  title: {
    color: Colors.white,
    fontSize: 32,
    fontWeight: '500',
    lineHeight: 39.68,
    marginBottom: 8,
    fontFamily: 'Roslindale-DisplayMedium',
    textAlign: 'justify',
    letterSpacing: 0.5,
    marginBottom: 24,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  divider: {
    width: 139,
    height: 2,
    backgroundColor: Colors.blackShade4,
  },
  dividerText: {
    fontFamily: 'SuisseIntl',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    color: Colors.lightGrey,
  },
  inputText: {
    width: '100%',
    height: 56,
    borderRadius: 8,
    marginBottom: 16,
    fontFamily: 'SuisseIntl',
    fontWeight: '400',
    fontSize: 16,
    color: Colors.white,
    padding: 16,
    textAlignVertical: 'center',
    borderColor: Colors.blackShade4,
  },
  forgotText: {
    color: Colors.primary,
    fontFamily: 'SuisseIntl-medium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 28,
    width: '40%',
    alignSelf: 'flex-end',
  },
  loginButton: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: Colors.primary,
    marginTop: 40,
  },
  loginText: {
    fontSize: 14,
    fontFamily: 'SuisseIntl-medium',
    lineHeight: 20,
    color: Colors.blackShade1,
    fontWeight: '500',
  },
});
