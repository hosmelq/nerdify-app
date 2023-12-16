/**
 * @generated SignedSource<<cc3d98a2766c76596e45c5378d8ec0b8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type auth_viewer_Query$variables = {};
export type auth_viewer_Query$data = {
  readonly viewer: {
    readonly email: string;
    readonly id: string;
    readonly name: string;
  };
};
export type auth_viewer_Query = {
  response: auth_viewer_Query$data;
  variables: auth_viewer_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "viewer",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "email",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "auth_viewer_Query",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "auth_viewer_Query",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "426e7d0d2442c5a8282a08a4e8cbf217",
    "id": null,
    "metadata": {},
    "name": "auth_viewer_Query",
    "operationKind": "query",
    "text": "query auth_viewer_Query {\n  viewer {\n    email\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "2126292e6721eb2f35e04505b5322a60";

export default node;
