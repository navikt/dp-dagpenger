export default function personaliaResolver(req, res, ctx) {
  return res(
    ctx.delay(),
    ctx.json({
      kontonummer: "12345678901",
    })
  );
}
