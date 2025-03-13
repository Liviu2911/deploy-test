import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/post/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <h1>Post</h1>
      <Link to="/about">Back</Link>
    </>
  );
}
