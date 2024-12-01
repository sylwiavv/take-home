import { create } from "zustand";
import { ListItem } from "./api/getListData";

type State = {
  cards: ListItem[];
  expandedCardIds: number[];
  deletedCardsIds: number[];
};

type Actions = {
  setList: (list: ListItem[]) => void;
  toggleCard: (id: number) => void;
  // deleteCard: (id:ListItem['id']) => void;
  deleteCard: (id: number) => void;
};

export const useStore = create<State & Actions>((set) => ({
  cards: [],
  expandedCardIds: [],
  deletedCardsIds: [],

  setList: (list) => set({ cards: list }),

  toggleCard: (id) =>
    set((state) => ({
      expandedCardIds: state.expandedCardIds.includes(id)
        ? state.expandedCardIds.filter((cardId) => cardId !== id)
        : [...state.expandedCardIds, id],
    })),

  deleteCard: (id) =>
    set((state) => ({
      cards: state.cards.filter((card) => card.id !== id),

      deletedCardsIds: [...state.deletedCardsIds, id]
    }))
}));