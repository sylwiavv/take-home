import { FC } from "react";
import { ListItem } from "../../api/getListData";
import { useExpandedCardsStore, useDeletedCardsStore } from "../../store";
import { DeleteButton, ExpandButton } from "../atoms/Buttons";
import { ChevronDownIcon, ChevronUpIcon } from "../../icons/icons";

type CardProps = {
  id: ListItem["id"];
  title: ListItem["title"];
  description?: ListItem["description"];
  isRevealCard?: boolean;
};

export const Card: FC<CardProps> = ({
  id,
  title,
  description,
  isRevealCard = false,
}) => {
  const { deleteCard } = useDeletedCardsStore();

  const { expandedCardIds, toggleExpandedCard } = useExpandedCardsStore();

  const isExpanded = expandedCardIds.includes(id);

  const deleteCardOnClick = (id: ListItem["id"]) => {
    deleteCard(id);
  };

  return (
    <div
      className={`rounded-3xl px-6 py-8 custom-box-shadow ${
        isExpanded ? "bg-[#2f2ea6]" : "bg-[#1a212a]"
      } text-[#eef4fb] ${
        !isRevealCard ? "border-solid border border-[#f0f8ff33]" : ""
      } ${
        isRevealCard ? "bg-[#2a303a]" : ""
      } transition-all duration-800 duration-500 ease-in-out transform`}
    >
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold mr-2">{title}</h2>

        {!isRevealCard && (
          <div className="flex items-center gap-1">
            <ExpandButton
              className="text-[#eed414] rounded-xl hover:bg-[#2a303ac4] transition-colors p-1"
              onClick={() => toggleExpandedCard(id)}
            >
              {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </ExpandButton>

            <DeleteButton onClick={() => deleteCardOnClick(id)} />
          </div>
        )}
      </div>
      <div
        className={`transition-all duration-500 ease-in-out transform ${
          isExpanded
            ? "max-h-[1000px] opacity-100 scale-100"
            : "max-h-0 opacity-0 scale-y-0"
        } overflow-hidden`}
      >
        <p className={`mt-1.5 text-[#c2c1e1]`}>{description}</p>
      </div>
    </div>
  );
};
