import React, { FC, ReactElement } from "react";
import { twMerge } from "tailwind-merge";

interface IconProps {
    element: ReactElement;
    className?: string;
}

const RenderElement: FC<IconProps> = ({ element, className }) => {
    const { type, props } = element;

    const modifiedProps = {
        ...props,
        className: twMerge(props.className, className),
    };
    return React.createElement(type, modifiedProps);
};
export default RenderElement;
