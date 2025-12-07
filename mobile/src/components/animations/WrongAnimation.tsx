import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import * as Haptics from 'expo-haptics';
import { colors } from '../../utils/theme';
import { useSettingsStore } from '../../stores/settingsStore';

const { width, height } = Dimensions.get('window');

interface Props {
  visible: boolean;
  remainingLives: number;
  onComplete: () => void;
}

// Explosion particle
const ExplosionParticle = ({ delay, angle, distance }: { delay: number; angle: number; distance: number }) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const targetX = Math.cos(angle) * distance;
    const targetY = Math.sin(angle) * distance;

    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: targetX,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: targetY,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.delay(300),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]).start();
  }, []);

  const size = 8 + Math.random() * 12;
  const particleColor = ['#FF4444', '#FF6B6B', '#FF8888', '#FFAAAA', '#FF3333'][Math.floor(Math.random() * 5)];

  return (
    <Animated.View
      style={[
        styles.explosionParticle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: particleColor,
          opacity,
          transform: [
            { translateX },
            { translateY },
            { scale },
          ],
        },
      ]}
    />
  );
};

// Shatter piece effect
const ShatterPiece = ({ delay, startX, startY }: { delay: number; startX: number; startY: number }) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const direction = (startX > 0 ? 1 : -1) * (50 + Math.random() * 100);
    const fallDistance = 200 + Math.random() * 150;

    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: direction,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: fallDistance,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', `${360 + Math.random() * 360}deg`],
  });

  const pieceSize = 15 + Math.random() * 25;

  return (
    <Animated.View
      style={[
        styles.shatterPiece,
        {
          width: pieceSize,
          height: pieceSize,
          left: startX,
          top: startY,
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

// Lightning bolt effect
const LightningBolt = ({ delay, angle }: { delay: number; angle: number }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const scaleY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(scaleY, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.lightningBolt,
        {
          opacity,
          transform: [
            { rotate: `${angle}deg` },
            { scaleY },
          ],
        },
      ]}
    />
  );
};

// Ripple ring effect
const RippleRing = ({ delay, size }: { delay: number; size: number }) => {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.rippleRing,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          opacity,
          transform: [{ scale }],
        },
      ]}
    />
  );
};

