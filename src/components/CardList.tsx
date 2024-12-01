import { useStore } from "../store";
import { Card } from "./Card";

export const CardList = () => {
  const { cards } = useStore((state) => state);
  const cardListIsEmpty = cards.length;

  return (
    <>
      {cardListIsEmpty && (
        <div>
          <p>The list is empty.</p>
        </div>
      )}

      <div className="flex flex-col gap-y-4 max-w-[320px]">
        {cards.map(({ id, title, description }) => (
          <Card key={id} id={id} title={title} description={description} />
        ))}
      </div>
    </>
  );
};
