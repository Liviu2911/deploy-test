import {
  createFileRoute,
  Link,
  useNavigate,
  useParams,
  useSearch,
} from "@tanstack/react-router";
import { FormEvent, useContext } from "react";
import { DecksContext } from "../__root";
import Form from "../../components/form";
import FormInput from "../../components/form/input";
import FormButton from "../../components/form/button";
import { supabase } from "../../supabase";
import Label from "../../components/form/label";
import { useQuery } from "@tanstack/react-query";
import Card from "../../components/card";
import { IoHome } from "react-icons/io5";

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

  const {
    data: cards,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["flashcards"],
    queryFn: async () => {
      const { data, error } = await supabase.from("flashcards").select();
      if (error || !data) throw Error(error ? error.message : "Data not found");
      return data;
    },
    refetchInterval: 1000,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  } else if (error) {
    console.log(error);
    return <h1>There was an error</h1>;
  }

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
      <div className="flex flex-row items-baseline gap-2 m-10">
        <Link to="/" className="opacity-75 hover:opacity-100 t3">
          <IoHome />
        </Link>
        <h1 className="text-xl font-semibold">{deck.name}</h1>
        <Link
          to="/$deckId"
          params={{ deckId: id! }}
          search={{ edit: true }}
          className="text-stone-500 hover:text-stone-800 t3"
        >
          edit
        </Link>
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
      </div>

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
          <FormInput name="back" />
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
          <FormInput
            name="back"
            val={cards?.filter((card) => card.id === editcard)[0].back}
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
