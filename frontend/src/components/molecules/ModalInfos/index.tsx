import type { OneItemResponse } from "@/types/ApiResponseType";
import AppSVG from "@/components/atoms/AppSvg";
import { toCapitalize } from "@/utils/toCapitalize";
import { weatherUi } from "@/constants/mapNames";
import { type Dispatch, type SetStateAction } from "react";

interface ModalInfosProps {
  selected: {
    item: OneItemResponse;
    type: "villager" | "furniture" | "insect" | "fish" | "seaCreature";
  };
  selectedVariation: {
    image: string;
    name: string;
  } | null;
  setSelectdVariation: Dispatch<
    SetStateAction<{
      image: string;
      name: string;
    } | null>
  >;
  setTab: Dispatch<SetStateAction<"infos" | "avalaibilities">>;
}

export default function ModalInfos({
  selected,
  selectedVariation,
  setTab,
  setSelectdVariation,
}: ModalInfosProps) {
  return (
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
                          selectedVariation?.name === variation.variationName
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
              {toCapitalize(weatherUi[selected?.item?.weather.toLowerCase()])}
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
          <button
            onClick={() => setTab("avalaibilities")}
            className="modal-animal-avalaibilities-btn"
          >
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
  );
}
