import InboxBlueIcon from "../../assets/icons/chat-blue-icon.svg";
import InboxWhiteIcon from "../../assets/icons/chat-white-icon.svg";
import { useActiveMenu, useMenuActions } from "../../stores/menuStore";

export default function MessageButton() {
  const activeMenu = useActiveMenu();
  const { setActiveMenu } = useMenuActions();

  return (
    <div>
      <button
        type="button"
        aria-label="Quick"
        role="button"
        className={`cursor-pointer ${
          activeMenu === "inbox"
            ? "w-[68px] h-[68px] bg-[#8785FF]"
            : "w-[60px] h-[60px] bg-[#f2f2f2]"
        } rounded-full flex items-center justify-center`}
        onClick={() => setActiveMenu("inbox")}
      >
        <img
          src={activeMenu === "inbox" ? InboxWhiteIcon : InboxBlueIcon}
          alt="Message"
          className={
            activeMenu === "inbox"
              ? "w-[30.22px] h-[30.22px]"
              : "w-[26.67px] h-[26.67px]"
          }
        />
      </button>
    </div>
  );
}
