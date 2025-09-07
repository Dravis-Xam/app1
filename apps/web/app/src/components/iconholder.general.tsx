import React = require("react");

interface IconProps {
    name: string;
    size?: number;
    color?: string;
    obj: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

class IconHolder extends React.Component<IconProps, {}> {
    render() {
        const { name, size = 24, color = "currentColor", obj, className = "", onClick } = this.props;
        return (
            <span
                className={`icon-holder ${className}`}
                title={name}
                style={{ width: size, height: size, color }}
                onClick={onClick}
            >
                {obj}
            </span>
        );
    }
}

export default IconHolder ;