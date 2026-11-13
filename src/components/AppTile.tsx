interface Props {
  name: string;
  detail: string;
}

export function AppTile({ name, detail }: Props) {
  return (
    <div className="border-border flex h-full flex-col gap-1.5 rounded-[14px] border p-[18px]">
      <span className="text-text text-base font-semibold">{name}</span>
      <span className="text-subtle font-mono text-xs">{detail}</span>
    </div>
  );
}
