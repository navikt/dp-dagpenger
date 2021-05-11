import { useSession } from "../auth/hooks/session.hook";
import Link from "next/link";

/*export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}*/

export default function Bruker(): JSX.Element {
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

      <Link href={"/"}>
        <a>Tilbake til forsida</a>
      </Link>

      <p>Fnr: {user.fnr}</p>
      <p>Locale: {user.locale}</p>
    </>
  );
}
