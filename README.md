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

#### TokenX konfigurasjon

Kan hentes ut av en kjørende pod i dev slik:

```
kubectl exec [POD] -c dp-dagpenger -- env | grep TOKEN_X >> .env.local
```

### Tester feiled på grunn av utdatert snapshots

Kjør kommendo for å generere snapshots på nytt og kjøre testen

```
npm run test -- -u
```

### Troubleshoot Husky

Husky kan slite med å finne `node` hvis man bruker div. git-klienter.
Løsningen er å opprette en `.huskyrc`-fil. Se [husky-docs for detaljer](https://typicode.github.io/husky/#/?id=command-not-found).
