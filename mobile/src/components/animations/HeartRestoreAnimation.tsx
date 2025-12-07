import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '../../utils/theme';

const { width, height } = Dimensions.get('window');

interface Props {
  visible: boolean;
  onComplete: () => void;
}

// Particle component for sparkle effect
const Particle = ({ delay, startX, startY }: { delay: number; startX: number; startY: number }) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * 120;
    const targetX = Math.cos(angle) * distance;
    const targetY = Math.sin(angle) * distance;

    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: targetX,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: targetY,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const particleColors = ['#FF6B9D', '#FF8FAB', '#FFB3C6', '#FFD700', '#FFF'];
  const color = particleColors[Math.floor(Math.random() * particleColors.length)];
  const size = 6 + Math.random() * 8;

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          left: startX,
          top: startY,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          opacity,
          transform: [{ translateX }, { translateY }, { scale }],
        },
      ]}
    />
  );
};

export default function HeartRestoreAnimation({ visible, onComplete }: Props) {
  const heartScale = useRef(new Animated.Value(0)).current;
  const heartOpacity = useRef(new Animated.Value(0)).current;
  const heartRotate = useRef(new Animated.Value(0)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(30)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Reset values
      heartScale.setValue(0);
      heartOpacity.setValue(0);
      heartRotate.setValue(0);
      glowOpacity.setValue(0);
      textOpacity.setValue(0);
      textTranslateY.setValue(30);
      overlayOpacity.setValue(0);

      // Animation sequence
      Animated.sequence([
        // Fade in overlay
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        // Heart entrance with bounce
        Animated.parallel([
          Animated.spring(heartScale, {
            toValue: 1,
            friction: 4,
            tension: 100,
            useNativeDriver: true,
          }),
          Animated.timing(heartOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        // Glow pulse
        Animated.loop(
          Animated.sequence([
            Animated.timing(glowOpacity, {
              toValue: 0.8,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(glowOpacity, {
              toValue: 0.3,
              duration: 400,
              useNativeDriver: true,
            }),
          ]),
          { iterations: 2 }
        ),
        // Text slide up
        Animated.parallel([
          Animated.timing(textOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.spring(textTranslateY, {
            toValue: 0,
            friction: 6,
            useNativeDriver: true,
          }),
        ]),
        // Hold for a moment
        Animated.delay(800),
        // Fade out
        Animated.parallel([
          Animated.timing(overlayOpacity, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(heartOpacity, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(textOpacity, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        onComplete();
      });
    }
  }, [visible]);

  if (!visible) return null;

  const particles = Array.from({ length: 20 }, (_, i) => (
    <Particle
      key={i}
      delay={300 + i * 30}
      startX={width / 2 - 4}
      startY={height / 2 - 4}
    />
  ));

  const heartRotateInterpolate = heartRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[styles.container, { opacity: overlayOpacity }]}>
      {/* Particles */}
      {particles}

      {/* Glow effect */}
      <Animated.View
        style={[
          styles.glow,
          {
            opacity: glowOpacity,
            transform: [{ scale: heartScale }],
          },
        ]}
      />

      {/* Main heart */}
      <Animated.View
        style={[
          styles.heartContainer,
          {
            opacity: heartOpacity,
            transform: [
              { scale: heartScale },
              { rotate: heartRotateInterpolate },
            ],
          },
        ]}
      >
        <Text style={styles.heartEmoji}>❤️</Text>
        <Animated.View style={[styles.plusBadge, { opacity: heartOpacity }]}>
          <Text style={styles.plusText}>+1</Text>
        </Animated.View>
      </Animated.View>

      {/* Text */}
      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: textOpacity,
            transform: [{ translateY: textTranslateY }],
          },
        ]}
      >
        <Text style={styles.mainText}>하트 회복!</Text>
        <Text style={styles.subText}>계속 도전하세요!</Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  particle: {
    position: 'absolute',
  },
  glow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 60,
  },
  heartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartEmoji: {
    fontSize: 100,
    textShadowColor: 'rgba(255, 100, 150, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 30,
  },
  plusBadge: {
    position: 'absolute',
    top: -10,
    right: -20,
    backgroundColor: '#FFD700',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  plusText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  textContainer: {
    position: 'absolute',
    bottom: height * 0.25,
    alignItems: 'center',
  },
  mainText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B9D',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subText: {
    fontSize: 18,
    color: '#FFF',
    marginTop: 8,
  },
});
