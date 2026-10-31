import ItemCard from "@/components/molecules/ItemCard";
import { useAppSelector } from "@/hooks/redux";
import { useFetchItems } from "@/hooks/useFetchItems";

interface ItemsListProps {
  path: string;
}

export default function ItemsList({ path }: ItemsListProps) {
  const items = useAppSelector((state) => state.item.items);
  useFetchItems(path);

  return (
    <ul className="items-list">
      {items?.data?.map((item, index) => (
        <li key={index}>
          <ItemCard item={item} />
        </li>
      ))}
    </ul>
  );
}
