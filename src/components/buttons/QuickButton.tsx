import QuickIcon from "../../assets/icons/quick-icon.svg";

export default function QuickButton() {
  return (
    <div>
      <button
        type="button"
        aria-label="Quick"
        role="button"
        className="cursor-pointer w-[68px] h-[68px] rounded-full flex items-center justify-center bg-primary-core"
      >
        <img src={QuickIcon} alt="Qucik" className="w-[18px] h-[32px]" />
      </button>
    </div>
  );
}
