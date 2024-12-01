import { ToggleButton } from "./ToggleButton";
import { useStore, useRevealCardsStore } from "../store";

export const CardListActions = () => {
  const { deletedCardsIds, deletedCards } = useStore((state) => state);
  const { revealCards, setRevealCards } = useRevealCardsStore((state) => state);

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="mb-1 font-medium text-lg">
          Deleted Cards ({revealCards.length})
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
            disabled={deletedCards.length <= 0}
            onClick={() => setRevealCards(deletedCards)}
            buttonText={"Refresh"}
          />
        </div>
      </div>
    </>
  );
};
