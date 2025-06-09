import { motion } from "framer-motion";
import ArrowBottomIcon from "../../assets/icons/arrow-bottom.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import CustomCircularProgress from "../progress/CustomCircularProgress";
import TaskCard from "../cards/TaskCard";
import {
  useTaskActions,
  useTasks,
  useTypeTasks,
  useTypeTaskSelected,
} from "../../stores/taskStore";
import type { TaskType, TypeTaskType } from "../../types/taskType";
import { v4 as uuidv4 } from "uuid";
import { getTasks, getTypeTasks, postTask } from "../../service/task";

export default function TaskPopup() {
  const tasks = useTasks();
  const typeTasks = useTypeTasks();
  const typeTaskSelected = useTypeTaskSelected();
  const { setTasks, setTypeTaskSelected, setTypeTasks } = useTaskActions();

  const dropdownTasks = useRef<HTMLDivElement>(null);
  const buttonTypeTask = useRef<HTMLButtonElement>(null);

  const [isOpenTypeTaskState, setIsOpenTypeTaskState] =
    useState<boolean>(false);
  const [isLoadingTaskState, setIsLoadingTaskState] = useState<boolean>(true);
  const [tasksState, setTasksState] = useState<TaskType[]>([]);

  const fetchTypeTasks = useCallback(async () => {
    try {
      await getTypeTasks();
      setTypeTasks(typeTasks);
    } catch (error) {
      console.error(error);
      setTypeTasks([]);
    }
  }, [setTypeTasks, typeTasks]);

  const fetchTasks = useCallback(
    async (idTypeTask?: string) => {
      try {
        await getTasks(idTypeTask || typeTaskSelected?.idTypeTask);
        setTasks(tasks);
      } catch (error) {
        console.error(error);
        setTasks([]);
      } finally {
        setIsLoadingTaskState(false);
      }
    },
    [setTasks, tasks, typeTaskSelected?.idTypeTask]
  );

  const handleOpenTypeTask = () => {
    setIsOpenTypeTaskState(!isOpenTypeTaskState);
  };

  const handleSelectTypeTask = useCallback(
    async (typeTask: TypeTaskType) => {
      setIsLoadingTaskState(true);
      setIsOpenTypeTaskState(false);

      try {
        await fetchTasks(typeTask.idTypeTask);
        setTypeTaskSelected(typeTask);
      } catch (error) {
        console.error(error);
      }

      setIsOpenTypeTaskState(false);
    },
    [fetchTasks, setTypeTaskSelected]
  );

  const handleClickNewTask = async () => {
    const uuidTask = uuidv4();

    const findOwnTypeTask = typeTasks.find(
      (typeTask) => typeTask.idTypeTask === typeTaskSelected?.idTypeTask
    );

    const uuidTypeTask = findOwnTypeTask
      ? findOwnTypeTask.idTypeTask
      : uuidv4();

    if (!findOwnTypeTask) {
      const newTypeTask: TypeTaskType = {
        id: uuidTypeTask,
        idTypeTask: uuidTypeTask,
        name: "New Tasks",
      };

      setTypeTasks([...typeTasks, newTypeTask]);
    }

    try {
      const newTask: TaskType = {
        id: uuidTask,
        idTask: uuidTask,
        idTypeTask: typeTaskSelected?.idTypeTask || uuidTypeTask,
        title: "",
        typeTask: typeTaskSelected?.name || "New Tasks",
        status: "new",
      };

      await postTask(newTask);
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTypeTasks();
  }, [fetchTypeTasks]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

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
  }, [typeTaskSelected, isOpenTypeTaskState]);

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

  useEffect(() => {
    if (typeTaskSelected) {
      setTasksState(
        tasks.filter((task) => task.idTypeTask === typeTaskSelected?.idTypeTask)
      );
    }
  }, [tasks, typeTaskSelected]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col max-w-11/12 max-h-3/4 sm:min-w-[600px] sm:max-w-1/3 bg-white  fixed right-8 bottom-26 z-50 rounded-md py-[19px] text-[#4f4f4f]"
    >
      {/* Header */}
      <div className="flex flex-row flex-nowrap items-center justify-between px-5">
        <div className="relative">
          <button
            ref={buttonTypeTask}
            type="button"
            role="button"
            aria-label="Task Type"
            onClick={handleOpenTypeTask}
            className="border border-[#828282] rounded-md w-fit h-fit flex flex-row flex-nowrap gap-1.5 items-center justify-between px-3.5 py-1.5 cursor-pointer"
          >
            <p className="text-sm text-start">{typeTaskSelected?.name}</p>

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
              {typeTasks
                ?.filter(
                  (item) => item?.idTypeTask !== typeTaskSelected?.idTypeTask
                )
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
                    <p className="text-start text-sm">{task?.name}</p>
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
          onClick={handleClickNewTask}
        >
          <p className="text-white text-sm">New Task</p>
        </button>
      </div>

      <div className="mt-2 h-full overflow-y-scroll px-5">
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
            {tasksState?.map((item, index, arr) => (
              <div
                key={`task-item-${index}`}
                className={`relative ${
                  index !== arr?.length - 1 ? "border-b border-[#828282]" : ""
                }`}
              >
                <TaskCard {...item} />
              </div>
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
}
