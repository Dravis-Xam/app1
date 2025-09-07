import * as React from "react";

interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    classes?: string;
}

class Button extends React.Component<ButtonProps, {}> {
    render() {
        return <button className={`btn ${this.props.classes}`} onClick={this.props.onClick}>{this.props.children}</button>;
    }
}

class ButtonLink extends React.Component<ButtonProps & { href: string }, {}> {
    render() {
        return <a className={`btn ${this.props.classes}`} href={this.props.href}>{this.props.children}</a>;
    }
}

class ButtonIcon extends React.Component<ButtonProps & { icon: React.ReactNode }, {}> {
    render() {
        return <button className={`btn-icon ${this.props.classes}`} onClick={this.props.onClick}>{this.props.icon}</button>;
    }
}

class ButtonGroup extends React.Component<{ children: React.ReactNode, classes?: string }, {}> {
    render() {
        return <div className={`btn-group ${this.props.classes}`}>{this.props.children}</div>;
    }
}

class ButtonToggle extends React.Component<{ isActive: boolean, onClick: () => void, children?: React.ReactNode, classes?: string }, {}> {
    render() {
        return <button className={`btn-toggle ${this.props.isActive ? 'active' : ''} ${this.props.classes}`} onClick={this.props.onClick}>{this.props.children}</button>;
    }
}

class ButtonSubmit extends React.Component<ButtonProps, {}> {
    render() {
        return <button type="submit" className={`btn-submit ${this.props.classes}`} onClick={this.props.onClick}>{this.props.children}</button>;
    }
}

class ButtonReset extends React.Component<ButtonProps, {}> {
    render() {
        return <button type="reset" className={`btn-reset ${this.props.classes}`} onClick={this.props.onClick}>{this.props.children}</button>;
    }
}

class ButtonClose extends React.Component<ButtonProps, {}> {
    render() {
        return <button className={`btn-close ${this.props.classes}`} onClick={this.props.onClick}>{this.props.children || '×'}</button>;
    }
}

export {Button, ButtonLink, ButtonIcon, ButtonGroup, ButtonToggle, ButtonSubmit, ButtonReset, ButtonClose};