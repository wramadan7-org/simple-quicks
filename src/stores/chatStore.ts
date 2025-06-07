import { create } from "zustand";
import type { ChatType } from "../types/chatType";

type State = {
  chats: ChatType[];
  chatSelected: ChatType | null;
  isEdit: boolean;
  loading: boolean;
  error: boolean;
};

type Action = {
  actions: {
    setChats: (chats: ChatType[]) => void;
    setChatSelected: (chat: ChatType | null) => void;
    setIsEdit: (isEdit: boolean) => void;
    setSendChat: (chat: ChatType) => void;
    setUpdateChatById: (idChat: string, updatedChat: Partial<ChatType>) => void;
    setDeleteChatById: (idChat: string) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: boolean) => void;
  };
};

const chatStore = create<State & Action>((set) => ({
  chats: [
    {
      idChat: "1234-1234-3221-4331",
      idInbox: "8c197e93-6d2e-4aa4-b5b3-2b0df02fb0ae",
      name: "Mary Hilda",
      from: "109220-Naturalization",
      to: "109220-Naturalization",
      message: "Just Fill me in for his updates yea?",
      datetime: 1623155520,
      isReply: false,
      isNew: false,
      isRead: true,
      createdBy: "user",
    },
    {
      idChat: "1234-1234-3221-1212",
      idInbox: "8c197e93-6d2e-4aa4-b5b3-2b0df02fb0ae",
      name: "You",
      from: "109220-Naturalization",
      to: "109220-Naturalization",
      message:
        "No worries. It will be completed ASAP. I’ve asked him yesterday.",
      datetime: 1623155520,
      isReply: false,
      isNew: false,
      isRead: true,
      createdBy: "user",
    },
    {
      idChat: "1234-1234-3221-2312",
      idInbox: "8c197e93-6d2e-4aa4-b5b3-2b0df02fb0ae",
      name: "Mary Hilda",
      from: "109220-Naturalization",
      to: "109220-Naturalization",
      message:
        "Hello Obaidullah, I will be your case advisor for case #029290. I have assigned some homework for you to fill. Please keep up with the due dates. Should you have any questions, you can message me anytime. Thanks.",
      datetime: 1623223200,
      isReply: false,
      isNew: false,
      isRead: true,
      createdBy: "user",
    },
    {
      idChat: "1234-1234-3221-3071",
      idInbox: "8c197e93-6d2e-4aa4-b5b3-2b0df02fb0ae",
      name: "You",
      from: "109220-Naturalization",
      to: "109220-Naturalization",
      message:
        "Please contact Mary for questions regarding the case bcs she will be managing your forms from now on! Thanks Mary.",
      datetime: 1623223260,
      isReply: false,
      isNew: false,
      isRead: true,
      createdBy: "user",
    },
    {
      idChat: "1234-1234-3221-8391",
      idInbox: "8c197e93-6d2e-4aa4-b5b3-2b0df02fb0ae",
      name: "Mary Hilda",
      from: "109220-Naturalization",
      to: "109220-Naturalization",
      message: "Sure thing, Claren",
      datetime: 1623223260,
      isReply: false,
      isNew: false,
      isRead: true,
      createdBy: "user",
    },
    {
      idChat: "1234-1234-3221-8392",
      idInbox: "8c197e93-6d2e-4aa4-b5b3-2b0df02fb0ae",
      name: "Obaidullah Amarkhil",
      from: "109220-Naturalization",
      to: "109220-Naturalization",
      message: "Morning. I’ll try to do them. Thanks",
      datetime: 1623226800,
      isReply: false,
      isNew: true,
      isRead: true,
      createdBy: "user",
    },
    {
      idChat: "1234-1234-3221-9101",
      idInbox: "2f4496a7-93fc-4606-b3ef-382b3a2605b0",
      name: "Ellen",
      from: "Jeannette Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ]",
      to: "Jeannette Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ]",
      message: "Hey, please read.",
      datetime: 1622605500,
      isReply: false,
      isNew: false,
      isRead: true,
      createdBy: "user",
    },
    {
      idChat: "1234-1234-3221-9102",
      idInbox: "2f4496a7-93fc-4606-b3ef-382b3a2605b0",
      name: "You",
      from: "Jeannette Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ]",
      to: "Jeannette Moraima Guaman Chamba (Hutto I-589) [ Hutto Follow Up - Brief Service ]",
      message: "Thanks Ellen, got it. I’ll review it today.",
      datetime: 1622606100,
      isReply: false,
      isNew: false,
      isRead: true,
      createdBy: "user",
    },
    {
      idChat: "1234-1234-3221-9201",
      idInbox: "5d39ad56-1a2e-49f6-a60d-7ad96de0a71f",
      name: "Cameron Phillips",
      from: "8405-Diana SALAZAR MUNGUIA",
      to: "8405-Diana SALAZAR MUNGUIA",
      message:
        "I understand your initial concerns and that’s very valid, Elizabeth. But you shouldn’t be concerned about it. You are not alone. You are not the only one who is going through this.",
      datetime: 1622524740,
      isReply: false,
      isNew: false,
      isRead: true,
      createdBy: "user",
    },
    {
      idChat: "1234-1234-3221-9202",
      idInbox: "5d39ad56-1a2e-49f6-a60d-7ad96de0a71f",
      name: "You",
      from: "8405-Diana SALAZAR MUNGUIA",
      to: "8405-Diana SALAZAR MUNGUIA",
      message: "Thank you for the kind words, Cameron. That really helps.",
      datetime: 1622525340,
      isReply: false,
      isNew: false,
      isRead: true,
      createdBy: "user",
    },
    {
      idChat: "1234-1234-3221-9301",
      idInbox: "d96059f8-0e40-41a0-9dc3-4a21f16e1d9a",
      name: "FastVisa Support",
      from: "FastVisa Support",
      to: "FastVisa Support",
      message:
        "Hey there. Welcome to your inbox! Contact us for more information and help about anything! We’ll send you a response as soon as possible.",
      datetime: 1622524740,
      isReply: false,
      isNew: false,
      isRead: true,
      createdBy: "system",
    },
    {
      idChat: "1234-1234-3221-9302",
      idInbox: "d96059f8-0e40-41a0-9dc3-4a21f16e1d9a",
      name: "You",
      from: "FastVisa Support",
      to: "FastVisa Support",
      message: "Hi, I need help with something can you help me ?",
      datetime: 1622524800,
      isReply: false,
      isNew: false,
      isRead: true,
      createdBy: "user",
    },
  ],
  loading: false,
  error: false,
  chatSelected: null,
  isEdit: false,
  actions: {
    setChats: (chats) => set({ chats }),
    setChatSelected: (chat) => set({ chatSelected: chat }),
    setIsEdit: (isEdit) => set({ isEdit }),
    setSendChat: (chat) => set((state) => ({ chats: [chat, ...state.chats] })),
    setUpdateChatById: (idChat: string, updatedChat: Partial<ChatType>) =>
      set((state) => ({
        chats: state.chats.map((chat) =>
          chat.idChat === idChat ? { ...chat, ...updatedChat } : chat
        ),
      })),
    setDeleteChatById: (idChat: string) =>
      set((state) => ({
        chats: state.chats.filter((chat) => chat.idChat !== idChat),
      })),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
  },
}));

export const useChats = () => chatStore((state) => state.chats);
export const useChatSelected = () => chatStore((state) => state.chatSelected);
export const useChatIsEdit = () => chatStore((state) => state.isEdit);
export const useChatLoading = () => chatStore((state) => state.loading);
export const useChatError = () => chatStore((state) => state.error);
export const useChatActions = () => chatStore((state) => state.actions);
