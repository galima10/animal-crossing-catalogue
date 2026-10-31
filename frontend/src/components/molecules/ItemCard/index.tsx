import type { ItemResponse } from "@/types/ApiResponseType";
import { toCapitalize } from "@/utils/toCapitalize";
import { useAppDispatch } from "@/hooks/redux";
import { setSelected } from "@/stores/features/itemsSlice";
import { getOneItem } from "@/services/getOneItem";
import { apiSvg } from "@/constants/mapNames";
import { API_PATH } from "@/constants/apiPath";

interface ItemCardProps {
  item: ItemResponse;
  path: string;
}

export default function ItemCard({ item, path }: ItemCardProps) {
  const dispatch = useAppDispatch();
  async function fetchItems() {
    const apiPath = path === "/all" ? API_PATH[apiSvg[item?.table]] : path;
    const response = await getOneItem(apiPath, item?.id);
    dispatch(
      setSelected({
        item: response,
        type: apiSvg[apiPath.replace(/^\//, "")],
      }),
    );
  }
  return (
    <button className="items-card" onClick={fetchItems}>
      <img src={item?.imageUrl} alt="" loading="lazy" />
      <div className="items-card-infos">
        <p>{toCapitalize(item?.name)}</p>
      </div>
    </button>
  );
}
