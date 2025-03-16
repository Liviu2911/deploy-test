import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useContext, useEffect, useState } from "react";
import { DecksContext, FlashcardsContext } from "../../__root";
import Leftmenu from "../../../components/leftmenu";

export const Route = createFileRoute("/$deckId/study/")({
  component: RouteComponent,
});

function RouteComponent() {
  const cards = useContext(FlashcardsContext);
  const deck = useContext(DecksContext).filter(
    (item) => item.id === cards[0].deck
  )[0];
  const [reveal, setReveal] = useState(false);
  const [order, setOrder] = useState<Record<string, string>[]>([]);
  const nav = useNavigate();

  const shuffle = () => {
    for (let i = 0; i < cards.length; i++) {
      const rand = Math.floor(Math.random() * cards.length);
      const x = cards[i];
      cards[i] = cards[rand];
      cards[rand] = x;
    }
    console.log("cards:", cards);

    setOrder(cards);
  };

  useEffect(() => {
    shuffle();
  }, []);

  const next = () => {
    order.shift();
    setReveal(false);

    if (!order.length) nav({ to: "/$deckId", params: { deckId: deck.id } });
  };

  return (
    <>
      <Leftmenu name={deck.name} />

      <div className="w-full flex flex-col items-center mt-20">
        <div className="flex flex-col gap-2 items-center max-w-fit">
          <h1 className="text-lg font-semibold">
            {order[0]?.front || "not found"}
          </h1>
          <button
            onClick={() => setReveal(true)}
            className="p-2 rounded-lg border border-stone-600 text-stone-600 hover:bg-stone-800 hover:text-stone-200 t3 cursor-pointer"
          >
            Reveal answer
          </button>

          {reveal && (
            <>
              <h1 className="text-lg font-semibold">{order[0]?.back}</h1>
              <button
                onClick={next}
                className="hover:opacity-75 t3 cursor-pointer"
              >
                Next
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
