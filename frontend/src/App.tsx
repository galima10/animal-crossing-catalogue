import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EverythingPage from "./pages/EverythingPage";
import VillagersPage from "./pages/villager/VillagersPage";
import FurnituresPage from "./pages/furniture/FurnituresPage";
import InsectsPage from "./pages/insect/InsectsPage";
import FishsPage from "./pages/fish/FishsPage";
import SeaCreaturesPage from "./pages/sea-creature/SeaCreaturesPage";
import VillagerPage from "./pages/villager/VillagerPage";
import FurniturePage from "./pages/furniture/FurniturePage";
import InsectPage from "./pages/insect/InsectPage";
import FishPage from "./pages/fish/FishPage";
import SeaCreaturePage from "./pages/sea-creature/SeaCreaturePage";

import Header from "./components/molecules/Header";

import { TAB_PATHS } from "./constants/navigationPath";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={TAB_PATHS.home} element={<HomePage />} />
        <Route path={TAB_PATHS.all} element={<EverythingPage />} />

        <Route path={TAB_PATHS.villagers} element={<VillagersPage />} />
        <Route path={`${TAB_PATHS.villagers}/:id`} element={<VillagerPage />} />

        <Route path={TAB_PATHS.furnitures} element={<FurnituresPage />} />
        <Route
          path={`${TAB_PATHS.furnitures}/:id`}
          element={<FurniturePage />}
        />

        <Route path={TAB_PATHS.insects} element={<InsectsPage />} />
        <Route path={`${TAB_PATHS.insects}/:id`} element={<InsectPage />} />

        <Route path={TAB_PATHS.fishs} element={<FishsPage />} />
        <Route path={`${TAB_PATHS.fishs}/:id`} element={<FishPage />} />

        <Route path={TAB_PATHS.seaCreatures} element={<SeaCreaturesPage />} />
        <Route
          path={`${TAB_PATHS.seaCreatures}/:id`}
          element={<SeaCreaturePage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
