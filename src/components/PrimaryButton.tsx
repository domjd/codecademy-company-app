import React from "react";

type TPrimaryButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  isDisabled?: boolean;
};

function PrimaryButton({
  children,
  onClick,
  isDisabled = false,
}: TPrimaryButtonProps) {
  return (
    <button
      className={`primary_button ${isDisabled ? "button_disabled" : ""}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
