import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { supabase } from "../supabase";
import { useQuery } from "@tanstack/react-query";

export const Route = createRootRoute({
  component: RootComponent,
});

export const DecksContext = React.createContext<{ name: string; id: string }[]>(
  []
);

function RootComponent() {
  const getDecks = async () => {
    const { data, error } = await supabase.from("decks").select();
    if (!data || error) {
      const message = error.message || "Data not found";
      throw Error(message);
    }

    return data;
  };
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
  return (
    <React.Fragment>
      <DecksContext.Provider value={data || [{ name: "dafuck", id: "-1" }]}>
        <Outlet />
      </DecksContext.Provider>
    </React.Fragment>
  );
}
