import { Knapp } from "nav-frontend-knapper";

export default function Home() {
  return (
    <>
      <h1>Hello</h1>
      <Knapp>ifoo</Knapp>

      <style jsx>{`
        h1 {
          color: pink;
        }
      `}</style>
    </>
  );
}
