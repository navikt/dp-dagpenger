const behandlingsstatusResolver = (req, res, ctx) => {
  return res(
    ctx.json({
      status: "FerdigBehandlet",
      antallSøknader: 3,
      antallVedtak: 2,
    })
  );
};

export default behandlingsstatusResolver;
