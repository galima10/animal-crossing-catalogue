import { useParams } from "react-router-dom";

export default function InsectPage() {
  const { id } = useParams<{ id: string }>();
  return <main>
    <h1>One Insect: {id}</h1>
  </main>;
}
