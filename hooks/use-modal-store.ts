import { create } from "zustand";

export type ModalType = "createDepartment" | "editDepartment" | "deleteDepartment" | "createAccount" | "editAccount";

interface ModalStore {
    type: ModalType | null;
    isOpen: boolean;
    data: Record<string, any>;
    onOpen: (type: ModalType, data?: Record<string, any>) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type: ModalType, data: Record<string, any> = {}) =>
        set({ type, isOpen: true, data }),
    onClose: () => set({ type: null, isOpen: false, data: {} }),
}));