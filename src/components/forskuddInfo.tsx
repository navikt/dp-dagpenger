import AlertStripe from "nav-frontend-alertstriper";

const urlSøkeOmForskudd = "https://www.nav.no/dagpenger/forskudd";
const urlInfoOmForskudd =
  "https://www.nav.no/no/person/innhold-til-person-forside/nyttig-a-vite/kampanje-korona/forskudd-pa-dagpenger-for-permitterte-og-arbeidsledige";

export const ForskuddDagpengerInfo = () => {
  return (
    <AlertStripe type="info">
      På grunn av økt saksbehandlingstid på søknad om dagpenger, er det mulig å{" "}
      <a href={urlSøkeOmForskudd}> søke om forskudd på dagpenger.</a>
      Forskuddet blir trukket fra fremtidige utbetalinger.{" "}
      <a href={urlInfoOmForskudd}>Se mer informasjon om forskudd.</a>
    </AlertStripe>
  );
};
