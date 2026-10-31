import type { ItemResponse } from "@/types/ApiResponseType";
import { toCapitalize } from "@/utils/toCapitalize";

interface ItemCardProps {
  item: ItemResponse;
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <button className="items-card">
      <img src={item?.imageUrl} alt="" loading="lazy" />
      <div className="items-card-infos">
        <p>{toCapitalize(item.name)}</p>
      </div>
    </button>
  );
}
