import {Stack} from 'expo-router'

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Events',
        }}
      />
    </Stack>
  )
}
