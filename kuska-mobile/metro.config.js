const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// expo-sqlite corre sobre WebAssembly en web; sin esto Metro no resuelve
// ./wa-sqlite/wa-sqlite.wasm y el build para web falla.
config.resolver.assetExts.push('wasm');

module.exports = config;
