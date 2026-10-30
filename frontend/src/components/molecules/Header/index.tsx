import TabButton from "@/components/atoms/TabButton";
import { TAB_PATHS } from "@/constants/navigationPath";
import AppSVG from "@/components/atoms/AppSvg";

export default function Header() {
  return (
    <header>
      <div className="header-action-btn">
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
        <div className="header-search-filter-container">
          <button className="header-filter-btn">Filter</button>
          <div className="header-search-bar">
            <input type="text" placeholder="" />
            <div />
            <AppSVG name="search" />
          </div>
        </div>
      </div>
      <div className="header-sort-filter">
        <div className="header-sorter">
          <p>Sorter by</p>
          <ul>
            <li>
              <button className="active">Name ▲</button>
            </li>
            <li>
              <button>Name</button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
