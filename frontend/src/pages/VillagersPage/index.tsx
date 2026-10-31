import { API_PATH } from "@/constants/apiPath";
import ItemsList from "@/components/organisms/ItemsList";

export default function VillagersPage() {
  return (
    <main>
      <ItemsList path={API_PATH.villager} />
    </main>
  );
}
