import { Listbox } from "@headlessui/react";
import { useId } from "react";
import { ChevronDownIcon } from "../icons/ChevronDown";
import CheckmarkIcon from "@/icons/Checkmark";

type SelectOption = { label: string; value: string };

type SelectFieldProps = {
  options: Array<SelectOption>;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

function SelectOption({ option }: { option: SelectOption }) {
  return (
    <Listbox.Option
      value={option.value}
      className="py-2 px-4 hover:bg-primary-400 hover:text-white  cursor-default"
    >
      {({ selected }) => (
        <div className="flex items-center gap-2">
          {option.label}
          {selected && (
            <span className="text-xl ml-auto">
              <CheckmarkIcon />
            </span>
          )}
        </div>
      )}
    </Listbox.Option>
  );
}

export function SelectField({
  options,
  value,
  onChange,
  placeholder,
}: SelectFieldProps) {
  const id = useId();

  return (
    <Listbox value={value} onChange={onChange}>
      <div>
        <Listbox.Button
          data-testid="select-btn"
          className="w-full text-left bg-[#F2F2F2] h-10 px-6 rounded-lg border-2 border-transparent focus:border-primary-400 focus:bg-white"
        >
          {({ open, value }) => (
            <div className="flex gap-4 items-center">
              <div>
                {value ? (
                  value
                ) : (
                  <span className="text-gray-300">{placeholder}</span>
                )}
              </div>
              <span
                className="ml-auto inline-block"
                style={{
                  transform: open ? "rotate(180deg)" : undefined,
                  transition: ".15s ease",
                }}
              >
                <ChevronDownIcon />
              </span>
            </div>
          )}
        </Listbox.Button>
        <div className="relative ">
          <Listbox.Options
            data-test-id="select-options"
            className="mt-2 absolute select-dropdown rounded-b-2xl left-0 w-full bg-white shadow top-0 overflow-hidden"
          >
            <div className="max-h-40 overflow-auto">
              {options.map((opt, index) => (
                <SelectOption option={opt} key={`select-${id}-${index}`} />
              ))}
            </div>
          </Listbox.Options>
        </div>
      </div>

      <style jsx>{`
        .select-dropdown {
          filter: drop-shadow(4px 4px 16px rgba(0, 0, 0, 0.1));
        }
      `}</style>
    </Listbox>
  );
}
