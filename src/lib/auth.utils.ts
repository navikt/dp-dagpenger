import { GetSessionWithOboProvider, makeSession } from "@navikt/oasis";
import { idporten } from "@navikt/oasis/identity-providers";
import { tokenX, withInMemoryCache } from "@navikt/oasis/obo-providers";
import { withPrometheus } from "@navikt/oasis/obo-providers/withPrometheus";

let getSession: GetSessionWithOboProvider;

if (process.env.AUTH_PROVIDER == "local") {
  const staticToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  getSession = makeSession({
    identityProvider: async () => staticToken,
    oboProvider: async (token: string, audience: string) => token + audience,
  });
} else {
  getSession = makeSession({
    identityProvider: idporten,
    oboProvider: withInMemoryCache(withPrometheus(tokenX)),
  });
}

export { getSession };
