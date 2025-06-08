import { motion } from "framer-motion";
import ArrowBottomIcon from "../../assets/icons/arrow-bottom.svg";
import { useEffect, useRef, useState } from "react";
import CustomCircularProgress from "../progress/CustomCircularProgress";
import TaskCard from "../cards/TaskCard";

export default function TaskPopup() {
  const dropdownTasks = useRef<HTMLDivElement>(null);
  const buttonTypeTask = useRef<HTMLButtonElement>(null);

  const [selectedTypeTaskState, setSelectedTypeTaskState] =
    useState<string>("My Tasks");
  const [typeTasksState, setTypeTasksState] = useState<string[]>([
    "My Tasks",
    "Personal Errands",
    "Urgent To-Do",
  ]);
  const [isOpenTypeTaskState, setIsOpenTypeTaskState] =
    useState<boolean>(false);
  const [isLoadingTaskState, setIsLoadingTaskState] = useState<boolean>(true);

  const handleOpenTypeTask = () => {
    setIsOpenTypeTaskState(!isOpenTypeTaskState);
  };

  const handleSelectTypeTask = (typeTask: string) => {
    setSelectedTypeTaskState(typeTask);
    setIsOpenTypeTaskState(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingTaskState(false);
    }, 1000);
  });

  useEffect(() => {
    if (dropdownTasks.current) {
      const element = dropdownTasks.current;
      const isScrollable = element?.getBoundingClientRect()?.height > 145;

      if (!isScrollable) {
        element.style.overflowY = "hidden";
      } else {
        element.style.overflowY = "scroll";
      }
    }
  }, [typeTasksState, isOpenTypeTaskState]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        dropdownTasks.current &&
        !dropdownTasks.current.contains(target) &&
        buttonTypeTask.current &&
        !buttonTypeTask.current.contains(target)
      ) {
        setIsOpenTypeTaskState(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col max-w-11/12 max-h-3/4 sm:min-w-[600px] sm:max-w-1/3 bg-white  fixed right-8 bottom-26 z-50 rounded-md py-[19px] px-5 "
    >
      {/* Header */}
      <div className="flex flex-row flex-nowrap items-center justify-between">
        <div className="relative">
          <button
            ref={buttonTypeTask}
            type="button"
            role="button"
            aria-label="Task Type"
            onClick={handleOpenTypeTask}
            className="border border-[#828282] rounded-md w-fit h-fit flex flex-row flex-nowrap gap-1.5 items-center justify-between px-3.5 py-1.5 cursor-pointer"
          >
            <p className="text-sm text-start">{selectedTypeTaskState}</p>

            <img
              src={ArrowBottomIcon}
              alt="Arrow Bottom"
              className={`w-2.5 h-1.5 min-w-2.5 min-h-1.5 transition-transform duration-100 ${
                isOpenTypeTaskState ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {isOpenTypeTaskState && (
            <div
              ref={dropdownTasks}
              className="absolute left-0 top-[115%] border border-[#828282] rounded-md min-w-44 h-fit max-h-36 overflow-y-scroll z-20 bg-white shadow-md"
            >
              {typeTasksState
                ?.filter((item) => item !== selectedTypeTaskState)
                ?.map((task, index, arr) => (
                  <button
                    key={`${task}-${index}`}
                    type="button"
                    role="button"
                    aria-label="Task Type Item"
                    onClick={() => handleSelectTypeTask(task)}
                    className={`px-4 flex items-center justify-start py-1.5 cursor-pointer hover:bg-[#f2f2f2] transition-colors duration-200 ease-in-out ${
                      arr?.length === index + 1
                        ? ""
                        : "border-b border-[#828282]"
                    } w-full`}
                  >
                    <p className="text-start text-sm">{task}</p>
                  </button>
                ))}
            </div>
          )}
        </div>

        <button
          type="button"
          role="button"
          aria-label="New Task"
          className="bg-[#2F80ED] hover:bg-[#1366D6] transition-colors duration-200 ease-in-out px-4 py-2 rounded-md cursor-pointer"
        >
          <p className="text-white text-sm">New Task</p>
        </button>
      </div>

      <div className="mt-2 h-full overflow-y-scroll">
        {isLoadingTaskState && (
          <div className="flex flex-col w-full h-full justify-center items-center gap-1 px-5 ">
            <CustomCircularProgress />
            <p className="text-sm text-[#4f4f4f] font-bold">
              Loading Task List...
            </p>
          </div>
        )}

        {!isLoadingTaskState && (
          <>
            {Array.from({ length: 3 }).map((_, index, arr) => (
              <div
                key={`task-item-${index}`}
                className={`${
                  index !== arr?.length - 1 ? "border-b border-[#828282]" : ""
                } wdaw`}
              >
                <TaskCard />
              </div>
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
}
