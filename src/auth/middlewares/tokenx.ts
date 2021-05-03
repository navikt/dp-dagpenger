import { NextApiRequest, NextApiResponse } from "next";
import { Client, GrantBody, Issuer, TokenSet } from "openid-client";
import { env } from "./index";

let tokenXClient: Client;

interface TokenizedApiRequest extends NextApiRequest {
  getToken?: (id_token: string, audience: string) => Promise<string>;
}

export default async function tokenx(
  req: TokenizedApiRequest,
  res: NextApiResponse,
  next
) {
  if (!tokenXClient) {
    tokenXClient = await getTokenXClient();
  }

  req.getToken = async (subject_token, audience) => {
    const now = Math.floor(Date.now() / 1000);
    const additionalClaims = {
      clientAssertionPayload: {
        nbf: now,
        aud: tokenXClient.issuer.metadata.token_endpoint,
      },
    };

    const grantBody: GrantBody = {
      grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
      client_assertion_type:
        "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
      subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
      audience,
      subject_token,
    };

    return tokenXClient
      .grant(grantBody, additionalClaims)
      .then((tokenSet: TokenSet) => tokenSet.access_token)
      .catch((err) => {
        console.error(`Error while exchanging token: ${err}`);
        throw err;
      });
  };

  return next();
}

async function getTokenXClient(): Promise<Client> {
  const jwk = JSON.parse(env("TOKEN_X_PRIVATE_JWK"));

  const issuer = await Issuer.discover(env("TOKEN_X_WELL_KNOWN_URL"));
  const client = new issuer.Client(
    {
      client_id: process.env.TOKEN_X_CLIENT_ID,
      token_endpoint_auth_method: "private_key_jwt",
    },
    { keys: [jwk] }
  );

  return client;
}
