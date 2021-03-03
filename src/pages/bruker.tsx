import { useUser } from "../hooks/user";

export default function Bruker() {
  const [user] = useUser();

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
