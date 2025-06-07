type Props = {
  onClick?: () => void;
};

export default function EditButton({ onClick }: Props) {
  return (
    <button
      type="button"
      role="button"
      aria-label="Edit"
      onClick={onClick}
      className="cursor-pointer px-3 flex items-center py-2 w-full"
    >
      <p className="text-[#2F80ED] text-start text-sm">Edit</p>
    </button>
  );
}
