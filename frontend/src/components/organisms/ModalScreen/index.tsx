import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { clearSelected } from "@/stores/features/itemsSlice";
import AppSVG from "@/components/atoms/AppSvg";
import { toCapitalize } from "@/utils/toCapitalize";
import { useState } from "react";
import ModalInfos from "@/components/molecules/ModalInfos";

export default function ModalScreen() {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.item.selected);
  const [selectedVariation, setSelectdVariation] = useState<{
    image: string;
    name: string;
  } | null>(null);
  const [tab, setTab] = useState<"infos" | "avalaibilities">("infos");
  return (
    <div className={`modal-screen ${selected ? "active" : null}`}>
      <div className="modal-card">
        <div className="modal-actions">
          {tab === "avalaibilities" && (
            <button
              className="modal-goback-btn"
              onClick={() => {
                setTab("infos");
              }}
            >
              Back to infos
            </button>
          )}
          <button
            className="modal-close-btn"
            onClick={() => {
              dispatch(clearSelected());
              setSelectdVariation(null);
              setTab("infos");
            }}
          >
            <AppSVG name="close" />
          </button>
        </div>
        <div className="modal-title">
          <div className="modal-type">
            <AppSVG name={selected?.type} />
          </div>
          {selected?.item?.gender && (
            <div className="modal-villager-gender-icon">
              {selected?.item?.gender === "MALE" ? (
                <AppSVG name="male" />
              ) : selected?.item?.gender === "FEMALE" ? (
                <AppSVG name="female" />
              ) : null}
            </div>
          )}
          <p>{toCapitalize(selected?.item?.name)}</p>
        </div>
        {tab === "infos" ? (
          <ModalInfos
            selected={selected}
            selectedVariation={selectedVariation}
            setSelectdVariation={setSelectdVariation}
            setTab={setTab}
          />
        ) : null}
      </div>
    </div>
  );
}
