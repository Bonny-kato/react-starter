import { ButtonHTMLAttributes, forwardRef, Fragment } from "react";
import { Link, LinkProps } from "react-router-dom";
import { LoadingCircle } from "~/components/icons";
import { cn } from "~/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    outline?: boolean;
    loading?: boolean;
    loadingText?: string;
}

const getButtonClasses = ({
    loading,
    outline,
    className,
}: Partial<Pick<ButtonProps, "outline" | "loading" | "className">>) => {
    return cn(
        `
        focus:ring-primary/50 active:ring-primary/50 relative rounded-lg px-4 py-2 text-sm
        hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2  bg-primary text-whit
        active:ring-2 active:ring-offset-2 text-center bg-primary text-white center  border-primary`,
        {
            " border border-swiss-coffee text-dark bg-transparent focus:ring-gray-500/60 active:ring-gray-500/60":
                outline,
        },
        {
            "center flex cursor-wait items-center  opacity-80 hover:opacity-80 ":
                loading,
        },
        { "cursor-pointer opacity-100": !loading },
        className,
    );
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const { className, children, outline, loadingText, loading, ...rest } =
        props;
    return (
        <button
            ref={ref}
            disabled={loading}
            {...rest}
            aria-disabled={loading}
            className={getButtonClasses({ className, outline, loading })}
        >
            {loading ? (
                <Fragment>
                    <LoadingCircle />

                    <span className={"pl-1 tracking-wide"}>
                        {loadingText ?? "Processing..."}
                    </span>
                </Fragment>
            ) : (
                children
            )}
        </button>
    );
});

Button.displayName = "Button";

export default Button;

interface ButtonLink extends LinkProps {
    outline?: boolean;
}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLink>(
    (props, ref) => {
        const { className, outline, children, ...rest } = props;
        return (
            <Link
                ref={ref}
                {...rest}
                className={getButtonClasses({ className, outline })}
            >
                {children}
            </Link>
        );
    },
);

ButtonLink.displayName = "ButtonLink";
