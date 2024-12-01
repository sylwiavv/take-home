import { CardListActions } from "./CardListActions";
import { useStore } from "../store";
import { Card } from "./Card";

export const CardListActionsSection = () => {
  const { revealCards } = useStore((state) => state);

  return (
    <div className="flex-1">
      <CardListActions />

      <div className="flex flex-col gap-y-4 max-w-[320px]">
        {revealCards.map(({ id, title }) => (
          <Card key={id} id={id} title={title} isRevealCard={true} />
        ))}
      </div>

      <div className="flex flex-col gap-y-3">
        {/* {deletedCards.map((card) => (
            <Card key={card.id} card={card} />
          ))} */}
      </div>
    </div>
  );
};
