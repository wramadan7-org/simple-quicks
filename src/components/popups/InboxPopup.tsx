import { motion } from "framer-motion";
import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import SearchIcon from "../../assets/icons/search-popup-icon.svg";
import PeopleGrayIcon from "../../assets/icons/people-gray-icon.svg";
import PeopleWhiteIcon from "../../assets/icons/people-white-icon.svg";
import CustomCircularProgress from "../progress/CustomCircularProgress";
import {
  convertDateTimeForFormatChat,
  convertDateTimeToEpoch,
  formatDate,
} from "../../utils/datetime";
import {
  useInboxActions,
  useInboxs,
  useInboxSelected,
} from "../../stores/inboxStore";
import type { InboxType } from "../../types/inboxType";
import ArrowBackIcon from "../../assets/icons/arrow-back-icon.svg";
import CloseIcon from "../../assets/icons/close-icon.svg";
import InboxChat from "../cards/InboxChat";
import {
  useActiveMenu,
  useIsOpenMenu,
  useMenuActions,
} from "../../stores/menuStore";
import {
  useChatActions,
  useChatIsEdit,
  useChats,
  useChatSelected,
} from "../../stores/chatStore";
import moment from "moment-timezone";
import { v4 as uuidv4 } from "uuid";
import { CircularProgress } from "@mui/material";
import type { ChatType, GroupCategoryType } from "../../types/chatType";
import {
  getChats,
  getInboxs,
  patchChat,
  patchInbox,
  postChat,
} from "../../service/inbox";

