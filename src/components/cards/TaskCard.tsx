import DatePicker from "react-datepicker";

import UncheckTaskIcon from "../../assets/icons/uncheck-task-icon.svg";
import CheckTaskIcon from "../../assets/icons/check-task-icon.svg";
import ArrowBottomIcon from "../../assets/icons/arrow-bottom.svg";
import OptionIcon from "../../assets/icons/expand-chat-icon.svg";
import TimeGrayIcon from "../../assets/icons/time-gray-icon.svg";
import TimeBlueIcon from "../../assets/icons/time-blue-icon.svg";
import PenGrayIcon from "../../assets/icons/pen-gray-icon.svg";
import PenBlueIcon from "../../assets/icons/pen-blue-icon.svg";
import CalendarIcon from "../../assets/icons/calendar-icon.svg";

import "react-datepicker/dist/react-datepicker.css";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import DeleteButton from "../buttons/DeleteButton";
import type { StatusTaskType, TaskType } from "../../types/taskType";
import {
  convertDateTimeToEpoch,
  convertEpochToDate,
  convertEpochToDeadlineDuration,
  formatDate,
} from "../../utils/datetime";
import { useTaskActions } from "../../stores/taskStore";
import { deleteTask, patchTask } from "../../service/task";

export default function TaskCard(task: TaskType) {
  const { setUpdateTaskById, setDeleteTaskById } = useTaskActions();

  const buttonOptionRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const descriptionPreRef = useRef<HTMLPreElement>(null);

  const [formTaskState, setFormTaskState] = useState<{
    title: string;
    deadline: Date | null;
    description: string;
  }>({
    title: "",
    deadline: null,
    description: "",
  });
  const [isOpenExpandState, setIsOpenExpandState] = useState<boolean>(false);
  const [isOpenOptionState, setIsOpenOptionState] = useState<boolean>(false);
  const [isEditDesciptionState, setIsEditDescriptionState] =
    useState<boolean>(false);
  const [textareaHeightState, setTextareaHeightState] = useState<number>(33.6);

  const checkingStatus = (): StatusTaskType => {
    let status: StatusTaskType = "new";

    if (task?.status === "open") {
      status = "completed";
    } else if (task?.status === "completed") {
      status = "open";
    }

    return status;
  };

  const handleChangeStatus = async (idTask: string) => {
    try {
      const status = checkingStatus();

      await patchTask(idTask, { status });
      setUpdateTaskById(idTask, { status });
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowDetailTask = () => {
    setIsOpenExpandState(!isOpenExpandState);
  };

  const handleOpenOption = () => {
    setIsOpenOptionState(!isOpenOptionState);
  };

  const handleClickDelete = async (idTask: string) => {
    try {
      await deleteTask(idTask);
      setDeleteTaskById(idTask);
      setIsOpenOptionState(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeTitle = (title: string) => {
    setFormTaskState((prevState) => ({
      ...prevState,
      title,
    }));
  };

  const handleChangeDeadline = async (deadline: Date | null) => {
    let epoch = 0;

    if (deadline) {
      epoch = Number(convertDateTimeToEpoch(deadline));
    }

    try {
      await patchTask(task.idTask, { deadline: epoch });
      setFormTaskState((prevState) => ({
        ...prevState,
        deadline,
      }));
      setUpdateTaskById(task.idTask, { deadline: epoch });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickDescription = useCallback(() => {
    if (!isEditDesciptionState && descriptionPreRef.current) {
      const height = descriptionPreRef.current.offsetHeight;
      setTextareaHeightState(height < 33.6 ? 33.6 : height);
    }

    setIsEditDescriptionState(!isEditDesciptionState);
  }, [isEditDesciptionState]);

  const handleChangeDescription = (description: string) => {
    const textArea = textAreaRef.current;

    setFormTaskState((prevState) => ({ ...prevState, description }));

    if (textArea) {
      textArea.style.height = "auto";
      textArea.style.height = `${textArea.scrollHeight}px`;
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmitForm(task?.idTask);
    }

    if (event.key === "Escape") {
      event.preventDefault();
      const title = titleRef.current;

      if (title && document.activeElement === title) {
        title.blur();
      }

      setIsEditDescriptionState(false);
      setFormTaskState((prevState) => ({
        ...prevState,
        description: task.description || "",
        deadline: task.deadline ? convertEpochToDate(task.deadline) : null,
        title: task.title,
      }));
    }
  };

  const handleSubmitForm = async (idTask: string) => {
    try {
      const payload = {
        ...task,
        description: formTaskState.description,
        deadline: formTaskState.deadline
          ? Number(convertDateTimeToEpoch(formTaskState.deadline))
          : 0,
        title: formTaskState.title,
        status:
          task?.status === "new" && formTaskState.title ? "open" : task?.status,
      };

      await patchTask(idTask, payload);
      setUpdateTaskById(idTask, payload);
    } catch (error) {
      console.error(error);
    } finally {
      setIsEditDescriptionState(false);
    }
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

      if (
        descriptionRef.current &&
        !descriptionRef.current.contains(event.target as Node)
      ) {
        setIsEditDescriptionState(false);
        setFormTaskState((prevState) => ({
          ...prevState,
          description: task?.description || "",
        }));
      }

      if (
        task?.status === "new" &&
        titleRef.current &&
        !titleRef.current.contains(event.target as Node)
      ) {
        setFormTaskState((prevState) => ({
          ...prevState,
          title: task?.title || "",
        }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [task?.description, task?.status, task?.title]);

  useEffect(() => {
    if (isEditDesciptionState) {
      setTimeout(() => {
        const textArea = textAreaRef.current;
        if (!textArea) return;

        textArea.focus();

        const length = textArea.value.length;
        textArea.setSelectionRange(length, length);

        textArea.scrollTop = textArea.scrollHeight;
      }, 0);
    }
  }, [isEditDesciptionState]);

  useEffect(() => {
    setFormTaskState((prevState) => ({
      ...prevState,
      deadline: task?.deadline ? convertEpochToDate(task.deadline) : null,
      description: task?.description || "",
      title: task?.title || "",
    }));
  }, [task.deadline, task?.description, task.idTask, task?.title]);

  return (
    <div className="py-2.5 flex flex-col gap-2.5 text-[#4f4f4f]">
      <div className="flex flex-row flex-nowrap items-start justify-start gap-3">
        <button
          type="button"
          role="button"
          aria-label="Status Task"
          onClick={() =>
            task?.status !== "new" && handleChangeStatus(task.idTask)
          }
          className={`${task?.status !== "new" ? "cursor-pointer" : ""}`}
        >
          <img
            src={task?.status === "completed" ? CheckTaskIcon : UncheckTaskIcon}
            alt="Uncheck"
            className="w-[15px] h-[15px] min-w-[15px] min-h-[15px] mt-0.5"
          />
        </button>

        <div className="flex flex-col gap-3 w-full">
          <div className="flex flex-row w-full flex-nowrap items-start justify-between text-sm gap-3">
            {task?.status === "new" ? (
              <input
                ref={titleRef}
                type="text"
                className="border rounded-md border-[#828282] text-sm py-1.5 px-2 placeholder:text-[#4f4f4f]"
                placeholder="Type Task Title"
                value={formTaskState?.title}
                onChange={(event) => handleChangeTitle(event.target.value)}
                onKeyDown={handleKeyDown}
              />
            ) : (
              <button
                type="button"
                role="button"
                aria-label="Title Task"
                className="cursor-pointer text-start"
                onClick={handleShowDetailTask}
              >
                <p
                  className={`font-semibold ${
                    task?.status === "completed" ? "line-through" : ""
                  }`}
                >
                  {task?.title || "Type Task Title"}
                </p>
              </button>
            )}

            <div className="flex flex-row flex-nowrap w-fit items-center justify-end gap-3 ml-auto">
              <p className="text-nowrap text-xs sm:text-sm text-[#EB5757]">
                {task?.status === "open"
                  ? convertEpochToDeadlineDuration(task?.deadline || 0)
                  : ""}
              </p>

              <p className="text-nowrap text-xs sm:text-sm">
                {task?.deadline ? formatDate(task?.deadline, "DD/MM/YYYY") : ""}
              </p>

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
                      onClick={() => handleClickDelete(task?.idTask)}
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
                  src={formTaskState?.deadline ? TimeBlueIcon : TimeGrayIcon}
                  alt="Time"
                  className="w-4 h-4 min-w-4 min-h-4"
                />

                <div className="relative">
                  <DatePicker
                    selected={formTaskState?.deadline}
                    onChange={(date) => handleChangeDeadline(date)}
                    className="border border-[#828282] rounded-md text-sm py-1.5 px-2 w-fit max-w-32 placeholder:text-[#4f4f4f]"
                    showIcon
                    icon={<img src={CalendarIcon} alt="Calendar" />}
                    popperPlacement="bottom-end"
                    popperClassName="custom-datepicker-popper"
                    placeholderText="Set Date"
                    showPopperArrow={false}
                    dateFormat={"dd/MM/yyyy"}
                  />
                </div>
              </div>

              <div
                ref={descriptionRef}
                className="flex flex-row w-full gap-4 items-start justify-start"
              >
                <button
                  type="button"
                  role="button"
                  aria-label="Edit Description"
                  onClick={handleClickDescription}
                >
                  <img
                    src={formTaskState?.description ? PenBlueIcon : PenGrayIcon}
                    alt="Pen"
                    className="w-3.5 h-3.5 min-w-3.5 min-h-3.5 mt-0.5"
                  />
                </button>

                {!isEditDesciptionState ? (
                  <button
                    type="button"
                    role="button"
                    aria-label="Description"
                    onClick={handleClickDescription}
                  >
                    <pre
                      ref={descriptionPreRef}
                      className="text-sm text-[#4F4F4F] text-wrap text-start"
                    >
                      {formTaskState?.description || "No Description"}
                    </pre>
                  </button>
                ) : (
                  <textarea
                    ref={textAreaRef}
                    name="description"
                    id="description"
                    rows={1}
                    value={formTaskState?.description}
                    onChange={(e) => handleChangeDescription(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{ height: `${textareaHeightState}px` }}
                    className="border border-[#828282] rounded-md text-sm py-1.5 px-2 w-full placeholder:text-[#4f4f4f] resize-none  max-h-32 text-start"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
