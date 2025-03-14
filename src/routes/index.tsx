import { useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { IoTrash } from "react-icons/io5";
import { supabase } from "../supabase";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  validateSearch: (search: { create?: true }) => search,
});

const getDecks = async () => {
  const { data, error } = await supabase.from("decks").select();
  if (!data || error) {
    const message = error.message || "Data not found";
    throw Error(message);
  }

  return data;
};

const deleteDeck = async (id: string) => {
  const { error } = await supabase.from("decks").delete().eq("id", id);
  if (error) console.log(error);
};

function RouteComponent() {
  const navigate = useNavigate();

  const { create } = useSearch({ strict: false });
  const { data, isLoading, error } = useQuery({
    queryKey: ["decks"],
    queryFn: getDecks,
    refetchInterval: 1000,
  });
  if (isLoading) {
    return <h1>Loading...</h1>;
  } else if (error) {
    <h1>There was an error</h1>;
  } else if (!data) {
    <h1>Data missing</h1>;
  }

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
      <div className="m-10 mt-24">
        {data?.map((deck) => (
          <div
            key={deck.id}
            className="p-2 border border-stone-300 rounded-lg max-w-fit hover:bg-stone-100 t3 flex flex-row items-center gap-2"
          >
            <Link to="/">{deck.name}</Link>
            <button
              onClick={async () => {
                await deleteDeck(deck.id);
              }}
              className="opacity-75 hover:oapcity-100 hover:text-red-500 t3"
            >
              <IoTrash />
            </button>
          </div>
        ))}
      </div>

      {create && (
        <form className="flex flex-col items-center gap-3" onSubmit={addDeck}>
          <input
            name="name"
            className="py-2 px-4 rounded-lg border border-stone-200"
          />
          <button
            type="submit"
            className="uppercase p-2 border border-stone-200 rounded-lg"
          >
            Save
          </button>
        </form>
      )}
    </>
  );
}
