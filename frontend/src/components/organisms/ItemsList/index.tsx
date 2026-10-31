import { getAllItems } from "@/services/getAllItems";
import { useState, useEffect } from "react";
import type { ApiResponseType, QueryParamsType } from "@/types/ApiResponseType";
import ItemCard from "@/components/molecules/ItemCard";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setItems } from "@/stores/features/itemsSlice";
import { useFetchItems } from "@/hooks/useFetchItems";

interface ItemsListProps {
  path: string;
  params?: QueryParamsType;
}

export default function ItemsList({ path, params }: ItemsListProps) {
  const items = useAppSelector((state) => state.item.items);
  useFetchItems(path, params);

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
