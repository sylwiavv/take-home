import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ListItem } from "./api/getListData";
import { ExpandedCardsIdStorage, RevealCardsStorage } from "./ulits/constans";

type State = {
  cards: ListItem[];
  expandedCardIds: ListItem["id"][];
  deletedCardsIds: ListItem["id"][];
  deletedCards: Omit<ListItem, "isVisible" | "description">[];
};

type Actions = {
  setList: (list: ListItem[]) => void;
  deleteCard: (id: ListItem["id"]) => void;
  setDeletedCardsIds: (id: ListItem["id"][]) => void;
  refreshState: (newCards: ListItem[]) => void;
};

type RevealCardsState = {
  revealCards: Omit<ListItem, "isVisible" | "description">[];
}

type RevealCardsAction = {
  setRevealCards: (cards: Omit<ListItem, "isVisible" | "description">[]) => void;
  resetRevealCards: () => void;
}

type ExpandedCardState = {
  expandedCardIds: ListItem["id"][];
};

type ExpandedCardAction = {
  toggleExpandedCard: (id: ListItem["id"]) => void;
  resetExpandedCards: () => void;
};


export const useStore = create<State & Actions>((set) => ({
  cards: [],
  expandedCardIds: [],
  deletedCardsIds: [],
  deletedCards: [],
  revealCards: [],

  setList: (list) => set({ cards: list }),

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
    })),

  refreshState: (newCards) =>
    set(() => {
      localStorage.removeItem(RevealCardsStorage);
      localStorage.removeItem(ExpandedCardsIdStorage);

      return {
        cards: newCards,
        deletedCardsIds: [],
        expandedCardIds: [],
        deletedCards: [],
        revealCards: []
      }
    }),
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
          
          console.log(state.revealCards);
          return {
            revealCards: [...state.revealCards, ...uniqueCards],
          };
        }),
        resetRevealCards: () => set(() => ({ revealCards: [] })),
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
    },
  )
);


export const useExpandedCardsStore = create<ExpandedCardState & ExpandedCardAction>()(
  persist(
    (set) => ({
      expandedCardIds: [],

      toggleExpandedCard: (id) =>
        set((state) => ({
          expandedCardIds: state.expandedCardIds.includes(id)
            ? state.expandedCardIds.filter((cardId) => cardId !== id)
            : [...state.expandedCardIds, id],
        })),

      resetExpandedCards: () => set(() => ({ expandedCardIds: [] })),
    }),
    {
      name: ExpandedCardsIdStorage
    }
  )
);