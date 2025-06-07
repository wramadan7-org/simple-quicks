type Props = {
  onClick?: () => void;
};

export default function DeleteButton({ onClick }: Props) {
  return (
    <button
      type="button"
      role="button"
      aria-label="Delete"
      onClick={onClick}
      className="cursor-pointer px-3 flex items-center py-2 w-full"
    >
      <p className="text-[#EB5757] text-start text-sm">Delete</p>
    </button>
  );
}
