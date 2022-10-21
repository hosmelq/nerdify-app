/**
 * @generated SignedSource<<42243832b4630753d2d4e4e36be078ca>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type EventTicketStatus = "CANCELLED" | "UNUSED" | "USED";
export type EventTicketMarkAsUsedInput = {
  id: string;
};
export type EventTicketId_eventTicketMarkAsUsed_Query$variables = {
  input: EventTicketMarkAsUsedInput;
};
export type EventTicketId_eventTicketMarkAsUsed_Query$data = {
  readonly eventTicketMarkAsUsed: {
    readonly eventTicket: {
      readonly checkedInAt: string | null;
      readonly status: EventTicketStatus;
    } | null;
    readonly userErrors: ReadonlyArray<{
      readonly field: ReadonlyArray<string> | null;
      readonly message: string;
    }>;
  } | null;
};
export type EventTicketId_eventTicketMarkAsUsed_Query = {
  response: EventTicketId_eventTicketMarkAsUsed_Query$data;
  variables: EventTicketId_eventTicketMarkAsUsed_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "checkedInAt",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "UserError",
  "kind": "LinkedField",
  "name": "userErrors",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "field",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "message",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EventTicketId_eventTicketMarkAsUsed_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EventTicketMarkAsUsedPayload",
        "kind": "LinkedField",
        "name": "eventTicketMarkAsUsed",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "EventTicket",
            "kind": "LinkedField",
            "name": "eventTicket",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EventTicketId_eventTicketMarkAsUsed_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EventTicketMarkAsUsedPayload",
        "kind": "LinkedField",
        "name": "eventTicketMarkAsUsed",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "EventTicket",
            "kind": "LinkedField",
            "name": "eventTicket",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "45c712fb27041fb795311fbc54411022",
    "id": null,
    "metadata": {},
    "name": "EventTicketId_eventTicketMarkAsUsed_Query",
    "operationKind": "mutation",
    "text": "mutation EventTicketId_eventTicketMarkAsUsed_Query(\n  $input: EventTicketMarkAsUsedInput!\n) {\n  eventTicketMarkAsUsed(input: $input) {\n    eventTicket {\n      checkedInAt\n      status\n      id\n    }\n    userErrors {\n      field\n      message\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "37c2a67104c2958875627f897324b941";

export default node;
