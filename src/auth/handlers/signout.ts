export default function signout(req, res) {
  req.logOut();
  res.status(204).end();
}
