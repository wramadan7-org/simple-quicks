import TaskOrangeIcon from "../../assets/icons/task-orange-icon.svg";
import TaskWhiteIcon from "../../assets/icons/task-white-icon.svg";
import { useActiveMenu, useMenuActions } from "../../stores/menuStore";

export default function TaskButton() {
  const activeMenu = useActiveMenu();
  const { setActiveMenu } = useMenuActions();

  return (
    <div>
      <button
        type="button"
        aria-label="Quick"
        role="button"
        className={`cursor-pointer ${
          activeMenu === "task"
            ? "w-[68px] h-[68px] bg-[#F8B76B]"
            : "w-[60px] h-[60px] bg-[#f2f2f2]"
        } rounded-full flex items-center justify-center`}
        onClick={() => setActiveMenu("task")}
      >
        <img
          src={activeMenu === "task" ? TaskWhiteIcon : TaskOrangeIcon}
          alt="Task"
          className={
            activeMenu === "task"
              ? "w-[30.22px] h-[30.22px]"
              : "w-[26.67px] h-[26.67px]"
          }
        />
      </button>
    </div>
  );
}
