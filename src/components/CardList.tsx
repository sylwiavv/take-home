import { useStore } from "../store";
import { Card } from "./Card";
import { ListDetails } from "./ListDetails";

export const CardList = () => {
  const { cards } = useStore((state) => state);
  const cardsLength = cards.length;

  return (
    <div className="col-span-2 md:grid-cols-1 bg-[#2a303a] p-4 md:p-10 rounded-3xl">
      <ListDetails title="Card list" cardsLength={cardsLength} />

      <div className="flex flex-col gap-y-4 rounded-3xl ">
        {cards.map(({ id, title, description }) => (
          <Card key={id} id={id} title={title} description={description} />
        ))}
      </div>
    </div>
  );
};
