import {
  createFileRoute,
  Link,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";

export const Route = createFileRoute("/post/")({
  component: RouteComponent,
  validateSearch: (search) => search,
});

function RouteComponent() {
  const search = useSearch({ strict: false });
  const navigate = useNavigate();
  if (search.edit) {
    navigate({ to: "/" });
  }
  return (
    <>
      <h1>Post</h1>
      <Link to="/about">Back</Link>
      <Link to="/post" search={{ edit: true }}>
        Back
      </Link>
    </>
  );
}
