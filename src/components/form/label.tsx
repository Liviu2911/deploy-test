function Label({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) {
  return (
    <label
      htmlFor={name}
      className="text-stone-500 uppercase font-semibold text-sm text-left w-full"
    >
      {children}
    </label>
  );
}

export default Label;
