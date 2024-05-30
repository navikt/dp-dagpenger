import Script from "next/script";

export function UxSignalsWidget() {
  // if (process.env.UXSIGNALS_ENABLED !== "true") return null;

  return (
    <>
      <Script
        type="module"
        strategy="lazyOnload"
        src="https://uxsignals-frontend.uxsignals.app.iterate.no/embed.js"
      />
      <div
        data-uxsignals-embed="panel-2pm41rubk2"
        // data-uxsignals-mode={process.env.UXSIGNALS_MODE === "demo" ? "demo" : ""}
        data-uxsignals-mode="demo"
        style={{ maxWidth: 620 }}
      />
    </>
  );
}
