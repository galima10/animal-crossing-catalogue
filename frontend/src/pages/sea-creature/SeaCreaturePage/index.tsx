import { useParams } from "react-router-dom";

export default function SeaCreaturePage() {
  const { id } = useParams<{ id: string }>();
  return <main>
    <h1>One Sea creature: {id}</h1>
  </main>;
}
