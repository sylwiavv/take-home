import { useCallback, useEffect, useState } from "react";
import { useGetListData } from "../api/getListData";
import { Card } from "./Card";
import { Spinner } from "./Spinner";
import { useStore } from "../store";

export const Entrypoint = () => {
  const { cards, deletedCardsIds, deletedCards, revealCards, setList, setRevealCards } = useStore(
    (state) => state
  );
  const listQuery = useGetListData();

  // TOOD
  // const deletedCards: DeletedListItem[] = [];

  useEffect(() => {
    if (listQuery.isLoading) {
      return;
    }

    const visibleCards = listQuery.data?.filter((item) => item.isVisible) ?? [];

    setList(visibleCards);
  }, [listQuery.data, listQuery.isLoading]);


  if (listQuery.isLoading) {
    return (
      <div className="flex justify-center items-center bg-white h-screen w-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="py-32">
      <div className="py-10 px-5 mb-10">
        <h1 className="font-extrabold text-5xl uppercase tracking-wide">
          My Awesome List
          {cards.length !== 0 && (
            <>
              ({cards.length}){cards.length > 1 ? " items" : " item"}
            </>
          )}
        </h1>
      </div>

      <div className="flex flex-1 gap-x-16 rounded-lg py-8 px-8">
        {cards.length === 0 && (
          <div>
            <p>The list is empty.</p>
          </div>
        )}

        <div className="flex flex-col gap-y-4 max-w-[320px]">
          {cards.map(({ id, title, description }) => (
            <Card key={id} id={id} title={title} description={description} />
          ))}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="mb-1 font-medium text-lg">
              Deleted Cards ({deletedCardsIds.length})
            </p>

            <div className="flex items-center justify-between gap-2">
              <button
                disabled={deletedCards.length <= 0}
                className="text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/75 bg-gray-700 rounded px-3 py-1"
                onClick={() => setRevealCards(deletedCards)}
              >
                Reveal
              </button>
              <button
                // disabled
                className="text-white text-sm transition-colors hover:bg-green-800 disabled:bg-green-800/75 bg-green-700 rounded px-3 py-1"
              >
                Refresh
              </button>
            </div>
          </div>

            <div className="flex flex-col gap-y-4 max-w-[320px]">
              {revealCards.map(({id, title}) => (
                <Card key={id} id={id} title={title} isRevealCard={true} />
              ))}
            </div>
        

          <div className="flex flex-col gap-y-3">
            {/* {deletedCards.map((card) => (
            <Card key={card.id} card={card} />
          ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};
