import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import ExpandChatIcon from "../../assets/icons/expand-chat-icon.svg";
import DeleteButton from "../buttons/DeleteButton";
import EditButton from "../buttons/EditButton";
import { formatDate } from "../../utils/datetime";
import type { ChatType } from "../../types/chatType";
import {
  useChatActions,
  useChatIsEdit,
  useChats,
  useChatSelected,
} from "../../stores/chatStore";
import { deleteChat, patchChat } from "../../service/inbox";
import { useInboxActions, useInboxSelected } from "../../stores/inboxStore";
import BonusButton from "../buttons/BonusButton";

type InboxChatProps = {
  type: "own" | "other";
  chat: ChatType | null;
};

const conditionColor = {
  you: {
    background: "bg-[#EEDCFF]",
    text: "text-[#9B51E0]",
  },
  maryhilda: {
    background: "bg-[#FCEED3]",
    text: "text-[#E5A443]",
  },
  obaidullahamarkhil: {
    background: "bg-[#D2F2EA]",
    text: "text-[#43B78D]",
  },
  ellen: {
    background: "bg-[#fbe7e7]",
    text: "text-[#661b00]",
  },
  cameronphillips: {
    background: "bg-[#FFE0F0]",
    text: "text-[#D81B60]",
  },
  fastvisasupport: {
    background: "bg-[#F8F8F8]",
    text: "text-[#2F80ED]",
  },
};

