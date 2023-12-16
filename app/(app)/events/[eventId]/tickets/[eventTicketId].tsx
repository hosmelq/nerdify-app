import {format} from 'date-fns'
import {Stack} from 'expo-router'
import {Suspense} from 'react'
import {ActivityIndicator, TouchableHighlight} from 'react-native'
import {graphql, useLazyLoadQuery, useMutation} from 'react-relay'

import {faCheck as fasCheck} from '@fortawesome/pro-solid-svg-icons/faCheck'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'

import type {EventTicketId_eventTicket_Query} from '../../../../../__generated__/EventTicketId_eventTicket_Query.graphql'
import type {EventTicketId_eventTicketMarkAsUsed_Query} from '../../../../../__generated__/EventTicketId_eventTicketMarkAsUsed_Query.graphql'
import {styles, StyledText, StyledView} from '../../../../../components/styles'

interface AttendeeDetailsProps {
  route: {
    params: {
      eventTicketId: string
    }
  }
}

export default function SuspenseWrapper(props: AttendeeDetailsProps) {
  return (
    <StyledView classes={['bg:gray-50', 'flex:1']}>
      <Suspense
        fallback={
          <StyledView classes={['p:4']}>
            <ActivityIndicator />
          </StyledView>
        }
      >
        <AttendeeDetails {...props} />
      </Suspense>
    </StyledView>
  )
}

function AttendeeDetails({route}: AttendeeDetailsProps) {
  const {ticket} = useLazyLoadQuery<EventTicketId_eventTicket_Query>(
    graphql`
      query EventTicketId_eventTicket_Query($eventTicketId: ID!) {
        ticket: eventTicket(id: $eventTicketId) {
          attendee {
            email
            id
            name
          }
          barcode
          checkedInAt
          id
          status
        }
      }
    `,
    {
      eventTicketId: route.params.eventTicketId,
    }
  )
  const [commit, isInFlight] =
    useMutation<EventTicketId_eventTicketMarkAsUsed_Query>(graphql`
      mutation EventTicketId_eventTicketMarkAsUsed_Query(
        $input: EventTicketMarkAsUsedInput!
      ) {
        eventTicketMarkAsUsed(input: $input) {
          eventTicket {
            checkedInAt
            status
          }
          userErrors {
            field
            message
          }
        }
      }
    `)

  if (!ticket) {
    return null
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: 'Attendee Details',
        }}
      />
      <StyledView classes={['flex:1']}>
        <StyledView
          classes={['bg:white', 'border-b:1', 'border-color:gray-200', 'p:4']}
        >
          <StyledText classes={['color:gray-500']}>Attendee</StyledText>
          <StyledText
            classes={['color:gray-900', 'font-weight:bold', 'mt:1', 'text:4xl']}
            numberOfLines={1}
          >
            {ticket.attendee.name}
          </StyledText>
          <StyledText classes={['color:gray-700', 'mt:1', 'text:base']}>
            {ticket.attendee.email}
          </StyledText>
          <StyledView classes={['mt:4']}>
            <StyledText classes={['color:gray-500']}>Barcode</StyledText>
            <StyledText classes={['color:gray-900', 'text:lg']}>
              {ticket.barcode.toUpperCase()}
            </StyledText>
          </StyledView>
          {ticket.checkedInAt !== null && (
            <StyledView classes={['mt:4']}>
              <StyledText classes={['color:gray-500']}>Checked In</StyledText>
              <StyledText classes={['color:gray-900', 'text:lg']}>
                {format(
                  new Date(ticket.checkedInAt),
                  "E, dd LLL yyyy 'at' hh:mm a"
                )}
              </StyledText>
            </StyledView>
          )}
        </StyledView>
      </StyledView>
      <StyledView
        classes={['bg:white', 'border-t:1', 'border-color:gray-200', 'p:4']}
      >
        <TouchableHighlight
          disabled={isInFlight || ticket.status === 'USED'}
          onPress={() => {
            commit({
              variables: {
                input: {
                  id: ticket.id,
                },
              },
              onCompleted() {},
              onError() {},
            })
          }}
          style={styles(
            'border:2',
            'border-color:gray-300',
            'h:12',
            'items:center',
            'justify:center',
            'rounded:md'
          )}
          activeOpacity={0.6}
          underlayColor="#f1f1f1"
        >
          <StyledView classes={['flex:row', 'items:center']}>
            {ticket.status === 'USED' && <FontAwesomeIcon icon={fasCheck} />}
            {isInFlight ? (
              <ActivityIndicator />
            ) : (
              <StyledText classes={['font-weight:medium', 'ml:2', 'text:lg']}>
                Check In
              </StyledText>
            )}
          </StyledView>
        </TouchableHighlight>
      </StyledView>
    </>
  )
}