export default function InboxPopup() {
  let newMessageShown = false;

  const inboxs = useInboxs();
  const chats = useChats();
  const chatSelected = useChatSelected();
  const chatIsEdit = useChatIsEdit();
  const inboxSelected = useInboxSelected();
  const { setInboxs, setInboxSelected, setUpdateInboxById } = useInboxActions();
  const { setCloseMenu, setActiveMenu } = useMenuActions();
  const {
    setChats,
    setSendChat,
    setUpdateChatById,
    setIsEdit,
    setChatSelected,
  } = useChatActions();
  const isOpenMenu = useIsOpenMenu();
  const activeMenu = useActiveMenu();

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isLoadingInboxState, setIsLoadingInboxState] = useState<boolean>(true);
  const [isLoadingConnectToTeamState, setIsLoadingConnectToTeamState] =
    useState<boolean>(true);
  const [messageState, setMessageState] = useState<string>("");
  const [searchQueryState, setSearchQueryState] = useState("");
  const [inboxsState, setInboxsState] = useState<InboxType[]>(inboxs);

  const fetchInboxs = useCallback(
    async (search?: string) => {
      try {
        await getInboxs(search);

        if (search) {
          const searching = inboxs?.filter(
            (inbox: InboxType) =>
              inbox?.from?.toLowerCase()?.includes(search?.toLowerCase()) ||
              inbox?.message?.toLowerCase()?.includes(search?.toLowerCase()) ||
              inbox?.name?.toLowerCase()?.includes(search?.toLowerCase())
          );

          setInboxsState(searching);
        } else {
          setInboxsState(inboxs);
        }
      } catch (error) {
        console.error(error);
        setInboxs([]);
      } finally {
        setTimeout(() => {
          setIsLoadingInboxState(false);
        }, 1000);
      }
    },
    [inboxs, setInboxs]
  );

  const updateInboxById = useCallback(
    async (idInbox: string, updatedInbox: Partial<InboxType>) => {
      try {
        await patchInbox(idInbox, updatedInbox);

        setUpdateInboxById(idInbox, updatedInbox);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    [setUpdateInboxById]
  );

  const sendChats = useCallback(
    async (chat: ChatType) => {
      try {
        await postChat(chat);

        setSendChat(chat);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    [setSendChat]
  );

  const fetchChats = useCallback(
    async (idInbox: string) => {
      try {
        await getChats(idInbox);

        // Set the response from api in that hook of the store
        // setChats(response);
      } catch (error) {
        console.error(error);
        setChats([]);
      }
    },
    [setChats]
  );

  const updateChatById = useCallback(
    async (idChat: string, updatedChat: Partial<ChatType>) => {
      try {
        await patchChat(idChat, updatedChat);

        setUpdateChatById(idChat, updatedChat);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    [setUpdateChatById]
  );

  const scrollChatToBottom = useCallback(() => {
    setTimeout(() => {
      const div = scrollRef.current;

      if (div) {
        div.scrollTop = div.scrollHeight;
      }
    }, 100);
  }, []);

  const handleSearchInbox = useCallback(
    (search: string) => {
      fetchInboxs(search);
    },
    [fetchInboxs]
  );

  const handleChangeSearch = (search: string) => {
    setSearchQueryState(search);
  };

  const handleSelectInbox = async (inbox: InboxType | null) => {
    if (!inbox) return;

    setInboxSelected(inbox);

    if (inbox?.status === "read") return;

    updateInboxById(inbox.idInbox, { status: "read" });
  };

  const handleBackButton = () => {
    setInboxSelected(null);
    setChatSelected(null);
  };

  const handleCloseButton = () => {
    setCloseMenu();
    setInboxSelected(null);
    setActiveMenu("quick");
  };

  const handleClickShowNewMessage = async () => {
    if (!inboxSelected) return;

    const filteredChats = chats?.filter(
      (item) => item?.idInbox === inboxSelected?.idInbox && !item?.isRead
    );

    await Promise.allSettled(
      filteredChats.map(async (item) => {
        if (item?.id) {
          await updateChatById(item.id, { isRead: true });
        }
      })
    );

    const sortedChats = chats
      ?.filter((item) => item?.idInbox === inboxSelected?.idInbox)
      ?.sort((a, b) => a.datetime - b.datetime);
    const lastChat = sortedChats?.[sortedChats.length - 1];

    const payloadInbox = {
      ...inboxSelected,
      idChat: lastChat?.idChat,
      name: lastChat?.name,
      status: "read",
      message: lastChat?.message,
      datetime: lastChat?.datetime,
    };

    if (!inboxSelected?.id) throw new Error("Inbox not found");

    await updateInboxById(inboxSelected.id, payloadInbox);

    scrollChatToBottom();
    setChatSelected(null);
  };

  const handleChangeMessage = (event: FormEvent<HTMLTextAreaElement>) => {
    const textArea = inputRef.current;

    setMessageState(event.currentTarget.value);

    if (textArea) {
      textArea.scrollTop = textArea.scrollHeight;
    }

    event.currentTarget.style.height = "auto";
    event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
    event.currentTarget.style.overflowY =
      Number(event.currentTarget.style.height?.split("px")[0] || 40) > 40
        ? "scroll"
        : "hidden";
    event.currentTarget.style.maxHeight = "7rem";
  };

  const handleSubmitChat = useCallback(async () => {
    if (!inboxSelected) return;

    const uuid = uuidv4();

    const payload = {
      id: uuid,
      idChat: uuid,
      idInbox: inboxSelected?.idInbox,
      name: "You",
      from: inboxSelected?.from || "",
      to: inboxSelected?.from || "",
      message: messageState,
      datetime: Number(convertDateTimeToEpoch(new Date())),
      isReply: false,
      isNew: false,
      isRead: true,
      groupCategory: (inboxSelected?.idInbox ===
      "d96059f8-0e40-41a0-9dc3-4a21f16e1d9a"
        ? "system"
        : "user") as GroupCategoryType,
    };

    try {
      await sendChats(payload);

      const filteredChats = chats?.filter(
        (item) => item?.isNew && item?.idInbox === inboxSelected?.idInbox
      );

      if (filteredChats?.length) {
        await Promise.allSettled(
          filteredChats.map(async (item) => {
            if (item?.id) {
              await updateChatById(item.id, { isNew: false });
            }
          })
        );
      }

      const payloadInbox = {
        ...inboxSelected,
        idChat: uuid,
        name:
          inboxSelected?.idInbox === "d96059f8-0e40-41a0-9dc3-4a21f16e1d9a"
            ? null
            : "You",
        status: "read",
        message: messageState,
        datetime: Number(convertDateTimeToEpoch(new Date())),
      };

      if (!inboxSelected?.id) throw new Error("Inbox not found");

      await updateInboxById(inboxSelected.id, payloadInbox);

      scrollChatToBottom();
    } catch (error) {
      console.error(error);
    } finally {
      const textArea = inputRef.current;

      if (textArea) {
        textArea.style.height = "auto";
        textArea.style.height = `${textArea.scrollHeight}px`;
        textArea.style.overflowY =
          Number(textArea.style.height?.split("px")[0] || 40) > 40
            ? "scroll"
            : "hidden";
        textArea.style.maxHeight = "7rem";
      }
      setMessageState("");
      setIsEdit(false);
    }
  }, [
    chats,
    inboxSelected,
    messageState,
    scrollChatToBottom,
    sendChats,
    setIsEdit,
    updateChatById,
    updateInboxById,
  ]);

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmitChat();
    }
  };

  useEffect(() => {
    if (!isOpenMenu || activeMenu !== "inbox") return;

    fetchInboxs();
  }, [activeMenu, fetchInboxs, isOpenMenu]);

  useEffect(() => {
    if (!isOpenMenu || activeMenu !== "inbox" || !inboxSelected) return;

    if (!inboxSelected?.id) return;

    fetchChats(inboxSelected?.id);
  }, [activeMenu, fetchChats, inboxSelected, isOpenMenu]);

  useEffect(() => {
    if (
      inboxSelected &&
      inboxSelected?.idInbox === "d96059f8-0e40-41a0-9dc3-4a21f16e1d9a"
    ) {
      setTimeout(() => {
        setIsLoadingConnectToTeamState(false);
      }, 3000);
    }
  }, [inboxSelected]);

  useEffect(() => {
    scrollChatToBottom();
  }, [inboxSelected, isLoadingInboxState, scrollChatToBottom]);

  useEffect(() => {
    if (inboxSelected && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inboxSelected]);

  useEffect(() => {
    const textArea = inputRef.current;

    if (textArea) {
      textArea.style.height = "auto";
      textArea.style.height = `${textArea.scrollHeight}px`;
      textArea.style.overflowY =
        Number(textArea.style.height?.split("px")[0] || 40) > 40
          ? "scroll"
          : "hidden";
      textArea.style.maxHeight = "7rem";
    }
  }, [chatIsEdit, chatSelected, handleSubmitChat]);

  useEffect(() => {
    if (
      !inboxSelected ||
      inboxSelected?.idInbox !== "8c197e93-6d2e-4aa4-b5b3-2b0df02fb0ae"
    )
      return;

    const timeout = setTimeout(async () => {
      const uuid = uuidv4();
      const payload = {
        id: uuid,
        idChat: uuid,
        idInbox: "8c197e93-6d2e-4aa4-b5b3-2b0df02fb0ae",
        name: "Mary Hilda",
        from: "109220-Naturalization",
        to: "109220-Naturalization",
        message: "You’r welcome, Obaidullah.",
        datetime: Number(convertDateTimeToEpoch(new Date())),
        isReply: false,
        isNew: true,
        isRead: false,
        groupCategory: "user" as GroupCategoryType,
      };

      sendChats(payload);
      scrollChatToBottom();

      if (!inboxSelected?.id) throw new Error("Inbox not found");

      const payloadInbox = {
        ...inboxSelected,
        idChat: uuid,
        name: "Mary Hilda",
        status: "unread",
        message: "You’r welcome, Obaidullah.",
        datetime: Number(convertDateTimeToEpoch(new Date())),
      };

      updateInboxById(inboxSelected.id, payloadInbox);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [inboxSelected, scrollChatToBottom, sendChats, updateInboxById]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      handleSearchInbox(searchQueryState);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQueryState, handleSearchInbox]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col max-w-11/12 max-h-3/4 sm:min-w-[600px] sm:max-w-1/3 bg-white  fixed right-8 bottom-26 z-50 rounded-md py-[19px]"
    >
      {/* Header */}
      {!inboxSelected && (
        <div className="relative w-full h-fit px-5">
          <input
            className="w-full h-8 px-2.5 border border-[#828282] rounded-md placeholder:text-[#333333] text-sm relative"
            placeholder="Search"
            value={searchQueryState}
            onChange={(event) => handleChangeSearch(event.target.value)}
          />

          <img
            src={SearchIcon}
            alt="Search"
            className="w-3 h-3 absolute right-12 top-1/2 -translate-y-1/2"
          />
        </div>
      )}

      {isLoadingInboxState && (
        <div className="flex flex-col w-full h-full justify-center items-center gap-1">
          <CustomCircularProgress />
          <p className="text-sm text-[#4f4f4f] font-bold">Loading Chats...</p>
        </div>
      )}

      {/* Inbox */}
      {!isLoadingInboxState && !inboxSelected && (
        <div className="flex flex-col w-full h-full overflow-y-scroll">
          {inboxsState
            ?.sort((a, b) => b?.datetime - a?.datetime)
            ?.map((item, index) => (
              <button
                key={`inbox-${index}`}
                type="button"
                role="button"
                onClick={() => handleSelectInbox(item)}
                className="px-5 cursor-pointer hover:bg-gray-100/50"
              >
                <div
                  className={`flex flex-row flex-nowrap text-start border-t border-[#828282] items-start justify-start gap-x-3 py-[22px]  ${
                    index === 0 && "border-t-0"
                  }`}
                >
                  <div className="w-[51px] min-w-[51px] h-[34px] flex flex-row relative items-center justify-end">
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-[34px] h-[34px] bg-[#E0E0E0] rounded-full flex items-center justify-center z-10">
                      <img
                        src={PeopleGrayIcon}
                        alt="Person Icon"
                        className="w-[12px] h-[12px]"
                      />
                    </div>

                    <div className="w-[34px] h-[34px] bg-[#2F80ED] rounded-full flex items-center justify-center z-20">
                      <img
                        src={PeopleWhiteIcon}
                        alt="Person Icon"
                        className="w-[12px] h-[12px]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 text-[#4f4f4f]">
                    <div className="flex flex-col-reverse lg:flex-row items-start flex-nowrap gap-1 lg:gap-3">
                      <p className="text-[#2F80ED] font-bold text-sm ">
                        {item?.from}
                      </p>

                      <p className="text-sm text-nowrap">
                        {item?.status === "unread"
                          ? formatDate(item?.datetime, "MMMM D,YYYY HH:mm")
                          : formatDate(item?.datetime, "DD/MM/YYYY HH:mm")}
                      </p>
                    </div>

                    <div className="max-w-11/12 overflow-hidden">
                      {item?.groupCategory === "user" && (
                        <p className="text-sm font-bold">{item?.name} :</p>
                      )}
                      <p className="text-sm text-ellipsis overflow-hidden line-clamp-1">
                        {item?.message}
                      </p>
                    </div>
                  </div>

                  {item?.status === "unread" && (
                    <div className="h-full w-fit ml-auto my-auto">
                      <div className="w-[10px] h-[10px] bg-[#EB5757] rounded-full"></div>
                    </div>
                  )}
                </div>
              </button>
            ))}
        </div>
      )}

      {/* Chat Room */}
      {!isLoadingInboxState && inboxSelected && (
        <div className="flex flex-col w-full h-full text-[#4F4F4F]">
          <div className="px-5 pb-[19px] flex flex-row flex-nowrap items-center justify-between border-b border-[#BDBDBD] relative">
            <div className="flex flex-row gap-2">
              <button
                type="button"
                role="button"
                onClick={handleBackButton}
                className="cursor-pointer w-6 h-6 min-w-7 min-h-6 items-center flex justify-center my-auto -ml-1"
              >
                <img
                  src={ArrowBackIcon}
                  alt="Back"
                  className="w-6 h-6 min-w-7 min-h-6"
                />
              </button>

              <div className="flex flex-col gap-1 text-start pr-5">
                <p className="text-[#2F80ED] font-bold text-[0.9375rem]">
                  {inboxSelected?.from}
                </p>

                {inboxSelected?.groupCategory === "user" && (
                  <p className="text-sm">
                    {inboxSelected?.participant} Participants
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              role="button"
              onClick={handleCloseButton}
              className="w-3.5 h-3.5 min-w-3.5 min-h-3.5 my-auto ml-auto cursor-pointer"
              aria-label="Close"
            >
              <img
                src={CloseIcon}
                alt="Close"
                className="w-3.5 h-3.5 min-w-3.5 min-h-3.5"
              />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex flex-col h-full overflow-y-scroll px-5 gap-[22px] py-[16px] relative"
          >
            {chats
              ?.filter(
                (item) =>
                  item?.idInbox === inboxSelected?.idInbox && item?.isRead
              )
              ?.sort((a, b) => a.datetime - b.datetime)
              ?.map((item, index, arr) => {
                const currentDate = moment
                  .unix(item.datetime)
                  .tz("Asia/Jakarta")
                  .format("YYYY-MM-DD");
                const prevDate =
                  index > 0
                    ? moment
                        .unix(arr[index - 1].datetime)
                        .tz("Asia/Jakarta")
                        .format("YYYY-MM-DD")
                    : null;

                let showLabel = false;
                let labelText = "";

                if (item?.isNew && !newMessageShown) {
                  showLabel = true;
                  labelText = "New Message";
                  newMessageShown = true;
                } else if (
                  currentDate !== prevDate &&
                  labelText?.toLowerCase() !== "new message"
                ) {
                  showLabel = true;
                  labelText = convertDateTimeForFormatChat(item.datetime);
                }

                return (
                  <Fragment key={item.idChat}>
                    {showLabel && (
                      <div className="flex flex-row items-center justify-center flex-nowrap gap-1.5">
                        <div
                          className={`w-full min-h-[0.5px] ${
                            labelText?.toLowerCase() === "new message"
                              ? "bg-[#EB5757]"
                              : "bg-[#4f4f4f]"
                          }`}
                        ></div>

                        <p
                          className={`text-sm font-bold text-nowrap ${
                            labelText?.toLowerCase() === "new message"
                              ? "text-[#EB5757]"
                              : "text-[#4f4f4f]"
                          }`}
                        >
                          {labelText}
                        </p>

                        <div
                          className={`w-full min-h-[0.5px] ${
                            labelText?.toLowerCase() === "new message"
                              ? "bg-[#EB5757]"
                              : "bg-[#4f4f4f]"
                          }`}
                        ></div>
                      </div>
                    )}

                    <InboxChat
                      type={
                        item?.name?.toLowerCase() === "you" ? "own" : "other"
                      }
                      chat={item}
                    />
                  </Fragment>
                );
              })}
          </div>

          {!!chats?.filter(
            (item) =>
              item?.isNew &&
              !item?.isRead &&
              item?.idInbox === inboxSelected?.idInbox
          )?.length && (
            <button
              type="button"
              role="button"
              aria-label="New Message"
              onClick={handleClickShowNewMessage}
              className={`absolute left-[48.5%] transform -translate-x-[48.5%] ${
                isLoadingConnectToTeamState &&
                inboxSelected?.idInbox ===
                  "d96059f8-0e40-41a0-9dc3-4a21f16e1d9a"
                  ? "bottom-[7.5rem]"
                  : "bottom-[4.5rem]"
              } w-fit h-fit rounded-md flex items-center justify-center cursor-pointer z-10 bg-[#E9F3FF] hover:bg-[#CCE4FF] transition-colors duration-200 ease-in-out group px-[12px] py-2`}
            >
              <p className="text-sm text-[#2F80ED] group-hover:text-[#1C5BBF] transition-colors duration-200 ease-in-out text-center text-nowrap">
                New Message
              </p>
            </button>
          )}

          {isLoadingConnectToTeamState &&
            inboxSelected?.idInbox ===
              "d96059f8-0e40-41a0-9dc3-4a21f16e1d9a" && (
              <div className="w-auto mb-[10.59px] rounded-md mx-8 z-10 bg-[#E9F3FF] flex flex-row flex-nowrap gap-[11px] p-2.5 items-center justify-start">
                <CircularProgress size={18} />

                <p className="text-sm">
                  Please wait while we connect you with one of our team ...
                </p>
              </div>
            )}

          <div className="flex flex-row flex-nowrap items-end gap-[13px] px-5">
            <textarea
              ref={inputRef}
              placeholder="Type a message"
              rows={1}
              value={messageState}
              className="w-full rounded-md px-4 py-2 text-[#333333] border border-[#828282] text-sm resize-none min-h-10"
              onChange={handleChangeMessage}
              onKeyDown={handleKeyDown}
            />

            <button
              type="submit"
              role="button"
              aria-label="Submit"
              onClick={handleSubmitChat}
              className="px-4 py-2 bg-[#2F80ED] hover:bg-[#1366D6] transition-colors duration-200 ease-in-out rounded-md cursor-pointer h-full max-h-10"
            >
              <p className="text-white text-base">Submit</p>
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
