import React, { Suspense } from "react";

const AllSvg = React.lazy(() => import("@/components/svg/AllSvg"));
const VillagerSvg = React.lazy(() => import("@/components/svg/VillagerSvg"));
const FurnitureSvg = React.lazy(() => import("@/components/svg/FurnitureSvg"));
const InsectSvg = React.lazy(() => import("@/components/svg/InsectSvg"));
const FishSvg = React.lazy(() => import("@/components/svg/FishSvg"));
const SeaCreatureSvg = React.lazy(
  () => import("@/components/svg/SeaCreatureSvg"),
);
const SearchSvg = React.lazy(() => import("@/components/svg/SearchSvg"));
const FilterSvg = React.lazy(() => import("@/components/svg/FilterSvg"));
const SortSvg = React.lazy(() => import("@/components/svg/SortSvg"));

export type IconNames = keyof typeof icons;
interface AppSVGProps {
  name: IconNames;
}

const icons = {
  all: AllSvg,
  villager: VillagerSvg,
  furniture: FurnitureSvg,
  insect: InsectSvg,
  fish: FishSvg,
  seaCreature: SeaCreatureSvg,
  search: SearchSvg,
  filter: FilterSvg,
  sort: SortSvg,
};

export default function AppSVG({ name }: AppSVGProps) {
  const Comp = icons[name];

  if (!Comp) {
    console.error(`Icon "${name}" not found in AppSVG.`);
    return null;
  }

  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <Comp />
    </Suspense>
  );
}
