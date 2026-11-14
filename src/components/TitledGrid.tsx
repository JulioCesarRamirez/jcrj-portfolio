interface Props {
  items: readonly { title: string; text: string }[];
  numbered?: boolean;
  columns?: "two" | "four";
}

/** A list of short titled items, used for "How I work", "What I build" and steps. */
export function TitledGrid({
  items,
  numbered = false,
  columns = "two",
}: Props) {
  const grid =
    columns === "four" ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2";
  const List = numbered ? "ol" : "ul";
  return (
    <List className={`grid gap-4 ${grid}`}>
      {items.map((item, i) => (
        <li
          key={item.title}
          className="border-border bg-surface flex flex-col gap-2 rounded-[16px] border p-6"
        >
          {numbered ? (
            <span className="text-subtle font-mono text-xs">
              {String(i + 1).padStart(2, "0")}
            </span>
          ) : null}
          <h3 className="h3 text-text">{item.title}</h3>
          {item.text ? (
            <p className="text-muted text-[15px] leading-relaxed">
              {item.text}
            </p>
          ) : null}
        </li>
      ))}
    </List>
  );
}
