import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../config/Colors';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const windowWidth = Dimensions.get('window').width;
const imageHeight = 406;

export default function Home({ navigation }) {
  const myScroll = useRef();
  const [currentStep, setCurrentStep] = useState(0);

  let fadeAnim = new Animated.Value(1);

  const [steps] = useState([
    {
      image: require('../../assets/onboard-hero-1.png'),
      title: 'Welcome to Metafy',
      description:
        'Where the greatest minds in gaming can help you get on their level.',
    },
    {
      image: require('../../assets/onboard-hero-2.png'),
      title: 'Like having an Expert in your pocket',
      description:
        'Right next to the lint and other junk. You should really clean that out.',
    },
    {
      image: require('../../assets/onboard-hero-3.png'),
      title: 'More time for learning',
      description:
        'We’ll handle the boring work. You just focus on getting much, much better.',
    },
  ]);
  const nextStep = (nextStep) => {
    myScroll.current.scrollTo({
      x: windowWidth * nextStep,
      animated: true,
    });
    Animated.timing(fadeAnim, {
      toValue: 0.3,
      duration: 300,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setCurrentStep(nextStep);
        fadeAnim = new Animated.Value(1);
      }
    });
  };

  const [fontsLoaded] = useFonts({
    SuisseIntl: require('../../assets/fonts/SuisseIntl/SuisseIntl-Regular.otf'),
    'SuisseIntl-medium': require('../../assets/fonts/SuisseIntl/SuisseIntl-Medium.otf'),
    'SuisseIntl-bold': require('../../assets/fonts/SuisseIntl/SuisseIntl-Bold.otf'),
    'Roslindale-DisplayMedium': require('../../assets/fonts/Roslindale/Roslindale-DisplayMedium.otf'),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView
      style={styles.container}
      onLayout={onLayoutRootView}
      edges={['bottom', 'left', 'right']}
    >
      <StatusBar animated={true} barStyle="light-content" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEnabled={false}
        ref={myScroll}
        style={{ height: imageHeight }}
      >
        {steps.map((step, key) => (
          <Image
            source={step.image}
            style={styles.heroImage}
            resizeMode="cover"
            key={key}
          />
        ))}
      </ScrollView>

      <TouchableWithoutFeedback
        onPress={() => nextStep(currentStep >= 2 ? 0 : currentStep + 1)}
        style={{ flex: 1 }}
      >
        <Animated.View
          style={{ ...styles.contentContainer, opacity: fadeAnim }}
        >
          <View style={styles.bubble}>
            <Text style={{ ...styles.bubbleText, fontWeight: '400' }}>
              <Text
                style={{
                  ...styles.bubbleText,
                  fontWeight: '600',
                  fontFamily: 'SuisseIntl-bold',
                }}
              >
                {currentStep + 1}
              </Text>{' '}
              of {steps.length}
            </Text>
          </View>
          <Text
            style={{
              ...styles.title,
              width: steps[currentStep].title.length > 22 ? '100%' : '50%',
            }}
          >
            {steps[currentStep].title}
          </Text>
          <Text style={{ ...styles.description }}>
            {steps[currentStep].description}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            {steps.map((step, key) => (
              <View
                key={key}
                style={{
                  height: 7,
                  width: 7,
                  backgroundColor:
                    currentStep === key ? Colors.white : Colors.blackShade3,
                  marginRight: 8,
                  borderRadius: 5,
                }}
              ></View>
            ))}
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>

      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={{
            ...styles.actionButton,
            backgroundColor: Colors.primary,
            marginBottom: 12,
          }}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text
            style={{
              ...styles.actionText,
              color: Colors.blackShade1,
            }}
          >
            Sign up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.actionButton,
            backgroundColor: Colors.blackShade3,
          }}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={{ ...styles.actionText, color: Colors.white }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  heroImage: {
    width: windowWidth,
    height: imageHeight,
  },
  contentContainer: {
    padding: 20,
  },
  bubble: {
    backgroundColor: Colors.darkGrey,
    height: 26,
    width: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginBottom: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  bubbleText: {
    color: Colors.white,
    fontSize: 12,
    fontFamily: 'SuisseIntl',
    lineHeight: 18,
  },
  title: {
    fontSize: 32,
    fontWeight: '500',
    color: Colors.white,
    lineHeight: 39.68,
    marginBottom: 8,
    fontFamily: 'Roslindale-DisplayMedium',
    textAlign: 'justify',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.lightGrey,
    lineHeight: 21,
    marginBottom: 24,
    fontFamily: 'SuisseIntl',
  },
  actionsContainer: {
    paddingLeft: 20,
  },
  actionButton: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'SuisseIntl-medium',
    lineHeight: 20,
  },
});
