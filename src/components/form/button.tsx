function FormButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="uppercase p-2 border border-stone-200 rounded-lg"
    >
      {children}
    </button>
  );
}

export default FormButton;
