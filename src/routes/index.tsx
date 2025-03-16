import {
  createFileRoute,
  Link,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { supabase } from "../supabase";
import Deck from "../components/deck";
import CreateForm from "../components/form";
import FormInput from "../components/form/input";
import FormButton from "../components/form/button";
import { useContext } from "react";
import { DecksContext } from "./__root";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  validateSearch: (search: { create?: true }) => search,
});

function RouteComponent() {
  const navigate = useNavigate();

  const { create } = useSearch({ strict: false });
  const data = useContext(DecksContext);

  const addDeck = async (form: React.FormEvent<HTMLFormElement>) => {
    form.preventDefault();
    const name = new FormData(form.currentTarget).get("name");
    const { error } = await supabase.from("decks").insert({ name });
    if (error) console.log(error);
    else navigate({ to: "/" });
  };

  return (
    <>
      <Link
        to="/"
        search={{ create: true }}
        className="bg-stone-800 rounded-lg p-2 text-stone-200 text-lg uppercase absolute top-10 left-10 hover:opacity-75 t3"
      >
        Create Deck
      </Link>
      <div className="m-10 mt-24 flex flex-row gap-2">
        {data?.map((deck) => <Deck key={deck.id} deck={deck} />)}
      </div>

      {create && (
        <CreateForm onSubmit={addDeck}>
          <FormInput name="name" />
          <FormButton>create</FormButton>
          <Link to="/">Back</Link>
        </CreateForm>
      )}
    </>
  );
}
