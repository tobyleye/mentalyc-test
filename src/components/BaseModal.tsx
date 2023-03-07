import { Dialog } from "@headlessui/react";
import { ReactNode } from "react";

type BaseDialogProps = {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
  title?: string;
  description?: string;
};

export function BaseModal({
  open,
  onClose,
  children,
  title,
  description,
}: BaseDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto max-w-md w-full rounded-2xl bg-white py-5 px-10">
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
