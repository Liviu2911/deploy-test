import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { supabase } from "../supabase";
import { useQuery } from "@tanstack/react-query";
import { Flashcard } from "../components/card";

export const Route = createRootRoute({
  component: RootComponent,
});

export const DecksContext = React.createContext<{ name: string; id: string }[]>(
  []
);

export const FlashcardsContext = React.createContext<Flashcard[]>([]);

function RootComponent() {
  const getDecks = async () => {
    const { data, error } = await supabase.from("decks").select();
    if (!data || error) {
      const message = error.message || "Data not found";
      throw Error(message);
    }

    return data;
  };
  const getFlashcards = async () => {
    const { data, error } = await supabase.from("flashcards").select();
    if (!data || error) throw Error(error ? error.message : "Data not found");
    return data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["decks"],
    queryFn: getDecks,
    refetchInterval: 1000,
  });

  const {
    data: cards,
    isLoading: cardsLoading,
    error: err,
  } = useQuery({
    queryKey: ["flashcards"],
    queryFn: getFlashcards,
    refetchInterval: 1000,
  });

  if (isLoading || cardsLoading) {
    return <h1>Loading...</h1>;
  } else if (error || err) {
    <h1>There was an error</h1>;
  } else if (!data || !cards) {
    <h1>Data missing</h1>;
  }
  return (
    <React.Fragment>
      <DecksContext.Provider value={data || [{ name: "dafuck", id: "-1" }]}>
        <FlashcardsContext value={cards || []}>
          <Outlet />
        </FlashcardsContext>
      </DecksContext.Provider>
    </React.Fragment>
  );
}
