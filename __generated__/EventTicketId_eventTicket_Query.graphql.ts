/**
 * @generated SignedSource<<4503c44b0f379eb1369a0462c557ca37>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type EventTicketStatus = "CANCELLED" | "UNUSED" | "USED";
export type EventTicketId_eventTicket_Query$variables = {
  eventTicketId: string;
};
export type EventTicketId_eventTicket_Query$data = {
  readonly ticket: {
    readonly attendee: {
      readonly email: string;
      readonly id: string;
      readonly name: string;
    };
    readonly barcode: string;
    readonly checkedInAt: string | null;
    readonly id: string;
    readonly status: EventTicketStatus;
  } | null;
};
export type EventTicketId_eventTicket_Query = {
  response: EventTicketId_eventTicket_Query$data;
  variables: EventTicketId_eventTicket_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "eventTicketId"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": "ticket",
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "eventTicketId"
      }
    ],
    "concreteType": "EventTicket",
    "kind": "LinkedField",
    "name": "eventTicket",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "EventAttendee",
        "kind": "LinkedField",
        "name": "attendee",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "barcode",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "checkedInAt",
        "storageKey": null
      },
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "status",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EventTicketId_eventTicket_Query",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EventTicketId_eventTicket_Query",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "1351eec5406339bdefa05f80ae30c391",
    "id": null,
    "metadata": {},
    "name": "EventTicketId_eventTicket_Query",
    "operationKind": "query",
    "text": "query EventTicketId_eventTicket_Query(\n  $eventTicketId: ID!\n) {\n  ticket: eventTicket(id: $eventTicketId) {\n    attendee {\n      email\n      id\n      name\n    }\n    barcode\n    checkedInAt\n    id\n    status\n  }\n}\n"
  }
};
})();

(node as any).hash = "aa945e9ec4cc30c6f1403f7649e15553";

export default node;
