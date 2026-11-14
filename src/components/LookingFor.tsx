interface Props {
  text: string;
}

export function LookingFor({ text }: Props) {
  if (!text) return null;
  return (
    <p className="border-border bg-surface text-muted w-fit max-w-full rounded-[10px] border px-4 py-2.5 text-sm leading-snug">
      {text}
    </p>
  );
}
