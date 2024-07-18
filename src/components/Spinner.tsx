import React from "react";

type TSpinnerProps = {
  width: number;
  height: number;
};

function Spinner({ width, height }: TSpinnerProps) {
  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      id="loading"
    ></div>
  );
}

export default Spinner;
