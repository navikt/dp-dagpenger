# dp-dagpenger

Frontend som fungerer som startside og innsyn for Dagpenger.

## Komme i gang

### For å utvikle lokalt

```
npm install
npm run dev
```

### For å sette opp IDporten

Hent (konfigurasjon for en testapp)[https://vault.adeo.no/ui/vault/secrets/secret/show/.common/idporten/ver2] som
tillater localhost:3000 som redirect URL.

Kopier `.env.local-dist` til `.env.local` og fyll inn verdiene.

```
docker-compose up -d # For å starte redis
```
