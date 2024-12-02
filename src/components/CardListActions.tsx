import { ToggleButton } from "./ToggleButton";
import {
  useStore,
  useRevealCardsStore,
  useExpandedCardsStore,
  useDeletedCardsStore,
} from "../store";
import { useGetListData } from "../api/getListData";
import { ListItem } from "../api/getListData";
import { ListDetails } from "./ListDetails";

export const CardListActions = () => {
  const { refreshState } = useStore((state) => state);
  const { setRevealCards, resetRevealCards } = useRevealCardsStore(
    (state) => state
  );
  const { deletedCards, resetDeletedCards } = useDeletedCardsStore();
  const { resetExpandedCards } = useExpandedCardsStore();
  const { data: cardsList } = useGetListData();

  const resetState = () => {
    refreshState(cardsList as ListItem[]);

    resetExpandedCards();
    resetRevealCards();
    resetDeletedCards();
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex w-full justify-between flex-col md:flex-row gap-2">
          <p className="mr-4 text-[#a1b0bd]">List actions</p>

          <div className="flex gap-2 mb-5">
            <ToggleButton
              className={"hover:bg-gray-900 disabled:bg-black/75 bg-gray-900"}
              disabled={deletedCards.length <= 0}
              onClick={() => setRevealCards(deletedCards)}
              buttonText={"Reveal"}
            />
            <ToggleButton
              className={
                "hover:bg-green-800 disabled:bg-green-800/75 bg-green-700"
              }
              onClick={resetState}
              buttonText={"Refresh"}
            />
          </div>
        </div>

        <ListDetails
          title="Deleted/Reveal Cards"
          cardsLength={deletedCards.length}
        />
      </div>
    </>
  );
};
