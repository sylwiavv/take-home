export const CardListLeading = ({ cardsLength }: { cardsLength: number }) => {
  const cardListIsEmpty = cardsLength === 0;

  return (
    <div className="py-10 px-5 mb-10">
      <h1 className="font-extrabold text-5xl uppercase tracking-wide">
        My Awesome List
        {!cardListIsEmpty && (
          <>
            ({cardsLength}){cardsLength > 1 ? " items" : " item"}
          </>
        )}
      </h1>
    </div>
  );
};
