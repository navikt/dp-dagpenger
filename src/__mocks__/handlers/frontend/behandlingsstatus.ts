const behandlingsstatusResolver = (req, res, ctx) => {
  return res(
    ctx.json({
      status: "FerdigBehandlet",
      antallSøknader: 1,
      antallVedtak: 2,
    })
  );
};

export default behandlingsstatusResolver;
