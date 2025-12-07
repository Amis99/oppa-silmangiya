import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { colors } from '../../utils/theme';

const { width, height } = Dimensions.get('window');

interface Props {
  visible: boolean;
  score: number;
  onComplete: () => void;
}

// Confetti particle
const Confetti = ({ delay, color }: { delay: number; color: string }) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-50)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const startX = Math.random() * width;
  const endX = startX + (Math.random() - 0.5) * 200;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: height + 50,
          duration: 2000 + Math.random() * 1000,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: endX - startX,
          duration: 2000 + Math.random() * 1000,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.timing(rotate, {
            toValue: 1,
            duration: 500 + Math.random() * 500,
            useNativeDriver: true,
          })
        ),
      ]),
    ]).start();
  }, []);

  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const size = 8 + Math.random() * 12;

  return (
    <Animated.View
      style={[
        styles.confetti,
        {
          left: startX,
          width: size,
          height: size * 0.6,
          backgroundColor: color,
          opacity,
          transform: [
            { translateX },
            { translateY },
            { rotate: rotateInterpolate },
          ],
        },
      ]}
    />
  );
};

// Star burst particle
const Star = ({ delay, startX, startY }: { delay: number; startX: number; startY: number }) => {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const angle = Math.random() * Math.PI * 2;
  const distance = 60 + Math.random() * 100;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: Math.cos(angle) * distance,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: Math.sin(angle) * distance,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.Text
      style={[
        styles.star,
        {
          left: startX,
          top: startY,
          opacity,
          transform: [{ translateX }, { translateY }, { scale }],
        },
      ]}
    >
      ⭐
    </Animated.Text>
  );
};

export default function CorrectAnimation({ visible, score, onComplete }: Props) {
  const checkScale = useRef(new Animated.Value(0)).current;
  const checkRotate = useRef(new Animated.Value(0)).current;
  const checkOpacity = useRef(new Animated.Value(0)).current;
  const ringScale = useRef(new Animated.Value(0.5)).current;
  const ringOpacity = useRef(new Animated.Value(0)).current;
  const scoreOpacity = useRef(new Animated.Value(0)).current;
  const scoreTranslateY = useRef(new Animated.Value(50)).current;
  const scoreScale = useRef(new Animated.Value(0.5)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Reset
      checkScale.setValue(0);
      checkRotate.setValue(0);
      checkOpacity.setValue(0);
      ringScale.setValue(0.5);
      ringOpacity.setValue(0);
      scoreOpacity.setValue(0);
      scoreTranslateY.setValue(50);
      scoreScale.setValue(0.5);
      overlayOpacity.setValue(0);

      Animated.sequence([
        // Fade in
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        // Check mark entrance
        Animated.parallel([
          Animated.spring(checkScale, {
            toValue: 1,
            friction: 4,
            tension: 100,
            useNativeDriver: true,
          }),
          Animated.timing(checkOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(checkRotate, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
        // Ring expansion
        Animated.parallel([
          Animated.timing(ringScale, {
            toValue: 2,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(ringOpacity, {
              toValue: 0.8,
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(ringOpacity, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
          ]),
        ]),
        // Score popup
        Animated.parallel([
          Animated.timing(scoreOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.spring(scoreTranslateY, {
            toValue: 0,
            friction: 6,
            useNativeDriver: true,
          }),
          Animated.spring(scoreScale, {
            toValue: 1,
            friction: 4,
            useNativeDriver: true,
          }),
        ]),
        // Hold
        Animated.delay(600),
        // Fade out
        Animated.parallel([
          Animated.timing(overlayOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(checkOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scoreOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        onComplete();
      });
    }
  }, [visible]);

  if (!visible) return null;

  const confettiColors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181', '#AA96DA'];
  const confetti = Array.from({ length: 30 }, (_, i) => (
    <Confetti
      key={i}
      delay={200 + i * 20}
      color={confettiColors[i % confettiColors.length]}
    />
  ));

  const stars = Array.from({ length: 12 }, (_, i) => (
    <Star
      key={i}
      delay={100 + i * 50}
      startX={width / 2 - 12}
      startY={height / 2 - 12}
    />
  ));

  const checkRotateInterpolate = checkRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['-20deg', '0deg'],
  });

  return (
    <Animated.View style={[styles.container, { opacity: overlayOpacity }]}>
      {/* Confetti */}
      {confetti}

      {/* Stars */}
      {stars}

      {/* Expanding ring */}
      <Animated.View
        style={[
          styles.ring,
          {
            opacity: ringOpacity,
            transform: [{ scale: ringScale }],
          },
        ]}
      />

      {/* Check mark circle */}
      <Animated.View
        style={[
          styles.checkContainer,
          {
            opacity: checkOpacity,
            transform: [
              { scale: checkScale },
              { rotate: checkRotateInterpolate },
            ],
          },
        ]}
      >
        <Text style={styles.checkMark}>✓</Text>
      </Animated.View>

      {/* Score */}
      <Animated.View
        style={[
          styles.scoreContainer,
          {
            opacity: scoreOpacity,
            transform: [
              { translateY: scoreTranslateY },
              { scale: scoreScale },
            ],
          },
        ]}
      >
        <Text style={styles.correctText}>정답!</Text>
        <Text style={styles.scoreText}>+{score}점</Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  confetti: {
    position: 'absolute',
    top: -50,
    borderRadius: 2,
  },
  star: {
    position: 'absolute',
    fontSize: 24,
  },
  ring: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: colors.success,
  },
  checkContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.success,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 10,
  },
  checkMark: {
    fontSize: 64,
    color: '#FFF',
    fontWeight: 'bold',
  },
  scoreContainer: {
    position: 'absolute',
    bottom: height * 0.25,
    alignItems: 'center',
  },
  correctText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4ECDC4',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  scoreText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFE66D',
    marginTop: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});
