type Props = {
  displayText: string;
  onClick?: () => void;
};

export default function BonusButton({ onClick, displayText }: Props) {
  return (
    <button
      type="button"
      role="button"
      aria-label="Delete"
      onClick={onClick}
      className="cursor-pointer px-3 flex items-center py-2 w-full bg-white hover:bg-[#f2f2f2] transition-colors duration-200 ease-in-out"
    >
      <p className="text-[#2F80ED] text-start text-sm">{displayText}</p>
    </button>
  );
}
