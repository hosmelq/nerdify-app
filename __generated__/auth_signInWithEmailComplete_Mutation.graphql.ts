/**
 * @generated SignedSource<<08c8cd2f2e9f1d51292851058cab3cbf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SignInWithEmailCompleteInput = {
  email: string;
  verificationToken: string;
};
export type auth_signInWithEmailComplete_Mutation$variables = {
  input: SignInWithEmailCompleteInput;
};
export type auth_signInWithEmailComplete_Mutation$data = {
  readonly signInWithEmailComplete: {
    readonly accessToken: string | null;
    readonly user: {
      readonly email: string;
      readonly id: string;
      readonly name: string;
    } | null;
    readonly userErrors: ReadonlyArray<{
      readonly field: ReadonlyArray<string> | null;
      readonly message: string;
    }>;
  } | null;
};
export type auth_signInWithEmailComplete_Mutation = {
  response: auth_signInWithEmailComplete_Mutation$data;
  variables: auth_signInWithEmailComplete_Mutation$variables;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "SignInWithEmailCompletePayload",
    "kind": "LinkedField",
    "name": "signInWithEmailComplete",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "accessToken",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
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
      },
      {
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
    "name": "auth_signInWithEmailComplete_Mutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "auth_signInWithEmailComplete_Mutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "58b943615427cdae9691638ea3d127df",
    "id": null,
    "metadata": {},
    "name": "auth_signInWithEmailComplete_Mutation",
    "operationKind": "mutation",
    "text": "mutation auth_signInWithEmailComplete_Mutation(\n  $input: SignInWithEmailCompleteInput!\n) {\n  signInWithEmailComplete(input: $input) {\n    accessToken\n    user {\n      email\n      id\n      name\n    }\n    userErrors {\n      field\n      message\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "50ea22196d8cdb84ad33d55954a4e9a0";

export default node;
