import React from "react";
interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    style?: React.CSSProperties;
}
export declare function Button({ children, onClick, style }: ButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
