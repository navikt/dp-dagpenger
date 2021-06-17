const behandlingsstatusResolver = (req, res, ctx) => {
  return res(
    ctx.json({
      status: "UnderOgFerdigBehandlet",
      antallSøknader: 3,
      antallVedtak: 1,
    })
  );
};

export default behandlingsstatusResolver;
