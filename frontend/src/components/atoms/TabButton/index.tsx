import AppSVG, { type IconNames } from "../AppSvg";
import { useNavigate, useLocation } from "react-router-dom";
import { toCapitalize } from "@/utils/toCapitalize";
import { tabButtonLabels } from "@/constants/mapNames";

interface TabButtonProps {
  name: IconNames;
  path: string;
}

export default function TabButton({ name, path }: TabButtonProps) {
  const navigate = useNavigate();
  let location = useLocation();
  return (
    <button
      id={"tab-btn" + name}
      onClick={() => {
        navigate(path);
      }}
      className={`header-tab-button ${location.pathname === path ? "active" : null}`}
    >
      <label className="header-tab-button-label" htmlFor={"tab-btn" + name}>
        {toCapitalize(tabButtonLabels[name])}
      </label>
      <AppSVG name={name} />
    </button>
  );
}
