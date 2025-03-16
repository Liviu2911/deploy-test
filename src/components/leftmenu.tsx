import { Link } from "@tanstack/react-router";
import { IoHome } from "react-icons/io5";

function Leftmenu({
  name,
  children,
}: {
  name: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-row items-baseline gap-2 m-10">
      <Link to="/" className="opacity-75 hover:opacity-100 t3">
        <IoHome />
      </Link>
      <h1 className="text-xl font-semibold">{name}</h1>
      {children}
    </div>
  );
}

export default Leftmenu;
