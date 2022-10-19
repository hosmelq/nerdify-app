/**
 * @generated SignedSource<<41c1bdd06bd9fd90596d01f348a63679>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SignInWithEmailInitiateInput = {
  email: string;
  tokenName: string;
};
export type auth_signInWithEmailInitiate_Mutation$variables = {
  input: SignInWithEmailInitiateInput;
};
export type auth_signInWithEmailInitiate_Mutation$data = {
  readonly signInWithEmailInitiate: {
    readonly completionToken: string | null;
    readonly userErrors: ReadonlyArray<{
      readonly field: ReadonlyArray<string> | null;
      readonly message: string;
    }>;
  } | null;
};
export type auth_signInWithEmailInitiate_Mutation = {
  response: auth_signInWithEmailInitiate_Mutation$data;
  variables: auth_signInWithEmailInitiate_Mutation$variables;
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
    "concreteType": "SignInWithEmailInitiatePayload",
    "kind": "LinkedField",
    "name": "signInWithEmailInitiate",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "completionToken",
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
    "name": "auth_signInWithEmailInitiate_Mutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "auth_signInWithEmailInitiate_Mutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3628c9c0764becce70b98aced061e501",
    "id": null,
    "metadata": {},
    "name": "auth_signInWithEmailInitiate_Mutation",
    "operationKind": "mutation",
    "text": "mutation auth_signInWithEmailInitiate_Mutation(\n  $input: SignInWithEmailInitiateInput!\n) {\n  signInWithEmailInitiate(input: $input) {\n    completionToken\n    userErrors {\n      field\n      message\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6ecadf169f67e28d739be2414138f5ab";

export default node;
