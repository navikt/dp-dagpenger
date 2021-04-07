import { Issuer } from "openid-client";

let client;

export default async function tokenx(req, res, next) {
  if (!client) {
    client = await tokenxClient();
  }

  req.getToken = async (subject_token, audience) => {
    console.log(client);
    const now = Math.floor(Date.now() / 1000);
    const additionalClaims = {
      clientAssertionPayload: {
        nbf: now,
      },
    };

    return client
      .grant(
        {
          grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
          client_assertion_type:
            "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
          subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
          audience,
          subject_token,
        },
        additionalClaims
      )
      .then((tokenSet) => tokenSet.access_token)
      .catch((err) => {
        console.error(`Error while exchanging token: ${err}`);
        throw err;
      });
  };
  return next();
}

async function tokenxClient() {
  console.log("lager client");
  const issuer = await Issuer.discover(process.env.TOKEN_X_WELL_KNOWN_URL);

  const jwk = JSON.parse(process.env.TOKEN_X_PRIVATE_JWK);
  const client = new issuer.Client(
    {
      client_id: process.env.TOKEN_X_CLIENT_ID,
      token_endpoint_auth_method: "private_key_jwt",
    },
    { keys: [jwk] }
  );

  return client;
}
