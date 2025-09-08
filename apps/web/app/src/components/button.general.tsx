import * as React from "react";

interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  classes?: string;
  children?: React.ReactNode;
}

const BaseButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ children, classes = "", ...props }, ref) => (
    <button ref={ref} className={`btn ${classes}`} {...props}>
      {children}
    </button>
  )
);
BaseButton.displayName = "BaseButton";

// 🔹 Standard Button
const Button: React.FC<BaseButtonProps> = ({ children, classes = "", ...props }) => (
  <BaseButton classes={classes} {...props}>
    {children}
  </BaseButton>
);

// 🔹 Link Button
interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  classes?: string;
  children?: React.ReactNode;
}
const ButtonLink: React.FC<ButtonLinkProps> = ({ children, classes = "", ...props }) => (
  <a className={`btn ${classes}`} {...props}>
    {children}
  </a>
);

// 🔹 Icon Button
interface ButtonIconProps extends Omit<BaseButtonProps, "children"> {
  icon: React.ReactNode;
}
const ButtonIcon: React.FC<ButtonIconProps> = ({ icon, classes = "", ...props }) => (
  <BaseButton classes={`btn-icon ${classes}`} {...props}>
    {icon}
  </BaseButton>
);

// 🔹 Toggle Button
interface ButtonToggleProps extends BaseButtonProps {
  isActive: boolean;
}
const ButtonToggle: React.FC<ButtonToggleProps> = ({ isActive, children, classes = "", ...props }) => (
  <BaseButton
    classes={`btn-toggle ${isActive ? "active" : ""} ${classes}`}
    {...props}
  >
    {children}
  </BaseButton>
);

// 🔹 Submit Button
const ButtonSubmit: React.FC<BaseButtonProps> = ({ children, classes = "", ...props }) => (
  <BaseButton type="submit" classes={`btn-submit ${classes}`} {...props}>
    {children}
  </BaseButton>
);

// 🔹 Reset Button
const ButtonReset: React.FC<BaseButtonProps> = ({ children, classes = "", ...props }) => (
  <BaseButton type="reset" classes={`btn-reset ${classes}`} {...props}>
    {children}
  </BaseButton>
);

// 🔹 Close Button
const ButtonClose: React.FC<BaseButtonProps> = ({ children, classes = "", ...props }) => (
  <BaseButton classes={`btn-close ${classes}`} {...props}>
    {children || "×"}
  </BaseButton>
);

// 🔹 Button Group
type ButtonGroupProps = {
  classes?: string;
  children?: React.ReactNode;
  buttons?: { label: string; link: string }[];
};
const ButtonGroup: React.FC<ButtonGroupProps> = ({ classes = "", children, buttons }) => (
  <div className={`btn-group ${classes}`}>
    {buttons?.map((button, idx) => (
      <ButtonLink key={idx} href={button.link}>
        {button.label}
      </ButtonLink>
    ))}
    {children}
  </div>
);

export {
  Button,
  ButtonLink,
  ButtonIcon,
  ButtonGroup,
  ButtonToggle,
  ButtonSubmit,
  ButtonReset,
  ButtonClose,
};
