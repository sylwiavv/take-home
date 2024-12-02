import { ToggleButton } from "./ToggleButton";
import { useStore, useRevealCardsStore, useExpandedCardsStore } from "../store";
import { useGetListData } from "../api/getListData";
import { ListItem } from "../api/getListData";

export const CardListActions = () => {
  const { deletedCardsIds, deletedCards, refreshState } = useStore((state) => state);
  const { setRevealCards, resetRevealCards } = useRevealCardsStore((state) => state);
  const { resetExpandedCards} = useExpandedCardsStore()
  const { data: cardsList } = useGetListData();

  const resetState = () => {
    refreshState(cardsList as ListItem[]);

    resetExpandedCards();
    resetRevealCards();
  };  
    return (
    <>
      <div className="flex items-center justify-between">
        <p className="mb-1 font-medium text-lg">
          Deleted Cards ({deletedCardsIds.length})
        </p>

        <div className="flex items-center justify-between gap-2">
          <ToggleButton
            className={"hover:bg-gray-800 disabled:bg-black/75 bg-gray-700"}
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
    </>
  );
};