export default function InboxChat({ type, chat }: InboxChatProps) {
  const chats = useChats();
  const chatIsEdit = useChatIsEdit();
  const chatSelected = useChatSelected();
  const {
    setChatSelected,
    setDeleteChatById,
    setIsEdit,
    setIsReply,
    setUpdateChatById,
  } = useChatActions();
  const inboxSelected = useInboxSelected();
  const { setUpdateInboxById } = useInboxActions();

  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatWrapperRef = useRef<HTMLDivElement>(null);

  const [isOpenExpandState, setIsOpenExpandState] = useState<boolean>(false);
  const [messageState, setMessageState] = useState<string>("");
  const [chatBoxWidth, setChatBoxWidth] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const handleExpand = () => {
    setIsOpenExpandState(!isOpenExpandState);
  };

  const handleClickEditChat = () => {
    const chatWrapper = chatWrapperRef.current;

    if (chat) {
      setIsEdit(true);
      setIsReply(false);
      setChatSelected(chat);
    }

    if (chatWrapper) {
      const width = chatWrapper.getBoundingClientRect().width;
      const height = chatWrapper.getBoundingClientRect().height;
      setChatBoxWidth({
        width,
        height,
      });
    }

    handleExpand();
  };

  const handleClickReplyChat = () => {
    setIsReply(true);
    setChatSelected(chat);
    handleExpand();
  };

  const handleDeleteChat = async () => {
    if (chat) {
      await deleteChat(chat.idChat);
      setDeleteChatById(chat.idChat);

      if (chat.idInbox !== inboxSelected?.idInbox) return;

      const sortedChats = chats
        ?.filter((item) => item?.idInbox === inboxSelected?.idInbox)
        ?.sort((a, b) => a.datetime - b.datetime);
      const lastChat = sortedChats?.[sortedChats.length - 2];

      const payloadInbox = {
        ...inboxSelected,
        message: lastChat?.message,
        name:
          inboxSelected?.idInbox === "d96059f8-0e40-41a0-9dc3-4a21f16e1d9a"
            ? null
            : lastChat?.name,
        datetime: lastChat?.datetime,
        idChat: lastChat?.idChat,
      };
      setUpdateInboxById(inboxSelected?.idInbox, payloadInbox);
    }

    handleExpand();
  };

  const handleChangeMessage = (event: FormEvent<HTMLTextAreaElement>) => {
    const textArea = inputRef.current;

    setMessageState(event.currentTarget.value);

    if (textArea) {
      textArea.style.height = "auto";
      textArea.style.height = `${textArea.scrollHeight}px`;
    }
  };

  const handleCancelEditChat = () => {
    setIsEdit(false);
    setChatSelected(null);
    setMessageState("");
  };

  const handleSubmitChat = useCallback(
    async (idChat?: string) => {
      try {
        if (!idChat) return;

        await patchChat(idChat, { message: messageState });
        setUpdateChatById(idChat, { message: messageState });

        if (
          idChat !== inboxSelected?.idChat ||
          inboxSelected?.idInbox !== chatSelected?.idInbox
        )
          return;

        const payloadInbox = {
          ...inboxSelected,
          message: messageState,
          name:
            inboxSelected?.idInbox === "d96059f8-0e40-41a0-9dc3-4a21f16e1d9a"
              ? null
              : chatSelected?.name,
        };

        setUpdateInboxById(inboxSelected?.idInbox, payloadInbox);
      } catch (error) {
        console.error(error);
      } finally {
        setMessageState("");
        setIsEdit(false);
      }
    },
    [
      chatSelected?.idInbox,
      chatSelected?.name,
      inboxSelected,
      messageState,
      setIsEdit,
      setUpdateChatById,
      setUpdateInboxById,
    ]
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmitChat(chatSelected?.idChat);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpenExpandState(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const textArea = inputRef.current;
    const chatWrapper = chatWrapperRef.current;

    if (!textArea || !chatWrapper || !chatIsEdit) return;

    setMessageState(chatSelected?.message || "");
    textArea.value =
      chatSelected?.idChat === chat?.idChat ? chatSelected?.message || "" : "";
    textArea.style.height = "fit-content";
    textArea.style.height = `${(chatBoxWidth?.height || 20) - 20}px`;
    textArea.style.minWidth = `${chatBoxWidth?.width}px`;
    textArea.style.maxHeight = "10rem";
    textArea.focus();
  }, [chat?.idChat, chatBoxWidth, chatIsEdit, chatSelected]);

  useEffect(() => {
    const textArea = inputRef.current;

    if (!textArea) return;

    textArea.style.overflowY =
      Number(textArea.style.height?.split("px")[0] || 45) > 45
        ? "scroll"
        : "hidden";
  }, [messageState]);

  if (type === "own") {
    return (
      <div className="flex flex-col w-full h-fit items-end justify-start ml-auto max-w-9/12">
        <p
          className={`${
            conditionColor?.[
              chat?.name
                ?.split(" ")
                ?.join("")
                ?.toLowerCase() as keyof typeof conditionColor
            ]?.text
          } font-semibold text-sm`}
        >
          You
        </p>

        <div className="flex flex-col gap-1">
          {chat?.isReply && (
            <div className="bg-[#E0E0E0] p-2 min-w-22 rounded-md text-sm w-fit ml-auto">
              <pre className="text-start text-wrap text-sm">
                {chats?.find((item) => item.idChat === chat?.idReply)?.message}
              </pre>
            </div>
          )}

          <div className="flex flex-row flex-nowrap justify-end gap-1">
            <div ref={menuRef} className="w-fit h-fit relative">
              <button
                type="button"
                role="button"
                aria-label="Expand"
                onClick={handleExpand}
                className="flex items-start justify-center w-4 h-4 cursor-pointer"
              >
                <img src={ExpandChatIcon} alt="Expand" className="w-4 h-4" />
              </button>

              {isOpenExpandState && (
                <div className="absolute top-full bg-white rounded-md border border-[#BDBDBD] min-w-[126px] overflow-hidden shadow-sm">
                  <div className="border-b border-[#BDBDBD]">
                    <EditButton onClick={handleClickEditChat} />
                  </div>

                  <DeleteButton onClick={handleDeleteChat} />
                </div>
              )}
            </div>

            <div
              ref={chatWrapperRef}
              className={`flex flex-col gap-[12px] w-fit ${
                conditionColor?.[
                  chat?.name
                    ?.split(" ")
                    ?.join("")
                    ?.toLowerCase() as keyof typeof conditionColor
                ]?.background
              } rounded-md p-2 text-sm min-w-22`}
            >
              {chatIsEdit && chatSelected?.idChat === chat?.idChat ? (
                <>
                  <textarea
                    ref={inputRef}
                    placeholder="Type a message"
                    rows={1}
                    value={messageState}
                    className="w-full rounded-md px-4 py-2 text-[#333333] border border-[#828282] text-sm resize-none min-h-10"
                    onChange={handleChangeMessage}
                    onKeyDown={handleKeyDown}
                  />

                  <div className="flex flex-row gap-2 items-center justify-end">
                    <button
                      type="button"
                      className="cursor-pointer rounded-full px-3 py-1 bg-white hover:bg-neutral-100 transition-colors duration-200 ease-in-out"
                      onClick={handleCancelEditChat}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      className="cursor-pointer rounded-full px-3 py-1 bg-[#d5adfb] text-white hover:bg-[#b87df9] transition-colors duration-200 ease-in-out"
                      onClick={() => handleSubmitChat(chat?.idChat)}
                    >
                      Submit
                    </button>
                  </div>
                </>
              ) : (
                <pre className="text-start text-wrap text-sm">
                  {chat?.message}
                </pre>
              )}

              <p className="text-xs text-start">
                {formatDate(chat?.datetime || "-", "HH:mm")}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col w-full h-fit items-start justify-start max-w-9/12 mr-auto">
        <p
          className={`${
            conditionColor?.[
              chat?.name
                ?.split(" ")
                ?.join("")
                ?.toLowerCase() as keyof typeof conditionColor
            ]?.text
          } font-semibold text-sm`}
        >
          {chat?.name}
        </p>

        <div className="flex flex-row flex-nowrap justify-start gap-1">
          <div
            className={`flex flex-col gap-[12px] w-fit ${
              conditionColor?.[
                chat?.name
                  ?.split(" ")
                  ?.join("")
                  ?.toLowerCase() as keyof typeof conditionColor
              ]?.background
            } rounded-md p-2 text-sm min-w-22`}
          >
            <pre className="text-start text-wrap text-sm">{chat?.message}</pre>

            <p className="text-xs text-start">
              {formatDate(chat?.datetime || "-", "HH:mm")}
            </p>
          </div>

          <div ref={menuRef} className="w-fit h-fit relative">
            <button
              type="button"
              role="button"
              aria-label="Expand"
              onClick={handleExpand}
              className="flex items-start justify-center w-4 h-4 cursor-pointer"
            >
              <img src={ExpandChatIcon} alt="Expand" className="w-4 h-4" />
            </button>

            {isOpenExpandState && (
              <div className="absolute top-full bg-white rounded-md border border-[#BDBDBD] min-w-[126px] overflow-hidden shadow-sm">
                <div className="border-b border-[#BDBDBD]">
                  <BonusButton
                    displayText="Reply"
                    onClick={handleClickReplyChat}
                  />
                </div>

                <div className="border-b border-[#BDBDBD]">
                  <BonusButton
                    displayText="Share"
                    onClick={() => console.log("Click Reply")}
                  />
                </div>

                <DeleteButton onClick={handleDeleteChat} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
