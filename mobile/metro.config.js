const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Firebase v10+ import.meta 호환성 문제 해결
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
