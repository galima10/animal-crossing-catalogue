import { useParams } from "react-router-dom";

export default function FishPage() {
  const { id } = useParams<{ id: string }>();
  return <main>
    <h1>One Fish: {id}</h1>
  </main>;
}
