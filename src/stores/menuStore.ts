import { create } from "zustand";

type State = {
  isOpenMenu: boolean;
  activeMenu: "quick" | "task" | "inbox";
  showButtons: boolean;
  renderButtons: boolean;
};

type Action = {
  actions: {
    setOpenMenu: () => void;
    setCloseMenu: () => void;
    setActiveMenu: (active: "quick" | "task" | "inbox") => void;
    toggleButtons: () => void;
    setShowButtons: (show: boolean) => void;
    setRenderButtons: (render: boolean) => void;
  };
};

const useMenuStore = create<State & Action>((set, get) => ({
  isOpenMenu: false,
  activeMenu: "quick",
  showButtons: false,
  renderButtons: false,
  actions: {
    setOpenMenu: () => set({ isOpenMenu: true }),
    setCloseMenu: () => set({ isOpenMenu: false }),
    setActiveMenu: (activeMenuParam) => {
      set({
        activeMenu:
          activeMenuParam === get().activeMenu ? "quick" : activeMenuParam,
        isOpenMenu: activeMenuParam === get().activeMenu ? false : true,
      });
    },
    setShowButtons: (show) => set({ showButtons: show }),
    setRenderButtons: (render) => set({ renderButtons: render }),
    toggleButtons: () => {
      const { showButtons, actions } = get();

      if (showButtons) {
        actions.setShowButtons(false);
        setTimeout(() => {
          actions.setRenderButtons(false);
          actions.setActiveMenu("quick");
        }, 300);
      } else {
        actions.setRenderButtons(true);
        setTimeout(() => actions.setShowButtons(true), 10);
        actions.setActiveMenu("quick");
      }
    },
  },
}));

export const useIsOpenMenu = () => useMenuStore((state) => state.isOpenMenu);
export const useActiveMenu = () => useMenuStore((state) => state.activeMenu);
export const useShowButtons = () => useMenuStore((state) => state.showButtons);
export const useRenderButtons = () =>
  useMenuStore((state) => state.renderButtons);
export const useMenuActions = () => useMenuStore((state) => state.actions);

export default useMenuStore;
