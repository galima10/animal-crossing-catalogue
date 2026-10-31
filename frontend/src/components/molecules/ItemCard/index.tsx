import type { ItemResponse } from "@/types/ApiResponseType";
import { toCapitalize } from "@/utils/toCapitalize";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setSelected } from "@/stores/features/itemsSlice";
import { getOneItem } from "@/services/getOneItem";
import { apiSvg } from "@/constants/mapNames";

interface ItemCardProps {
  item: ItemResponse;
  path: string;
}

export default function ItemCard({ item, path }: ItemCardProps) {
  const dispatch = useAppDispatch();
  async function fetchItems() {
    const response = await getOneItem(path, item?.id);
    dispatch(
      setSelected({ item: response, type: apiSvg[path.replace(/^\//, "")] }),
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
