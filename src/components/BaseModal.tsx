import { Dialog } from "@headlessui/react";
import { ReactNode } from "react";
import cx from "clsx";
import CloseIcon from "@/icons/Close";

type BaseDialogProps = {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
  title?: string;
  description?: string;
  size?: "normal" | "small";
  showDismissButton?: boolean;
};

export function BaseModal({
  open,
  onClose,
  children,
  title,
  description,
  size = "normal",
  showDismissButton = true,
}: BaseDialogProps) {
  const getSizeClassNames = () => {
    const sizeClassMap = {
      normal: "max-w-lg",
      small: "max-w-md",
    };
    return sizeClassMap[size] ?? sizeClassMap.normal;
  };
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          className={cx(
            "mx-auto w-full rounded-2xl bg-white py-5 px-10",
            getSizeClassNames()
          )}
        >
          {showDismissButton && (
            <div className="flex justify-end">
              <button onClick={onClose}>
                <CloseIcon />
              </button>
            </div>
          )}
          {title && description ? (
            <header className="text-center mb-8">
              {title && (
                <Dialog.Title className="text-xl font-bold ">
                  {title}
                </Dialog.Title>
              )}

              {description && (
                <Dialog.Description className="text-gray-400">
                  {description}
                </Dialog.Description>
              )}
            </header>
          ) : null}

          <div>{children}</div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
