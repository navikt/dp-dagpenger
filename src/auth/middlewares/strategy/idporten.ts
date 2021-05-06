import { Client, Issuer, Strategy, StrategyOptions, TokenSet } from "openid-client";
import { env } from "../../util/env.util";
import { getUser, setUser, User } from "../session/users.mw";

async function idporten(): Promise<Strategy<User, Client>> {
  const issuer = await Issuer.discover(env("IDPORTEN_WELL_KNOWN_URL"));

  const jwk = JSON.parse(env("IDPORTEN_CLIENT_JWK"));
  const client = new issuer.Client(
    {
      client_id: env("IDPORTEN_CLIENT_ID"),
      token_endpoint_auth_method: "private_key_jwt",
      token_endpoint_auth_signing_alg: "RS256",
      redirect_uris: [
        process.env.IDPORTEN_REDIRECT_URI ||
        "http://localhost:3000/api/auth/callback",
      ],
      response_types: ["code"],
      scope: "openid profile",
      resource: "https://nav.no",
    },
    { keys: [jwk] }
  );

  return getStrategy(client);
}

function getStrategy(client: Client): Strategy<User, Client> {
  const strategyOptions: StrategyOptions<Client> = {
    client,
    params: {
      resource: "https://nav.no",
    },
    extras: {
      clientAssertionPayload: {
        aud: client.issuer.issuer,
      },
    },
  };
  const strategyVerifyCallback = async (tokenset: TokenSet, userinfo, done) => {
    let user: User = await getUser(userinfo.sub);

    if (user) {
      return done(null, user);
    }
    
    const { locale } = tokenset.claims();

    user = {
      subject: userinfo.sub,
      fnr: userinfo.pid,
      locale,
      tokenset,
    };
    await setUser(user);
    return done(null, user);
  }

  return new Strategy(strategyOptions, strategyVerifyCallback);
}

export default idporten;
