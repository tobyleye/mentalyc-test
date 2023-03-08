import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
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
    <Transition appear show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          enter="ease duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease duration-150"
            enterFrom="opacity-0 scale-105 "
            enterTo="opacity-100 scale-100"
            leave="ease duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0"
          >
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
                    <Dialog.Title className="h4 mb-1">{title}</Dialog.Title>
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
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
