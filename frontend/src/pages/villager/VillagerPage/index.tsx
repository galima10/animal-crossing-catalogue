import { useParams } from "react-router-dom";

export default function VillagerPage() {
  const { id } = useParams<{ id: string }>();
  return <main>
    <h1>One Villager: {id}</h1>
  </main>;
}
