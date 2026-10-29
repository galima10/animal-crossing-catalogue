import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EverythingPage from "./pages/EverythingPage";
import VillagersPage from "./pages/VillagersPage";
import FurnituresPage from "./pages/FurnituresPage";
import InsectsPage from "./pages/InsectsPage";
import FishsPage from "./pages/FishsPage";
import SeaCreaturesPage from "./pages/SeaCreaturesPage";

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

        <Route path={TAB_PATHS.furnitures} element={<FurnituresPage />} />

        <Route path={TAB_PATHS.insects} element={<InsectsPage />} />

        <Route path={TAB_PATHS.fishs} element={<FishsPage />} />

        <Route path={TAB_PATHS.seaCreatures} element={<SeaCreaturesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
