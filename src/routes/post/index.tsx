import { createFileRoute, Link, useSearch } from "@tanstack/react-router";

export const Route = createFileRoute("/post/")({
  component: RouteComponent,
  validateSearch: (search) => search,
});

function RouteComponent() {
  const search = useSearch({ strict: false });
  if (search.edit) {
    return (
      <form>
        <Link to="/post">Close</Link>
        <h1>This is a form</h1>
      </form>
    );
  }
  return (
    <>
      <h1>Post</h1>
      <Link to="/about">Back</Link>
      <Link to="/post" search={{ edit: true }}>
        Edit
      </Link>
    </>
  );
}
