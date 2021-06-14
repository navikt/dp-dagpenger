const behandlingsstatusResolver = (req, res, ctx) => {
  return res(
    ctx.json({
      status: null,
      antallSøknader: 0,
      antallVedtak: 0,
    })
  );
};

export default behandlingsstatusResolver;
