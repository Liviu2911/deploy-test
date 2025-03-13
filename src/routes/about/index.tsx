import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <h1>About</h1>
      <Link to="/">Home</Link>
      <Link to="/post">Post</Link>
    </>
  );
}
