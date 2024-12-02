import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ListItem } from "./api/getListData";

type State = {
  cards: ListItem[];
  expandedCardIds: ListItem["id"][];
  deletedCardsIds: ListItem["id"][];
  deletedCards: Omit<ListItem, "isVisible" | "description">[];
};

type Actions = {
  setList: (list: ListItem[]) => void;
  toggleCard: (id: ListItem["id"]) => void;
  deleteCard: (id: ListItem["id"]) => void;
  setDeletedCardsIds: (id:ListItem["id"][]) => void
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
    }),

  setDeletedCardsIds: (cardListItemsId) =>
    set((state) => ({
      deletedCardsIds: [...cardListItemsId, ...state.deletedCardsIds]
    }))
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
      name: "reveal-cards-storage",

      onRehydrateStorage: () => (persistedState, error) => {
        if (error) {
          throw new Error(`Rehydration error: ${error instanceof Error ? error.message : String(error)}`);
        } else {
          if (persistedState?.revealCards) {
            const deletedCardsIds = persistedState.revealCards.map((card) => card.id);
            useStore.getState().setDeletedCardsIds([...deletedCardsIds]);
          }
        }
      },
    }
  )
);
