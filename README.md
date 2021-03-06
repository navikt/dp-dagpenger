# dp-dagpenger

Frontend som fungerer som startside og innsyn for Dagpenger.

## Komme i gang

### For å utvikle lokalt

```
npm install
npm run dev
```

For å sørge for at du har riktig versjon av node/npm kan du bruke `nvm`:

```
brew install nvm
nvm use
```

#### Start redis

```
docker-compose up -d # For å starte redis
```

### For å sette opp IDporten

Kopier `.env.local-dist` til `.env.local` og fyll inn verdiene.

#### ID-porten klient som fungerer på localhost

Hent (konfigurasjon for en testapp)[https://vault.adeo.no/ui/vault/secrets/secret/show/.common/idporten/ver2] som
tillater localhost:3000 som redirect URL.

#### TokenX konfigurasjon

Kan hentes ut av en kjørende pod i dev slik:

```
kubectl exec [POD] -c dp-dagpenger -- env | grep TOKEN_X >> .env.local
```

### Troubleshoot Husky

Husky kan slite med å finne `node` hvis man bruker div. git-klienter.
Løsningen er å opprette en `.huskyrc`-fil. Se [husky-docs for detaljer](https://typicode.github.io/husky/#/?id=command-not-found).
