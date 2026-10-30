import type { ItemResponse } from "@/types/ApiResponseType";

interface ItemCardProps {
  item: ItemResponse;
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <button className="items-card">
      <img src={item?.imageUrl} alt="" />
    </button>
  );
}
