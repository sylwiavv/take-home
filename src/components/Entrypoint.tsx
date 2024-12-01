import { useEffect } from "react";
import { useGetListData } from "../api/getListData";
import { Spinner } from "./Spinner";
import { useStore } from "../store";
import { CardListLeading } from "./CardListLeading";
import { CardList } from "./CardList";
import { CardListActionsSection } from "./CardListActionsSection";

export const Entrypoint = () => {
  const {
    cards,
    setList,
  } = useStore((state) => state);
  const listQuery = useGetListData();
  const cardsLength = cards.length;

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
      <CardListLeading cardsLength={cardsLength} />

      <div className="flex flex-1 gap-x-16 rounded-lg py-8 px-8">
        <CardList />

        <CardListActionsSection />
      </div>
    </div>
  );
};
