import { API_PATH } from "@/constants/apiPath";
import ItemsList from "@/components/organisms/ItemsList";

export default function EverythingPage() {
 
  return (
    <main>
      <ItemsList path={API_PATH.all} params={{ page: 1 }} />
    </main>
  );
}
