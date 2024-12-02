import { useEffect } from "react";
import { useGetListData } from "../../api/getListData";
import { Spinner } from "../atoms/Spinner";
import { useStore } from "../../store";
import { CardListLeading } from "../atoms/CardListLeading";
import { CardList } from "../molecues/CardList";
import { CardListActionsSection } from "../organism/CardListActionsSection";

export const Entrypoint = () => {
  const { setList } = useStore((state) => state);

  const listQuery = useGetListData();

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
    <div className="py-32 max-w-screen-lg">
      <CardListLeading />

      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 rounded-lg py-8">
        <CardList />

        <CardListActionsSection />
      </div>
    </div>
  );
};
