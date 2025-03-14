function Form({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="w-full flex justify-center">
      <form
        className="flex flex-col items-center gap-3 relative max-w-fit"
        onSubmit={onSubmit}
      >
        {children}
      </form>
    </div>
  );
}

export default Form;
