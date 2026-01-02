


import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      region: "eu-north-1",
      userPoolId: "eu-north-1_3sW1xIXXG",
      userPoolClientId: "5bm973gohg4jp8sqt1icms64u8",
    },
  },
});