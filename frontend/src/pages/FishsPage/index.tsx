import { API_PATH } from "@/constants/apiPath";
import ItemsList from "@/components/organisms/ItemsList";
import NavArrowButtons from "@/components/molecules/NavArrowButtons";

export default function FishsPage() {
  return (
    <main>
      <ItemsList path={API_PATH.fish} />
      <NavArrowButtons />
    </main>
  );
}
