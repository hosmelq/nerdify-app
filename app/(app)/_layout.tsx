import {Tabs} from 'expo-router'

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faCalendar as fasCalendar} from '@fortawesome/pro-solid-svg-icons/faCalendar'

import {styles} from '../../components/styles'

export default function Layout() {
  return (
    <Tabs
      initialRouteName="events"
      sceneContainerStyle={styles('bg:white')}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="events"
        options={{
          headerTitle: 'Events',
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon color={color} icon={fasCalendar} size={24} />
          ),
          tabBarLabel: 'Events',
        }}
      />
      <Tabs.Screen name="index" options={{href: null}} />
    </Tabs>
  )
}
