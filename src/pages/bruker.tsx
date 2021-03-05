import { getSession, useSession } from "../auth/hooks/session";

/*export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      user: session.user,
    },
  };
}*/

export default function Bruker(props) {
  const [user] = useSession();

  if (!user)
    return (
      <p>
        <a href={"/api/auth/signin"}>Logg inn</a> først da
      </p>
    );

  return (
    <>
      <h1>Bruker</h1>

      <p>Fnr: {user.fnr}</p>
      <p>Locale: {user.locale}</p>
    </>
  );
}
