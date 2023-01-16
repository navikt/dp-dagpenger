export default function kontoResolver(req, res, ctx) {
  return res(
    ctx.delay(),
    ctx.json({
      kontonummer: "12345678901",
    })
  );
}
