import {format} from 'date-fns'
import {Link, Stack} from 'expo-router'
import {Suspense} from 'react'
import {ActivityIndicator} from 'react-native'
import {graphql, useLazyLoadQuery} from 'react-relay'
import type {O} from 'ts-toolbelt'

import {FlashList} from '@shopify/flash-list'

import type {
  EventId_event_Query,
  EventId_event_Query$data,
} from '../../../../__generated__/EventId_event_Query.graphql'
import {StyledText, StyledView} from '../../../../components/styles'

interface EventDetailsProps {
  route: {
    params: {
      eventId: string
    }
  }
}

export default function SuspenseWrapper(props: EventDetailsProps) {
  return (
    <StyledView classes={['flex:1']}>
      <Suspense
        fallback={
          <StyledView classes={['p:4']}>
            <ActivityIndicator />
          </StyledView>
        }
      >
        <EventDetails {...props} />
      </Suspense>
    </StyledView>
  )
}

function EventDetails({route}: EventDetailsProps) {
  const {event} = useLazyLoadQuery<EventId_event_Query>(
    graphql`
      query EventId_event_Query($id: ID!) {
        event(id: $id) {
          id
          name
          startsAt
          tickets(first: 50) {
            edges {
              node {
                attendee {
                  id
                  name
                }
                id
                status
              }
            }
          }
        }
      }
    `,
    {
      id: route.params.eventId,
    }
  )

  if (!event) {
    return null
  }

  const data = [...event.tickets.edges]
    .sort(({node: {attendee: a}}, {node: {attendee: b}}) =>
      a.name.localeCompare(b.name)
    )
    .reduce<
      (
        | string
        | O.Path<
            EventId_event_Query$data,
            ['event', 'tickets', 'edges', 0, 'node']
          >
      )[]
    >((previousValue, currentValue) => {
      const header = currentValue.node.attendee.name.slice(0, 1).toUpperCase()

      if (!previousValue.includes(header)) {
        previousValue.push(header)
      }

      previousValue.push(currentValue.node)

      return previousValue
    }, [])
  const stickyHeaderIndices = data.reduce<number[]>(
    (previousValue, currentValue, currentIndex) => {
      if (typeof currentValue !== 'string') {
        return previousValue
      }

      previousValue.push(currentIndex)

      return previousValue
    },
    []
  )

  return (
    <>
      <Stack.Screen
        options={{
          headerTitleAlign: 'center',
          headerTitle: () => {
            return (
              <StyledView classes={['items:center']}>
                <StyledText>{event.name}</StyledText>
                <StyledText>
                  {format(
                    new Date(event.startsAt),
                    "E, dd LLL yyyy 'at' hh:mm a"
                  )}
                </StyledText>
              </StyledView>
            )
          },
        }}
      />
      <StyledView classes={['flex:1']}>
        <FlashList
          data={data}
          estimatedItemSize={60}
          getItemType={(item) =>
            typeof item === 'string' ? 'sectionHeader' : 'row'
          }
          ItemSeparatorComponent={() => (
            <StyledView classes={['bg:gray-100', 'h:pt']} />
          )}
          renderItem={({item}) => {
            if (typeof item === 'string') {
              return (
                <StyledText
                  classes={[
                    'bg:gray-100',
                    'font-weight:normal',
                    'text:lg',
                    'px:4',
                    'py:1',
                  ]}
                >
                  {item}
                </StyledText>
              )
            }

            return (
              <Link href={`/events/${event.id}/tickets/${item?.id}`}>
                <StyledView classes={['flex:row']}>
                  {item.status === 'USED' && (
                    <StyledView classes={['bg:green-700', 'h:full', 'w:1']} />
                  )}
                  <StyledView classes={['p:4']}>
                    <StyledText>{item?.attendee.name}</StyledText>
                  </StyledView>
                </StyledView>
              </Link>
            )
          }}
          stickyHeaderIndices={stickyHeaderIndices}
        />
      </StyledView>
    </>
  )
}
