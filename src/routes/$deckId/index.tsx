import {
  createFileRoute,
  Link,
  useNavigate,
  useParams,
  useSearch,
} from "@tanstack/react-router";
import { FormEvent, useContext } from "react";
import { DecksContext, FlashcardsContext } from "../__root";
import Form from "../../components/form";
import FormInput from "../../components/form/input";
import FormButton from "../../components/form/button";
import { supabase } from "../../supabase";
import Label from "../../components/form/label";
import Card from "../../components/card";
import Leftmenu from "../../components/leftmenu";

export const Route = createFileRoute("/$deckId/")({
  component: RouteComponent,
  validateSearch: (search) => {
    const { edit, create } = search;
    if (edit) search.create = undefined;
    else if (create) search.edit = undefined;
    return search;
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const { deckId: id } = useParams({ strict: false });
  const { edit, create, editcard } = useSearch({ strict: false });
  const deck = useContext(DecksContext).filter(
    (item) => item.id.toString() === id
  )[0];

  const cards = useContext(FlashcardsContext).filter(
    (card) => card.deck.toString() === id
  );

  const editDeck = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = new FormData(e.currentTarget).get("name");
    const { error } = await supabase
      .from("decks")
      .update({ name })
      .eq("id", id);
    if (error) console.log(error);
    else
      navigate({
        to: "/$deckId",
        params: { deckId: id! },
      });
  };

  const createCard = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const front = new FormData(e.currentTarget).get("front");
    const back = new FormData(e.currentTarget).get("back");

    const { error } = await supabase
      .from("flashcards")
      .insert({ front, back, deck: id! });

    if (error) console.log(error);
    else navigate({ to: "/$deckId", params: { deckId: id! } });
  };

  const editCard = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const front = formData.get("front");
    const back = formData.get("back");

    const { error } = await supabase
      .from("flashcards")
      .update({ front, back })
      .eq("id", editcard);
    if (error) console.log(error);
    else navigate({ to: "/$deckId", params: { deckId: id! } });
  };

  return (
    <>
      <Leftmenu name={deck.name}>
        <Link
          to="/$deckId"
          params={{ deckId: id! }}
          search={{ create: true }}
          className="text-stone-500 hover:text-stone-800 t3"
        >
          Add flashcard
        </Link>
        <Link
          to="/$deckId/study"
          params={{ deckId: id! }}
          className="text-stone-500 hover:text-stone-800 t3"
        >
          Study
        </Link>
      </Leftmenu>

      <div className="flex flex-row gap-2 ml-10">
        {cards?.map((card) => <Card key={card.id} card={card} />)}
      </div>

      {edit && (
        <Form onSubmit={editDeck}>
          <FormInput val={deck.name} name="name" />
          <FormButton>save</FormButton>
          <Link to="/$deckId" params={{ deckId: id! }}>
            Back
          </Link>
        </Form>
      )}

      {create && (
        <Form onSubmit={createCard}>
          <Label name="front">front</Label>
          <FormInput name="front" />
          <Label name="back">back</Label>
          <textarea
            name="back"
            className="py-2 px-4 rounded-lg border border-stone-200"
          />
          <FormButton>create</FormButton>
          <Link to="/$deckId" params={{ deckId: id! }}>
            Back
          </Link>
        </Form>
      )}

      {editcard && (
        <Form onSubmit={editCard}>
          <Label name="front">front</Label>
          <FormInput
            name="front"
            val={cards?.filter((card) => card.id === editcard)[0].front}
          />
          <Label name="back">back</Label>
          <textarea
            defaultValue={cards?.filter((card) => card.id === editcard)[0].back}
            name="back"
            className="py-2 px-4 rounded-lg border border-stone-200"
          />
          <FormButton>save</FormButton>
          <Link to="/$deckId" params={{ deckId: id! }}>
            Back
          </Link>
        </Form>
      )}
    </>
  );
}
