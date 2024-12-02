import { FC, useCallback, useState } from "react";
import { ListItem } from "../api/getListData";
import {
  useExpandedCardsStore,
  useDeletedCardsStore,
  useStore,
} from "../store";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronDownIcon, ChevronUpIcon } from "./icons";

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
    <div className={`rounded px-3 py-2 custom-box-shadow w-full max-w-[400px]`}>
      {id}
      <div className="flex justify-between">
        <h2 className="font-large font-semibold mr-2">{title}</h2>

        {!isRevealCard && (
          <div className="flex items-center gap-1">
            <ExpandButton onClick={() => toggleExpandedCard(id)}>
              {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </ExpandButton>

            <DeleteButton onClick={() => deleteCardOnClick(id)} />
          </div>
        )}
      </div>
      {isExpanded && <p className={`mt-1.5`}>{description}</p>}
    </div>
  );
};
