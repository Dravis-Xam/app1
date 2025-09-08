import React from "react";

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  obj: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const IconHolder: React.FC<IconProps> = ({
  name,
  size = 24,
  color = "currentColor",
  obj,
  className = "",
  onClick,
}) => {
  return (
    <span
      className={`icon-holder ${className}`}
      title={name}
      style={{ display: "inline-flex", width: size, height: size, color }}
      onClick={onClick}
    >
      {obj}
    </span>
  );
};

export default IconHolder;
