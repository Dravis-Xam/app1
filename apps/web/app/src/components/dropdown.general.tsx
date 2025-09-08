import React, { useState } from "react";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  label: string;
  options: DropdownOption[];
  onSelect: (value: string) => void;
  className?: string;
  disabled?: boolean;
  variant?: "default" | "mini";
}

const BaseDropdown: React.FC<DropdownProps> = ({
  label,
  options,
  onSelect,
  className = "",
  disabled = false,
  variant = "default",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  const rootClass =
    variant === "mini"
      ? `mini-dropdown ${className} ${disabled ? "disabled" : ""}`
      : `dropdown ${className} ${disabled ? "disabled" : ""}`;

  const buttonClass = variant === "mini" ? "mini-dropdown-toggle" : "dropdown-toggle";
  const menuClass = variant === "mini" ? "mini-dropdown-menu" : "dropdown-menu";

  return (
    <div className={rootClass}>
      <button className={buttonClass} onClick={toggleDropdown} disabled={disabled}>
        {label} <span className="caret">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <ul className={menuClass}>
          {options.map((option) => (
            <li key={option.value} onClick={() => handleSelect(option.value)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// 🔹 Standard Dropdown (wrapper)
export const Dropdown: React.FC<Omit<DropdownProps, "variant">> = (props) => (
  <BaseDropdown {...props} variant="default" />
);

// 🔹 Mini Dropdown (wrapper)
export const MiniDropdown: React.FC<Omit<DropdownProps, "variant">> = (props) => (
  <BaseDropdown {...props} variant="mini" />
);

export default Dropdown;
