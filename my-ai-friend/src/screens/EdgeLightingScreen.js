import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const EdgeLightingScreen = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const borderColor = animatedValue.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: ['#00f2ff', '#00ff00', '#ff00ff', '#ffff00', '#00f2ff']
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.borderBox, { borderColor: borderColor }]}>
        <Text style={styles.text}>Edge Lighting Preview</Text>
        <Text style={styles.subtext}>Jarvis Active...</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderBox: {
    width: width - 20,
    height: height - 100,
    borderWidth: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtext: {
    color: '#aaa',
    marginTop: 10,
  },
});

export default EdgeLightingScreen;
