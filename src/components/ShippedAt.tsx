interface Props {
  label: string;
  names: readonly string[];
}

export function ShippedAt({ label, names }: Props) {
  if (names.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-7">
      <p className="label-mono">{label}</p>
      <ul className="flex flex-wrap gap-x-8 gap-y-2">
        {names.map((name) => (
          <li
            key={name}
            className="text-soft text-lg font-semibold tracking-[-0.01em]"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
