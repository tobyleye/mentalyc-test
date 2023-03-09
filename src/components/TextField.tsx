type TextFieldProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  value?: string;
  onInputChange?: (value: string) => void;
};

export function TextField({
  value,
  onInputChange,
  placeholder,
}: TextFieldProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onInputChange?.(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-[#F2F2F2] h-10 px-6 rounded-lg focus:outline-none border-2 border-transparent focus:border-primary-400 focus:bg-white placeholder:text-gray-300"
    />
  );
}
