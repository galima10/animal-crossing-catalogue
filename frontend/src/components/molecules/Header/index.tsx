import TabButton from "@/components/atoms/TabButton";
import { TAB_PATHS } from "@/constants/navigationPath";
import { useLocation } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <ul>
        <li>
          <TabButton name="all" path={TAB_PATHS.all} />
        </li>
        <li>
          <TabButton name="villager" path={TAB_PATHS.villagers} />
        </li>
        <li>
          <TabButton name="furniture" path={TAB_PATHS.furnitures} />
        </li>
        <li>
          <TabButton name="insect" path={TAB_PATHS.insects} />
        </li>
        <li>
          <TabButton name="fish" path={TAB_PATHS.fishs} />
        </li>
        <li>
          <TabButton name="seaCreature" path={TAB_PATHS.seaCreatures} />
        </li>
      </ul>
    </header>
  );
}
