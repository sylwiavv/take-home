export const ListCounter = ({ cardsLength, text="List have " }: { cardsLength: number, text?: string }) => {
  const cardListIsEmpty = cardsLength === 0;

  return (
    <div>
      {cardListIsEmpty ? (
        <p>The list is empty.</p>
      ) : (
        <p className="text-[#a1b0bd]">
          {text}( {cardsLength} ){cardsLength > 1 ? " items" : " item"}
        </p>
      )}
    </div>
  );
};
