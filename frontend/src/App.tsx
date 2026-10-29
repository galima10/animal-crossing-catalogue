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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/all-items" element={<EverythingPage />} />

        <Route path="/villagers" element={<VillagersPage />} />
        <Route path="/villagers/:id" element={<VillagerPage />} />

        <Route path="/furnitures" element={<FurnituresPage />} />
        <Route path="/furnitures/:id" element={<FurniturePage />} />

        <Route path="/insects" element={<InsectsPage />} />
        <Route path="/insects/:id" element={<InsectPage />} />

        <Route path="/fishs" element={<FishsPage />} />
        <Route path="/fishs/:id" element={<FishPage />} />

        <Route path="/sea-creatures" element={<SeaCreaturesPage />} />
        <Route path="/sea-creatures/:id" element={<SeaCreaturePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
