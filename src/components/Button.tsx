import { ReactNode } from "react";
import cx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
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
          transition: 0.25s;
        }

        .btn:not(:disabled):hover {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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
