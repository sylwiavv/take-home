import { useEffect } from "react";
import { useGetListData } from "../api/getListData";
import { Card } from "./Card";
import { Spinner } from "./Spinner";
import { useStore } from "../store";
import { CardListLeading } from "./CardListLeading";
import { CardList } from "./CardList";
import { CardListActions } from "./CardListActions";
import { CardListActionsSection } from "./CardListActionsSection";

export const Entrypoint = () => {
  const {
    cards,
    revealCards,
    setList,
  } = useStore((state) => state);
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
      <CardListLeading cardsLength={cards.length} />

      <div className="flex flex-1 gap-x-16 rounded-lg py-8 px-8">
        <CardList />

        <CardListActionsSection />
      </div>
    </div>
  );
};
