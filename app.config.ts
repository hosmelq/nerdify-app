import type {ConfigContext, ExpoConfig} from '@expo/config'

export default ({config}: ConfigContext): ExpoConfig => ({
  ...config,
  android: {
    adaptiveIcon: {
      backgroundColor: '#ffffff',
      foregroundImage: './assets/adaptive-icon.png',
    },
  },
  assetBundlePatterns: ['**/*'],
  icon: './assets/icon.png',
  ios: {
    supportsTablet: true,
  },
  name: 'Nerdify',
  orientation: 'portrait',
  privacy: 'hidden',
  owner: 'nerdify',
  scheme: 'nerdify',
  slug: 'nerdify',
  splash: {
    backgroundColor: '#ffffff',
    image: './assets/splash.png',
    resizeMode: 'contain',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  userInterfaceStyle: 'light',
  version: '0.0.1',
})
