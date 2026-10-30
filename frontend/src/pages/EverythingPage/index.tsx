import { getAllItems } from "@/services/getAllItems";
import { getOneItem } from "@/services/getOneItem";
import { API_PATH } from "@/constants/apiPath";
import ItemsList from "@/components/organisms/ItemsList";

export default function EverythingPage() {
 
  return (
    <main>
      <h1>Every items</h1>
      {/* <button onClick={() => getAllItems(API_PATH.all, { q: "ab"})}>test</button> */}
      <ItemsList path={API_PATH.all} params={{ page: 4 }} />
    </main>
  );
}
