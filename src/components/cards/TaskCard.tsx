import DatePicker from "react-datepicker";

import UncheckTaskIcon from "../../assets/icons/uncheck-task-icon.svg";
// import CheckTaskIcon from "../../assets/icons/check-task-icon.svg";
import ArrowBottomIcon from "../../assets/icons/arrow-bottom.svg";
import OptionIcon from "../../assets/icons/expand-chat-icon.svg";
import TimeGrayIcon from "../../assets/icons/time-gray-icon.svg";
import PenGrayIcon from "../../assets/icons/pen-gray-icon.svg";
import CalendarIcon from "../../assets/icons/calendar-icon.svg";

import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useRef, useState } from "react";
import DeleteButton from "../buttons/DeleteButton";

export default function TaskCard() {
  const buttonOptionRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [deadlineState, setDeadlineState] = useState<Date | null>(new Date());
  const [isOpenExpandState, setIsOpenExpandState] = useState<boolean>(false);
  const [isOpenOptionState, setIsOpenOptionState] = useState<boolean>(false);

  const handleShowDetailTask = () => {
    setIsOpenExpandState(!isOpenExpandState);
  };

  const handleOpenOption = () => {
    setIsOpenOptionState(!isOpenOptionState);
  };

  const handleClickDelete = (idTask: string) => {
    console.log(idTask);
    setIsOpenOptionState(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonOptionRef.current &&
        !buttonOptionRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpenOptionState(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="py-2.5 flex flex-col gap-2.5 text-[#4f4f4f]">
      <div className="flex flex-row flex-nowrap items-start justify-start gap-3">
        <img
          src={UncheckTaskIcon}
          alt="Uncheck"
          className="w-[15px] h-[15px] min-w-[15px] min-h-[15px] mt-0.5"
        />

        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-row w-full flex-nowrap items-start justify-between text-sm gap-3">
            <button
              type="button"
              role="button"
              aria-label="Cross-reference with Jeanne for Case #192813"
              className="cursor-pointer text-start"
              onClick={handleShowDetailTask}
            >
              <p className="font-semibold">
                Cross-reference with Jeanne for Case #192813
              </p>
            </button>

            <div className="flex flex-row flex-nowrap w-fit items-center justify-end gap-3 ml-auto">
              <p className="text-nowrap text-xs sm:text-sm text-[#EB5757]">
                2 Days Left
              </p>

              <p className="text-nowrap text-xs sm:text-sm">12/06/2021</p>

              <button
                type="button"
                className="flex items-center justify-center cursor-pointer"
                onClick={handleShowDetailTask}
              >
                <img
                  src={ArrowBottomIcon}
                  alt="Arrow"
                  className={`w-2.5 h-fit min-w-2.5 transition-transform duration-100 ${
                    isOpenExpandState ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              <div className="relative">
                <button
                  ref={buttonOptionRef}
                  type="button"
                  className="flex items-center justify-center cursor-pointer"
                  onClick={handleOpenOption}
                >
                  <img
                    src={OptionIcon}
                    alt="Expand"
                    className="w-[12.5px] min-w-[12.5px] h-fit"
                  />
                </button>

                {isOpenOptionState && (
                  <div
                    ref={dropdownRef}
                    className="absolute top-4 right-0 z-50 flex flex-col gap-2 bg-white border border-[#828282] rounded-md overflow-hidden min-w-16 sm:w-28 max-w-28 shadow-sm"
                  >
                    <DeleteButton
                      onClick={() => handleClickDelete("id task")}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {isOpenExpandState && (
            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-row gap-4 items-center justify-start">
                <img
                  src={TimeGrayIcon}
                  alt="Time"
                  className="w-4 h-4 min-w-4 min-h-4"
                />

                <DatePicker
                  selected={deadlineState}
                  onChange={(date) => setDeadlineState(date)}
                  className="border border-[#828282] rounded-md text-sm py-1.5 px-2 w-fit max-w-32"
                  showIcon
                  icon={<img src={CalendarIcon} alt="Calendar" />}
                />
              </div>

              <div className="flex flex-row gap-4 items-start justify-start">
                <img
                  src={PenGrayIcon}
                  alt="Pen"
                  className="w-3.5 h-3.5 min-w-3.5 min-h-3.5 mt-0.5"
                />

                <pre className="text-sm text-[#4F4F4F] text-wrap">
                  Homeworks needed to be checked are as follows : Client Profile
                  Questionnaire, Passport Requirements and Images, Personal
                  Documents.
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
