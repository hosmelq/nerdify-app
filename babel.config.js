module.exports = function (api) {
  api.cache(true)

  return {
    plugins: [require.resolve('expo-router/babel'), 'relay'],
    presets: ['babel-preset-expo'],
  }
}
