import { ReactNode } from "react";
import cx from "clsx";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  color?: "primary" | "default";
  children: ReactNode;
};

export function Button({
  children,
  color = "primary",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cx(
        className,
        `btn-${color}`,
        "btn px-6 h-[40px] text-white rounded-lg disabled:cursor-auto"
      )}
    >
      {children}
      <style jsx>{`
        .btn-primary {
          background: linear-gradient(
            295.67deg,
            #de0d6f 16.23%,
            #731054 83.77%
          );
        }

        .btn-primary:disabled {
          background: var(--color-gray-200);
        }

        .btn-default {
          background: var(--color-gray-300);
        }
      `}</style>
    </button>
  );
}
