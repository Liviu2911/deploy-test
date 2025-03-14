import { Link, useNavigate } from "@tanstack/react-router";
import { IoTrash } from "react-icons/io5";
import { supabase } from "../supabase";

export type Flashcard = {
  front: string;
  back: string;
  id: string;
  deck: string;
};

function Card({ card }: { card: Flashcard }) {
  const navigate = useNavigate();
  const deleteCard = async () => {
    const { error } = await supabase
      .from("flashcards")
      .delete()
      .eq("id", card.id);

    if (error) console.log(error);
    else navigate({ to: "/$deckId", params: { deckId: card.deck } });
  };

  return (
    <div className="flex flex-row items-center gap-2 p-2 rounded-lg border border-stone-300">
      <Link
        to="/$deckId"
        params={{ deckId: card.deck }}
        search={{ editcard: card.id }}
      >
        {card.front}
      </Link>
      <button
        onClick={deleteCard}
        className="opacity-75 hover:opacity-100 hover:text-red-500 t3"
      >
        <IoTrash />
      </button>
    </div>
  );
}

export default Card;
