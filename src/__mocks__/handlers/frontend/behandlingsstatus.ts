const behandlingsstatusResolver = (req, res, ctx) => {
  return res(
    ctx.json({
      status: "FerdigBehandlet",
      antallSøknader: 0,
      antallVedtak: 2,
    })
  );
};

export default behandlingsstatusResolver;
