import React = require("react");

interface DropdownProps {
    label: string;
    options: { value: string; label: string }[];
    onSelect: (value: string) => void;
    className?: string;
    disabled?: boolean;
    variant?: "default" | "mini";
}

class BaseDropdown extends React.Component<DropdownProps, { isOpen: boolean }> {
    constructor(props: DropdownProps) {
        super(props);
        this.state = { isOpen: false };
    }
    toggleDropdown = () => {
        if (!this.props.disabled) {
            this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
        }
    };
    handleSelect = (value: string) => {
        this.props.onSelect(value);
        this.setState({ isOpen: false });
    }
    render() {
        const {
            label,
            options,
            className = "",
            disabled = false,
            variant = "default"
        } = this.props;
        const { isOpen } = this.state;
        const rootClass =
            variant === "mini"
                ? `mini-dropdown ${className} ${disabled ? "disabled" : ""}`
                : `dropdown ${className} ${disabled ? "disabled" : ""}`;
        const buttonClass =
            variant === "mini" ? "mini-dropdown-toggle" : "dropdown-toggle";
        const menuClass =
            variant === "mini" ? "mini-dropdown-menu" : "dropdown-menu";
        return (
            <div className={rootClass}>
                <button className={buttonClass} onClick={this.toggleDropdown} disabled={disabled}>
                    {label} <span className="caret">{isOpen ? "▲" : "▼"}</span>
                </button>
                {isOpen && (
                    <ul className={menuClass}>
                        {options.map((option) => (
                            <li key={option.value} onClick={() => this.handleSelect(option.value)}>
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
}

export class Dropdown extends React.Component<DropdownProps> {
    render() {
        return <BaseDropdown {...this.props} variant="default" />;
    }
}

export class MiniDropdown extends React.Component<DropdownProps> {
    render() {
        return <BaseDropdown {...this.props} variant="mini" />;
    }
}

export default Dropdown;