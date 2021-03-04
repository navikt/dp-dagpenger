import { withUser } from "../../../middlewares";

export default withUser().get((req, res) => {
  req.logOut();
  res.status(204).end();
});
