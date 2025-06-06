import { Outlet } from "react-router";
import SearchIcon from "../assets/icons/search-icon.svg";
import QuickButton from "../components/buttons/QuickButton";
import MessageButton from "../components/buttons/MessageButton";
import TaskButton from "../components/buttons/TaskButton";
import {
  useActiveMenu,
  useMenuActions,
  useRenderButtons,
  useShowButtons,
} from "../stores/menuStore";
import BlurButton from "../components/buttons/BlurButton";
import InboxPopup from "../components/popups/InboxPopup";
import TaskPopup from "../components/popups/TaskPopup";
import { AnimatePresence } from "framer-motion";

export default function QuicksLayout() {
  const activeMenu = useActiveMenu();
  const showButtons = useShowButtons();
  const renderButtons = useRenderButtons();
  const { toggleButtons } = useMenuActions();

  return (
    <div className="h-screen w-screen flex flex-row bg-[#333333]">
      <AnimatePresence mode="wait">
        {activeMenu === "inbox" && <InboxPopup key="inbox" />}
        {activeMenu === "task" && <TaskPopup key="task" />}
      </AnimatePresence>

      <div
        className={`fixed flex ${
          activeMenu === "task" ? "flex-row-reverse" : "flex-row"
        } right-8 bottom-5 z-50 ${
          activeMenu === "quick" ? "gap-5" : "gap-7"
        } items-center`}
      >
        {renderButtons && (
          <div
            className={`
          transition-all duration-500 ease-out
          transform w-fit h-fit flex flex-col relative justify-center items-center
          ${
            showButtons
              ? "translate-x-0 opacity-100 delay-200"
              : "translate-x-10 opacity-0 delay-100"
          }
        `}
          >
            {activeMenu === "quick" && (
              <p className="absolute text-sm text-[#f2f2f2] -top-8 left-1/2 -translate-x-1/2">
                Task
              </p>
            )}

            <div className="relative">
              {activeMenu === "task" && <BlurButton />}

              <TaskButton />
            </div>
          </div>
        )}

        {renderButtons && (
          <div
            className={`
          transition-all duration-500 ease-out
          transform w-fit h-fit flex flex-col relative justify-center items-center
          ${
            showButtons
              ? "translate-x-0 opacity-100 delay-100"
              : "translate-x-10 opacity-0 delay-200"
          }
          
        `}
          >
            {activeMenu === "quick" && (
              <p className="absolute text-sm text-[#f2f2f2] -top-8 left-1/2 -translate-x-1/2">
                Inbox
              </p>
            )}

            <div className="relative">
              {activeMenu === "inbox" && <BlurButton />}

              <MessageButton />
            </div>
          </div>
        )}

        {activeMenu === "quick" && (
          <div onClick={toggleButtons} className="w-fit h-fit rounded-full">
            <QuickButton />
          </div>
        )}
      </div>

      <div className="h-screen w-1/6 border-gray-100 border-r"></div>

      <div className="h-screen w-full flex flex-col">
        <div className="w-full h-7 bg-primary-second flex flex-row px-4">
          <button
            type="button"
            role="button"
            aria-label="search"
            className="cursor-pointer"
          >
            <img src={SearchIcon} alt="search" className="w-4 h-4" />
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
