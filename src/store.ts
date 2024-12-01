import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ListItem } from "./api/getListData";

type State = {
  cards: ListItem[];
  expandedCardIds: number[];
  deletedCardsIds: number[];
  deletedCards: Omit<ListItem, "isVisible" | "description">[];
  // revealCards: Omit<ListItem, "isVisible" | "description">[];
};

type Actions = {
  setList: (list: ListItem[]) => void;
  toggleCard: (id: number) => void;
  // deleteCard: (id:ListItem['id']) => void;
  deleteCard: (id: number) => void;
  // setRevealCards: (cards: Omit<ListItem, "isVisible" | "description">[]) => void
};

type RevealCardsState = {
  revealCards: Omit<ListItem, "isVisible" | "description">[];

}

type RevealCardsAction = {
  setRevealCards: (cards: Omit<ListItem, "isVisible" | "description">[]) => void
}

export const useStore = create<State & Actions>((set) => ({
  cards: [],
  expandedCardIds: [],
  deletedCardsIds: [],
  deletedCards: [],
  revealCards: [],

  setList: (list) => set({ cards: list }),

  toggleCard: (id) =>
    set((state) => ({
      expandedCardIds: state.expandedCardIds.includes(id)
        ? state.expandedCardIds.filter((cardId) => cardId !== id)
        : [...state.expandedCardIds, id],
    })),

  deleteCard: (id) =>
    set((state) => {
      const deletedCard = state.cards.find((card) => card.id === id);

      return {
        deletedCards: deletedCard
          ? [...state.deletedCards, { id: deletedCard.id, title: deletedCard.title }]
          : state.deletedCards,

        cards: state.cards.filter((card) => card.id !== id),

        deletedCardsIds: [...state.deletedCardsIds, id],
      };
    })
}));

export const useRevealCardsStore = create<RevealCardsState & RevealCardsAction>()(
  persist(
    (set) => ({
      revealCards: [],

      setRevealCards: (newCards) =>
        set((state) => {
          const uniqueCards = newCards.filter(
            (newCard) => !state.revealCards.some((existingCard) => existingCard.id === newCard.id)
          );

          return {
            revealCards: [...state.revealCards, ...uniqueCards],
          };
        }),
    }),
    {
      name: "reveal-cards-storage"
    }
  )
);
