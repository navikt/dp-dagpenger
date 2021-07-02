import Link from "next/link";
import { useSession } from "../auth/react/session.hook";
import { Kontonummer } from "../components/Kontonummer";

/*export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}*/

export default function Bruker(): JSX.Element {
  const { session } = useSession();

  if (!session)
    return (
      <p>
        <a href={"/api/auth/signin"}>Logg inn</a> først da
      </p>
    );

  return (
    <>
      <h1>Bruker</h1>

      <Link href={"/"}>
        <a>Tilbake til forsida</a>
      </Link>

      <Kontonummer />

      <p>Fnr: {session.user.fnr}</p>
      <p>Locale: {session.user.locale}</p>
    </>
  );
}
