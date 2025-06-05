import { Outlet } from "react-router";
import SearchIcon from "../assets/icons/search-icon.svg";

export default function QuicksLayout() {
  return (
    <div className="h-screen w-screen flex flex-row bg-[#333333]">
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
