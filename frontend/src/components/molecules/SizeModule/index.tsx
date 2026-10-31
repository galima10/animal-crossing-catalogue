import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setSize } from "@/stores/features/headerSlice";

export default function SizeModule() {
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useAppDispatch();
  const size = useAppSelector((state) => state.header.size);
  return (
    <div className="header-size">
      <p>Select</p>
      <button onClick={() => setShowOptions(!showOptions)}>{size} items</button>
      {showOptions && (
        <ul className="header-size-options">
          <li>
            <button
              onClick={() => {
                setShowOptions(false);
                dispatch(setSize("10"));
              }}
            >
              10 items
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setShowOptions(false);
                dispatch(setSize("20"));
              }}
            >
              20 items
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setShowOptions(false);
                dispatch(setSize("50"));
              }}
            >
              50 items
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setShowOptions(false);
                dispatch(setSize("100"));
              }}
            >
              100 items
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
