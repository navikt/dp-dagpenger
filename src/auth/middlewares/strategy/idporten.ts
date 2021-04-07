import { Client, Issuer, Strategy } from "openid-client";
import { User } from "../../lib/api-helpers";

async function idporten(): Promise<Strategy<User, Client>> {
  const issuer = await Issuer.discover(process.env.IDPORTEN_WELL_KNOWN_URL);

  const jwk = JSON.parse(process.env.IDPORTEN_CLIENT_JWK);
  const client = new issuer.Client(
    {
      client_id: process.env.IDPORTEN_CLIENT_ID,
      token_endpoint_auth_method: "private_key_jwt",
      token_endpoint_auth_signing_alg: "RS256",
      redirect_uris: [
        process.env.IDPORTEN_REDIRECT_URI ||
          "http://localhost:3000/api/auth/callback",
      ],
      response_types: ["code"],
      scope: "openid profile",
    },
    { keys: [jwk] }
  );

  return new Strategy({ client }, (tokenset, userinfo, done) => {
    const { locale } = tokenset.claims();
    console.log({ tokenset });
    console.log({ userinfo });
    const user: User = {
      fnr: userinfo.pid,
      locale,
      access_token: tokenset.access_token,
    };
    return done(null, user);
  });
}

export default idporten;
