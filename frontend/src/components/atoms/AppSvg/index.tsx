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
const CloseSvg = React.lazy(() => import("@/components/svg/CloseSvg"));
const CalendarSvg = React.lazy(() => import("@/components/svg/CalendarSvg"));
const BirthdaySvg = React.lazy(() => import("@/components/svg/BirthdaySvg"));
const MaleSvg = React.lazy(() => import("@/components/svg/MaleSvg"));
const FemaleSvg = React.lazy(() => import("@/components/svg/FemaleSvg"));
const ClochetteSvg = React.lazy(() => import("@/components/svg/ClochetteSvg"));

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
  close: CloseSvg,
  calendar: CalendarSvg,
  birthday: BirthdaySvg,
  male: MaleSvg,
  female: FemaleSvg,
  clochette: ClochetteSvg,
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
