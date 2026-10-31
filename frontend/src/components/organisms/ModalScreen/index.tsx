import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { clearSelected } from "@/stores/features/itemsSlice";
import AppSVG from "@/components/atoms/AppSvg";
import { toCapitalize } from "@/utils/toCapitalize";
import { useState } from "react";
import { weatherUi } from "@/constants/mapNames";

export default function ModalScreen() {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.item.selected);
  const [selectedVariation, setSelectdVariation] = useState<{
    image: string;
    name: string;
  } | null>(null);
  return (
    <div className={`modal-screen ${selected ? "active" : null}`}>
      <div className="modal-card">
        <button
          className="modal-close-btn"
          onClick={() => {
            dispatch(clearSelected());
            setSelectdVariation(null);
          }}
        >
          <AppSVG name="close" />
        </button>
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
        <div className="modal-infos">
          {selected?.type === "villager" ? (
            <div className="modal-item-content modal-villager-infos">
              <div className="modal-villager-birthday">
                <AppSVG name="birthday" />
                {selected?.item?.birthday}
              </div>
              <p className="modal-villager-species">
                Species : {selected?.item?.speciesName}
              </p>
              <p className="modal-villager-personality">
                Personality : {selected?.item?.personalityName}
              </p>
            </div>
          ) : selected?.type === "furniture" ? (
            <div className="modal-item-content modal-furniture-infos">
              <p className="modal-furniture-category">
                {toCapitalize(selected?.item?.category)}
              </p>
              <div className="modal-furniture-prices">
                <div>
                  <p>Sell : {selected?.item?.sellingPrice} </p>
                  <AppSVG name="clochette" />
                </div>
                <div>
                  <p>Buy : {selected?.item?.buyingPrice} </p>
                  <AppSVG name="clochette" />
                </div>
              </div>
              {selected?.item?.variations &&
                selected?.item?.variations?.length > 0 && (
                  <div className="modal-furniture-variations">
                    <p>Variations</p>
                    <ul>
                      <li>
                        <button
                          className={!selectedVariation ? "active" : null}
                          onClick={() => setSelectdVariation(null)}
                        >
                          None
                        </button>
                      </li>
                      {selected?.item?.variations?.map((variation, index) => (
                        <li key={index}>
                          <button
                            onClick={() =>
                              setSelectdVariation({
                                image: variation.variationImageUrl,
                                name: variation.variationName,
                              })
                            }
                            className={
                              selectedVariation?.name ===
                              variation.variationName
                                ? "active"
                                : null
                            }
                          >
                            {variation.variationName}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          ) : (
            <div className="modal-item-content modal-animal-infos">
              <div className="modal-animal-price">
                <p>Sell : {selected?.item?.sellingPrice} </p>
                <AppSVG name="clochette" />
              </div>
              {selected?.item?.weather && (
                <p className="modal-animal-weather">
                  Weather :{" "}
                  {toCapitalize(
                    weatherUi[selected?.item?.weather.toLowerCase()],
                  )}
                </p>
              )}
              {(selected?.item?.insectLocationName ||
                selected?.item?.seaPlaceName) && (
                <p className="modal-animal-location">
                  Location :{" "}
                  {selected?.item?.insectLocationName &&
                    toCapitalize(selected?.item?.insectLocationName)}
                  {selected?.item?.seaPlaceName &&
                    toCapitalize(selected?.item?.seaPlaceName)}
                </p>
              )}
              <button className="modal-animal-avalaibilities-btn">
                See avalaibilities
                <AppSVG name="calendar" />
              </button>
            </div>
          )}
          <div className="modal-img">
            <img
              src={
                selected?.type === "furniture"
                  ? selectedVariation
                    ? selectedVariation.image
                    : selected?.item?.imageUrl
                  : selected?.item?.imageUrl
              }
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