export default function WrongAnimation({ visible, remainingLives, onComplete }: Props) {
  const { hapticEnabled } = useSettingsStore();

  const shakeX = useRef(new Animated.Value(0)).current;
  const shakeY = useRef(new Animated.Value(0)).current;
  const xScale = useRef(new Animated.Value(0)).current;
  const xOpacity = useRef(new Animated.Value(0)).current;
  const xRotate = useRef(new Animated.Value(0)).current;
  const flashOpacity = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const livesOpacity = useRef(new Animated.Value(0)).current;
  const livesScale = useRef(new Animated.Value(0.5)).current;
  const pulseScale = useRef(new Animated.Value(1)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;

  // Haptic feedback sequence
  const triggerHaptics = () => {
    if (!hapticEnabled || Platform.OS === 'web') return;

    // Initial heavy impact
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    // Rapid shake haptics
    setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium), 50);
    setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium), 100);
    setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium), 150);
    setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), 200);
    setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light), 250);

    // Error notification
    setTimeout(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error), 350);

    // If game over, extra dramatic haptics
    if (remainingLives <= 0) {
      setTimeout(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy), 500);
      setTimeout(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error), 700);
    }
  };

  useEffect(() => {
    if (visible) {
      // Trigger haptics
      triggerHaptics();

      // Reset all values
      shakeX.setValue(0);
      shakeY.setValue(0);
      xScale.setValue(0);
      xOpacity.setValue(0);
      xRotate.setValue(0);
      flashOpacity.setValue(0);
      overlayOpacity.setValue(0);
      livesOpacity.setValue(0);
      livesScale.setValue(0.5);
      pulseScale.setValue(1);
      glowOpacity.setValue(0);

      // Intense screen shake sequence
      const shakeSequence = Animated.sequence([
        // Intense initial shake
        Animated.parallel([
          Animated.timing(shakeX, { toValue: 20, duration: 40, useNativeDriver: true }),
          Animated.timing(shakeY, { toValue: -10, duration: 40, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(shakeX, { toValue: -25, duration: 40, useNativeDriver: true }),
          Animated.timing(shakeY, { toValue: 15, duration: 40, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(shakeX, { toValue: 22, duration: 40, useNativeDriver: true }),
          Animated.timing(shakeY, { toValue: -12, duration: 40, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(shakeX, { toValue: -18, duration: 40, useNativeDriver: true }),
          Animated.timing(shakeY, { toValue: 10, duration: 40, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(shakeX, { toValue: 15, duration: 40, useNativeDriver: true }),
          Animated.timing(shakeY, { toValue: -8, duration: 40, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(shakeX, { toValue: -12, duration: 40, useNativeDriver: true }),
          Animated.timing(shakeY, { toValue: 6, duration: 40, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(shakeX, { toValue: 8, duration: 40, useNativeDriver: true }),
          Animated.timing(shakeY, { toValue: -4, duration: 40, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(shakeX, { toValue: 0, duration: 40, useNativeDriver: true }),
          Animated.timing(shakeY, { toValue: 0, duration: 40, useNativeDriver: true }),
        ]),
      ]);

      // Pulse animation for X mark
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseScale, {
            toValue: 1.1,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(pulseScale, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
        ]),
        { iterations: 3 }
      );

      Animated.sequence([
        // Red flash with overlay
        Animated.parallel([
          Animated.timing(overlayOpacity, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(flashOpacity, {
              toValue: 0.7,
              duration: 80,
              useNativeDriver: true,
            }),
            Animated.timing(flashOpacity, {
              toValue: 0.3,
              duration: 80,
              useNativeDriver: true,
            }),
            Animated.timing(flashOpacity, {
              toValue: 0.5,
              duration: 80,
              useNativeDriver: true,
            }),
            Animated.timing(flashOpacity, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
          ]),
          shakeSequence,
        ]),
        // X mark entrance with glow
        Animated.parallel([
          Animated.spring(xScale, {
            toValue: 1,
            friction: 3,
            tension: 200,
            useNativeDriver: true,
          }),
          Animated.timing(xOpacity, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(xRotate, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(glowOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          pulseAnimation,
        ]),
        // Lives indicator
        Animated.parallel([
          Animated.timing(livesOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.spring(livesScale, {
            toValue: 1,
            friction: 5,
            useNativeDriver: true,
          }),
        ]),
        // Hold
        Animated.delay(remainingLives <= 0 ? 800 : 500),
        // Fade out
        Animated.parallel([
          Animated.timing(overlayOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(xOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(livesOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(glowOpacity, {
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

  // Create explosion particles
  const explosionParticles = Array.from({ length: 20 }, (_, i) => (
    <ExplosionParticle
      key={`exp-${i}`}
      delay={100 + i * 20}
      angle={(i / 20) * Math.PI * 2}
      distance={80 + Math.random() * 60}
    />
  ));

  // Create shatter pieces
  const shatterPieces = Array.from({ length: 12 }, (_, i) => (
    <ShatterPiece
      key={`shatter-${i}`}
      delay={150 + i * 30}
      startX={(Math.random() - 0.5) * 100}
      startY={(Math.random() - 0.5) * 100}
    />
  ));

  // Create lightning bolts
  const lightningBolts = Array.from({ length: 6 }, (_, i) => (
    <LightningBolt key={`lightning-${i}`} delay={50 + i * 40} angle={i * 60} />
  ));

  // Create ripple rings
  const rippleRings = [
    <RippleRing key="ripple-1" delay={0} size={150} />,
    <RippleRing key="ripple-2" delay={100} size={200} />,
    <RippleRing key="ripple-3" delay={200} size={250} />,
  ];

  const xRotateInterpolate = xRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['45deg', '0deg'],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: overlayOpacity,
          transform: [
            { translateX: shakeX },
            { translateY: shakeY },
          ],
        },
      ]}
    >
      {/* Red flash */}
      <Animated.View style={[styles.flash, { opacity: flashOpacity }]} />

      {/* Ripple rings */}
      <View style={styles.effectsContainer}>{rippleRings}</View>

      {/* Lightning bolts */}
      <View style={styles.effectsContainer}>{lightningBolts}</View>

      {/* Explosion particles */}
      <View style={styles.effectsContainer}>{explosionParticles}</View>

      {/* Shatter pieces */}
      <View style={styles.effectsContainer}>{shatterPieces}</View>

      {/* Glow effect behind X */}
      <Animated.View
        style={[
          styles.glowEffect,
          {
            opacity: glowOpacity,
            transform: [{ scale: pulseScale }],
          },
        ]}
      />

      {/* X mark */}
      <Animated.View
        style={[
          styles.xContainer,
          {
            opacity: xOpacity,
            transform: [
              { scale: Animated.multiply(xScale, pulseScale) },
              { rotate: xRotateInterpolate },
            ],
          },
        ]}
      >
        <Text style={styles.xMark}>✕</Text>
      </Animated.View>

      {/* Remaining lives */}
      <Animated.View
        style={[
          styles.livesContainer,
          {
            opacity: livesOpacity,
            transform: [{ scale: livesScale }],
          },
        ]}
      >
        <Text style={styles.wrongText}>오빠 실망이야!</Text>
        <View style={styles.heartsRow}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Animated.Text
              key={i}
              style={[
                styles.heartIcon,
                i >= remainingLives && styles.heartEmpty,
              ]}
            >
              {i < remainingLives ? '❤️' : '🖤'}
            </Animated.Text>
          ))}
        </View>
        {remainingLives <= 0 && (
          <Text style={styles.gameOverText}>게임 오버</Text>
        )}
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  flash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.error,
  },
  effectsContainer: {
    position: 'absolute',
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  explosionParticle: {
    position: 'absolute',
  },
  shatterPiece: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 100, 100, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 50, 50, 0.9)',
  },
  lightningBolt: {
    position: 'absolute',
    width: 4,
    height: 100,
    backgroundColor: '#FFFF00',
    shadowColor: '#FFFF00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  rippleRing: {
    position: 'absolute',
    borderWidth: 3,
    borderColor: colors.error,
  },
  glowEffect: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255, 80, 80, 0.3)',
    shadowColor: colors.error,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 50,
  },
  xContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.error,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 40,
    elevation: 15,
    borderWidth: 4,
    borderColor: '#FF8888',
  },
  xMark: {
    fontSize: 72,
    color: '#FFF',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  livesContainer: {
    position: 'absolute',
    bottom: height * 0.22,
    alignItems: 'center',
  },
  wrongText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: colors.error,
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
    marginBottom: 20,
  },
  heartsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  heartIcon: {
    fontSize: 32,
  },
  heartEmpty: {
    opacity: 0.4,
  },
  gameOverText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF4444',
    marginTop: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});
