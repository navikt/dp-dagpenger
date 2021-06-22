const behandlingsstatusResolver = (req, res, ctx) => {
  return res(
    ctx.json({
      status: "UnderOgFerdigBehandlet",
      antallSøknader: 3,
      antallVedtak: 2,
    })
  );
};

export default behandlingsstatusResolver;
