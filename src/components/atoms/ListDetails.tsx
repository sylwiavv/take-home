export const ListDetails = ({
  title,
  cardsLength,
  textBeforeCounter = "List has ",
}: {
  title: string;
  cardsLength: number;
  textBeforeCounter?: string;
}) => {
  const cardListIsEmpty = cardsLength === 0;

  return (
    <div className="mb-8">
      <h3 className="font-semibold text-3xl mb-2">{title}</h3>
      {cardListIsEmpty ? (
        <p>The list is empty.</p>
      ) : (
        <p className="text-[#28ae60]">
          {textBeforeCounter} <span>( {cardsLength} )</span>
          {cardsLength > 1 ? " items" : " item"}
        </p>
      )}
    </div>
  );
};
