import { getSession, useSession } from "../auth/hooks/session.hook";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

export default function Bruker({ session }) {
  const [user] = useSession(session);

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
