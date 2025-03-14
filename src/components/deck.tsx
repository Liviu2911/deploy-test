import { IoTrash } from "react-icons/io5";
import { Link } from "@tanstack/react-router";
import { supabase } from "../supabase";

type Deck = {
  name: string;
  id: string;
};

const deleteDeck = async (id: string) => {
  const { error } = await supabase.from("decks").delete().eq("id", id);
  if (error) console.log(error);
};

function Deck({ deck }: { deck: Deck }) {
  return (
    <div className="p-2 border border-stone-300 rounded-lg max-w-fit hover:bg-stone-100 t3 flex flex-row items-center gap-2">
      <Link to="/$deckId" params={{ deckId: deck.id }}>
        {deck.name}
      </Link>
      <button
        onClick={async () => {
          await deleteDeck(deck.id);
        }}
        className="opacity-75 hover:oapcity-100 hover:text-red-500 t3"
      >
        <IoTrash />
      </button>
    </div>
  );
}

export default Deck;
