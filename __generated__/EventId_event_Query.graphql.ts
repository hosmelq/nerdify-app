/**
 * @generated SignedSource<<8815071b891a336802e6794eeca8763e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type EventTicketStatus = "CANCELLED" | "UNUSED" | "USED";
export type EventId_event_Query$variables = {
  id: string;
};
export type EventId_event_Query$data = {
  readonly event: {
    readonly id: string;
    readonly name: string;
    readonly startsAt: string;
    readonly tickets: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly attendee: {
            readonly id: string;
            readonly name: string;
          };
          readonly id: string;
          readonly status: EventTicketStatus;
        };
      }>;
    };
  } | null;
};
export type EventId_event_Query = {
  response: EventId_event_Query$data;
  variables: EventId_event_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Event",
    "kind": "LinkedField",
    "name": "event",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "startsAt",
        "storageKey": null
      },
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "first",
            "value": 50
          }
        ],
        "concreteType": "EventTicketConnection",
        "kind": "LinkedField",
        "name": "tickets",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "EventTicketEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "EventTicket",
                "kind": "LinkedField",
                "name": "node",
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
                      (v1/*: any*/),
                      (v2/*: any*/)
                    ],
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
            ],
            "storageKey": null
          }
        ],
        "storageKey": "tickets(first:50)"
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
    "name": "EventId_event_Query",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EventId_event_Query",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "cb9eedaacabd3cc9a802b3b486216748",
    "id": null,
    "metadata": {},
    "name": "EventId_event_Query",
    "operationKind": "query",
    "text": "query EventId_event_Query(\n  $id: ID!\n) {\n  event(id: $id) {\n    id\n    name\n    startsAt\n    tickets(first: 50) {\n      edges {\n        node {\n          attendee {\n            id\n            name\n          }\n          id\n          status\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "85cc9fdbe37162e746d0f98796dfc3c9";

export default node;
