import { Knapp } from "nav-frontend-knapper";
import Layout from "../components/layout";

export default function Home() {
  return (
    <Layout>
      <h1>Hello</h1>
      <Knapp>ifoo</Knapp>

      <div id="var">FBARBA</div>

      <style jsx>{`
        h1 {
          color: pink;
        }
      `}</style>
    </Layout>
  );
}
