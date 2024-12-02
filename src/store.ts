import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ListItem } from "./api/getListData";
import { DeletedCardsStorage, ExpandedCardsIdStorage, RevealCardsStorage } from "./ulits/constans";

type State = {
  cards: ListItem[];
};

type Actions = {
  setList: (list: ListItem[]) => void;
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

type DeletedCardsState = {
  deletedCards: Omit<ListItem, "isVisible" | "description">[];
  deletedCardsIds: ListItem["id"][];
};

type DeletedCardsActions = {
  deleteCard: (id: ListItem["id"]) => void;
  resetDeletedCards: () => void;
};


export const useStore = create<State & Actions>((set) => ({
  cards: [],
  revealCards: [],

  setList: (list) => set({ cards: list }),

  refreshState: (newCards) =>
    set(() => {
      localStorage.removeItem(RevealCardsStorage);
      localStorage.removeItem(ExpandedCardsIdStorage);

      return {
        cards: newCards,
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
      name: RevealCardsStorage
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


export const useDeletedCardsStore = create<DeletedCardsState & DeletedCardsActions>()(
  persist(
    (set) => ({
      deletedCards: [],
      deletedCardsIds: [],

      deleteCard: (id) => {
        const store = useStore.getState();

        set((state) => {
          const cardToDelete = store.cards.find((card) => card.id === id);
  
          if (!cardToDelete) {
            return state;
          }

          store.setList(store.cards.filter((card) => card.id !== id));

          return {
            deletedCards: [...state.deletedCards, { id: cardToDelete.id, title: cardToDelete.title }],
            deletedCardsIds: [...state.deletedCardsIds, cardToDelete.id],
          };
        });
      },

      resetDeletedCards: () =>
        set(() => ({
          deletedCards: [],
          deletedCardsIds: [],
        })),
    }),
    {
      name: DeletedCardsStorage,
    }
  )
);