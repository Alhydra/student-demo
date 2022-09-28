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
  const [inputFields] = useState([
    {
      name: 'Enter your email',
      id: 0,
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
        <Text style={styles.title}>Forgot your password?</Text>
        <Text style={styles.description}>
          Enter the email address associated with your account and we will send
          you a link to reset your password.
        </Text>

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

          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.sendText}>Send password reset email</Text>
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
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.lightGrey,
    lineHeight: 21,
    marginBottom: 24,
    fontFamily: 'SuisseIntl',
  },
  inputText: {
    width: '100%',
    height: 56,
    borderRadius: 8,
    fontFamily: 'SuisseIntl',
    fontWeight: '400',
    fontSize: 16,
    color: Colors.white,
    padding: 16,
    textAlignVertical: 'center',
    borderColor: Colors.blackShade4,
  },
  sendButton: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: Colors.primary,
    marginTop: 40,
  },
  sendText: {
    fontSize: 14,
    fontFamily: 'SuisseIntl-medium',
    lineHeight: 20,
    color: Colors.blackShade1,
    fontWeight: '500',
  },
});
