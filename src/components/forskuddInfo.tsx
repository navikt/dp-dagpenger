import AlertStripe from "nav-frontend-alertstriper";

export const ForskuddDagpengerInfo = () => {

    const tekst = "På grunn av økt saksbehandlingstid på søknad om dagpenger, er det mulig å søke om forskudd på dagpenger. Forskuddet blir trukket fra fremtidige utbetalinger. Se mer informasjon om forskudd.";

    return (
        <AlertStripe type="info">
            {tekst}
        </AlertStripe>
    )
}