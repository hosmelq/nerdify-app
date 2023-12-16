module.exports = function (api) {
  api.cache(true)

  return {
    plugins: [
      require.resolve('expo-router/babel'),
      'transform-inline-environment-variables',
      'relay',
    ],
    presets: ['babel-preset-expo'],
  }
}
