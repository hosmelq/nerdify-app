import {format} from 'date-fns'
import {Link} from 'expo-router'
import {Suspense} from 'react'
import {ActivityIndicator} from 'react-native'
import {graphql, useLazyLoadQuery} from 'react-relay'

import {FlashList} from '@shopify/flash-list'

import type {events_events_Query} from '../../../__generated__/events_events_Query.graphql'
import {StyledText, StyledView} from '../../../components/styles'

export default function SuspenseWrapper() {
  return (
    <StyledView classes={['flex:1', 'p:4']}>
      <Suspense fallback={<ActivityIndicator />}>
        <EventList />
      </Suspense>
    </StyledView>
  )
}

function EventList() {
  const {events} = useLazyLoadQuery<events_events_Query>(
    graphql`
      query events_events_Query {
        events(first: 10) {
          edges {
            node {
              id
              name
              startsAt
              venue {
                name
              }
            }
          }
        }
      }
    `,
    {}
  )

  return (
    <StyledView classes={['flex:1']}>
      <FlashList
        data={events.edges}
        estimatedItemSize={60}
        renderItem={({item: {node: event}}) => {
          return (
            <Link href={`events/${event.id}`}>
              <StyledView>
                <StyledText
                  classes={['color:gray-900', 'font-weight:bold', 'text:xl']}
                >
                  {event.name}
                </StyledText>
                <StyledText classes={['color:gray-500']}>
                  {event.venue.name}
                </StyledText>
                <StyledText classes={['color:gray-500']}>
                  {format(
                    new Date(event.startsAt),
                    "E, dd LLL yyyy 'at' hh:mm a"
                  )}
                </StyledText>
              </StyledView>
            </Link>
          )
        }}
      />
    </StyledView>
  )
}
