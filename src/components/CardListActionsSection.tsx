import { CardListActions } from "./CardListActions";
import { useRevealCardsStore } from "../store";
import { Card } from "./Card";

export const CardListActionsSection = () => {
  const { revealCards } = useRevealCardsStore((state) => state);

  return (
    <div className="flex-2 col-span-1 p-6">
      <CardListActions  />

      <div className="flex flex-col gap-y-4 w-full">
        {revealCards.map(({ id, title }) => (
          <Card key={id} id={id} title={title} isRevealCard={true} />
        ))}
      </div>
    </div>
  );
};
