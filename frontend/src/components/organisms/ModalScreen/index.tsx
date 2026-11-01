import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { clearSelected } from "@/stores/features/itemsSlice";
import AppSVG from "@/components/atoms/AppSvg";
import { toCapitalize } from "@/utils/toCapitalize";
import { useState } from "react";
import ModalInfos from "@/components/molecules/ModalInfos";
import { monthsArray } from "@/constants/mapNames";
import { monthsCompleted } from "@/constants/mapNames";

export default function ModalScreen() {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.item.selected);
  const [selectedVariation, setSelectdVariation] = useState<{
    image: string;
    name: string;
  } | null>(null);
  const [tab, setTab] = useState<"infos" | "avalaibilities">("infos");
  const [selectedMonth, setSelectedMonth] = useState<{
    hemisphere: "north" | "south";
    month: string;
    ranges: { startHour: string; endHour: string }[];
    isAllDay: boolean;
  }>(null);

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
            {selected?.type && <AppSVG name={selected?.type} />}
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
        ) : (
          <div className="modal-avalaibilities">
            <ul>
              {monthsArray.map((month, index) => (
                <li key={index}>
                  <p className="modal-month">
                    {toCapitalize(month)}
                    {"."}
                  </p>
                  <div className="hemisphere-buttons">
                    <button
                      className={
                        selected?.item.monthRangesApparition?.north.find(
                          (currentMonth) =>
                            currentMonth.month === month.toUpperCase(),
                        ).ranges.length === 0 &&
                        !selected?.item.monthRangesApparition?.north.find(
                          (currentMonth) =>
                            currentMonth.month === month.toUpperCase(),
                        ).isAllDay
                          ? "disabled"
                          : null
                      }
                      onClick={() =>
                        setSelectedMonth({
                          hemisphere: "north",
                          month: month,
                          ranges:
                            selected?.item.monthRangesApparition?.north.find(
                              (currentMonth) =>
                                currentMonth.month === month.toUpperCase(),
                            ).ranges,
                          isAllDay:
                            selected?.item.monthRangesApparition?.north.find(
                              (currentMonth) =>
                                currentMonth.month === month.toUpperCase(),
                            ).isAllDay,
                        })
                      }
                    >
                      NH
                    </button>
                    <div />
                    <button
                      className={
                        selected?.item.monthRangesApparition?.south.find(
                          (currentMonth) =>
                            currentMonth.month === month.toUpperCase(),
                        ).ranges.length === 0 &&
                        !selected?.item.monthRangesApparition?.south.find(
                          (currentMonth) =>
                            currentMonth.month === month.toUpperCase(),
                        ).isAllDay
                          ? "disabled"
                          : null
                      }
                      onClick={() =>
                        setSelectedMonth({
                          hemisphere: "south",
                          month: month,
                          ranges:
                            selected?.item.monthRangesApparition?.south.find(
                              (currentMonth) =>
                                currentMonth.month === month.toUpperCase(),
                            ).ranges,
                          isAllDay:
                            selected?.item.monthRangesApparition?.south.find(
                              (currentMonth) =>
                                currentMonth.month === month.toUpperCase(),
                            ).isAllDay,
                        })
                      }
                    >
                      SH
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {selectedMonth && (
        <div className="modal-ranges">
          <div className="modal-ranges-content">
            <button
              className="modal-ranges-close-btn"
              onClick={() => {
                setSelectedMonth(null);
              }}
            >
              <AppSVG name="close" />
            </button>
            <p className="modal-ranges-title">
              Hour ranges for{" "}
              <br />
              {selectedMonth.hemisphere == "north" ? "NH" : "SH"}{" "}
              {toCapitalize(monthsCompleted[selectedMonth.month])}
            </p>
            {selectedMonth &&
              (selectedMonth.isAllDay ? (
                <p>All day</p>
              ) : selectedMonth.ranges.length > 0 ? (
                <ul>
                  {selectedMonth.ranges.map((range, index) => (
                    <li key={index}>
                      <p>
                        {range.startHour} – {range.endHour}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : null)}
          </div>
        </div>
      )}
    </div>
  );
}
