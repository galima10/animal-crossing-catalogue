import { useParams } from "react-router-dom";

export default function FurniturePage() {
  const { id } = useParams<{ id: string }>();
  return <main>
    <h1>One FUrniture: {id}</h1>
  </main>;
}
