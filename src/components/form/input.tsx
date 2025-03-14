function FormInput({ name, val }: { name: string; val?: string }) {
  return (
    <input
      name={name}
      defaultValue={val}
      className="py-2 px-4 rounded-lg border border-stone-200"
    />
  );
}

export default FormInput;
