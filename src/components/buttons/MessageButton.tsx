import MessageIcon from "../../assets/icons/chat-blue-icon.svg";

export default function MessageButton() {
  return (
    <div>
      <button
        type="button"
        aria-label="Quick"
        role="button"
        className="cursor-pointer w-[56px] h-[56px] rounded-full flex items-center justify-center bg-[#f2f2f2]"
      >
        <img src={MessageIcon} alt="Message" className="w-[18px] h-[32px]" />
      </button>
    </div>
  );
}
