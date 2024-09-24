import { FC, ReactNode } from "react";

type Condition = boolean | (() => boolean);

interface Props {
    condition?: Condition;
    children: ReactNode;
}

const Hide: FC<Props> = ({ condition = true, children }) => {
    const shouldHide =
        typeof condition === "function" ? condition() : condition;
    return shouldHide ? null : children;
};

export default Hide;
