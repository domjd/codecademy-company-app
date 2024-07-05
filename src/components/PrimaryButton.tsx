import React from "react";

type TPrimaryButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

function PrimaryButton({ children, onClick }: TPrimaryButtonProps) {
  return (
    <button className="primary_button" onClick={onClick}>
      {children}
    </button>
  );
}

export default PrimaryButton;
